import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Lock,
  User,
  Camera,
  Tag,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Eye,
  EyeOff,
  Sparkles,
  Award,
  Briefcase,
  DollarSign,
  Clock,
  FileText,
} from "lucide-react";

// Configuration - easily customizable
const FORM_CONFIG = {
  steps: [
    { id: 0, title: "Welcome", icon: Sparkles },
    { id: 1, title: "Account", icon: Mail },
    { id: 2, title: "Profile", icon: User },
    { id: 3, title: "Skills", icon: Tag },
    { id: 4, title: "Review", icon: CheckCircle },
  ],
  gradients: {
    primary: "from-indigo-600 via-purple-600 to-pink-600",
    secondary: "from-purple-500 to-pink-500",
    accent: "from-blue-500 to-cyan-500",
  },
  colors: {
    bg: "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900",
    card: "bg-white/10 backdrop-blur-xl",
    input: "bg-white/5 backdrop-blur-sm",
  },
};

export default function MentorSignup() {
  // State Management
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    experience: "",
    bio: "",
    skills: [],
    hourlyRate: "",
    availability: "Flexible",
  });
  const [profilePreview, setProfilePreview] = useState(null);
  const [profileFile, setProfileFile] = useState(null);
  const [skillInput, setSkillInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const fileRef = useRef(null);
  const objectUrlsRef = useRef(new Set());

  // Validation
  const validators = {
    email: (email) => /\S+@\S+\.\S+/.test(email),
    password: (password) => password.length >= 8,
    fullName: (name) => name.trim().length >= 2,
    experience: (exp) => exp !== "" && parseInt(exp) > 0,
    skills: (skills) => skills.length > 0,
    hourlyRate: (rate) => rate !== "" && parseInt(rate) > 0,
  };

  const canProceed = (currentStep) => {
    switch (currentStep) {
      case 0:
        return true;
      case 1:
        return validators.email(formData.email) && validators.password(formData.password);
      case 2:
        return validators.fullName(formData.fullName) && validators.experience(formData.experience);
      case 3:
        return validators.skills(formData.skills) && validators.hourlyRate(formData.hourlyRate);
      default:
    return false;
    }
  };

  // Handlers
  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (canProceed(step)) {
      setStep((s) => Math.min(FORM_CONFIG.steps.length - 1, s + 1));
    }
  };

  const handleBack = () => {
    setStep((s) => Math.max(0, s - 1));
  };

  const handleProfileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Cleanup previous URL
    if (profilePreview && profilePreview.startsWith("blob:")) {
      try {
        URL.revokeObjectURL(profilePreview);
        objectUrlsRef.current.delete(profilePreview);
      } catch {}
    }

    const url = URL.createObjectURL(file);
    objectUrlsRef.current.add(url);
    setProfilePreview(url);
    setProfileFile(file);
  };

  const handleAddSkill = (e) => {
    e?.preventDefault();
    const skill = skillInput.trim();
    if (!skill) return;
    if (formData.skills.includes(skill)) {
      setSkillInput("");
      return;
    }
    updateField("skills", [...formData.skills, skill]);
    setSkillInput("");
  };

  const handleRemoveSkill = (index) => {
    updateField(
      "skills",
      formData.skills.filter((_, i) => i !== index)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step !== 4) {
      setStep(4);
      return;
    }

    setSubmitting(true);
    try {
      const submitData = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "skills") {
          submitData.append(key, JSON.stringify(formData[key]));
        } else {
          submitData.append(key, formData[key]);
        }
      });
      if (profileFile) submitData.append("profile", profileFile);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Success feedback
      alert("🎉 Profile created successfully! Welcome aboard!");
      
      // Reset form
      setStep(0);
      setFormData({
        email: "",
        password: "",
        fullName: "",
        experience: "",
        bio: "",
        skills: [],
        hourlyRate: "",
        availability: "Flexible",
      });
      setProfilePreview(null);
      setProfileFile(null);
      setSkillInput("");
    } catch (error) {
      console.error(error);
      alert("❌ Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Cleanup
  useEffect(() => {
    return () => {
      objectUrlsRef.current.forEach((url) => {
        try {
          URL.revokeObjectURL(url);
        } catch {}
      });
      objectUrlsRef.current.clear();
    };
  }, []);

  // Animations
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  const progress = (step / (FORM_CONFIG.steps.length - 1)) * 100;

  return (
    <div className={`min-h-screen flex items-center justify-center ${FORM_CONFIG.colors.bg} relative overflow-hidden p-3 sm:p-4 md:p-6`}>
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-20 blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 100, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full opacity-20 blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -100, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-72 h-72 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full opacity-10 blur-3xl"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-4xl"
      >
        <div className={`${FORM_CONFIG.colors.card} border border-white/20 rounded-3xl shadow-2xl overflow-hidden`}>
          {/* Header */}
          <div className="p-4 sm:p-6 md:p-8 border-b border-white/10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
                <motion.h1
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-2xl sm:text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent"
                >
                  Become a Mentor
                </motion.h1>
                <p className="mt-2 text-sm sm:text-base text-white/70">
                  Share your expertise and inspire the next generation
                </p>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
                <span className="text-xs text-white/60 whitespace-nowrap">Step {step + 1}/{FORM_CONFIG.steps.length}</span>
                <div className="flex-1 sm:w-48 h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full bg-gradient-to-r ${FORM_CONFIG.gradients.secondary} rounded-full`}
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
            </div>
          </div>

            {/* Step Indicator */}
            <div className="flex items-center justify-center gap-2 sm:gap-4 overflow-x-auto pb-2">
              {FORM_CONFIG.steps.map((stepConfig, index) => {
                const Icon = stepConfig.icon;
                const isActive = step >= stepConfig.id;
                const isCompleted = step > stepConfig.id;

                return (
                  <React.Fragment key={stepConfig.id}>
                    <motion.div
                      className="flex flex-col items-center gap-2 shrink-0"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.div
                        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all ${
                          isActive
                            ? `bg-gradient-to-br ${FORM_CONFIG.gradients.secondary} text-white shadow-lg shadow-purple-500/50`
                            : isCompleted
                            ? "bg-green-500/20 text-green-400 border-2 border-green-500/50"
                            : "bg-white/10 text-white/40 border-2 border-white/20"
                        }`}
                        animate={{
                          scale: isActive ? [1, 1.1, 1] : 1,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <Icon size={20} />
                      </motion.div>
                      <span
                        className={`text-[10px] sm:text-xs font-medium ${
                          isActive ? "text-white" : "text-white/50"
                        }`}
                      >
                        {stepConfig.title}
                      </span>
                    </motion.div>
                    {index < FORM_CONFIG.steps.length - 1 && (
                      <div
                        className={`w-8 sm:w-12 h-0.5 ${
                          isCompleted
                            ? `bg-gradient-to-r ${FORM_CONFIG.gradients.secondary}`
                            : "bg-white/20"
                        } transition-all`}
                      />
                    )}
                  </React.Fragment>
                );
              })}
              </div>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-4 sm:p-6 md:p-8">
            <AnimatePresence mode="wait">
              {/* Step 0: Welcome */}
              {step === 0 && (
                <motion.div
                  key="welcome"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="text-center py-8 sm:py-12"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-2xl"
                  >
                    <Sparkles size={48} className="text-white" />
                  </motion.div>
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
                  >
                    Welcome! 🎉
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-base sm:text-lg text-white/80 mb-8 max-w-2xl mx-auto"
                  >
                    Join our community of expert mentors and help shape the future of learning.
                    Let's create your amazing profile in just a few steps!
                  </motion.p>
                  <motion.button
                    type="button"
                    onClick={handleNext}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-8 sm:px-12 py-4 sm:py-5 rounded-2xl bg-gradient-to-r ${FORM_CONFIG.gradients.secondary} text-white font-bold text-lg shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/70 transition-all`}
                  >
                    Get Started <ArrowRight className="inline ml-2" size={20} />
                  </motion.button>
                </motion.div>
              )}

              {/* Step 1: Account */}
              {step === 1 && (
                <motion.div
                  key="account"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 flex items-center gap-2">
                      <Mail className="text-purple-400" size={28} />
                      Account Information
                    </h2>
                    <p className="text-white/70">Create your account to get started</p>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">
                        Email Address
                    </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" size={20} />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => updateField("email", e.target.value)}
                          placeholder="your.email@example.com"
                          className={`w-full pl-12 pr-4 py-3.5 rounded-xl ${FORM_CONFIG.colors.input} border-2 ${
                            formData.email && !validators.email(formData.email)
                              ? "border-red-500/50"
                              : formData.email && validators.email(formData.email)
                              ? "border-green-500/50"
                              : "border-white/20"
                          } text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}
                        />
                        {formData.email && validators.email(formData.email) && (
                          <CheckCircle className="absolute right-4 top-1/2 -translate-y-1/2 text-green-400" size={20} />
                        )}
                      </div>
                      {formData.email && !validators.email(formData.email) && (
                        <p className="mt-2 text-sm text-red-400">Please enter a valid email address</p>
                      )}
                  </div>

                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">
                        Password
                    </label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" size={20} />
                        <input
                          type={showPassword ? "text" : "password"}
                          value={formData.password}
                          onChange={(e) => updateField("password", e.target.value)}
                          placeholder="Create a strong password"
                          className={`w-full pl-12 pr-12 py-3.5 rounded-xl ${FORM_CONFIG.colors.input} border-2 ${
                            formData.password && !validators.password(formData.password)
                              ? "border-red-500/50"
                              : formData.password && validators.password(formData.password)
                              ? "border-green-500/50"
                              : "border-white/20"
                          } text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                        >
                          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                      {formData.password && !validators.password(formData.password) && (
                        <p className="mt-2 text-sm text-red-400">Password must be at least 8 characters</p>
                      )}
                      {formData.password && validators.password(formData.password) && (
                        <p className="mt-2 text-sm text-green-400">✓ Strong password</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Profile */}
              {step === 2 && (
                <motion.div
                  key="profile"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 flex items-center gap-2">
                      <User className="text-purple-400" size={28} />
                      Personal Information
                    </h2>
                    <p className="text-white/70">Tell us about yourself</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                      <label className="block text-sm font-medium text-white/90 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => updateField("fullName", e.target.value)}
                        placeholder="John Doe"
                        className={`w-full px-4 py-3.5 rounded-xl ${FORM_CONFIG.colors.input} border-2 ${
                          formData.fullName && !validators.fullName(formData.fullName)
                            ? "border-red-500/50"
                            : formData.fullName && validators.fullName(formData.fullName)
                            ? "border-green-500/50"
                            : "border-white/20"
                        } text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}
                      />
                  </div>

                  <div>
                      <label className="block text-sm font-medium text-white/90 mb-2 flex items-center gap-2">
                        <Briefcase size={16} />
                        Experience (Years)
                      </label>
                      <input
                        type="number"
                        value={formData.experience}
                        onChange={(e) => updateField("experience", e.target.value)}
                        placeholder="5"
                        min="1"
                        className={`w-full px-4 py-3.5 rounded-xl ${FORM_CONFIG.colors.input} border-2 ${
                          formData.experience && !validators.experience(formData.experience)
                            ? "border-red-500/50"
                            : formData.experience && validators.experience(formData.experience)
                            ? "border-green-500/50"
                            : "border-white/20"
                        } text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-2 flex items-center gap-2">
                      <FileText size={16} />
                      Bio
                    </label>
                    <textarea
                      value={formData.bio}
                      onChange={(e) => updateField("bio", e.target.value)}
                      placeholder="Tell us about your expertise, background, and what makes you a great mentor..."
                      rows={4}
                      className={`w-full px-4 py-3.5 rounded-xl ${FORM_CONFIG.colors.input} border-2 border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all resize-none`}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-3">
                      Profile Picture
                    </label>
                    <div className="flex items-center gap-4">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => fileRef.current?.click()}
                        className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-2 border-dashed border-white/30 flex items-center justify-center cursor-pointer hover:border-purple-400 transition-all group"
                      >
                        {profilePreview ? (
                          <img
                            src={profilePreview}
                            alt="Profile"
                            className="w-full h-full rounded-2xl object-cover"
                          />
                        ) : (
                          <div className="text-center">
                            <Camera className="mx-auto text-white/50 group-hover:text-white transition-colors" size={32} />
                            <p className="text-xs text-white/50 mt-2">Upload</p>
                          </div>
                        )}
                      </motion.div>
                      <div className="flex-1">
                        <p className="text-sm text-white/80 mb-1">Click to upload your profile picture</p>
                        <p className="text-xs text-white/50">JPG, PNG up to 5MB</p>
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        ref={fileRef}
                        onChange={handleProfileUpload}
                        className="hidden"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Skills */}
              {step === 3 && (
                <motion.div
                  key="skills"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 flex items-center gap-2">
                      <Tag className="text-purple-400" size={28} />
                      Skills & Pricing
                    </h2>
                    <p className="text-white/70">What can you teach?</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-3">
                      Your Skills
                    </label>
                    <div className="flex flex-wrap gap-2 mb-4 min-h-[3rem]">
                      <AnimatePresence>
                        {formData.skills.map((skill, index) => (
                          <motion.span
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/30 to-pink-500/30 border border-purple-400/50 text-white flex items-center gap-2 text-sm"
                          >
                            {skill}
                            <button
                              type="button"
                              onClick={() => handleRemoveSkill(index)}
                              className="hover:text-red-400 transition-colors"
                            >
                              ×
                            </button>
                          </motion.span>
                        ))}
                      </AnimatePresence>
                    </div>
                    <form onSubmit={handleAddSkill} className="flex gap-2">
                      <input
                        type="text"
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleAddSkill(e)}
                        placeholder="Add a skill (e.g., JavaScript, React, Python)"
                        className="flex-1 px-4 py-3 rounded-xl bg-white/5 border-2 border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                      />
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-6 py-3 rounded-xl bg-gradient-to-r ${FORM_CONFIG.gradients.secondary} text-white font-medium`}
                      >
                        Add
                      </motion.button>
                    </form>
                    </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2 flex items-center gap-2">
                        <DollarSign size={16} />
                        Hourly Rate ($)
                      </label>
                      <input
                        type="number"
                        value={formData.hourlyRate}
                        onChange={(e) => updateField("hourlyRate", e.target.value)}
                        placeholder="50"
                        min="1"
                        className={`w-full px-4 py-3.5 rounded-xl ${FORM_CONFIG.colors.input} border-2 ${
                          formData.hourlyRate && !validators.hourlyRate(formData.hourlyRate)
                            ? "border-red-500/50"
                            : formData.hourlyRate && validators.hourlyRate(formData.hourlyRate)
                            ? "border-green-500/50"
                            : "border-white/20"
                        } text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}
                      />
                  </div>

                    <div>
                      <label className="block text-sm font-medium text-white/90 mb-2 flex items-center gap-2">
                        <Clock size={16} />
                        Availability
                      </label>
                      <select
                        value={formData.availability}
                        onChange={(e) => updateField("availability", e.target.value)}
                        className={`w-full px-4 py-3.5 rounded-xl ${FORM_CONFIG.colors.input} border-2 border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}
                      >
                        <option value="Flexible">Flexible</option>
                        <option value="Weekdays">Weekdays</option>
                        <option value="Weekends">Weekends</option>
                        <option value="Evenings">Evenings</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Review */}
              {step === 4 && (
                <motion.div
                  key="review"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-6"
                >
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 flex items-center gap-2">
                      <CheckCircle className="text-green-400" size={28} />
                      Review Your Profile
                    </h2>
                    <p className="text-white/70">Please review all information before submitting</p>
                  </div>

                  <div className="bg-white/5 rounded-2xl p-6 space-y-4 border border-white/10">
                    {profilePreview && (
                      <div className="flex justify-center mb-4">
                        <img
                          src={profilePreview}
                          alt="Profile"
                          className="w-32 h-32 rounded-full object-cover border-4 border-purple-500/50"
                        />
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-white/60 mb-1">Email</p>
                        <p className="text-white font-medium">{formData.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-white/60 mb-1">Full Name</p>
                        <p className="text-white font-medium">{formData.fullName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-white/60 mb-1">Experience</p>
                        <p className="text-white font-medium">{formData.experience} years</p>
                      </div>
                      <div>
                        <p className="text-sm text-white/60 mb-1">Hourly Rate</p>
                        <p className="text-white font-medium">${formData.hourlyRate}/hr</p>
                      </div>
                      <div>
                        <p className="text-sm text-white/60 mb-1">Availability</p>
                        <p className="text-white font-medium">{formData.availability}</p>
                      </div>
                      <div>
                        <p className="text-sm text-white/60 mb-1">Skills</p>
                        <div className="flex flex-wrap gap-2">
                          {formData.skills.map((skill, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 rounded-full bg-purple-500/30 text-white text-sm"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {formData.bio && (
                      <div>
                        <p className="text-sm text-white/60 mb-1">Bio</p>
                        <p className="text-white/80">{formData.bio}</p>
                      </div>
                    )}
                  </div>

                  <motion.button
                    type="submit"
                    disabled={submitting}
                    whileHover={!submitting ? { scale: 1.02 } : {}}
                    whileTap={!submitting ? { scale: 0.98 } : {}}
                    className={`w-full py-4 rounded-2xl bg-gradient-to-r ${FORM_CONFIG.gradients.secondary} text-white font-bold text-lg shadow-2xl shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
                  >
                    {submitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Profile <CheckCircle size={20} />
                      </>
                    )}
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation */}
              {step > 0 && step < 4 && (
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-white/10">
                <motion.button
                  type="button"
                  onClick={handleBack}
                  whileHover={{ scale: 1.05, x: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all flex items-center gap-2"
                >
                  <ArrowLeft size={18} />
                  Back
                </motion.button>
                <motion.button
                  type="button"
                  onClick={handleNext}
                  disabled={!canProceed(step)}
                  whileHover={canProceed(step) ? { scale: 1.05, x: 5 } : {}}
                  whileTap={canProceed(step) ? { scale: 0.95 } : {}}
                  className={`px-8 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                    canProceed(step)
                      ? `bg-gradient-to-r ${FORM_CONFIG.gradients.secondary} text-white shadow-lg shadow-purple-500/50`
                      : "bg-white/10 text-white/50 cursor-not-allowed"
                  }`}
                >
                  Next
                  <ArrowRight size={18} />
                </motion.button>
              </div>
            )}
          </form>
        </div>
      </motion.div>
    </div>
  );
}