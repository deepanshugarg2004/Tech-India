import express from 'express';
import Message from '../models/Message.js';
import Connection from '../models/Connection.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Get messages between two users
router.get('/:userId', authenticate, async (req, res) => {
  try {
    const currentUserId = req.user.id;
    const currentUserRole = req.user.role;
    const { userId } = req.params;

    // Determine sender and receiver models
    const senderModel = currentUserRole === 'student' ? 'Student' : 
                       currentUserRole === 'recruiter' ? 'Recruiter' : 'Mentor';
    
    // For now, assume messages are between student and recruiter
    // You can extend this logic for mentor-student messages
    const receiverModel = currentUserRole === 'student' ? 'Recruiter' : 'Student';

    // Verify connection exists and is accepted
    let connection;
    if (currentUserRole === 'student') {
      connection = await Connection.findOne({
        student: currentUserId,
        recruiter: userId,
        status: 'accepted'
      });
    } else if (currentUserRole === 'recruiter') {
      connection = await Connection.findOne({
        recruiter: currentUserId,
        student: userId,
        status: 'accepted'
      });
    }

    if (!connection) {
      return res.status(403).json({ message: 'No active connection found' });
    }

    // Get messages
    const messages = await Message.find({
      $or: [
        { sender: currentUserId, receiver: userId },
        { sender: userId, receiver: currentUserId }
      ]
    })
    .sort({ createdAt: 1 })
    .limit(100);

    res.json(messages);
  } catch (error) {
    console.error('Get messages error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Mark messages as read
router.put('/:userId/read', authenticate, async (req, res) => {
  try {
    const currentUserId = req.user.id;
    const { userId } = req.params;

    await Message.updateMany(
      {
        sender: userId,
        receiver: currentUserId,
        isRead: false
      },
      {
        isRead: true,
        readAt: Date.now()
      }
    );

    res.json({ message: 'Messages marked as read' });
  } catch (error) {
    console.error('Mark read error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get unread message count
router.get('/unread/count', authenticate, async (req, res) => {
  try {
    const currentUserId = req.user.id;

    const count = await Message.countDocuments({
      receiver: currentUserId,
      isRead: false
    });

    res.json({ count });
  } catch (error) {
    console.error('Get unread count error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;

