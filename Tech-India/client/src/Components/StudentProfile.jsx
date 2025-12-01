import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  User, Mail, MapPin, Briefcase, GraduationCap, Link as LinkIcon,
  Edit2, Save, X, Plus, Camera, LogOut, Users, Search, Github, Linkedin, FileText, Upload, LayoutDashboard
} from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const StudentProfile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    bio: '',
    skills: [],
    education: { degree: '', institution: '', graduationYear: '', branch: '', year: '' },
    experience: '',
    preferredJobRole: '',
    expectedSalary: '',
    github: '',
    linkedIn: '',
    portfolio: '',
    location: '',
    availability: 'Available',
    resume: ''
  });
  const [skillInput, setSkillInput] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/students/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfile(response.data);
      setFormData({
        fullName: response.data.fullName || '',
        bio: response.data.bio || '',
        skills: response.data.skills || [],
        education: response.data.education || { degree: '', institution: '', graduationYear: '', branch: '', year: '' },
        experience: response.data.experience || '',
        preferredJobRole: response.data.preferredJobRole || '',
        expectedSalary: response.data.expectedSalary || '',
        github: response.data.github || '',
        linkedIn: response.data.linkedIn || '',
        portfolio: response.data.portfolio || '',
        location: response.data.location || '',
        availability: response.data.availability || 'Available',
        resume: response.data.resume || ''
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/student-login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${API_URL}/students/profile`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEditing(false);
      fetchProfile();
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  const addSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData({ ...formData, skills: [...formData.skills, skillInput.trim()] });
      setSkillInput('');
    }
  };

  const removeSkill = (index) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((_, i) => i !== index)
    });
  };

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formDataUpload = new FormData();
    formDataUpload.append('resume', file);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_URL}/students/upload-resume`, formDataUpload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setFormData({ ...formData, resume: response.data.resume });
      alert('Resume uploaded successfully!');
    } catch (error) {
      console.error('Error uploading resume:', error);
      alert('Failed to upload resume');
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
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-white">My Profile</h1>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => navigate('/student-dashboard')}
              className="px-4 py-2 rounded-xl bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 transition-all flex items-center gap-2"
            >
              <LayoutDashboard size={18} /> Dashboard
            </button>
            <button
              onClick={() => navigate('/student-browse')}
              className="px-4 py-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all flex items-center gap-2"
            >
              <Search size={18} /> Browse Recruiters
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl bg-red-500/20 text-red-300 hover:bg-red-500/30 transition-all flex items-center gap-2"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20"
            >
              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-4xl font-bold text-white">
                  {profile?.fullName?.charAt(0) || 'U'}
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">{profile?.fullName || 'Student'}</h2>
                <p className="text-white/70 text-sm mb-4">{profile?.email}</p>
                <div className="flex items-center justify-center gap-2 text-white/60 text-sm mb-6">
                  <MapPin size={16} />
                  <span>{formData.location || 'Not specified'}</span>
                </div>
                <div className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                  formData.availability === 'Available' ? 'bg-green-500/20 text-green-300' :
                  formData.availability === 'Busy' ? 'bg-yellow-500/20 text-yellow-300' :
                  'bg-red-500/20 text-red-300'
                }`}>
                  {formData.availability}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Bio Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <User size={24} /> About Me
                </h3>
                {!editing && (
                  <button
                    onClick={() => setEditing(true)}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all"
                  >
                    <Edit2 size={18} className="text-white" />
                  </button>
                )}
              </div>

              {editing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">Bio</label>
                    <textarea
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">Location</label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={handleUpdate}
                      className="flex-1 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:scale-105 transition-transform"
                    >
                      <Save size={18} className="inline mr-2" /> Save
                    </button>
                    <button
                      onClick={() => {
                        setEditing(false);
                        fetchProfile();
                      }}
                      className="px-4 py-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-white/80">{formData.bio || 'No bio added yet. Click edit to add one!'}</p>
              )}
            </motion.div>

            {/* Skills Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20"
            >
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Briefcase size={24} /> Skills
              </h3>
              {editing ? (
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && addSkill()}
                      placeholder="Add a skill"
                      className="flex-1 px-4 py-2 rounded-xl bg-white/5 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <button
                      onClick={addSkill}
                      className="px-4 py-2 rounded-xl bg-purple-500 text-white hover:bg-purple-600 transition-all"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded-full bg-purple-500/30 text-white flex items-center gap-2"
                      >
                        {skill}
                        <button
                          onClick={() => removeSkill(index)}
                          className="hover:text-red-400"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {formData.skills.length > 0 ? (
                    formData.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 rounded-full bg-purple-500/30 text-white"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <p className="text-white/60">No skills added yet</p>
                  )}
                </div>
              )}
            </motion.div>

            {/* Education & Experience */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <GraduationCap size={24} /> Education
                </h3>
                {editing ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Degree"
                      value={formData.education.degree}
                      onChange={(e) => setFormData({
                        ...formData,
                        education: { ...formData.education, degree: e.target.value }
                      })}
                      className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <input
                      type="text"
                      placeholder="Institution"
                      value={formData.education.institution}
                      onChange={(e) => setFormData({
                        ...formData,
                        education: { ...formData.education, institution: e.target.value }
                      })}
                      className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <input
                      type="text"
                      placeholder="Graduation Year"
                      value={formData.education.graduationYear}
                      onChange={(e) => setFormData({
                        ...formData,
                        education: { ...formData.education, graduationYear: e.target.value }
                      })}
                      className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <input
                      type="text"
                      placeholder="Branch/Department"
                      value={formData.education.branch}
                      onChange={(e) => setFormData({
                        ...formData,
                        education: { ...formData.education, branch: e.target.value }
                      })}
                      className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <input
                      type="text"
                      placeholder="Current Year (e.g., 1st Year, 2nd Year)"
                      value={formData.education.year}
                      onChange={(e) => setFormData({
                        ...formData,
                        education: { ...formData.education, year: e.target.value }
                      })}
                      className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                ) : (
                  <div className="text-white/80 space-y-2">
                    <p><strong>Degree:</strong> {formData.education.degree || 'Not specified'}</p>
                    <p><strong>Institution:</strong> {formData.education.institution || 'Not specified'}</p>
                    <p><strong>Branch:</strong> {formData.education.branch || 'Not specified'}</p>
                    <p><strong>Year:</strong> {formData.education.year || formData.education.graduationYear || 'Not specified'}</p>
                    <p><strong>Graduation:</strong> {formData.education.graduationYear || 'Not specified'}</p>
                  </div>
                )}
              </div>

              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Briefcase size={24} /> Experience
                </h3>
                {editing ? (
                  <textarea
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    placeholder="Describe your experience..."
                    rows={5}
                    className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                  />
                ) : (
                  <p className="text-white/80">{formData.experience || 'No experience added yet'}</p>
                )}
              </div>
            </motion.div>

            {/* Career & Links Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Briefcase size={24} /> Career Preferences
                </h3>
                {editing ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Preferred Job Role"
                      value={formData.preferredJobRole}
                      onChange={(e) => setFormData({ ...formData, preferredJobRole: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <input
                      type="text"
                      placeholder="Expected Salary (e.g., 5-8 LPA)"
                      value={formData.expectedSalary}
                      onChange={(e) => setFormData({ ...formData, expectedSalary: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                ) : (
                  <div className="text-white/80 space-y-2">
                    <p><strong>Preferred Role:</strong> {formData.preferredJobRole || 'Not specified'}</p>
                    <p><strong>Expected Salary:</strong> {formData.expectedSalary || 'Not specified'}</p>
                  </div>
                )}
              </div>

              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <LinkIcon size={24} /> Links & Resume
                </h3>
                {editing ? (
                  <div className="space-y-3">
                    <div className="relative">
                      <Github className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={18} />
                      <input
                        type="url"
                        placeholder="GitHub Profile URL"
                        value={formData.github}
                        onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                        className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div className="relative">
                      <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={18} />
                      <input
                        type="url"
                        placeholder="LinkedIn Profile URL"
                        value={formData.linkedIn}
                        onChange={(e) => setFormData({ ...formData, linkedIn: e.target.value })}
                        className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div className="relative">
                      <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={18} />
                      <input
                        type="url"
                        placeholder="Portfolio URL"
                        value={formData.portfolio}
                        onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                        className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <label className="block">
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleResumeUpload}
                        className="hidden"
                        id="resume-upload"
                      />
                      <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/20 text-white cursor-pointer hover:bg-white/10 transition-all">
                        <Upload size={18} />
                        <span className="text-sm">Upload Resume (PDF/DOC)</span>
                      </div>
                    </label>
                    {formData.resume && (
                      <a
                        href={`${API_URL.replace('/api', '')}${formData.resume}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-purple-300 hover:text-purple-200 text-sm"
                      >
                        <FileText size={16} />
                        View Current Resume
                      </a>
                    )}
                  </div>
                ) : (
                  <div className="text-white/80 space-y-3">
                    {formData.github && (
                      <a href={formData.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-purple-300 hover:text-purple-200">
                        <Github size={18} /> GitHub Profile
                      </a>
                    )}
                    {formData.linkedIn && (
                      <a href={formData.linkedIn} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-purple-300 hover:text-purple-200">
                        <Linkedin size={18} /> LinkedIn Profile
                      </a>
                    )}
                    {formData.portfolio && (
                      <a href={formData.portfolio} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-purple-300 hover:text-purple-200">
                        <LinkIcon size={18} /> Portfolio
                      </a>
                    )}
                    {formData.resume && (
                      <a
                        href={`${API_URL.replace('/api', '')}${formData.resume}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-purple-300 hover:text-purple-200"
                      >
                        <FileText size={18} /> View Resume
                      </a>
                    )}
                    {!formData.github && !formData.linkedIn && !formData.portfolio && !formData.resume && (
                      <p className="text-white/60">No links or resume added yet</p>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
