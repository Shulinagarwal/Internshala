import React from "react";
import { categories } from "../utils/categoryUtils";
import type { Transaction } from "../models/Transaction";

type BudgetMap = Record<string, number>;

interface SpendingInsightsProps {
  transactions: Transaction[];
  budgets: BudgetMap;
}

const SpendingInsights: React.FC<SpendingInsightsProps> = ({ transactions, budgets }) => {
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  const insights = categories.map(category => {
    const spent = transactions
      .filter(tx => tx.category === category && new Date(tx.date).getMonth() + 1 === currentMonth && new Date(tx.date).getFullYear() === currentYear && tx.amount < 0)
      .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);
    const budget = budgets[category] || 0;
    const percentage = budget > 0 ? (spent / budget) * 100 : 0;
    
    return { 
      category, 
      spent, 
      budget, 
      percentage,
      isOverBudget: spent > budget,
      remaining: Math.max(0, budget - spent),
      overage: Math.max(0, spent - budget)
    };
  });

  const overBudgetCategories = insights.filter(insight => insight.isOverBudget);
  const underBudgetCategories = insights.filter(insight => !insight.isOverBudget && insight.budget > 0);
  const totalOverage = overBudgetCategories.reduce((sum, insight) => sum + insight.overage, 0);
  const totalSavings = underBudgetCategories.reduce((sum, insight) => sum + insight.remaining, 0);

  const getInsightColor = (percentage: number) => {
    if (percentage >= 100) return 'red';
    if (percentage >= 80) return 'orange';
    if (percentage >= 60) return 'yellow';
    return 'green';
  };

  const getInsightIcon = (percentage: number) => {
    if (percentage >= 100) return '🚨';
    if (percentage >= 80) return '⚠️';
    if (percentage >= 60) return '🟡';
    return '✅';
  };

  const getProgressBarColor = (percentage: number) => {
    if (percentage >= 100) return 'bg-red-500';
    if (percentage >= 80) return 'bg-orange-500';
    if (percentage >= 60) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getCardBorderColor = (percentage: number) => {
    if (percentage >= 100) return 'border-red-200';
    if (percentage >= 80) return 'border-orange-200';
    if (percentage >= 60) return 'border-yellow-200';
    return 'border-green-200';
  };

  return (
    <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-8 rounded-2xl">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Spending Insights</h2>
          <p className="text-gray-600">Analyze your spending patterns and get actionable insights</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Categories Over Budget</p>
                <p className="text-2xl font-bold text-red-600">{overBudgetCategories.length}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Overage</p>
                <p className="text-2xl font-bold text-red-600">₹{totalOverage.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"></path>
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Categories Under Budget</p>
                <p className="text-2xl font-bold text-green-600">{underBudgetCategories.length}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Savings</p>
                <p className="text-2xl font-bold text-green-600">₹{totalSavings.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Insights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {insights.map(insight => (
            <div key={insight.category} className={`bg-white rounded-2xl p-6 shadow-lg border-2 ${getCardBorderColor(insight.percentage)} transition-all duration-300 hover:shadow-xl`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">{insight.category}</h3>
                <span className="text-2xl">{getInsightIcon(insight.percentage)}</span>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Budget</span>
                  <span className="font-medium">₹{insight.budget.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Spent</span>
                  <span className="font-medium">₹{insight.spent.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Usage</span>
                  <span className={`font-medium ${
                    insight.percentage >= 100 ? 'text-red-600' : 
                    insight.percentage >= 80 ? 'text-orange-600' : 
                    'text-green-600'
                  }`}>
                    {insight.percentage.toFixed(1)}%
                  </span>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="mb-4">
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full transition-all duration-500 ${getProgressBarColor(insight.percentage)}`}
                    style={{ width: `${Math.min(100, insight.percentage)}%` }}
                  ></div>
                </div>
              </div>
              
              {/* Status Message */}
              <div className={`p-3 rounded-lg ${
                insight.isOverBudget ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'
              }`}>
                {insight.isOverBudget ? (
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-red-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                    </svg>
                    <p className="text-sm text-red-700 font-medium">
                      Over budget by ₹{insight.overage.toLocaleString()}
                    </p>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <p className="text-sm text-green-700 font-medium">
                      ₹{insight.remaining.toLocaleString()} under budget
                    </p>
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              <div className="mt-4 flex space-x-2">
                {insight.isOverBudget ? (
                  <button className="flex-1 bg-red-100 text-red-700 py-2 px-3 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors">
                    Review Spending
                  </button>
                ) : (
                  <button className="flex-1 bg-green-100 text-green-700 py-2 px-3 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors">
                    Great Job!
                  </button>
                )}
                <button className="bg-gray-100 text-gray-700 py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Recommendations Section */}
        {(overBudgetCategories.length > 0 || underBudgetCategories.length > 0) && (
          <div className="mt-8 bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Smart Recommendations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {overBudgetCategories.length > 0 && (
                <div className="bg-red-50 rounded-xl p-4 border border-red-200">
                  <h4 className="font-semibold text-red-800 mb-2">⚠️ Action Required</h4>
                  <ul className="space-y-1 text-sm text-red-700">
                    {overBudgetCategories.slice(0, 3).map(category => (
                      <li key={category.category}>
                        • Consider reducing {category.category} spending by ₹{category.overage.toLocaleString()}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {underBudgetCategories.length > 0 && (
                <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-2">✅ Doing Great</h4>
                  <ul className="space-y-1 text-sm text-green-700">
                    {underBudgetCategories.slice(0, 3).map(category => (
                      <li key={category.category}>
                        • {category.category}: ₹{category.remaining.toLocaleString()} saved this month
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpendingInsights;