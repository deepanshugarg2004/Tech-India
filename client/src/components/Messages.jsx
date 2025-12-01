import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Send, Paperclip, Image as ImageIcon, FileText, X, Circle
} from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

const Messages = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [onlineUsers, setOnlineUsers] = useState(new Set());
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState(null);
  const [otherUser, setOtherUser] = useState(null);
  const [socket, setSocket] = useState(null);
  const [pendingFile, setPendingFile] = useState(null);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
  const currentUserRole = localStorage.getItem('role');

  useEffect(() => {
    fetchMessages();
    fetchOtherUser();
    initializeSocket();

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [userId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const initializeSocket = async () => {
    try {
      // Dynamically import socket.io-client - only if available
      let io;
      try {
        const socketModule = await import('socket.io-client');
        io = socketModule.io;
      } catch (importError) {
        console.warn('socket.io-client not available, real-time features disabled');
        return; // Exit early if socket.io is not available
      }
      
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user') || '{}');

      if (!io) return;

      const newSocket = io(SOCKET_URL, {
        auth: {
          token,
          userId: user._id || user.id,
          role: currentUserRole
        }
      });

    newSocket.on('connect', () => {
      console.log('Connected to socket');
      const roomId = [user._id || user.id, userId].sort().join('-');
      newSocket.emit('join-room', roomId);
    });

    newSocket.on('receive-message', (message) => {
      setMessages((prev) => [...prev, message]);
      scrollToBottom();
    });

    newSocket.on('user-online', ({ userId: onlineUserId }) => {
      if (onlineUserId === userId) {
        setOnlineUsers((prev) => new Set([...prev, onlineUserId]));
      }
    });

    newSocket.on('user-offline', ({ userId: offlineUserId }) => {
      if (offlineUserId === userId) {
        setOnlineUsers((prev) => {
          const newSet = new Set(prev);
          newSet.delete(offlineUserId);
          return newSet;
        });
      }
    });

    newSocket.on('user-typing', ({ sender, isTyping: typing }) => {
      if (sender === userId) {
        setIsTyping(typing);
        setTypingUser(typing ? sender : null);
        if (typing) {
          clearTimeout(typingTimeoutRef.current);
          typingTimeoutRef.current = setTimeout(() => {
            setIsTyping(false);
            setTypingUser(null);
          }, 3000);
        }
      }
    });

    setSocket(newSocket);
    } catch (error) {
      console.error('Failed to initialize socket:', error);
      // App will still work without real-time features
    }
  };

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/messages/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/student-login');
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchOtherUser = async () => {
    try {
      const token = localStorage.getItem('token');
      const role = currentUserRole === 'student' ? 'recruiters' : 'students';
      const response = await axios.get(`${API_URL}/${role}/profile/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      }).catch(() => {
        // Fallback: try to get from connections
        return axios.get(`${API_URL}/connections/my-connections`, {
          headers: { Authorization: `Bearer ${token}` }
        });
      });
      
      if (response.data) {
        setOtherUser(Array.isArray(response.data) 
          ? response.data.find(c => c.student?._id === userId || c.recruiter?._id === userId)?.student || response.data.find(c => c.student?._id === userId || c.recruiter?._id === userId)?.recruiter
          : response.data
        );
      }
    } catch (error) {
      console.error('Error fetching other user:', error);
    }
  };

  const sendMessage = async () => {
    if (!messageInput.trim() && !pendingFile) return;

    try {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      
      let fileUrl = '';
      if (pendingFile) {
        const formData = new FormData();
        formData.append('file', pendingFile);
        
        const uploadResponse = await axios.post(`${API_URL}/upload`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
        fileUrl = uploadResponse.data.url;
      }

      const messageData = {
        sender: user._id || user.id,
        receiver: userId,
        senderModel: currentUserRole === 'student' ? 'Student' : 'Recruiter',
        receiverModel: currentUserRole === 'student' ? 'Recruiter' : 'Student',
        content: messageInput || (pendingFile ? 'Sent a file' : ''),
        messageType: pendingFile ? (pendingFile.type.startsWith('image/') ? 'image' : 'file') : 'text',
        fileUrl
      };

      if (socket && socket.connected) {
        socket.emit('send-message', messageData);
      } else {
        // Fallback: save message via API if socket is not available
        await axios.post(`${API_URL}/messages/send`, messageData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }

      setMessageInput('');
      setPendingFile(null);
      setIsTyping(false);
      
      if (socket) {
        socket.emit('typing', { receiver: userId, sender: user._id || user.id, isTyping: false });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message');
    }
  };

  const handleTyping = (e) => {
    setMessageInput(e.target.value);
    
    if (socket && !isTyping) {
      setIsTyping(true);
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      socket.emit('typing', { receiver: userId, sender: user._id || user.id, isTyping: true });
    }

    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      if (socket) {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        socket.emit('typing', { receiver: userId, sender: user._id || user.id, isTyping: false });
      }
      setIsTyping(false);
    }, 1000);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPendingFile(file);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const formatTime = (date) => {
    const messageDate = new Date(date);
    const now = new Date();
    const diff = now - messageDate;
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (minutes < 1440) return `${Math.floor(minutes / 60)}h ago`;
    return messageDate.toLocaleDateString();
  };

  const isOnline = onlineUsers.has(userId);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-xl border-b border-white/20 p-4">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
            {otherUser?.fullName?.charAt(0) || otherUser?.companyName?.charAt(0) || 'U'}
          </div>
          <div className="flex-1">
            <h2 className="text-white font-semibold">
              {otherUser?.fullName || otherUser?.companyName || 'User'}
            </h2>
            <div className="flex items-center gap-2">
              <Circle
                size={8}
                className={isOnline ? 'text-green-400 fill-green-400' : 'text-gray-400 fill-gray-400'}
              />
              <span className="text-white/60 text-sm">
                {isOnline ? 'Online' : 'Offline'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          <AnimatePresence>
            {messages.map((message) => {
              const isOwn = (message.sender._id || message.sender) === (currentUser._id || currentUser.id);
              return (
                <motion.div
                  key={message._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] rounded-2xl p-4 ${
                      isOwn
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                        : 'bg-white/10 text-white'
                    }`}
                  >
                    {message.messageType === 'image' && message.fileUrl && (
                      <img
                        src={`${API_URL.replace('/api', '')}${message.fileUrl}`}
                        alt="Shared"
                        className="max-w-full rounded-lg mb-2"
                      />
                    )}
                    {message.messageType === 'file' && message.fileUrl && (
                      <a
                        href={`${API_URL.replace('/api', '')}${message.fileUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm mb-2 underline"
                      >
                        <FileText size={16} />
                        Download File
                      </a>
                    )}
                    <p className="text-sm">{message.content}</p>
                    <p className={`text-xs mt-1 ${isOwn ? 'text-white/70' : 'text-white/50'}`}>
                      {formatTime(message.createdAt)}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
          {isTyping && typingUser && (
            <div className="flex justify-start">
              <div className="bg-white/10 rounded-2xl p-4">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="bg-white/10 backdrop-blur-xl border-t border-white/20 p-4">
        <div className="max-w-4xl mx-auto">
          {pendingFile && (
            <div className="mb-2 flex items-center gap-2 bg-white/5 rounded-xl p-2">
              <FileText size={16} className="text-white/60" />
              <span className="text-white/80 text-sm flex-1">{pendingFile.name}</span>
              <button
                onClick={() => setPendingFile(null)}
                className="p-1 rounded hover:bg-white/10"
              >
                <X size={16} className="text-white/60" />
              </button>
            </div>
          )}
          <div className="flex gap-2">
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileSelect}
              className="hidden"
              accept="image/*,.pdf,.doc,.docx"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-3 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all"
            >
              <Paperclip size={20} />
            </button>
            <input
              type="text"
              value={messageInput}
              onChange={handleTyping}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Type a message..."
              className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={sendMessage}
              disabled={!messageInput.trim() && !pendingFile}
              className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;

