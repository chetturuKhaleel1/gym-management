// routes/paymentRoutes.js
// import express from "express";
// import { createPayment, verifyPayment } from "../controllers/paymentController.js";

// const router = express.Router();

// router.post("/order", createPayment);
// router.post("/verify", verifyPayment);

// export default router;

import express from "express";
import { createPayment, verifyPayment, getAllPayments, checkPlanPaymentStatus  } from "../controllers/paymentController.js";
import { protect } from "../middlewares/authMiddleware.js"; // ✅

const router = express.Router();

router.post("/order", protect, createPayment); // ✅ protect this route
router.post("/verify", protect, verifyPayment); // ✅ secured route
router.get("/", protect, getAllPayments);
router.get("/check/:planId", protect, checkPlanPaymentStatus);
export default router;

