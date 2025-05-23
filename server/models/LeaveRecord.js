import mongoose from "mongoose";


const leaveRecordSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  year: { type: Number, required: true },
  quarter: { type: String, enum: ['Q1', 'Q2', 'Q3', 'Q4'], required: true },
  type: { type: String, enum: ['sick', 'casual'], required: true },
  daysTaken: { type: Number, required: true, default: 0 },
  assigned: { type: Number, required: true }, 
  used: { type: Number, default: 0 },         
});


const LeaveRecord = mongoose.model('LeaveRecord',leaveRecordSchema)

export default LeaveRecord;