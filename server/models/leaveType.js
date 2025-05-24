import mongoose from "mongoose";

const leaveTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    enum: ["casual", "sick"],
    required: true,
    unique: true
  },
  // for casual leave must apply advanceNoticeDays before startDate
  advanceNoticeDays: {
    type: Number,
    default: 0
  },
  // if true, requests of this type get auto-approved
  autoApproval: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

export default mongoose.model("LeaveType", leaveTypeSchema);
