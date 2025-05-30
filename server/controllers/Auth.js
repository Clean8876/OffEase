import EmployeeModel from "../models/UserModel.js";
import {generateToken,cookieToken} from "../uitlis/generatetoken.js";
import bcrypt from 'bcrypt'

import LeaveBalance from '../models/leaveBalance.js';
import LeaveType from '../models/leaveType.js';

// controllers/Auth.js
import { sendEmail } from '../uitlis/emailSender.js'; // correct path and function
// routes/authRoutes.js or controllers/Auth.js (controller example)
import crypto from 'crypto';

export const register = async (req, res) => {
  try {
    const {
      Firstname, Lastname, email, password, confirmPassword,
      dob, phoneNo, department, role, profilePictureUrl
    } = req.body;

    if (!Firstname || !Lastname || !email || !password || !confirmPassword || !dob || !phoneNo || !department || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match." });
    }

    const userExist = await EmployeeModel.findOne({ email });
    if (userExist) {
      return res.status(409).json({ message: 'User already exists with this email' });
    }

    const phoneExists = await EmployeeModel.findOne({ phoneNo });
    if (phoneExists) {
      return res.status(409).json({ message: 'User already exists with this phone number' });
    }

    const newUser = new EmployeeModel({
      firstName: Firstname,
      lastName: Lastname,
      email,
      password,
      dob,
      phoneNo,
      role,
      department,
      profilePictureUrl
    });

    await newUser.save();

    // Leave balance creation
    if (role === 'employee') {
      const [casualType, sickType] = await Promise.all([
        LeaveType.findOne({ name: 'casual' }),
        LeaveType.findOne({ name: 'sick' }),
      ]);

      if (!casualType || !sickType) {
        return res.status(500).json({ message: 'Leave types not set up.' });
      }

      await LeaveBalance.insertMany([
        { employee: newUser._id, leaveType: casualType._id, totalDays: 4, remainingDays: 4 },
        { employee: newUser._id, leaveType: sickType._id, totalDays: 2, remainingDays: 2 },
      ]);
    }

    const emailHtml = `
      <h3>Welcome to the Company, ${Firstname} ${Lastname}!</h3>
      <p>You have been successfully registered.</p>
      <p><strong>Email:</strong> ${email}</p>
      <br/>
      <p>Regards,<br/>Admin Team</p>
    `;

    await sendEmail(email, 'Registration Successful', emailHtml);

    return res.status(201).json({
      message: 'Successfully registered. Confirmation email sent.',
      userId: newUser._id,
    });

  } catch (err) {
    console.error('Error in register:', err.message);
    return res.status(500).json({ message: 'Server error during registration' });
  }
};


 export const AuthUser = async(req,res)=>{
    try{
        const { email, password } = req.body;

        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
        const user = await EmployeeModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Account not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

    const token = generateToken(user.email, user._id,user.role,user.department);


  // Set token in cookie
  cookieToken(res, token);

  // Respond with user details and token
  return res.status(200).json({
      message: 'Authentication successful',
      token,
      user:user
      ,
  });
} catch (err) {
  console.error('Error during authentication', err.message);
  return res.status(500).json({ message: err.message });
}
}

export const getAllUsers = async (req, res) => {
  try {
    const users = await EmployeeModel.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getEmployeeById = async (req, res) => {
    try {
        const employeeId = req.user.id; // Get ID from decoded token payload

        if (!employeeId) {
            return res.status(400).json({
                success: false,
                message: "Employee ID not found in token",
            });
        }

        const employee = await EmployeeModel.findById(employeeId);

        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "Employee not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Employee data fetched successfully",
            data: employee,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: 'Email is required' });

  try {
    const user = await EmployeeModel.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Generate token
    const token = crypto.randomBytes(32).toString('hex');

    // Set token and expiry (1 hour from now)
    user.resetPasswordToken = token;
    console.log(user.resetPasswordToken);
    user.resetPasswordExpires = Date.now() + 3600000;

    await user.save();

    // Create reset URL (frontend should handle this route)
const resetUrl = `${process.env.CLIENT_URL}/reset-password/${token}`;

    const message = `
      <h3>Password Reset Request</h3>
      <p>Hello ${user.Firstname},</p>
      <p>You requested a password reset. Click the link below to reset your password:</p>
      <a href="${resetUrl}">Reset Password</a>
      <p>This link will expire in 1 hour.</p>
      <br/>
      <p>If you did not request this, please ignore this email.</p>
    `;

    await sendEmail(user.email, 'Reset your password', message);

    res.status(200).json({ message: 'Password reset link sent to your email.' });

  } catch (err) {
    console.error('Forgot password error:', err.message);
    res.status(500).json({ message: 'Something went wrong' });
  }
};



export const resetPassword = async (req, res) => {
  const { token, password } = req.body;

  if (!token || !password) {
    return res.status(400).json({ message: 'Token and new password are required' });
  }

  try {
    const user = await EmployeeModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }, // Token must not be expired
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user's password and remove reset fields
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({ message: 'Password has been successfully reset' });

  } catch (err) {
    console.error('Reset password error:', err.message);
    res.status(500).json({ message: 'Server error during password reset' });
  }
};



export const logout = (req, res) => {
    try {
      res.clearCookie('token');
      return res.status(200).json({ message: 'Logout successful' });
    }
    catch (err) {
      return res.status(500).json({ message: err.message });
    }
  };

  export const deleteEmployeeById = async (req, res) => {
  try {
    const employeeId = req.params.id;

    if (!employeeId) {
      return res.status(400).json({
        success: false,
        message: "Employee ID is required in URL",
      });
    }

    const employee = await EmployeeModel.findById(employeeId);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    await EmployeeModel.findByIdAndDelete(employeeId);

    return res.status(200).json({
      success: true,
      message: "Employee deleted successfully",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
