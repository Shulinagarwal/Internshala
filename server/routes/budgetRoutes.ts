import express from "express";
import { getBudgets, setBudget } from "../controllers/budgetController";

const router = express.Router();

router.post("/", setBudget);
router.get("/", getBudgets);

export default router;
