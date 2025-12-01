import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Building2, Mail, MapPin, Briefcase, Link as LinkIcon,
  Edit2, Save, X, Plus, LogOut, Users, Search, Globe, Phone, Upload, Image as ImageIcon, LayoutDashboard
} from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const RecruiterProfile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    designation: '',
    bio: '',
    companyDescription: '',
    industry: '',
    location: '',
    website: '',
    lookingFor: [],
    contactInfo: {
      phone: '',
      email: '',
      address: ''
    },
    hiringRequirements: ''
  });
  const [skillInput, setSkillInput] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/recruiters/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfile(response.data);
      setFormData({
        fullName: response.data.fullName || '',
        companyName: response.data.companyName || '',
        designation: response.data.designation || '',
        bio: response.data.bio || '',
        companyDescription: response.data.companyDescription || '',
        industry: response.data.industry || '',
        location: response.data.location || '',
        website: response.data.website || '',
        lookingFor: response.data.lookingFor || [],
        contactInfo: response.data.contactInfo || { phone: '', email: '', address: '' },
        hiringRequirements: response.data.hiringRequirements || ''
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/recruiter-login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${API_URL}/recruiters/profile`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEditing(false);
      fetchProfile();
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  const addLookingFor = () => {
    if (skillInput.trim() && !formData.lookingFor.includes(skillInput.trim())) {
      setFormData({ ...formData, lookingFor: [...formData.lookingFor, skillInput.trim()] });
      setSkillInput('');
    }
  };

  const removeLookingFor = (index) => {
    setFormData({
      ...formData,
      lookingFor: formData.lookingFor.filter((_, i) => i !== index)
    });
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formDataUpload = new FormData();
    formDataUpload.append('companyLogo', file);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_URL}/recruiters/upload-logo`, formDataUpload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      fetchProfile(); // Refresh profile
      alert('Company logo uploaded successfully!');
    } catch (error) {
      console.error('Error uploading logo:', error);
      alert('Failed to upload logo');
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
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-white">Recruiter Dashboard</h1>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => navigate('/recruiter-dashboard')}
              className="px-4 py-2 rounded-xl bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 transition-all flex items-center gap-2"
            >
              <LayoutDashboard size={18} /> Dashboard
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20"
            >
              <div className="text-center">
                {profile?.companyLogo ? (
                  <img
                    src={`${API_URL.replace('/api', '')}${profile.companyLogo}`}
                    alt="Company Logo"
                    className="w-32 h-32 mx-auto mb-4 rounded-full object-cover border-4 border-indigo-500/50"
                  />
                ) : (
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                    <Building2 size={48} className="text-white" />
                  </div>
                )}
                <h2 className="text-2xl font-bold text-white mb-2">{formData.companyName || 'Company'}</h2>
                <p className="text-white/70 text-sm mb-1">{formData.fullName}</p>
                {formData.designation && (
                  <p className="text-white/60 text-xs mb-2">{formData.designation}</p>
                )}
                <p className="text-white/60 text-sm mb-4">{profile?.email}</p>
                <div className="flex items-center justify-center gap-2 text-white/60 text-sm mb-4">
                  <MapPin size={16} />
                  <span>{formData.location || 'Not specified'}</span>
                </div>
                {formData.website && (
                  <a
                    href={formData.website}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-indigo-300 hover:text-indigo-200 text-sm mb-2"
                  >
                    <Globe size={16} /> Visit Website
                  </a>
                )}
                {editing && (
                  <label className="block mt-4">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                      id="logo-upload"
                    />
                    <div className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white/10 text-white cursor-pointer hover:bg-white/20 transition-all text-sm">
                      <Upload size={16} />
                      <span>Upload Logo</span>
                    </div>
                  </label>
                )}
              </div>
            </motion.div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Building2 size={24} /> Company Information
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">Full Name</label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">Company Name</label>
                      <input
                        type="text"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">Designation</label>
                      <input
                        type="text"
                        value={formData.designation}
                        onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                        placeholder="e.g., HR Manager, Talent Acquisition"
                        className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">Contact Information</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={16} />
                        <input
                          type="tel"
                          value={formData.contactInfo.phone}
                          onChange={(e) => setFormData({
                            ...formData,
                            contactInfo: { ...formData.contactInfo, phone: e.target.value }
                          })}
                          placeholder="Phone Number"
                          className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={16} />
                        <input
                          type="email"
                          value={formData.contactInfo.email}
                          onChange={(e) => setFormData({
                            ...formData,
                            contactInfo: { ...formData.contactInfo, email: e.target.value }
                          })}
                          placeholder="Contact Email"
                          className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/5 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                    </div>
                    <input
                      type="text"
                      value={formData.contactInfo.address}
                      onChange={(e) => setFormData({
                        ...formData,
                        contactInfo: { ...formData.contactInfo, address: e.target.value }
                      })}
                      placeholder="Company Address"
                      className="w-full mt-3 px-4 py-2 rounded-xl bg-white/5 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">Company Description</label>
                    <textarea
                      value={formData.companyDescription}
                      onChange={(e) => setFormData({ ...formData, companyDescription: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">Industry</label>
                      <input
                        type="text"
                        value={formData.industry}
                        onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                        className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">Location</label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2">Website</label>
                    <input
                      type="url"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      placeholder="https://company.com"
                      className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={handleUpdate}
                      className="flex-1 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold hover:scale-105 transition-transform"
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
                <div className="space-y-3 text-white/80">
                  <p><strong>Company:</strong> {formData.companyName}</p>
                  {formData.designation && <p><strong>Designation:</strong> {formData.designation}</p>}
                  <p><strong>Industry:</strong> {formData.industry || 'Not specified'}</p>
                  <p><strong>Location:</strong> {formData.location || 'Not specified'}</p>
                  {(formData.contactInfo.phone || formData.contactInfo.email || formData.contactInfo.address) && (
                    <div className="mt-3 pt-3 border-t border-white/10">
                      <p className="font-semibold mb-2">Contact Information:</p>
                      {formData.contactInfo.phone && <p><Phone size={14} className="inline mr-2" />{formData.contactInfo.phone}</p>}
                      {formData.contactInfo.email && <p><Mail size={14} className="inline mr-2" />{formData.contactInfo.email}</p>}
                      {formData.contactInfo.address && <p><MapPin size={14} className="inline mr-2" />{formData.contactInfo.address}</p>}
                    </div>
                  )}
                  <p className="mt-4">{formData.companyDescription || 'No description added yet.'}</p>
                </div>
              )}
            </motion.div>

            {/* Hiring Requirements Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20"
            >
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Briefcase size={24} /> Hiring Requirements
              </h3>
              {editing ? (
                <div className="space-y-3">
                  <textarea
                    value={formData.hiringRequirements}
                    onChange={(e) => setFormData({ ...formData, hiringRequirements: e.target.value })}
                    placeholder="Describe your hiring requirements, job roles, qualifications needed..."
                    rows={4}
                    className="w-full px-4 py-2 rounded-xl bg-white/5 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                  />
                </div>
              ) : (
                <p className="text-white/80">{formData.hiringRequirements || 'No hiring requirements specified yet'}</p>
              )}
            </motion.div>

            {/* Looking For Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20"
            >
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Briefcase size={24} /> Looking For (Skills/Roles)
              </h3>
              {editing ? (
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && addLookingFor()}
                      placeholder="Add skill/role you're looking for"
                      className="flex-1 px-4 py-2 rounded-xl bg-white/5 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                      onClick={addLookingFor}
                      className="px-4 py-2 rounded-xl bg-indigo-500 text-white hover:bg-indigo-600 transition-all"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.lookingFor.map((item, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded-full bg-indigo-500/30 text-white flex items-center gap-2"
                      >
                        {item}
                        <button
                          onClick={() => removeLookingFor(index)}
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
                  {formData.lookingFor.length > 0 ? (
                    formData.lookingFor.map((item, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 rounded-full bg-indigo-500/30 text-white"
                      >
                        {item}
                      </span>
                    ))
                  ) : (
                    <p className="text-white/60">No requirements specified yet</p>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterProfile;
