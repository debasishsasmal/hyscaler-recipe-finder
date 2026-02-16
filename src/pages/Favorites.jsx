import React, { useState, useEffect } from "react";
import RecipeCard from "../components/RecipeCard";
import { useNavigate } from "react-router-dom";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    
    const user = JSON.parse(localStorage.getItem("user"));
    
    if (!user) {
      
      alert("Please login to view your favorites!");
      navigate("/login");
      return;
    }

    
    const saved = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(saved);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          My <span className="text-red-500">Favorite</span> Recipes
        </h1>

        {favorites.length === 0 ? (
          <div className="text-center mt-20">
            <p className="text-xl text-gray-500">No favorites yet!</p>
            <p className="text-gray-400 mt-2">Go back to Home and click the heart icon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites.map((recipe) => (
              
              <RecipeCard key={recipe.idMeal} recipe={recipe} allowDelete={false} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;