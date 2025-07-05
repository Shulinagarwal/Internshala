export const getCategoryColor = (category: string): string => {
  const colors = {
    Income: "bg-green-100 text-green-800",
    Food: "bg-orange-100 text-orange-800",
    Housing: "bg-blue-100 text-blue-800",
    Bills: "bg-red-100 text-red-800",
    Transport: "bg-yellow-100 text-yellow-800",
    Entertainment: "bg-purple-100 text-purple-800",
    Shopping: "bg-pink-100 text-pink-800",
    Healthcare: "bg-teal-100 text-teal-800",
  };
  return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800";
};

export const categories = [
  "Income",
  "Food", 
  "Housing",
  "Bills",
  "Transport",
  "Entertainment",
  "Shopping",
  "Healthcare"
];