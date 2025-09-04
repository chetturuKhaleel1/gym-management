// server/models/Coach.js
import mongoose from "mongoose";

const coachSchema = new mongoose.Schema({
  name: { type: String, required: true },
  coachId: { type: String, required: true, unique: true },
  contact: { type: String, required: true },
  expiration: { type: String, required: true },
}, { timestamps: true });

const Coach = mongoose.model('Coach', coachSchema);
export default Coach;