import mongoose from "mongoose";
import bcrypt from 'bcrypt'

import { v4 as uuidv4 } from "uuid";


const employeeSchema = new mongoose.Schema({
    employmentId: { type: String, unique: true, required: true ,default: uuidv4},
    Firstname: { type: String, required: true },
    Lastname: { type: String, required: true },
    dob: { type: Date, required: true },
    phoneno: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    

    department: {
        type: String,
        enum: ['developer', 'marketing', 'hr', 'finance', 'sales'],
        required: true
    },

    role: {
        type: String,
        enum: ['admin', 'employee'],
        default: 'employee'
    },

    profilePictureUrl: { type: String }, // NEW: URL to cloud storage or local path

 
    token: {
        type: String,
    },
     resetPasswordExpires: {
        type: Date,
    },

    createdAt: { type: Date, default: Date.now }
})

employeeSchema.pre ('save',async function (next){

    if(!this.isModified('password')){
       return next()
    }
    const salt = await bcrypt.genSalt(10) 
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

 const EmployeeModel =  mongoose.model("Employee",employeeSchema)
 export default EmployeeModel; 