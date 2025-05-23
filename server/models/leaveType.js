import mongoose from "mongoose";

const leaveTypeSchema = new mongoose.Schema({
  name: { type: String, 
    enum: ['casual', 'sick'], 
    unique: true,
     required: true }
});

 const LeaveType = mongoose.model('LeaveType', leaveTypeSchema);
 export default LeaveType;