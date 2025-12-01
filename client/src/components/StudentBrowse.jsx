import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Heart, MessageCircle, MapPin, Building2, Globe,
  ArrowLeft, Briefcase, Mail, CheckCircle
} from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const StudentBrowse = () => {
  const navigate = useNavigate();
  const [recruiters, setRecruiters] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [swipeDirection, setSwipeDirection] = useState(null);

  useEffect(() => {
    fetchRecruiters();
  }, []);

  const fetchRecruiters = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/recruiters/browse`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRecruiters(response.data);
    } catch (error) {
      console.error('Error fetching recruiters:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/#/student-login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSwipe = (direction) => {
    if (currentIndex >= recruiters.length - 1) {
      setCurrentIndex(0);
      return;
    }
    setSwipeDirection(direction);
    setTimeout(() => {
      setCurrentIndex(currentIndex + 1);
      setSwipeDirection(null);
    }, 300);
  };

  const handleConnect = async (recruiterId) => {
    try {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      
      await axios.post(
        `${API_URL}/connections/request`,
        {
          studentId: user._id || user.id,
          recruiterId,
          initiatedBy: 'student',
          message: 'Interested in opportunities at your company!'
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      
      alert('Connection request sent!');
      handleSwipe('right');
    } catch (error) {
      console.error('Error sending connection:', error);
      alert(error.response?.data?.message || 'Failed to send connection request');
    }
  };

  const currentRecruiter = recruiters[currentIndex];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (recruiters.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4">
        <div className="text-center">
          <p className="text-white text-xl mb-4">No recruiters available</p>
          <button
            onClick={() => navigate('/#/student-profile')}
            className="px-6 py-3 rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition-all"
          >
            Back to Profile
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4 sm:p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('/#/student-profile')}
            className="p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Discover Companies</h1>
          <div className="w-10" />
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-white/60 mb-2">
            <span>{currentIndex + 1} of {recruiters.length}</span>
            <span>{Math.round(((currentIndex + 1) / recruiters.length) * 100)}%</span>
          </div>
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentIndex + 1) / recruiters.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Card Stack */}
        <div className="relative h-[600px] sm:h-[700px]">
          <AnimatePresence>
            {currentRecruiter && (
              <motion.div
                key={currentRecruiter._id}
                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  x: swipeDirection === 'left' ? -300 : swipeDirection === 'right' ? 300 : 0,
                  rotate: swipeDirection === 'left' ? -15 : swipeDirection === 'right' ? 15 : 0,
                }}
                exit={{ opacity: 0, scale: 0.8, x: swipeDirection === 'left' ? -300 : 300 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-6 sm:p-8 shadow-2xl cursor-grab active:cursor-grabbing"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(e, info) => {
                  if (info.offset.x > 100) {
                    handleSwipe('right');
                  } else if (info.offset.x < -100) {
                    handleSwipe('left');
                  }
                }}
              >
                {/* Card Content */}
                <div className="h-full flex flex-col">
                  {/* Company Header */}
                  <div className="text-center mb-6">
                    <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-2xl">
                      <Building2 size={48} className="text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2">{currentRecruiter.companyName}</h2>
                    <p className="text-white/70 text-sm mb-2">{currentRecruiter.fullName}</p>
                    <div className="flex items-center justify-center gap-2 text-white/60 text-sm mb-4">
                      <MapPin size={16} />
                      <span>{currentRecruiter.location || 'Location not specified'}</span>
                    </div>
                    {currentRecruiter.website && (
                      <a
                        href={currentRecruiter.website}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-indigo-300 hover:text-indigo-200 text-sm"
                      >
                        <Globe size={16} /> Visit Website
                      </a>
                    )}
                  </div>

                  {/* Company Description */}
                  {currentRecruiter.companyDescription && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-white mb-2">About Company</h3>
                      <p className="text-white/80 text-sm leading-relaxed">{currentRecruiter.companyDescription}</p>
                    </div>
                  )}

                  {/* Industry */}
                  {currentRecruiter.industry && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-white mb-2">Industry</h3>
                      <span className="px-4 py-2 rounded-full bg-indigo-500/30 text-white text-sm">
                        {currentRecruiter.industry}
                      </span>
                    </div>
                  )}

                  {/* Looking For */}
                  {currentRecruiter.lookingFor && currentRecruiter.lookingFor.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                        <Briefcase size={20} /> Looking For
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {currentRecruiter.lookingFor.slice(0, 8).map((item, index) => (
                          <span
                            key={index}
                            className="px-3 py-1.5 rounded-full bg-indigo-500/30 text-white text-sm"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="mt-auto flex gap-4 pt-6">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSwipe('left')}
                      className="flex-1 py-4 rounded-2xl bg-white/10 text-white hover:bg-white/20 transition-all flex items-center justify-center gap-2 font-semibold"
                    >
                      <X size={24} /> Pass
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleConnect(currentRecruiter._id)}
                      className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/50 hover:shadow-blue-500/70 transition-all flex items-center justify-center gap-2 font-semibold"
                    >
                      <Heart size={24} /> Connect
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Swipe Hints */}
        <div className="mt-6 text-center text-white/60 text-sm">
          <p>Swipe right to connect • Swipe left to pass</p>
        </div>
      </div>
    </div>
  );
};

export default StudentBrowse;
