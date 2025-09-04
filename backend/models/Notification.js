import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  date: { type: Date, default: Date.now },
  month: { type: String } ,// e.g., "July 2025"
   read: { type: Boolean, default: false } // 👈 NEW FIELD
});

const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;
