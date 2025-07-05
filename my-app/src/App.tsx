import { useEffect, useState } from "react";
import type { Transaction } from "./models/Transaction";
import { fetchTransactions, addTransaction, deleteTransaction } from "./lib/api";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import MonthlyBarChart from "./components/MonthlyBarChart";
import SummaryCards from "./components/SummaryCards";
import LoadingSpinner from "./components/LoadingSpinner";
import CategoryPieChart from "./components/CategoryPieChart";
import BudgetSetter, { type BudgetMap } from "./components/BudgetSetter";
import BudgetComparisonChart from "./components/BudgetComparisonChart";
import SpendingInsights from "./components/SpendingInsights";
import axios from "axios";

const currentMonth = new Date().getMonth() + 1;
const currentYear = new Date().getFullYear();

const App = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [budgets, setBudgets] = useState<BudgetMap>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        const txs = await fetchTransactions();
        setTransactions(txs);

       const BASE_URL =
  import.meta.env.MODE === "development"
    ? "/api"
    : import.meta.env.VITE_API_URL;

const res = await axios.get(`${BASE_URL}/api/budgets?month=${currentMonth}&year=${currentYear}`);

        const map: BudgetMap = {};
        console.log("Budget API response:", res.data);
        res.data.forEach((b: { category: string; amount: number }) => {
          map[b.category] = b.amount;
        });
        setBudgets(map);

        // Debug logs
        console.log("Fetched transactions:", txs);
        console.log("Fetched budgets:", map);

      } catch (err: any) {
        setError("Failed to load data. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleAdd = async (data: Omit<Transaction, "_id">) => {
    try {
      const newTx = await addTransaction(data);
      setTransactions((prev) => [newTx, ...prev]);
    } catch (err) {
      setError("Failed to add transaction.");
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTransaction(id);
      setTransactions((prev) => prev.filter((tx) => tx._id !== id));
    } catch (err) {
      setError("Failed to delete transaction.");
      console.error(err);
    }
  };

  const handleBudgetUpdate = (category: string, amount: number) => {
    setBudgets(prev => ({ ...prev, [category]: amount }));
  };

  const totalBalance = transactions.reduce((sum, tx) => sum + tx.amount, 0);
  const income = transactions.filter((tx) => tx.amount > 0).reduce((sum, tx) => sum + tx.amount, 0);
  const expenses = transactions.filter((tx) => tx.amount < 0).reduce((sum, tx) => sum + Math.abs(tx.amount), 0);

  // Debug logs for rendering
  console.log("Rendering App with transactions:", transactions);
  console.log("Rendering App with budgets:", budgets);

  if (loading) return <LoadingSpinner />;
  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="bg-red-100 text-red-700 px-6 py-4 rounded shadow">{error}</div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8">
      <div className="max-w-6xl mx-auto px-4 space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Finance Tracker</h1>
          <p className="text-gray-600">Take control of your financial future</p>
        </div>

        {/* Summary Cards */}
        <SummaryCards totalBalance={totalBalance} income={income} expenses={expenses} />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <TransactionForm onSubmit={handleAdd} />
            <MonthlyBarChart transactions={transactions} />
          </div>

          <div className="space-y-8">
            <TransactionList transactions={transactions} onDelete={handleDelete} />
            <CategoryPieChart transactions={transactions} />
          </div>

          {/* Full width section for Stage 3 budgeting */}
          <div className="lg:col-span-2 space-y-8">
            <BudgetSetter budgets={budgets} onBudgetUpdate={handleBudgetUpdate} />
            <BudgetComparisonChart transactions={transactions} budgets={budgets} />
            <SpendingInsights transactions={transactions} budgets={budgets} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
