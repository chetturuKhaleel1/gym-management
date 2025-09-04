// models/Bill.js
import mongoose from 'mongoose';

const BillSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  month: { type: String, required: true },
  paymentId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Bill = mongoose.model('Bill', BillSchema);
export default Bill;
