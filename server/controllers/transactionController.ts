import { Request, Response } from "express";
import Transaction from "../models/Transaction";

export const getTransactions = async (req: Request, res: Response) => {
  const transactions = await Transaction.find().sort({ date: -1 });
  res.json(transactions);
};

export const addTransaction = async (req: Request, res: Response) => {
  try {
    const { description, amount, date, category } = req.body;

    const expenseCategories = ["Food", "Travel", "Entertainment", "Shopping", "Bills"];
    const finalAmount = expenseCategories.includes(category)
      ? -Math.abs(amount)
      : Math.abs(amount);

    const transaction = new Transaction({
      description,
      amount: finalAmount,
      date,
      category,
    });

    await transaction.save();
    res.status(201).json(transaction);
  } catch (err) {
    res.status(400).json({ error: "Failed to add transaction" });
  }
};


export const deleteTransaction = async (req: Request, res: Response) => {
  await Transaction.findByIdAndDelete(req.params.id);
  res.status(204).end();
};

export const updateTransaction = async (req: Request, res: Response) => {
  const updated = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};
