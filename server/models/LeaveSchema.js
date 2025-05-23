import mongoose from "mongoose";

const leaveRequestSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  type: { type: String, enum: ['sick', 'casual'], required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  fromDate: { type: Date, required: true },
  toDate: { type: Date, required: true },
  reason: { type: String },
  approverId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  createdAt: { type: Date, default: Date.now }
});
const LeaveRequest = mongoose.model('LeaveRequest', leaveRequestSchema);

export default LeaveRequest