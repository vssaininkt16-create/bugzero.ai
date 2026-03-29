import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const LeadSchema = new mongoose.Schema({
  _id: { type: String, default: () => uuidv4() },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, default: '' },
  company: { type: String, default: '' },
  website: { type: String, default: '' },
  message: { type: String, default: '' },
  service: { type: String, default: '' },
  budget: { type: String, default: '' },
  source: { type: String, default: 'contact_form' },
  status: {
    type: String,
    default: 'new',
    enum: ['new', 'contacted', 'qualified', 'converted', 'lost'],
  },
  priority: {
    type: String,
    default: 'warm',
    enum: ['hot', 'warm', 'cold'],
  },
}, { timestamps: true });

export default mongoose.models.Lead || mongoose.model('Lead', LeadSchema);
