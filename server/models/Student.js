import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const studentSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  profilePicture: {
    type: String,
    default: ''
  },
  bio: {
    type: String,
    default: ''
  },
  skills: [{
    type: String,
    trim: true
  }],
  education: {
    degree: String,
    institution: String,
    graduationYear: String,
    branch: String,
    year: String
  },
  experience: {
    type: String,
    default: ''
  },
  preferredJobRole: {
    type: String,
    default: ''
  },
  expectedSalary: {
    type: String,
    default: ''
  },
  github: {
    type: String,
    default: ''
  },
  linkedIn: {
    type: String,
    default: ''
  },
  resume: {
    type: String,
    default: ''
  },
  portfolio: {
    type: String,
    default: ''
  },
  location: {
    type: String,
    default: ''
  },
  availability: {
    type: String,
    enum: ['Available', 'Busy', 'Not Available'],
    default: 'Available'
  },
  connections: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recruiter'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
studentSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password method
studentSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Remove password from JSON output
studentSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export default mongoose.model('Student', studentSchema);
