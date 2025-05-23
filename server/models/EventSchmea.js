import mongoose from "mongoose";



const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  type: { type: String, enum: ['company_event', 'team_event'], required: true },
  
  // Optional: Target specific team or role
  targetTeams: [{ type: String }], // e.g., ["developer", "marketing"]
//   targetRoles: [{ type: String, enum: ['admin', 'employee'] }], // optional
  
//   createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
  createdAt: { type: Date, default: Date.now }
});


const EventData = mongoose.model('EventData',eventSchema)


export default EventData