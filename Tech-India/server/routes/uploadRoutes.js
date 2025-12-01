import express from 'express';
import upload from '../middleware/upload.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Upload file (for messages, etc.)
router.post('/upload', authenticate, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const fileUrl = req.file.fieldname === 'resume' 
      ? `/uploads/resumes/${req.file.filename}`
      : `/uploads/images/${req.file.filename}`;

    res.json({
      message: 'File uploaded successfully',
      url: fileUrl
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;

