import mongoose from "mongoose";

const BudgetSchema = new mongoose.Schema({
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  month: { type: Number, required: true },
  year: { type: Number, required: true },
}, { timestamps: true });

export default mongoose.model("Budget", BudgetSchema);
