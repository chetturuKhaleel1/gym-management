import express from "express";
import { createPlan, getPlans, deletePlan ,  updatePlan,} from "../controllers/planController.js";

const router = express.Router();

router.post("/", createPlan);
router.get("/", getPlans);
router.delete("/:id", deletePlan);
router.put("/:id", updatePlan); 

export default router;
