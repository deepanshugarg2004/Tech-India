import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom'; // for navigation
import axios from 'axios';

const AuthPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate(); // navigation hook

  const togglePassword = () => setShowPassword(!showPassword);

  // Redirect to role page on Sign Up
  const handleSignUpTab = () => {
    navigate('/role');
  };

  // Check if Login button should be disabled
  const isLoginDisabled = isSubmitting || email.trim() === '' || password.trim() === '';

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await axios.post("http://localhost:5000/api/mentor/login", {
        email,
        password,
      });
      console.log(response.data);
      // navigate('/mentor-dashboard'); // enable when backend login is ready
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-[#F8F7FF] to-white px-4 py-10 overflow-hidden">
      {/* ambient gradient blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-gradient-to-tr from-indigo-400 to-purple-400 opacity-30 blur-3xl animate-blob" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-gradient-to-tr from-pink-300 to-rose-300 opacity-25 blur-3xl animate-blob animation-delay-2000" />
      </div>

      <div className="w-full max-w-md bg-white/70 backdrop-blur-md border border-purple-100 rounded-3xl shadow-2xl p-6 sm:p-8">

        {/* Tabs */}
        <div className="flex justify-center mb-6 bg-gray-100 rounded-full p-1">
          <button
            className="flex-1 text-center py-2 rounded-full font-medium transition-colors duration-300
                       bg-indigo-500 text-white shadow-sm"
          >
            Login
          </button>
          <button
            onClick={handleSignUpTab} // redirect on click
            className="flex-1 text-center py-2 rounded-full font-medium transition-colors duration-300
                       text-gray-600 hover:bg-gray-200"
          >
            Sign Up
          </button>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-1">Welcome back</h2>
        <p className="text-center text-gray-500 mb-6">Sign in to continue your journey</p>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleLogin}>
          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
            />
            <button
              type="button"
              onClick={togglePassword}
              className="absolute right-3 top-[50px] transform -translate-y-1/2 flex items-center justify-center w-10 h-10 text-gray-500 hover:text-indigo-500 transition bg-gray-100 rounded-full shadow-sm"
            >
              {showPassword ? <AiOutlineEye size={22} /> : <AiOutlineEyeInvisible size={22} />}
            </button>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between text-sm sm:text-base">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="w-4 h-4" />
              <span>Remember me</span>
            </label>
            <a href="#" className="text-indigo-500 hover:underline">Forgot password?</a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoginDisabled}
            className={`group relative w-full py-3 mt-2 text-white rounded-xl font-semibold transition disabled:opacity-60 disabled:cursor-not-allowed overflow-hidden ${
              isLoginDisabled
                ? 'bg-indigo-400'
                : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'
            }`}
          >
            <span className="relative z-10">{isSubmitting ? 'Signing in…' : 'Sign in'}</span>
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-[radial-gradient(120px_120px_at_var(--x,50%)_var(--y,50%),rgba(255,255,255,0.25),transparent_60%)]" />
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-4">
          <hr className="flex-1 border-gray-300" />
          <span className="px-2 text-gray-400 text-sm">Or continue with</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        {/* Google Login */}
        <button className="w-full py-2 border border-indigo-400 text-indigo-600 rounded-lg flex items-center justify-center space-x-2 hover:bg-indigo-50 transition">
          <svg className="w-5 h-5" viewBox="0 0 533.5 544.3">
            <path fill="#4285F4" d="M533.5 278.4c0-18.3-1.5-36-4.4-53.2H272v100.8h146.9c-6.3 34-25 62.9-53.2 82.2v68h85.8c50.2-46.3 79-114.6 79-197.8z"/>
            <path fill="#34A853" d="M272 544.3c71.8 0 132.1-23.6 176.1-64.2l-85.8-68c-23.8 16-54.2 25.5-90.3 25.5-69.3 0-128-46.7-149.1-109.6h-88.5v68.7c44 87 133 148.6 237.6 148.6z"/>
            <path fill="#FBBC05" d="M122.6 337.7c-10.1-30.3-10.1-62.8 0-93.1v-68.7h-88.5c-38.5 75-38.5 163.4 0 238.4l88.5-68.7z"/>
            <path fill="#EA4335" d="M272 107.2c37 0 70.1 12.7 96.3 33.8l72.2-72.2C404.1 24 343.8 0 272 0 167.4 0 78.4 61.6 34.4 148.6l88.5 68.7C144 153.9 202.7 107.2 272 107.2z"/>
          </svg>
          <span>Continue with Google</span>
        </button>
      </div>

      <style>{`
        @keyframes blob { 0% { transform: translateY(0px) } 50% { transform: translateY(16px) } 100% { transform: translateY(0px) } }
        .animate-blob { animation: blob 7s ease-in-out infinite }
        .animation-delay-2000 { animation-delay: 2s }
      `}</style>
    </div>
  );
};

export default AuthPage;
