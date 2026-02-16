import React, { useState } from "react";
import { Search } from "lucide-react";

const SearchBar = ({ handleSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    
    if (value === "") {
      handleSearch("chicken");
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) handleSearch(query);
  };

  return (
    <form onSubmit={onSubmit} className="w-full max-w-2xl mx-auto mb-8">
      <div className="relative flex items-center shadow-lg rounded-full bg-white overflow-hidden border border-gray-200">
        <input
          type="text"
          placeholder="Search recipes (e.g., 'Chicken', 'Paneer')..."
          value={query}
          onChange={handleChange} 
          className="w-full px-6 py-4 text-gray-700 focus:outline-none text-lg"
        />
        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 text-white p-4 transition duration-300"
        >
          <Search size={24} />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;