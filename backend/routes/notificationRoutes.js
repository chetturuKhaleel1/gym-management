import express from "express";
import {
  createNotification,
  getUserNotifications,
  assignMonthlyNotification,
   markNotificationsAsRead,
} from "../controllers/notificationController.js";

const router = express.Router();

router.post("/add", createNotification);
router.get("/:userId", getUserNotifications);
router.post("/assign-monthly", assignMonthlyNotification);

router.put("/mark-read/:userId", markNotificationsAsRead);
export default router;
