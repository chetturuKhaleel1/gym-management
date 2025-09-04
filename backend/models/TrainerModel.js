import mongoose from 'mongoose';

const trainerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  expertise: { type: String, required: true },
  experience: { type: Number, required: true }, // in years
  joinedAt: { type: Date, default: Date.now },
});

const Trainer = mongoose.model('Trainer', trainerSchema);
export default Trainer;
