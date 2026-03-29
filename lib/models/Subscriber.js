import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const SubscriberSchema = new mongoose.Schema({
  _id: { type: String, default: () => uuidv4() },
  email: { type: String, required: true, unique: true },
  name: { type: String, default: '' },
  isActive: { type: Boolean, default: true },
  source: { type: String, default: 'footer' },
}, { timestamps: true });

export default mongoose.models.Subscriber || mongoose.model('Subscriber', SubscriberSchema);
