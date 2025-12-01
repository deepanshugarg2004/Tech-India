import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MessageCircle, Users, GraduationCap, LogOut, Settings, MessageSquare
} from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const MentorDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    navigate('/');
  };

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Mentor Dashboard</h1>
            <p className="text-white/70">Guide students and share your knowledge</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => navigate('/chatroom')}
              className="px-4 py-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all flex items-center gap-2"
            >
              <MessageSquare size={18} /> Community Chat
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl bg-red-500/20 text-red-300 hover:bg-red-500/30 transition-all flex items-center gap-2"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                <Users className="text-purple-300" size={24} />
              </div>
              <span className="text-3xl font-bold text-white">0</span>
            </div>
            <h3 className="text-white/80 text-sm font-medium">Students Mentored</h3>
            <p className="text-white/60 text-xs mt-2">Total students you've helped</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <MessageCircle className="text-blue-300" size={24} />
              </div>
              <span className="text-3xl font-bold text-white">0</span>
            </div>
            <h3 className="text-white/80 text-sm font-medium">Community Posts</h3>
            <p className="text-white/60 text-xs mt-2">Your contributions</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                <GraduationCap className="text-green-300" size={24} />
              </div>
              <span className="text-3xl font-bold text-white">Active</span>
            </div>
            <h3 className="text-white/80 text-sm font-medium">Status</h3>
            <p className="text-white/60 text-xs mt-2">Your availability</p>
          </motion.div>
        </div>

        {/* Community Discussions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <MessageSquare size={24} /> Student Community Discussions
            </h2>
            <button
              onClick={() => navigate('/chatroom')}
              className="px-4 py-2 rounded-xl bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 transition-all flex items-center gap-2"
            >
              Join Chat
            </button>
          </div>
          <div className="space-y-4">
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
              <p className="text-white/60 text-center py-8">
                Join the community chatroom to engage with students, answer questions, and share your expertise!
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MentorDashboard;
