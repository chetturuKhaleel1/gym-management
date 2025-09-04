import mongoose from 'mongoose';

const dietSchema = new mongoose.Schema({
  title: { type: String, required: true },
  meals: [String],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

const Diet = mongoose.model('Diet', dietSchema);
export default Diet;
