import express from 'express';
import Connection from '../models/Connection.js';
import Student from '../models/Student.js';
import Recruiter from '../models/Recruiter.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Create Connection Request
router.post('/request', authenticate, async (req, res) => {
  try {
    const { studentId, recruiterId, message, initiatedBy } = req.body;

    if (!studentId || !recruiterId || !initiatedBy) {
      return res.status(400).json({ 
        message: 'Please provide studentId, recruiterId, and initiatedBy' 
      });
    }

    // Verify user can make this request
    if (initiatedBy === 'recruiter' && req.user.id !== recruiterId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    if (initiatedBy === 'student' && req.user.id !== studentId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    // Check if connection already exists
    const existing = await Connection.findOne({
      $or: [
        { recruiter: recruiterId, student: studentId },
        { recruiter: recruiterId, student: studentId }
      ]
    });

    if (existing) {
      return res.status(400).json({ message: 'Connection request already exists' });
    }

    const connection = new Connection({
      recruiter: recruiterId,
      student: studentId,
      message: message || '',
      initiatedBy,
      status: 'pending'
    });

    await connection.save();

    // Populate and return
    await connection.populate('recruiter', 'companyName fullName profilePicture');
    await connection.populate('student', 'fullName profilePicture skills');

    res.status(201).json({
      message: 'Connection request sent successfully',
      connection
    });
  } catch (error) {
    console.error('Create connection error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update Connection Status (Accept/Reject)
router.put('/:connectionId', authenticate, async (req, res) => {
  try {
    const { status } = req.body;
    const { connectionId } = req.params;

    if (!['accepted', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const connection = await Connection.findById(connectionId);
    if (!connection) {
      return res.status(404).json({ message: 'Connection not found' });
    }

    // Verify user can update this connection
    const isRecruiter = connection.recruiter.toString() === req.user.id;
    const isStudent = connection.student.toString() === req.user.id;

    if (!isRecruiter && !isStudent) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    connection.status = status;
    connection.updatedAt = Date.now();
    await connection.save();

    // If accepted, add to connections array
    if (status === 'accepted') {
      await Student.findByIdAndUpdate(connection.student, {
        $addToSet: { connections: connection.recruiter }
      });
      await Recruiter.findByIdAndUpdate(connection.recruiter, {
        $addToSet: { connections: connection.student }
      });
    }

    await connection.populate('recruiter', 'companyName fullName profilePicture');
    await connection.populate('student', 'fullName profilePicture skills');

    res.json({
      message: `Connection ${status} successfully`,
      connection
    });
  } catch (error) {
    console.error('Update connection error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get User's Connections
router.get('/my-connections', authenticate, async (req, res) => {
  try {
    const userId = req.user.id;
    const userRole = req.user.role;

    let connections;
    if (userRole === 'recruiter') {
      connections = await Connection.find({ recruiter: userId })
        .populate('student', 'fullName profilePicture skills bio')
        .sort({ createdAt: -1 });
    } else if (userRole === 'student') {
      connections = await Connection.find({ student: userId })
        .populate('recruiter', 'companyName fullName profilePicture companyDescription')
        .sort({ createdAt: -1 });
    } else {
      return res.status(400).json({ message: 'Invalid user role' });
    }

    res.json(connections);
  } catch (error) {
    console.error('Get connections error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
