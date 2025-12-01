import express from 'express';
import Student from '../models/Student.js';
import { authenticate, generateToken } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = express.Router();

// Register Student
router.post('/register', async (req, res) => {
  try {
    const { email, password, fullName } = req.body;

    if (!email || !password || !fullName) {
      return res.status(400).json({ message: 'Please provide email, password, and full name' });
    }

    // Check if student already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: 'Student already exists with this email' });
    }

    const student = new Student({
      email,
      password,
      fullName
    });

    await student.save();
    const token = generateToken({ _id: student._id, email: student.email, role: 'student' });

    res.status(201).json({
      message: 'Student registered successfully',
      token,
      user: student
    });
  } catch (error) {
    console.error('Student registration error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Login Student
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await student.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken({ _id: student._id, email: student.email, role: 'student' });

    res.json({
      message: 'Login successful',
      token,
      user: student
    });
  } catch (error) {
    console.error('Student login error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get Student Profile
router.get('/profile', authenticate, async (req, res) => {
  try {
    const student = await Student.findById(req.user.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update Student Profile
router.put('/profile', authenticate, async (req, res) => {
  try {
    const updates = req.body;
    delete updates.password; // Don't allow password update here
    delete updates.email; // Don't allow email update

    const student = await Student.findByIdAndUpdate(
      req.user.id,
      { ...updates, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json({
      message: 'Profile updated successfully',
      user: student
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Upload Resume
router.post('/upload-resume', authenticate, upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const student = await Student.findByIdAndUpdate(
      req.user.id,
      { resume: `/uploads/resumes/${req.file.filename}` },
      { new: true }
    );

    res.json({
      message: 'Resume uploaded successfully',
      resume: student.resume
    });
  } catch (error) {
    console.error('Upload resume error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Upload Profile Picture
router.post('/upload-profile-picture', authenticate, upload.single('profilePicture'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const student = await Student.findByIdAndUpdate(
      req.user.id,
      { profilePicture: `/uploads/images/${req.file.filename}` },
      { new: true }
    );

    res.json({
      message: 'Profile picture uploaded successfully',
      profilePicture: student.profilePicture
    });
  } catch (error) {
    console.error('Upload profile picture error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get All Students (for recruiters to browse) with filters
router.get('/browse', authenticate, async (req, res) => {
  try {
    const { skills, minSalary, maxSalary, search } = req.query;
    let query = {};

    // Filter by skills
    if (skills) {
      const skillArray = skills.split(',').map(s => s.trim());
      query.skills = { $in: skillArray };
    }

    // Filter by expected salary range
    if (minSalary || maxSalary) {
      query.expectedSalary = {};
      if (minSalary) {
        query.expectedSalary.$gte = parseInt(minSalary);
      }
      if (maxSalary) {
        query.expectedSalary.$lte = parseInt(maxSalary);
      }
    }

    // Search by name or skills
    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { skills: { $regex: search, $options: 'i' } }
      ];
    }

    const students = await Student.find(query).select('-password').limit(50);
    res.json(students);
  } catch (error) {
    console.error('Browse students error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get Dashboard Data
router.get('/dashboard', authenticate, async (req, res) => {
  try {
    const student = await Student.findById(req.user.id);
    const Connection = (await import('../models/Connection.js')).default;
    
    // Get pending requests
    const pendingRequests = await Connection.find({
      student: req.user.id,
      status: 'pending'
    }).populate('recruiter', 'companyName fullName profilePicture');

    // Get accepted connections
    const acceptedConnections = await Connection.find({
      student: req.user.id,
      status: 'accepted'
    }).populate('recruiter', 'companyName fullName profilePicture');

    // Calculate profile completion
    const profileFields = [
      'fullName', 'bio', 'skills', 'education.degree', 'education.institution',
      'experience', 'preferredJobRole', 'expectedSalary', 'github', 'linkedIn', 'resume'
    ];
    const completedFields = profileFields.filter(field => {
      const value = field.split('.').reduce((obj, key) => obj?.[key], student);
      return value && value !== '';
    }).length;
    const profileCompletion = Math.round((completedFields / profileFields.length) * 100);

    res.json({
      profileCompletion,
      pendingRequests,
      acceptedConnections,
      totalConnections: acceptedConnections.length
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
