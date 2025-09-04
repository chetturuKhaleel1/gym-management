import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) throw new Error("Not authorized, no token");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    res.status(401).json({ message: error.message || "Not authorized" });
  }
};

// ✅ Alias export for backward compatibility
export const protect = verifyToken;

// ✅ Optional: Admin-only route protection
export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Admin access denied" });
  }     
};
