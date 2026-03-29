import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const ScanResultSchema = new mongoose.Schema({
  _id: { type: String, default: () => uuidv4() },
  url: { type: String, required: true },
  score: { type: Number, default: 0 },
  grade: { type: String, default: 'D' },
  checks: { type: Object, default: {} },
  email: { type: String, default: '' },
  name: { type: String, default: '' },
  company: { type: String, default: '' },
}, { timestamps: true });

export default mongoose.models.ScanResult || mongoose.model('ScanResult', ScanResultSchema);
