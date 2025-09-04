// controllers/billController.js
import Bill from "../models/Bill.js";

export const getBillsByUser = async (req, res) => {
  try {
    const bills = await Bill.find({ userId: req.user._id }).sort({ createdAt: -1 });

    res.json({ success: true, bills });
  } catch (err) {
    console.error("❌ Error fetching user bills:", err);
    res.status(500).json({ message: "Server Error" });
  }
};
