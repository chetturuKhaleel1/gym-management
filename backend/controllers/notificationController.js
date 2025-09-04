import Notification from "../models/Notification.js";

// ✅ Create a manual notification
export const createNotification = async (req, res) => {
  try {
    const { title, message, assignedTo, month } = req.body;
    const notification = new Notification({ title, message, assignedTo, month });
    await notification.save();
    res.status(201).json(notification);
  } catch (err) {
    res.status(500).json({ error: "Error creating notification" });
  }
};

// ✅ Get notifications for a user
export const getUserNotifications = async (req, res) => {
  try {
    const userId = req.params.userId;
    const notifications = await Notification.find({ assignedTo: userId });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: "Error fetching notifications" });
  }
};

// ✅ Assign monthly notification
export const assignMonthlyNotification = async (req, res) => {
  try {
    const { title, message, assignedTo, month } = req.body;

    if (!title || !message || !assignedTo || !month) {
      return res.status(400).json({ error: "Missing fields in request" });
    }

    const notification = new Notification({
      title,
      message,
      assignedTo,
      month,
    });

    await notification.save();
    res.status(201).json(notification);
  } catch (err) {
    res.status(500).json({ error: "Server error creating notification" });
  }
};

// ✅ Mark all notifications as read for a user
export const markNotificationsAsRead = async (req, res) => {
  try {
    const { userId } = req.params;

    const result = await Notification.updateMany(
      { assignedTo: userId },
      { $set: { read: true } }
    );

    res.json({ message: "Marked as read", updated: result.modifiedCount });
  } catch (err) {
    console.error("❌ Error marking as read:", err);
    res.status(500).json({ error: "Failed to mark notifications as read" });
  }
};
