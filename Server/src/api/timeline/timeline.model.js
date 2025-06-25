import mongoose from 'mongoose';

const timelineSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  year: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, enum: ['work', 'education'], required: true },
  achievements: { type: [String], default: [] },
});

export default mongoose.model('Timeline', timelineSchema);
