import EmployeeModel from "../models/UserModel.js";
import { generateTokken,cookieToken } from "../uitlis/generatetoken.js";
import bcrypt from 'bcrypt'

import LeaveBalance from '../models/leaveBalance.js';
import LeaveType from '../models/leaveType.js';




export const register = async (req, res) =>{
    try {
        const {Firstname,
            Lastname,
            email,
            password,
            confirmPassword,
            dob,
            department,
            role,
            profilePictureUrl
            } = req.body;
        if (
			!Firstname ||
			!Lastname ||
			!email ||
			!password ||
			!confirmPassword ||
			!dob ||
            !department ||
            !role 
            
		) {
			return res.status(403).json({
				message: "All Fields are required",
			});
		}
        if(password !== confirmPassword){
            return res.status(400).json({
                message:"password are not matched please try  again"
            })

        }

        const userExist = await EmployeeModel.findOne({email});
        if(userExist){
            return  res.status(400).json({message:'user exsist'})
        }
        const newUser =  new EmployeeModel({Firstname,
        Lastname,
        email,  
        password,
        role:role,
        dob,
        department:department,    
        profilePictureUrl,
        
        })
        await newUser.save()

        //my code
        await newUser.save();

// Assign default leave balances if the role is 'employee'
if (newUser.role === 'employee') {
    const casualType = await LeaveType.findOne({ name: 'casual' });
    const sickType = await LeaveType.findOne({ name: 'sick' });

    if (!casualType || !sickType) {
        return res.status(500).json({ message: 'Leave types not properly set up in the system.' });
    }

    await LeaveBalance.insertMany([
        {
            employee: newUser._id,
            leaveType: casualType._id,
            totalDays: 4,
            remainingDays: 4,
        },
        {
            employee: newUser._id,
            leaveType: sickType._id,
            totalDays: 2,
            remainingDays: 2,
        }
    ]);
}
//ended
        return res.status(201).json({message:'succesfully Regesterd',newUser

        });
   
	



    }
    catch(err){
        console.error('error in register',err.message);
        return res.status(500).json({message:err.message})
    }
}

 export const AuthUser = async(req,res)=>{
    try{
        const { email, password } = req.body;

        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
        const user = await EmployeeModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
  // Generate token
    const token = generateTokken(user.email, user._id,user.role,user.department);

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
