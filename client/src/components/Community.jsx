import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search, Filter, Users, GraduationCap, Sparkles, MapPin, Briefcase, X
} from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Community = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all'); // all, students, mentors
  const [skillFilter, setSkillFilter] = useState('');

  useEffect(() => {
    fetchCommunity();
  }, []);

  const fetchCommunity = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const [studentsRes, mentorsRes] = await Promise.all([
        axios.get(`${API_URL}/students/browse`, { headers }).catch(() => ({ data: [] })),
        axios.get(`${API_URL}/mentors/browse`, { headers }).catch(() => ({ data: [] }))
      ]);

      setStudents(studentsRes.data || []);
      setMentors(mentorsRes.data || []);
    } catch (error) {
      console.error('Error fetching community:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredStudents = students.filter((student) => {
    const matchesSearch = student.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.skills?.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesSkill = !skillFilter || student.skills?.some(skill => 
      skill.toLowerCase().includes(skillFilter.toLowerCase())
    );
    return matchesSearch && matchesSkill;
  });

  const filteredMentors = mentors.filter((mentor) => {
    const matchesSearch = mentor.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentor.areaOfExpertise?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const displayItems = selectedFilter === 'students' ? filteredStudents :
                      selectedFilter === 'mentors' ? filteredMentors :
                      [...filteredStudents, ...filteredMentors];

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
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Community</h1>
          <p className="text-white/70">Discover students and mentors in our community</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" size={20} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, skills, or expertise..."
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            {selectedFilter === 'students' && (
              <div className="relative flex-1">
                <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" size={20} />
                <input
                  type="text"
                  value={skillFilter}
                  onChange={(e) => setSkillFilter(e.target.value)}
                  placeholder="Filter by skill..."
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            )}
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-3">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-6 py-2 rounded-xl transition-all ${
                selectedFilter === 'all'
                  ? 'bg-purple-500 text-white'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              All ({students.length + mentors.length})
            </button>
            <button
              onClick={() => setSelectedFilter('students')}
              className={`px-6 py-2 rounded-xl transition-all flex items-center gap-2 ${
                selectedFilter === 'students'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              <GraduationCap size={18} /> Students ({students.length})
            </button>
            <button
              onClick={() => setSelectedFilter('mentors')}
              className={`px-6 py-2 rounded-xl transition-all flex items-center gap-2 ${
                selectedFilter === 'mentors'
                  ? 'bg-pink-500 text-white'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              <Sparkles size={18} /> Mentors ({mentors.length})
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayItems.map((item, index) => {
            const isStudent = item.skills !== undefined;
            return (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 hover:bg-white/15 transition-all cursor-pointer"
                onClick={() => {
                  if (isStudent) {
                    navigate(`/student-profile/${item._id}`);
                  } else {
                    navigate(`/mentor-profile/${item._id}`);
                  }
                }}
              >
                <div className="text-center mb-4">
                  <div className={`w-20 h-20 mx-auto mb-3 rounded-full flex items-center justify-center text-2xl font-bold text-white ${
                    isStudent
                      ? 'bg-gradient-to-br from-blue-500 to-cyan-500'
                      : 'bg-gradient-to-br from-purple-500 to-pink-500'
                  }`}>
                    {item.fullName?.charAt(0) || 'U'}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{item.fullName}</h3>
                  {isStudent ? (
                    <>
                      {item.education?.institution && (
                        <p className="text-white/60 text-sm mb-2">{item.education.institution}</p>
                      )}
                      {item.location && (
                        <div className="flex items-center justify-center gap-1 text-white/50 text-xs mb-3">
                          <MapPin size={12} />
                          <span>{item.location}</span>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      {item.company && (
                        <p className="text-white/60 text-sm mb-2">{item.company}</p>
                      )}
                      {item.areaOfExpertise && (
                        <p className="text-white/70 text-sm mb-2">{item.areaOfExpertise}</p>
                      )}
                    </>
                  )}
                </div>

                {isStudent && item.skills && item.skills.length > 0 && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2 justify-center">
                      {item.skills.slice(0, 4).map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                      {item.skills.length > 4 && (
                        <span className="px-2 py-1 rounded-full bg-white/10 text-white/60 text-xs">
                          +{item.skills.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {!isStudent && item.experience && (
                  <div className="mb-4">
                    <p className="text-white/70 text-sm text-center">{item.experience}</p>
                  </div>
                )}

                <div className={`text-center px-4 py-2 rounded-xl text-sm font-semibold ${
                  isStudent
                    ? 'bg-blue-500/20 text-blue-300'
                    : 'bg-purple-500/20 text-purple-300'
                }`}>
                  {isStudent ? 'Student' : 'Mentor'}
                </div>
              </motion.div>
            );
          })}
        </div>

        {displayItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white/60 text-lg">No results found</p>
            <p className="text-white/40 text-sm mt-2">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Community;

