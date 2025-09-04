import mongoose from 'mongoose';

const supplementSchema = new mongoose.Schema({
  name: { type: String, required: true },
  // price: { type: Number, required: true },
  description: String,
  category: String, // ✅ ADD THIS
}, { timestamps: true });


const Supplement = mongoose.model('Supplement', supplementSchema);
export default Supplement;
