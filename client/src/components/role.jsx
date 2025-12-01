import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, GraduationCap, Building2, Sparkles } from "lucide-react";
import studentIcon from "../assets/icon2.png";
import mentorIcon from "../assets/mentor.png";

const Role = () => {
  const navigate = useNavigate();

  const roles = [
    {
      id: "student",
      title: "Student",
      description: "Find guidance, mentorship, and connect with recruiters",
      icon: <GraduationCap className="w-12 h-12" />,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      hoverColor: "hover:bg-blue-100",
      onClick: () => navigate("/Signup"),
    },
    {
      id: "mentor",
      title: "Mentor",
      description: "Share your knowledge and guide students",
      icon: <Sparkles className="w-12 h-12" />,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      hoverColor: "hover:bg-purple-100",
      onClick: () => navigate("/MentorSignup"),
    },
    {
      id: "recruiter",
      title: "Recruiter",
      description: "Find talented students and build your team",
      icon: <Building2 className="w-12 h-12" />,
      color: "from-indigo-500 to-purple-500",
      bgColor: "bg-indigo-50",
      hoverColor: "hover:bg-indigo-100",
      onClick: () => navigate("/recruiter-signup"),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-purple-50 p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-transparent bg-clip-text mb-4">
            Choose Your Role
          </h1>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
            Select your role to get started on your journey with TechLearn Hub
          </p>
        </motion.div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {roles.map((role, index) => (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={role.onClick}
              className={`cursor-pointer ${role.bgColor} ${role.hoverColor} transition-all duration-300 rounded-3xl shadow-lg hover:shadow-2xl p-8 flex flex-col items-center text-center border-2 border-transparent hover:border-purple-200`}
            >
              <motion.div
                className={`w-20 h-20 rounded-full bg-gradient-to-br ${role.color} flex items-center justify-center text-white mb-4 shadow-lg`}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                {role.icon}
              </motion.div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{role.title}</h2>
              <p className="text-gray-600 text-sm sm:text-base">{role.description}</p>
              <motion.div
                className={`mt-4 px-6 py-2 rounded-full bg-gradient-to-r ${role.color} text-white text-sm font-semibold`}
                whileHover={{ scale: 1.1 }}
              >
                Get Started →
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <button
            onClick={() => navigate("/")}
            className="text-gray-600 hover:text-gray-900 text-sm transition-colors"
          >
            ← Back to Home
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Role;
