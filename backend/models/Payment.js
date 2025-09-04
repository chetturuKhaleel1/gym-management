import mongoose from "mongoose";
const paymentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  plan: { type: mongoose.Schema.Types.ObjectId, ref: "Plan", required: true },
  planTitle: { type: String }, // ✅ Add this line
  paymentId: String,
  orderId: String,
  signature: String,
  status: { type: String, enum: ["paid", "failed"], default: "paid" },
  amount: { type: Number, required: true },
}, { timestamps: true });



const Payment = mongoose.models.Payment || mongoose.model("Payment", paymentSchema);
export default Payment;
