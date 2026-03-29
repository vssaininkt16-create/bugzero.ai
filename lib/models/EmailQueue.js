import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const EmailQueueSchema = new mongoose.Schema({
  _id: { type: String, default: () => uuidv4() },
  to: { type: String, required: true },
  subject: { type: String, required: true },
  body: { type: String, required: true },
  type: { type: String, default: 'general' },
  status: { type: String, default: 'queued', enum: ['queued', 'sent', 'failed'] },
  metadata: { type: Object, default: {} },
}, { timestamps: true });

export default mongoose.models.EmailQueue || mongoose.model('EmailQueue', EmailQueueSchema);
