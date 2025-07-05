import React, { useState, useEffect } from "react";
import axios from "axios";
import { categories } from "../utils/categoryUtils";

const currentMonth = new Date().getMonth() + 1;
const currentYear = new Date().getFullYear();

export type BudgetMap = Record<string, number>;

interface BudgetSettingsProps {
  budgets: BudgetMap;
  onBudgetUpdate: (category: string, amount: number) => void;
}

const BudgetSettings: React.FC<BudgetSettingsProps> = ({ budgets, onBudgetUpdate }) => {
  const [inputBudgets, setInputBudgets] = useState<BudgetMap>(budgets);
  const [saving, setSaving] = useState<string | null>(null);
  const [savedCategories, setSavedCategories] = useState<Set<string>>(new Set());

  useEffect(() => {
    setInputBudgets(budgets);
  }, [budgets]);

  const handleChange = (category: string, value: string) => {
    setInputBudgets(prev => ({ ...prev, [category]: Number(value) || 0 }));
    setSavedCategories(prev => {
      const newSet = new Set(prev);
      newSet.delete(category);
      return newSet;
    });
  };

  const saveBudget = async (category: string) => {
    setSaving(category);
    try {
      const amount = inputBudgets[category] || 0;
      await axios.post("/api/budgets", { category, amount, month: currentMonth, year: currentYear });
      onBudgetUpdate(category, amount);
      setSavedCategories(prev => new Set(prev).add(category));
      setTimeout(() => {
        setSavedCategories(prev => {
          const newSet = new Set(prev);
          newSet.delete(category);
          return newSet;
        });
      }, 2000);
    } catch (error) {
      console.error('Error saving budget:', error);
    } finally {
      setSaving(null);
    }
  };

  const saveAllBudgets = async () => {
    setSaving('all');
    try {
      for (const category of categories) {
        const amount = inputBudgets[category] || 0;
        await axios.post("/api/budgets", { category, amount, month: currentMonth, year: currentYear });
        onBudgetUpdate(category, amount);
      }
      setSavedCategories(new Set(categories));
      setTimeout(() => {
        setSavedCategories(new Set());
      }, 2000);
    } catch (error) {
      console.error('Error saving all budgets:', error);
    } finally {
      setSaving(null);
    }
  };

  const totalBudget = Object.values(inputBudgets).reduce((sum, amount) => sum + amount, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Budget Settings</h1>
          <p className="text-gray-600">Set your monthly spending limits for each category</p>
        </div>

        {/* Total Budget Card */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Total Monthly Budget</h3>
              <p className="text-3xl font-bold text-purple-600">₹{totalBudget.toLocaleString()}</p>
            </div>
            <button
              onClick={saveAllBudgets}
              disabled={saving === 'all'}
              className="bg-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {saving === 'all' ? (
                <>
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Save All</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Budget Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map(category => (
            <div key={category} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">{category}</h3>
                {savedCategories.has(category) && (
                  <div className="flex items-center space-x-1 text-green-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-sm">Saved</span>
                  </div>
                )}
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Budget</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                    <input
                      type="number"
                      min="0"
                      step="100"
                      className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                      value={inputBudgets[category] || ""}
                      onChange={(e) => handleChange(category, e.target.value)}
                      placeholder="0"
                    />
                  </div>
                </div>
                
                <button
                  onClick={() => saveBudget(category)}
                  disabled={saving === category}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-medium hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {saving === category ? (
                    <>
                      <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Save Budget</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BudgetSettings;