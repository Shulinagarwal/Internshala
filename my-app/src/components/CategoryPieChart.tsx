import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import type { Transaction } from "../models/Transaction";

const COLORS = [
  "#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#a0d911", "#1890ff",
  "#f5222d", "#faad14", "#13c2c2", "#2f54eb"
];

const CategoryPieChart = ({ transactions }: { transactions: Transaction[] }) => {
  const categoryMap = new Map<string, number>();

  transactions.forEach(tx => {
    if (tx.amount < 0) {
      categoryMap.set(tx.category, (categoryMap.get(tx.category) || 0) + Math.abs(tx.amount));
    }
  });

  const data = Array.from(categoryMap.entries()).map(([name, value]) => ({ name, value }));

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Expenses by Category</h2>
      {data.length === 0 ? (
        <p className="text-sm text-gray-500">No expenses recorded yet.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default CategoryPieChart;
