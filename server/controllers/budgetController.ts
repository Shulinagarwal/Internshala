import { Request, Response } from "express";
import Budget from "../models/Budget";

// Set or update a budget
export const setBudget = async (req: Request, res: Response): Promise<void> => {
  try {
    let { category, amount, month, year } = req.body;

    if (typeof amount === "string") amount = Number(amount);
    if (typeof month === "string") month = Number(month);
    if (typeof year === "string") year = Number(year);

    if (
      typeof category !== "string" ||
      typeof amount !== "number" || isNaN(amount) ||
      typeof month !== "number" || isNaN(month) ||
      typeof year !== "number" || isNaN(year)
    ) {
      res.status(400).json({ error: "Invalid or missing fields" });
      return;
    }

    const existing = await Budget.findOne({ category, month, year });
    if (existing) {
      existing.amount = amount;
      await existing.save();
      res.json(existing);
      return;
    }
    const budget = new Budget({ category, amount, month, year });
    await budget.save();
    res.json(budget);
  } catch (error: any) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};

// Get budgets for a given month and year
export const getBudgets = async (req: Request, res: Response): Promise<void> => {
  try {
    const { month, year } = req.query;

    // Always parse query params as numbers
    const monthNum = Number(month);
    const yearNum = Number(year);

    if (!month || !year || isNaN(monthNum) || isNaN(yearNum)) {
      res.status(400).json({ error: "month and year are required and must be numbers" });
      return;
    }
    const budgets = await Budget.find({ month: monthNum, year: yearNum });
    res.json(budgets);
  } catch (error: any) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};
