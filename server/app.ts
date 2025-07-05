import express from "express";
import cors from "cors";
import transactionRoutes from "./routes/transactionRoutes";
import budgetRoutes from "./routes/budgetRoutes";
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/budgets", budgetRoutes);

app.use("/api/transactions", transactionRoutes);

export default app;
