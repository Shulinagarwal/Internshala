import { useEffect, useState } from "react";
import type { Transaction } from "./models/Transaction";
import { fetchTransactions, addTransaction, deleteTransaction } from "./lib/api";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import MonthlyBarChart from "./components/MonthlyBarChart";
import SummaryCards from "./components/SummaryCards";
import LoadingSpinner from "./components/LoadingSpinner";
import CategoryPieChart from "./components/CategoryPieChart";

const App = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions().then(data => {
      setTransactions(data);
      setLoading(false);
    });
  }, []);

  const handleAdd = async (data: Omit<Transaction, "_id">) => {
    const newTx = await addTransaction(data);
    setTransactions([newTx, ...transactions]);
  };

  const handleDelete = async (id: string) => {
    await deleteTransaction(id);
    setTransactions(transactions.filter((tx) => tx._id !== id));
  };

  const totalBalance = transactions.reduce((sum, tx) => sum + tx.amount, 0);
  const income = transactions.filter(tx => tx.amount > 0).reduce((sum, tx) => sum + tx.amount, 0);
  const expenses = transactions.filter(tx => tx.amount < 0).reduce((sum, tx) => sum + Math.abs(tx.amount), 0);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8">
      <div className="max-w-6xl mx-auto px-4 space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Finance Tracker</h1>
          <p className="text-gray-600">Take control of your financial future</p>
        </div>

        {/* Summary Cards */}
        <SummaryCards 
          totalBalance={totalBalance}
          income={income}
          expenses={expenses}
        />

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
        </div>
      </div>
    </div>
  );
};

export default App;