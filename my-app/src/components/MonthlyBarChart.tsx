import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp } from "lucide-react";
import type { Transaction } from "../models/Transaction";

interface MonthlyBarChartProps {
  transactions: Transaction[];
}

const MonthlyBarChart: React.FC<MonthlyBarChartProps> = ({ transactions }) => {
  // Step 1: Aggregate by monthIndex
  const monthlyMap = new Map<number, number>();

  transactions.forEach((tx) => {
    const date = new Date(tx.date);
    const monthIndex = date.getMonth(); // 0 = Jan, 1 = Feb, ..., 11 = Dec
    monthlyMap.set(monthIndex, (monthlyMap.get(monthIndex) || 0) + tx.amount);
  });

  // Step 2: Convert to sorted array with month names
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const data = Array.from(monthlyMap.entries())
    .sort(([a], [b]) => a - b) // Sort by monthIndex
    .map(([monthIndex, total]) => ({
      month: monthNames[monthIndex],
      total
    }));

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
      <div className="flex items-center mb-6">
        <TrendingUp className="w-6 h-6 text-blue-600 mr-3" />
        <h2 className="text-xl font-bold text-gray-800">Monthly Overview</h2>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="month" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1f2937', 
                border: 'none', 
                borderRadius: '12px',
                color: 'white'
              }}
            />
            <Bar dataKey="total" fill="url(#colorGradient)" radius={[4, 4, 0, 0]} />
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MonthlyBarChart;
