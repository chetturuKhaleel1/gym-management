import express from "express";
import{ getBillsByUser } from "../controllers/billController.js";
import {protect} from "../middlewares/authMiddleware.js";
const router = express.Router();

router.get("/my-bills", protect, getBillsByUser);

export default router;
