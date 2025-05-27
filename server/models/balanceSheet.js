import mongoose from 'mongoose';

const balanceSheetSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true,
    unique: true
  },
  remainingLeaves: {
    type: Number,
    required: true,
    default: 6
  },
  totalLeaves: {
    type: Number,
    required: true,
    default: 6
  },
  sickLeaves: {
    type: Number,
    required: true,
    default: 2
  },
  casualLeaves: {
    type: Number,
    required: true,
    default: 4
  }
}, { timestamps: true });

export default mongoose.model('BalanceSheet', balanceSheetSchema);
