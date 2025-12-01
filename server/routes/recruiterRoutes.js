import express from 'express';
import Recruiter from '../models/Recruiter.js';
import { authenticate, generateToken } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = express.Router();

// Register Recruiter
router.post('/register', async (req, res) => {
  try {
    const { email, password, fullName, companyName } = req.body;

    if (!email || !password || !fullName || !companyName) {
      return res.status(400).json({ 
        message: 'Please provide email, password, full name, and company name' 
      });
    }

    // Check if recruiter already exists
    const existingRecruiter = await Recruiter.findOne({ email });
    if (existingRecruiter) {
      return res.status(400).json({ message: 'Recruiter already exists with this email' });
    }

    const recruiter = new Recruiter({
      email,
      password,
      fullName,
      companyName
    });

    await recruiter.save();
    const token = generateToken({ _id: recruiter._id, email: recruiter.email, role: 'recruiter' });

    res.status(201).json({
      message: 'Recruiter registered successfully',
      token,
      user: recruiter
    });
  } catch (error) {
    console.error('Recruiter registration error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Login Recruiter
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    const recruiter = await Recruiter.findOne({ email });
    if (!recruiter) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await recruiter.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken({ _id: recruiter._id, email: recruiter.email, role: 'recruiter' });

    res.json({
      message: 'Login successful',
      token,
      user: recruiter
    });
  } catch (error) {
    console.error('Recruiter login error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get Recruiter Profile
router.get('/profile', authenticate, async (req, res) => {
  try {
    const recruiter = await Recruiter.findById(req.user.id);
    if (!recruiter) {
      return res.status(404).json({ message: 'Recruiter not found' });
    }
    res.json(recruiter);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update Recruiter Profile
router.put('/profile', authenticate, async (req, res) => {
  try {
    const updates = req.body;
    delete updates.password; // Don't allow password update here
    delete updates.email; // Don't allow email update

    const recruiter = await Recruiter.findByIdAndUpdate(
      req.user.id,
      { ...updates, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!recruiter) {
      return res.status(404).json({ message: 'Recruiter not found' });
    }

    res.json({
      message: 'Profile updated successfully',
      user: recruiter
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Upload Company Logo
router.post('/upload-logo', authenticate, upload.single('companyLogo'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const recruiter = await Recruiter.findByIdAndUpdate(
      req.user.id,
      { companyLogo: `/uploads/images/${req.file.filename}` },
      { new: true }
    );

    res.json({
      message: 'Company logo uploaded successfully',
      companyLogo: recruiter.companyLogo
    });
  } catch (error) {
    console.error('Upload logo error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Upload Profile Picture
router.post('/upload-profile-picture', authenticate, upload.single('profilePicture'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const recruiter = await Recruiter.findByIdAndUpdate(
      req.user.id,
      { profilePicture: `/uploads/images/${req.file.filename}` },
      { new: true }
    );

    res.json({
      message: 'Profile picture uploaded successfully',
      profilePicture: recruiter.profilePicture
    });
  } catch (error) {
    console.error('Upload profile picture error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get All Recruiters (for students to browse)
router.get('/browse', authenticate, async (req, res) => {
  try {
    const recruiters = await Recruiter.find().select('-password').limit(50);
    res.json(recruiters);
  } catch (error) {
    console.error('Browse recruiters error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get Dashboard Data
router.get('/dashboard', authenticate, async (req, res) => {
  try {
    const Connection = (await import('../models/Connection.js')).default;
    
    // Get sent requests
    const sentRequests = await Connection.find({
      recruiter: req.user.id,
      status: 'pending'
    }).populate('student', 'fullName profilePicture skills');

    // Get accepted connections
    const acceptedConnections = await Connection.find({
      recruiter: req.user.id,
      status: 'accepted'
    }).populate('student', 'fullName profilePicture skills');

    res.json({
      sentRequests,
      acceptedConnections,
      totalConnections: acceptedConnections.length,
      pendingRequests: sentRequests.length
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
