import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  GraduationCap,
  School,
  Loader2,
  Building2,
  Github,
  Chrome,
  ShieldCheck,
} from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const years = ['1st Year', '2nd Year', '3rd Year', '4th Year'];

const initialState = {
  fullName: '',
  collegeName: '',
  email: '',
  password: '',
  confirmPassword: '',
  course: '',
  year: '',
  terms: false,
};

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const emailPattern = useMemo(() => /^(?!.*\s)[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.(edu|ac\.in)$/i, []);

  const floatingVariant = {
    animate: {
      y: [0, -18, 0],
      rotate: [0, 2, -2, 0],
      transition: { duration: 12, repeat: Infinity, ease: 'easeInOut' },
    },
  };

  const formVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut', staggerChildren: 0.07 },
    },
  };

  const fieldVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.collegeName.trim()) newErrors.collegeName = 'Please enter your college name';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!emailPattern.test(formData.email.trim())) newErrors.email = 'Use a valid .edu or .ac.in email';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Confirm your password';
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords don't match";
    if (!formData.course.trim()) newErrors.course = 'Course / Department is required';
    if (!formData.year) newErrors.year = 'Select your year of study';
    if (!formData.terms) newErrors.terms = 'You must accept the Terms & Conditions';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field) => (e) => {
    const value = field === 'terms' ? e.target.checked : e.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
    setSuccessMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    setSuccessMessage('');
    setErrors({});

    try {
      const response = await axios.post(`${API_URL}/students/register`, {
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName,
        education: {
          institution: formData.collegeName,
          degree: formData.course,
          graduationYear: formData.year
        }
      });

      // Store token and user data
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('role', 'student');

      setSuccessMessage('Account created successfully! Redirecting...');
      
      // Navigate to student profile after a short delay
      setTimeout(() => {
        navigate('/#/student-profile');
      }, 1500);
    } catch (error) {
      console.error('Registration error:', error);
      const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
      setErrors({ submit: errorMessage });
      setSuccessMessage('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          variants={floatingVariant}
          animate="animate"
          className="absolute -top-32 -left-32 h-72 w-72 rounded-full bg-indigo-500/40 blur-3xl"
        />
        <motion.div
          variants={floatingVariant}
          animate="animate"
          className="absolute bottom-12 left-1/3 h-48 w-48 rounded-full bg-blue-500/25 blur-3xl"
        />
        <motion.div
          variants={floatingVariant}
          animate="animate"
          className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-purple-500/30 blur-3xl"
        />
      </div>

      <div className="relative flex min-h-screen flex-col lg:flex-row">
        {/* Banner */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="hidden lg:flex lg:w-1/2 flex-col justify-between bg-gradient-to-br from-slate-900/70 via-slate-900 to-slate-950 px-12 py-10"
        >
          <div>
            <div className="inline-flex items-center gap-3 text-indigo-200">
              <div className="h-12 w-12 rounded-xl bg-indigo-500/40 backdrop-blur grid place-items-center text-xl font-bold">TH</div>
              <div>
                <p className="text-sm uppercase tracking-wide text-indigo-300">TechLearn Hub</p>
                <p className="text-xs text-indigo-200/70">Empowering collegiate innovators</p>
              </div>
            </div>

            <div className="mt-20 space-y-6">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
                className="text-4xl font-bold leading-tight text-white"
              >
                Create, collaborate, and accelerate your learning journey.
              </motion.h1>
              <p className="text-lg text-slate-300 max-w-md">
                Join live cohorts, explore curated materials, and grow with mentors who care about your success.
              </p>
            </div>
          </div>

          <div className="space-y-3 text-sm text-slate-400">
            <p className="text-slate-300">✨ Trusted by 1,000+ students across 20+ campuses.</p>
            <p>“TechLearn Hub has transformed how we learn. The community is incredibly supportive.”</p>
            <p className="text-slate-200">— College Innovators Society</p>
          </div>
        </motion.div>

        {/* Form */}
        <div className="flex flex-1 items-center justify-center px-4 py-10 sm:px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="w-full max-w-lg rounded-3xl border border-white/10 bg-slate-900/70 backdrop-blur-lg p-6 sm:p-8 shadow-2xl"
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-indigo-300">TechLearn Hub</p>
                <h2 className="mt-1 text-3xl font-bold text-white">Create Your Student Account</h2>
              </div>
              <span className="hidden sm:inline-flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/30 text-xl font-semibold text-indigo-200">
                📚
              </span>
            </div>

            <AnimatePresence mode="wait">
              {successMessage && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-6 flex items-center gap-3 rounded-2xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-200"
                >
                  <ShieldCheck className="h-4 w-4" />
                  <span>{successMessage}</span>
                </motion.div>
              )}
              {errors.submit && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-6 flex items-center gap-3 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200"
                >
                  <span>{errors.submit}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.form onSubmit={handleSubmit} className="space-y-4" variants={formVariants} initial="hidden" animate="visible">
              <Field
                label="Full Name"
                icon={User}
                value={formData.fullName}
                onChange={handleChange('fullName')}
                placeholder="Your full name"
                error={errors.fullName}
              />

              <Field
                label="College Name"
                icon={Building2}
                value={formData.collegeName}
                onChange={handleChange('collegeName')}
                placeholder="e.g., National Institute of Technology"
                error={errors.collegeName}
              />

              <Field
                label="Student Email"
                icon={Mail}
                value={formData.email}
                onChange={handleChange('email')}
                placeholder="you@college.edu"
                error={errors.email}
                type="email"
              />

              <PasswordField
                label="Password"
                value={formData.password}
                onChange={handleChange('password')}
                error={errors.password}
                show={showPassword}
                onToggle={() => setShowPassword((prev) => !prev)}
              />

              <PasswordField
                label="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange('confirmPassword')}
                error={errors.confirmPassword}
                show={showConfirmPassword}
                onToggle={() => setShowConfirmPassword((prev) => !prev)}
              />

              <Field
                label="Course / Department"
                icon={School}
                value={formData.course}
                onChange={handleChange('course')}
                placeholder="e.g., Computer Science"
                error={errors.course}
              />

              <motion.div variants={fieldVariants}>
                <label className="mb-2 block text-sm font-medium text-slate-200">Year of Study</label>
                <div className="relative">
                  <select
                    value={formData.year}
                    onChange={handleChange('year')}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/20"
                  >
                    <option value="" className="text-slate-700">Select your year</option>
                    {years.map((year) => (
                      <option key={year} value={year} className="text-slate-900">
                        {year}
                      </option>
                    ))}
                  </select>
                  <GraduationCap className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-indigo-300" />
                </div>
                {errors.year && <p className="mt-1 text-xs text-rose-400">{errors.year}</p>}
              </motion.div>

              <motion.div variants={fieldVariants} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <input
                  id="terms"
                  type="checkbox"
                  checked={formData.terms}
                  onChange={handleChange('terms')}
                  className="mt-1 h-4 w-4 rounded border-white/30 bg-transparent text-indigo-500 focus:ring-indigo-400"
                />
                <label htmlFor="terms" className="text-sm text-slate-300">
                  I agree to the <a href="#" className="text-indigo-300 underline">Terms &amp; Conditions</a> and acknowledge the privacy policy.
                </label>
              </motion.div>
              {errors.terms && <p className="-mt-2 text-xs text-rose-400">{errors.terms}</p>}

              <motion.button
                variants={fieldVariants}
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 py-3 text-sm font-semibold text-white shadow-lg transition hover:from-indigo-500 hover:to-purple-500 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Creating your account...
                  </>
                ) : (
                  'Create account'
                )}
              </motion.button>

              <motion.div variants={fieldVariants} className="flex items-center gap-3 text-xs text-slate-400">
                <span className="h-px flex-1 bg-white/10" />
                or continue with
                <span className="h-px flex-1 bg-white/10" />
              </motion.div>

              <motion.div variants={fieldVariants} className="grid grid-cols-2 gap-3 text-sm">
                <button type="button" className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 py-2 text-indigo-200 hover:bg-white/10">
                  <Chrome className="h-4 w-4" /> Google
                </button>
                <button type="button" className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 py-2 text-indigo-200 hover:bg-white/10">
                  <Github className="h-4 w-4" /> GitHub
                </button>
              </motion.div>

              <motion.p variants={fieldVariants} className="text-xs text-slate-400">
                We value your privacy — your data is secure with TechLearn Hub.
              </motion.p>

              <motion.p variants={fieldVariants} className="text-center text-sm text-slate-300">
                Already have an account?{' '}
                <a href="/login" className="text-indigo-300 underline">Login</a>
              </motion.p>
            </motion.form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const Field = ({ label, icon: Icon, value, onChange, placeholder, error, type = 'text' }) => (
  <motion.div variants={fieldVariantsInternal}>
    <label className="mb-2 block text-sm font-medium text-slate-200">{label}</label>
    <div className="relative">
      <Icon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-indigo-300" />
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-white/10 bg-white/5 pl-12 pr-4 py-3 text-sm text-white placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/20"
      />
    </div>
    {error && <p className="mt-1 text-xs text-rose-400">{error}</p>}
  </motion.div>
);

const fieldVariantsInternal = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

const PasswordField = ({ label, value, onChange, error, show, onToggle }) => (
  <motion.div variants={fieldVariantsInternal}>
    <label className="mb-2 block text-sm font-medium text-slate-200">{label}</label>
    <div className="relative">
      <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-indigo-300" />
      <input
        type={show ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        placeholder="••••••••"
        className="w-full rounded-2xl border border-white/10 bg-white/5 pl-12 pr-12 py-3 text-sm text-white placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/20"
      />
      <button type="button" onClick={onToggle} className="absolute right-4 top-1/2 -translate-y-1/2 text-indigo-200">
        {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
    {error && <p className="mt-1 text-xs text-rose-400">{error}</p>}
  </motion.div>
);

export default Signup;
