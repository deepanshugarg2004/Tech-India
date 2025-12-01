import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MessageCircle, UserCheck, CheckCircle, Users, TrendingUp,
  LogOut, Settings, Search, Send
} from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const RecruiterDashboard = () => {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/recruiters/dashboard`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDashboardData(response.data);
    } catch (error) {
      console.error('Error fetching dashboard:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/recruiter-login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Recruiter Dashboard</h1>
            <p className="text-white/70">Manage your connections and find talent</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => navigate('/recruiter-profile')}
              className="px-4 py-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all flex items-center gap-2"
            >
              <Settings size={18} /> Profile
            </button>
            <button
              onClick={() => navigate('/recruiter-browse')}
              className="px-4 py-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all flex items-center gap-2"
            >
              <Search size={18} /> Browse Students
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
              <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                <Send className="text-yellow-300" size={24} />
              </div>
              <span className="text-3xl font-bold text-white">{dashboardData?.pendingRequests || 0}</span>
            </div>
            <h3 className="text-white/80 text-sm font-medium">Sent Requests</h3>
            <p className="text-white/60 text-xs mt-2">Awaiting student response</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                <CheckCircle className="text-green-300" size={24} />
              </div>
              <span className="text-3xl font-bold text-white">{dashboardData?.totalConnections || 0}</span>
            </div>
            <h3 className="text-white/80 text-sm font-medium">Accepted Connections</h3>
            <p className="text-white/60 text-xs mt-2">Students you're connected with</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                <MessageCircle className="text-indigo-300" size={24} />
              </div>
              <span className="text-3xl font-bold text-white">{dashboardData?.totalConnections || 0}</span>
            </div>
            <h3 className="text-white/80 text-sm font-medium">Active Chats</h3>
            <p className="text-white/60 text-xs mt-2">Ongoing conversations</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sent Requests */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20"
          >
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Send size={24} /> Sent Connection Requests
            </h2>
            {dashboardData?.sentRequests?.length > 0 ? (
              <div className="space-y-4">
                {dashboardData.sentRequests.map((request) => (
                  <div
                    key={request._id}
                    className="bg-white/5 rounded-2xl p-4 border border-white/10"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                        {request.student?.fullName?.charAt(0) || 'S'}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-semibold">{request.student?.fullName}</h3>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {request.student?.skills?.slice(0, 3).map((skill, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                        <div className="mt-3 flex items-center gap-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            request.status === 'pending' ? 'bg-yellow-500/20 text-yellow-300' :
                            request.status === 'accepted' ? 'bg-green-500/20 text-green-300' :
                            'bg-red-500/20 text-red-300'
                          }`}>
                            {request.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-white/60 text-center py-8">No sent requests</p>
            )}
          </motion.div>

          {/* Accepted Connections */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20"
          >
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <MessageCircle size={24} /> Accepted Connections
            </h2>
            {dashboardData?.acceptedConnections?.length > 0 ? (
              <div className="space-y-4">
                {dashboardData.acceptedConnections.map((connection) => (
                  <div
                    key={connection._id}
                    className="bg-white/5 rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all cursor-pointer"
                    onClick={() => navigate(`/messages/${connection.student._id}`)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                        {connection.student?.fullName?.charAt(0) || 'S'}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-semibold">{connection.student?.fullName}</h3>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {connection.student?.skills?.slice(0, 3).map((skill, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      <MessageCircle className="text-white/40" size={20} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-white/60 text-center py-8">No accepted connections yet</p>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;

