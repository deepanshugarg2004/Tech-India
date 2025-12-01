import express from 'express';
import Mentor from '../models/Mentor.js';
import { authenticate, generateToken } from '../middleware/auth.js';

const router = express.Router();

// Register Mentor
router.post('/register', async (req, res) => {
  try {
    const { email, password, fullName, company, areaOfExpertise, experience, linkedIn } = req.body;

    if (!email || !password || !fullName) {
      return res.status(400).json({ message: 'Please provide email, password, and full name' });
    }

    // Check if mentor already exists
    const existingMentor = await Mentor.findOne({ email });
    if (existingMentor) {
      return res.status(400).json({ message: 'Mentor already exists with this email' });
    }

    const mentor = new Mentor({
      email,
      password,
      fullName,
      company: company || '',
      areaOfExpertise: areaOfExpertise || '',
      experience: experience || '',
      linkedIn: linkedIn || ''
    });

    await mentor.save();
    const token = generateToken({ _id: mentor._id, email: mentor.email, role: 'mentor' });

    res.status(201).json({
      message: 'Mentor registered successfully',
      token,
      user: mentor
    });
  } catch (error) {
    console.error('Mentor registration error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Login Mentor
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    const mentor = await Mentor.findOne({ email });
    if (!mentor) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await mentor.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken({ _id: mentor._id, email: mentor.email, role: 'mentor' });

    res.json({
      message: 'Login successful',
      token,
      user: mentor
    });
  } catch (error) {
    console.error('Mentor login error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get Mentor Profile
router.get('/profile', authenticate, async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.user.id);
    if (!mentor) {
      return res.status(404).json({ message: 'Mentor not found' });
    }
    res.json(mentor);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update Mentor Profile
router.put('/profile', authenticate, async (req, res) => {
  try {
    const updates = req.body;
    delete updates.password;
    delete updates.email;

    const mentor = await Mentor.findByIdAndUpdate(
      req.user.id,
      { ...updates, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!mentor) {
      return res.status(404).json({ message: 'Mentor not found' });
    }

    res.json({
      message: 'Profile updated successfully',
      user: mentor
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get All Mentors (for community page)
router.get('/browse', authenticate, async (req, res) => {
  try {
    const mentors = await Mentor.find().select('-password').limit(50);
    res.json(mentors);
  } catch (error) {
    console.error('Browse mentors error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
