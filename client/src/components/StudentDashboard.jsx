import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  User, MessageCircle, UserCheck, X, CheckCircle, TrendingUp,
  Briefcase, GraduationCap, FileText, LogOut, Settings, Users
} from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/students/dashboard`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDashboardData(response.data);
    } catch (error) {
      console.error('Error fetching dashboard:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/student-login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptRequest = async (connectionId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `${API_URL}/connections/${connectionId}`,
        { status: 'accepted' },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchDashboardData();
    } catch (error) {
      console.error('Error accepting request:', error);
      alert('Failed to accept request');
    }
  };

  const handleRejectRequest = async (connectionId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `${API_URL}/connections/${connectionId}`,
        { status: 'rejected' },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchDashboardData();
    } catch (error) {
      console.error('Error rejecting request:', error);
      alert('Failed to reject request');
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
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Student Dashboard</h1>
            <p className="text-white/70">Welcome back! Here's your overview.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => navigate('/student-profile')}
              className="px-4 py-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all flex items-center gap-2"
            >
              <Settings size={18} /> Profile
            </button>
            <button
              onClick={() => navigate('/student-browse')}
              className="px-4 py-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all flex items-center gap-2"
            >
              <Users size={18} /> Browse Recruiters
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
                <TrendingUp className="text-purple-300" size={24} />
              </div>
              <span className="text-3xl font-bold text-white">{dashboardData?.profileCompletion || 0}%</span>
            </div>
            <h3 className="text-white/80 text-sm font-medium">Profile Completion</h3>
            <div className="mt-3 w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${dashboardData?.profileCompletion || 0}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                <UserCheck className="text-yellow-300" size={24} />
              </div>
              <span className="text-3xl font-bold text-white">{dashboardData?.pendingRequests?.length || 0}</span>
            </div>
            <h3 className="text-white/80 text-sm font-medium">Pending Requests</h3>
            <p className="text-white/60 text-xs mt-2">Recruiters want to connect</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                <CheckCircle className="text-green-300" size={24} />
              </div>
              <span className="text-3xl font-bold text-white">{dashboardData?.totalConnections || 0}</span>
            </div>
            <h3 className="text-white/80 text-sm font-medium">Active Connections</h3>
            <p className="text-white/60 text-xs mt-2">Recruiters you're connected with</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pending Requests */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20"
          >
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <UserCheck size={24} /> Pending Connection Requests
            </h2>
            {dashboardData?.pendingRequests?.length > 0 ? (
              <div className="space-y-4">
                {dashboardData.pendingRequests.map((request) => (
                  <div
                    key={request._id}
                    className="bg-white/5 rounded-2xl p-4 border border-white/10"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
                        {request.recruiter?.companyName?.charAt(0) || 'R'}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-semibold">{request.recruiter?.companyName}</h3>
                        <p className="text-white/60 text-sm">{request.recruiter?.fullName}</p>
                        {request.message && (
                          <p className="text-white/70 text-sm mt-2">{request.message}</p>
                        )}
                        <div className="flex gap-2 mt-3">
                          <button
                            onClick={() => handleAcceptRequest(request._id)}
                            className="flex-1 px-4 py-2 rounded-xl bg-green-500/20 text-green-300 hover:bg-green-500/30 transition-all flex items-center justify-center gap-2 text-sm"
                          >
                            <CheckCircle size={16} /> Accept
                          </button>
                          <button
                            onClick={() => handleRejectRequest(request._id)}
                            className="flex-1 px-4 py-2 rounded-xl bg-red-500/20 text-red-300 hover:bg-red-500/30 transition-all flex items-center justify-center gap-2 text-sm"
                          >
                            <X size={16} /> Reject
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-white/60 text-center py-8">No pending requests</p>
            )}
          </motion.div>

          {/* Active Connections */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20"
          >
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <MessageCircle size={24} /> Active Connections
            </h2>
            {dashboardData?.acceptedConnections?.length > 0 ? (
              <div className="space-y-4">
                {dashboardData.acceptedConnections.map((connection) => (
                  <div
                    key={connection._id}
                    className="bg-white/5 rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all cursor-pointer"
                    onClick={() => navigate(`/messages/${connection.recruiter._id}`)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
                        {connection.recruiter?.companyName?.charAt(0) || 'R'}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-semibold">{connection.recruiter?.companyName}</h3>
                        <p className="text-white/60 text-sm">{connection.recruiter?.fullName}</p>
                      </div>
                      <MessageCircle className="text-white/40" size={20} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-white/60 text-center py-8">No active connections yet</p>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
