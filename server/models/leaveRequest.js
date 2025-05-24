import mongoose from "mongoose";

const leaveRequestSchema = new mongoose.Schema({
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
  startDate: { type: Date, required: true },
  endDate:   { type: Date, required: true },
  reason:    { type: String },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  },
  reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Employee" },
  reviewedAt:{ type: Date }
}, { timestamps: true });

export default mongoose.model("LeaveRequest", leaveRequestSchema);
