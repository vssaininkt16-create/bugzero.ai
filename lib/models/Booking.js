import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const BookingSchema = new mongoose.Schema({
  _id: { type: String, default: () => uuidv4() },
  bookingId: { type: String, default: () => 'BZ-BOOK-' + Date.now().toString(36).toUpperCase() },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, default: '' },
  company: { type: String, default: '' },
  service: { type: String, default: '' },
  date: { type: String, required: true },
  time: { type: String, required: true },
  message: { type: String, default: '' },
  status: {
    type: String,
    default: 'pending',
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
  },
  zoomLink: { type: String, default: '' },
}, { timestamps: true });

export default mongoose.models.Booking || mongoose.model('Booking', BookingSchema);
