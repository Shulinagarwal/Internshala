import React from "react";
import { DollarSign, TrendingUp, TrendingDown } from "lucide-react";

interface SummaryCardsProps {
  totalBalance: number;
  income: number;
  expenses: number;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ totalBalance, income, expenses }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Balance</p>
            <p className={`text-2xl font-bold ${totalBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ₹{totalBalance.toLocaleString()}
            </p>
          </div>
          <div className="p-3 bg-blue-100 rounded-xl">
            <DollarSign className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Income</p>
            <p className="text-2xl font-bold text-green-600">₹{income.toLocaleString()}</p>
          </div>
          <div className="p-3 bg-green-100 rounded-xl">
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Expenses</p>
            <p className="text-2xl font-bold text-red-600">₹{expenses.toLocaleString()}</p>
          </div>
          <div className="p-3 bg-red-100 rounded-xl">
            <TrendingDown className="w-6 h-6 text-red-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCards;