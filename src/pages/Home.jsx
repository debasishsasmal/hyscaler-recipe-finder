import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import CategoryTabs from "../components/CategoryTabs";
import RecipeCard from "../components/RecipeCard";
import { getRecipes, getRecipesByCategory } from "../services/api";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchRecipes("chicken");
  }, []);

 
  const fetchRecipes = async (query) => {
    setLoading(true);
    setError("");
    try {
      const data = await getRecipes(query);
      setRecipes(data || []);
      if (!data) setError("No recipes found.");
    } catch (err) {
      setError("Failed to load recipes.");
    } finally {
      setLoading(false);
    }
  };

  
  const fetchCategory = async (category) => {
    setLoading(true);
    setError("");
    try {
      const data = await getRecipesByCategory(category);
      setRecipes(data || []);
    } catch (err) {
      setError("Failed to load category.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="container mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6 mt-4">
          Recipe<span className="text-orange-500">Finder</span>
        </h1>
        
        {/* Search Section */}
        <SearchBar handleSearch={fetchRecipes} />
        
        {/* Filter Section */}
        <CategoryTabs setCategory={fetchCategory} />

        {loading && <p className="text-center text-xl mt-10">Cooking up results...</p>}
        {error && <p className="text-center text-red-500 text-lg mt-10">{error}</p>}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {recipes.map((item) => (
              <RecipeCard key={item.idMeal} recipe={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;