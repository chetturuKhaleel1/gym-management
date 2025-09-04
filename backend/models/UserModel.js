import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, // 👈 Optional: for auto-trimming input
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true, // 👈 Optional: normalize emails
  },
  password: {
    type: String,
    required: true,
    select: false, // 👈 Optional: do not return password by default in queries
  },
  role: {
    type: String,
    enum: ['member', 'admin'],
    default: 'member',
  },
}, { timestamps: true });

// ✅ Prevent model overwrite in dev
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User; 