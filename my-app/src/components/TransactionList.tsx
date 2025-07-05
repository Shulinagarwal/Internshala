import React, { useState } from "react";
import { Trash2, TrendingUp, TrendingDown, Calendar, Wallet } from "lucide-react";
import type { Transaction } from "../models/Transaction";
import { getCategoryColor } from "../utils/categoryUtils";

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions, onDelete }) => {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    await onDelete(id);
    setDeletingId(null);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
      <div className="flex items-center mb-6">
        <Wallet className="w-6 h-6 text-blue-600 mr-3" />
        <h2 className="text-xl font-bold text-gray-800">Recent Transactions</h2>
      </div>
      
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {transactions.map((tx) => (
          <div
            key={tx._id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-200 group"
          >
            <div className="flex items-center space-x-4">
              <div className={`w-2 h-2 rounded-full ${tx.amount > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <div>
                <p className="font-semibold text-gray-800">{tx.description}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <Calendar className="w-3 h-3 text-gray-500" />
                  <span className="text-sm text-gray-500">
                    {new Date(tx.date).toLocaleDateString()}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(tx.category || 'Food')}`}>
                    {tx.category || 'Food'}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className={`font-bold text-lg ${tx.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {tx.amount > 0 ? '+' : ''}₹{Math.abs(tx.amount).toLocaleString()}
                </div>
                <div className="flex items-center justify-end">
                  {tx.amount > 0 ? (
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500" />
                  )}
                </div>
              </div>
              
              <button
                onClick={() => handleDelete(tx._id)}
                disabled={deletingId === tx._id}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 disabled:opacity-50"
              >
                {deletingId === tx._id ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-500"></div>
                ) : (
                  <Trash2 className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;