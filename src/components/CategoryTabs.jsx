import React from "react";

const categories = [
  { name: "Chicken", emoji: "🍗" },
  { name: "Vegetarian", emoji: "🥗" },
  { name: "Breakfast", emoji: "🍳" },
  { name: "Dessert", emoji: "🍰" },
  { name: "Pasta", emoji: "🍝" },
  { name: "Seafood", emoji: "🦐" },
];

const CategoryTabs = ({ setCategory }) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-8">
      {categories.map((cat) => (
        <button
          key={cat.name}
          onClick={() => setCategory(cat.name)}
          className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-full shadow-sm hover:bg-orange-500 hover:text-white hover:shadow-md transition-all duration-300 font-medium text-gray-700"
        >
          <span>{cat.emoji}</span>
          <span>{cat.name}</span>
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;