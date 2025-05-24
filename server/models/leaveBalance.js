import mongoose from "mongoose";

const leaveBalanceSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true
  },
  leaveType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "LeaveType",
    required: true
  },
  totalDays: {
    type: Number,
    required: true
  },
  remainingDays: {
    type: Number,
    required: true
  }
}, { timestamps: true });

// ensure one balance doc per (employee, leaveType)
leaveBalanceSchema.index({ employee: 1, leaveType: 1 }, { unique: true });

export default mongoose.model("LeaveBalance", leaveBalanceSchema);
