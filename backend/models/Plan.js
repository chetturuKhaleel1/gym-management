import mongoose from "mongoose";

const planSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  duration: { type: String, required: true },
  description: { type: String, required: true },
});

// ✅ Prevent OverwriteModelError
const Plan = mongoose.models.Plan || mongoose.model("Plan", planSchema);

export default Plan;
