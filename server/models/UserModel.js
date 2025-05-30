import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { encrypt, decrypt } from '../uitlis/encryption.js';
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\d{10}$/;

const employeeSchema = new mongoose.Schema({
  employmentId: {
    type: String,
    unique: true,
    required: true,
    default: uuidv4,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
  },
  dob: {
    type: String, // Encrypted string
    required: true,
  },
  phoneNo: {
    type: String,
    required: true,
    unique: true,
    match: [phoneRegex, 'Phone number must be 10 digits'],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [emailRegex, 'Invalid email format'],
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  department: {
    type: String,
    enum: ['developer', 'marketing', 'hr', 'finance', 'sales'],
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'employee'],
    default: 'employee',
  },
  profilePictureUrl: {
    type: String,
  },
  token: {
    type: String,
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpires: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

employeeSchema.pre('save', async function (next) {
  // Hash password
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }

  // Encrypt DOB and phone number
  if (this.isModified('dob')) {
    this.dob = encrypt(this.dob);
  }

  if (this.isModified('phoneNo')) {
    this.phoneNo = encrypt(this.phoneNo);
  }

  next();
});

// Optional: Add methods to decrypt sensitive fields when needed
employeeSchema.methods.getDecryptedDob = function () {
  return decrypt(this.dob);
};

employeeSchema.methods.getDecryptedPhoneNo = function () {
  return decrypt(this.phoneNo);
};

const EmployeeModel = mongoose.model('Employee', employeeSchema);
export default EmployeeModel;
