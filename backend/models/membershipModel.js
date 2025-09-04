import mongoose from 'mongoose';

const membershipSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  plan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Plan',
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'expired'],
    default: 'active',
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  endDate: Date,
}, { timestamps: true });

const Membership = mongoose.models.Membership || mongoose.model('Membership', membershipSchema);

export default Membership;
