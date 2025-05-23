import mongoose from "mongoose";

const leaveBalanceSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  leaveType: { type: mongoose.Schema.Types.ObjectId, ref: 'LeaveType', required: true },
  totalDays: { type: Number, required: true },
  remainingDays: { type: Number, required: true }
});

leaveBalanceSchema.index({ user: 1, leaveType: 1 }, { unique: true });
const LeaveBalance = mongoose.model('LeaveBalance', leaveBalanceSchema);
export default LeaveBalance;