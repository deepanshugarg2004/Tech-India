import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const StudentLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const togglePassword = () => setShowPassword(!showPassword);

  const handleSignUpTab = () => {
    navigate('/#/Signup');
  };

  const isLoginDisabled = email.trim() === '' || password.trim() === '' || loading;

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/students/login`, {
        email,
        password,
      });
      
      // Store token and user data
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('role', 'student');
      
      // Navigate to student profile
      navigate('/#/student-profile');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 px-4 py-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-6 sm:p-8"
      >

        {/* Tabs */}
        <div className="flex justify-center mb-6 bg-white/10 rounded-full p-1">
          <button
            className="flex-1 text-center py-2 rounded-full font-medium transition-colors duration-300
                       bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-sm"
          >
            Login
          </button>
          <button
            onClick={handleSignUpTab}
            className="flex-1 text-center py-2 rounded-full font-medium transition-colors duration-300
                       text-white/70 hover:text-white hover:bg-white/10"
          >
            Sign Up
          </button>
        </div>

        <h2 className="text-2xl sm:text-3xl font-semibold text-center mb-6 text-white">Student Login</h2>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/20 border border-red-500/50 text-red-200 text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form className="space-y-4" onSubmit={handleLogin}>
          {/* Email */}
          <div>
            <label className="block text-white/90 font-medium mb-2">Student Email</label>
            <input
              type="email"
              placeholder="Enter your student email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border-2 border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-white/90 font-medium mb-2">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border-2 border-white/20 rounded-xl px-4 py-3 pr-12 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            <button
              type="button"
              onClick={togglePassword}
              className="absolute right-3 top-[38px] transform -translate-y-1/2 text-white/50 hover:text-white transition-colors"
            >
              {showPassword ? <AiOutlineEye size={22} /> : <AiOutlineEyeInvisible size={22} />}
            </button>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between text-sm sm:text-base text-white/70">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded" />
              <span>Remember me</span>
            </label>
            <a href="#" className="text-blue-400 hover:text-blue-300 hover:underline">Forgot password?</a>
          </div>

          {/* Login Button */}
          <motion.button
            type="submit"
            disabled={isLoginDisabled}
            whileHover={!isLoginDisabled ? { scale: 1.02 } : {}}
            whileTap={!isLoginDisabled ? { scale: 0.98 } : {}}
            className={`w-full py-3 mt-4 text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2
              ${isLoginDisabled
                ? 'bg-white/10 cursor-not-allowed opacity-50'
                : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:shadow-lg shadow-blue-500/50'}`}
          >
            {loading ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
                Signing in...
              </>
            ) : (
              'Login'
            )}
          </motion.button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-4">
          <hr className="flex-1 border-white/20" />
          <span className="px-2 text-white/60 text-sm">Or continue with</span>
          <hr className="flex-1 border-white/20" />
        </div>

        {/* Google Login */}
        <button className="w-full py-3 border-2 border-white/20 text-white rounded-xl flex items-center justify-center space-x-2 hover:bg-white/10 transition-all">
          <svg className="w-5 h-5" viewBox="0 0 533.5 544.3">
            <path fill="#4285F4" d="M533.5 278.4c0-18.3-1.5-36-4.4-53.2H272v100.8h146.9c-6.3 34-25 62.9-53.2 82.2v68h85.8c50.2-46.3 79-114.6 79-197.8z"/>
            <path fill="#34A853" d="M272 544.3c71.8 0 132.1-23.6 176.1-64.2l-85.8-68c-23.8 16-54.2 25.5-90.3 25.5-69.3 0-128-46.7-149.1-109.6h-88.5v68.7c44 87 133 148.6 237.6 148.6z"/>
            <path fill="#FBBC05" d="M122.6 337.7c-10.1-30.3-10.1-62.8 0-93.1v-68.7h-88.5c-38.5 75-38.5 163.4 0 238.4l88.5-68.7z"/>
            <path fill="#EA4335" d="M272 107.2c37 0 70.1 12.7 96.3 33.8l72.2-72.2C404.1 24 343.8 0 272 0 167.4 0 78.4 61.6 34.4 148.6l88.5 68.7C144 153.9 202.7 107.2 272 107.2z"/>
          </svg>
          <span>Continue with Google</span>
        </button>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-white/70 text-sm">
            Don't have an account?{' '}
            <button
              onClick={handleSignUpTab}
              className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
            >
              Sign Up
            </button>
          </p>
          <button
            onClick={() => navigate('/#/role')}
            className="mt-4 text-white/60 hover:text-white text-sm transition-colors"
          >
            ← Back to Role Selection
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default StudentLogin;
