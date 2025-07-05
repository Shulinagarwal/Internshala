import mongoose, { Document, Schema } from "mongoose";

export interface ITransaction extends Document {
  description: string;
  amount: number;
  date: Date;
}

const transactionSchema: Schema = new Schema(
  {
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    category: { type: String, required: true }, 
  },
  { timestamps: true }
);

export default mongoose.model<ITransaction>("Transaction", transactionSchema);