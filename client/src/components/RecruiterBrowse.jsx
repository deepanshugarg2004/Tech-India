import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, Heart, MessageCircle, MapPin, Briefcase, GraduationCap,
  ArrowLeft, User, Mail, Link as LinkIcon, CheckCircle, Filter, Search
} from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const RecruiterBrowse = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [swipeDirection, setSwipeDirection] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [skillFilter, setSkillFilter] = useState('');
  const [salaryFilter, setSalaryFilter] = useState('');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem('token');
      const params = {};
      if (skillFilter) params.skills = skillFilter;
      if (salaryFilter) {
        const [min, max] = salaryFilter.split('-').map(s => s.trim());
        if (min) params.minSalary = min;
        if (max) params.maxSalary = max;
      }
      
      const response = await axios.get(`${API_URL}/students/browse`, {
        headers: { Authorization: `Bearer ${token}` },
        params
      });
      setStudents(response.data);
      setFilteredStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/recruiter-login');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (skillFilter || salaryFilter) {
      fetchStudents();
    }
  }, [skillFilter, salaryFilter]);

  const handleSwipe = (direction) => {
    const total = filteredStudents.length || students.length;
    if (currentIndex >= total - 1) {
      // Reset or show message
      setCurrentIndex(0);
      return;
    }
    setSwipeDirection(direction);
    setTimeout(() => {
      setCurrentIndex(currentIndex + 1);
      setSwipeDirection(null);
    }, 300);
  };

  const handleConnect = async (studentId) => {
    try {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      
      await axios.post(
        `${API_URL}/connections/request`,
        {
          studentId,
          recruiterId: user._id || user.id,
          initiatedBy: 'recruiter',
          message: 'Interested in connecting with you!'
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

  const currentStudent = filteredStudents[currentIndex] || students[currentIndex];

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

  if (filteredStudents.length === 0 && students.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 p-4">
        <div className="text-center">
          <p className="text-white text-xl mb-4">No students available</p>
          <button
            onClick={() => navigate('/#/recruiter-profile')}
            className="px-6 py-3 rounded-xl bg-indigo-500 text-white hover:bg-indigo-600 transition-all"
          >
            Back to Profile
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 p-4 sm:p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('/recruiter-profile')}
            className="p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Discover Students</h1>
          <div className="w-10" />
        </div>

        {/* Filters */}
        <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={18} />
            <input
              type="text"
              value={skillFilter}
              onChange={(e) => setSkillFilter(e.target.value)}
              placeholder="Filter by skill..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={18} />
            <input
              type="text"
              value={salaryFilter}
              onChange={(e) => setSalaryFilter(e.target.value)}
              placeholder="Expected salary (e.g., 5-8)"
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-white/60 mb-2">
            <span>{currentIndex + 1} of {filteredStudents.length || students.length}</span>
            <span>{Math.round(((currentIndex + 1) / (filteredStudents.length || students.length)) * 100)}%</span>
          </div>
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentIndex + 1) / (filteredStudents.length || students.length)) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Card Stack */}
        <div className="relative h-[600px] sm:h-[700px]">
          <AnimatePresence>
            {currentStudent && (
              <motion.div
                key={currentStudent._id}
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
                  {/* Profile Header */}
                  <div className="text-center mb-6">
                    <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-4xl font-bold text-white shadow-2xl">
                      {currentStudent.fullName?.charAt(0) || 'S'}
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2">{currentStudent.fullName}</h2>
                    <div className="flex items-center justify-center gap-2 text-white/70 text-sm mb-4">
                      <MapPin size={16} />
                      <span>{currentStudent.location || 'Location not specified'}</span>
                    </div>
                    <div className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                      currentStudent.availability === 'Available' ? 'bg-green-500/20 text-green-300' :
                      currentStudent.availability === 'Busy' ? 'bg-yellow-500/20 text-yellow-300' :
                      'bg-red-500/20 text-red-300'
                    }`}>
                      {currentStudent.availability || 'Available'}
                    </div>
                  </div>

                  {/* Bio */}
                  {currentStudent.bio && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-white mb-2">About</h3>
                      <p className="text-white/80 text-sm leading-relaxed">{currentStudent.bio}</p>
                    </div>
                  )}

                  {/* Skills */}
                  {currentStudent.skills && currentStudent.skills.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                        <Briefcase size={20} /> Skills
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {currentStudent.skills.slice(0, 8).map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1.5 rounded-full bg-blue-500/30 text-white text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Education */}
                  {currentStudent.education && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                        <GraduationCap size={20} /> Education
                      </h3>
                      <div className="text-white/80 text-sm space-y-1">
                        {currentStudent.education.degree && (
                          <p><strong>Degree:</strong> {currentStudent.education.degree}</p>
                        )}
                        {currentStudent.education.institution && (
                          <p><strong>Institution:</strong> {currentStudent.education.institution}</p>
                        )}
                        {currentStudent.education.graduationYear && (
                          <p><strong>Year:</strong> {currentStudent.education.graduationYear}</p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Experience */}
                  {currentStudent.experience && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-white mb-2">Experience</h3>
                      <p className="text-white/80 text-sm">{currentStudent.experience}</p>
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
                      onClick={() => handleConnect(currentStudent._id)}
                      className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/50 hover:shadow-indigo-500/70 transition-all flex items-center justify-center gap-2 font-semibold"
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

export default RecruiterBrowse;
