// controllers/paymentController.js
import Razorpay from "razorpay";
import crypto from "crypto";
import Payment from "../models/Payment.js"; // Ensure this model exists
import Membership from "../models/membershipModel.js"; // Ensure this model exists
import Plan from "../models/Plan.js";
import Bill from "../models/Bill.js";

// console.log("✅ Loaded Keys:", {
//   id: process.env.RAZORPAY_KEY_ID,
//   secret: process.env.RAZORPAY_KEY_SECRET,
// });

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET, // ✅ FIXED HERE
});

export const createPayment = async (req, res) => {
  const { planId, amount } = req.body;
console.log("📦 Received from frontend:", { planId, amount });
  const options = {
    amount: amount*100,
    currency: "INR",
    receipt: `receipt_order_${Date.now()}`,
  };
console.log("📤 Sending Razorpay order:", options);
  try {
    const order = await razorpay.orders.create(options);

    // ✅ Debug log with user info
    console.log("✅ Sending response from /order:", {
      orderId: order.id,
      amount,
      user: {
        id: req.user?._id,
        name: req.user?.name,
        email: req.user?.email,
      },
    });

    res.json(order);
  } catch (err) {
    console.error("❌ Razorpay error:", err);
    res.status(500).json({ message: "Razorpay order failed" });
  }
};


export const verifyPayment = async (req, res) => {
  console.log("🧾 VERIFY PAYMENT BODY:", req.body);
  console.log("🙋‍♂️ USER:", req.user);

  const {
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
    planId,
    amount,
  } = req.body;

  try {
    // ✅ Fetch plan title for storage
    const plan = await Plan.findById(planId);
    if (!plan) {
      return res.status(404).json({ error: "Plan not found" });
    }

    const currentMonth = new Date().toLocaleString('default', {
      month: 'long',
      year: 'numeric',
    });

    const existingPayment = await Payment.findOne({
      user: req.user._id,
      plan: planId,
      status: "paid",
      createdAt: {
        $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        $lte: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
      }
    });

    if (existingPayment) {
      return res.status(400).json({ error: "You already paid for this plan this month." });
    }

    // ✅ Save Payment with plan title
    const newPayment = new Payment({
      user: req.user._id,
      plan: planId,
      planName: plan.title, // ✅ Store the plan name
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      signature: razorpay_signature,
      status: "paid",
      amount,
    });

    await newPayment.save();
    console.log("✅ Payment saved to DB");

    const startDate = new Date();
    const endDate = new Date(startDate.getTime() + 30 * 24 * 60 * 60 * 1000);
    let membership = await Membership.findOne({ user: req.user._id });

    if (membership) {
      membership.plan = planId;
      membership.startDate = startDate;
      membership.endDate = endDate;
      membership.status = "active";
      await membership.save();
      console.log("🔁 Existing membership updated");
    } else {
      membership = new Membership({
        user: req.user._id,
        plan: planId,
        startDate,
        endDate,
        status: "active",
      });
      await membership.save();
      console.log("🆕 New membership created");
    }

    // ✅ Save Bill
    try {
      const bill = new Bill({
        userId: req.user._id,
        amount,
        month: currentMonth,
        paymentId: razorpay_payment_id,
      });

      await bill.save();
      console.log("🧾 Auto-generated bill saved");
    } catch (billErr) {
      console.error("❌ Error while saving Bill:", billErr.message);
    }

    const membershipCheck = await Membership.findOne({ user: req.user._id }).populate("plan");

    res.status(200).json({
      success: true,
      message: "Payment verified, membership updated, bill generated",
      payment: newPayment,
      membership: membershipCheck,
    });

  } catch (err) {
    console.error("❌ Error in verifyPayment:", err.message);
    res.status(500).json({ error: "Failed to verify and update membership" });
  }
};





export const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate("user plan");
    res.json({ payments }); // ✅ wrap in object for consistency
  } catch (error) {
    console.error("Failed to fetch payments:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const checkPlanPaymentStatus = async (req, res) => {
  const { planId } = req.params;

  try {
    const existingPayment = await Payment.findOne({
      user: req.user._id,
      plan: planId,
      status: "paid",
      createdAt: {
        $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        $lte: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
      }
    });

    res.json({ alreadyPaid: !!existingPayment });
  } catch (err) {
    console.error("❌ Error in checkPlanPaymentStatus:", err.message);
    res.status(500).json({ error: "Failed to check payment status" });
  }
};

