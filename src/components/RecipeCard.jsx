import React, { useState, useEffect } from "react";
import { Heart, Clock, Users } from "lucide-react";
import { Link, useNavigate } from "react-router-dom"; 

const RecipeCard = ({ recipe, allowDelete = true }) => {
  const { idMeal, strMeal, strMealThumb, strArea, strCategory } = recipe;
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate(); 

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const exists = favorites.some((fav) => fav.idMeal === idMeal);
    setIsFavorite(exists);
  }, [idMeal]);

  const toggleFavorite = (e) => {
    e.preventDefault();
    if (!allowDelete && isFavorite) return;

    
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("Please login to save favorites!"); 
      navigate("/login"); 
      return;
    }

    
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    
    if (isFavorite) {
      favorites = favorites.filter((fav) => fav.idMeal !== idMeal);
    } else {
      favorites.push(recipe);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 relative group">
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={strMealThumb}
          alt={strMeal}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {allowDelete && (
          <button
            onClick={toggleFavorite}
            className={`absolute top-2 right-2 p-2 rounded-full shadow-md transition-all duration-300 ${
              isFavorite ? "bg-red-500 text-white" : "bg-white text-gray-400 hover:text-red-500"
            }`}
          >
            <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
          </button>
        )}
      </div>
      
      <div className="p-4">
        <span className="text-xs font-bold text-orange-500 uppercase tracking-wide">
          {strArea} • {strCategory}
        </span>
        <h3 className="text-xl font-bold text-gray-800 mt-1 mb-2 truncate">
          {strMeal}
        </h3>
        
        <div className="flex justify-between text-gray-500 text-sm mt-4 mb-4">
           <div className="flex items-center gap-1"><Clock size={16} /> 30m</div>
           <div className="flex items-center gap-1"><Users size={16} /> 2 Servings</div>
        </div>

        <Link 
          to={`/recipe/${idMeal}`} 
          className="block w-full text-center bg-orange-100 text-orange-600 font-semibold py-2 rounded-lg hover:bg-orange-500 hover:text-white transition-colors"
        >
          View Recipe
        </Link>
      </div>
    </div>
  );
};

export default RecipeCard;