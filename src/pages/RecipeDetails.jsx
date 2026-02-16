import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, Users } from "lucide-react";

const RecipeDetails = () => {
  const { id } = useParams(); 
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await res.json();
        setRecipe(data.meals[0]);
      } catch (error) {
        console.error("Error loading details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (loading) return <div className="text-center mt-20 text-xl font-bold">Loading Chef's Secret...</div>;
  if (!recipe) return <div className="text-center mt-20">Recipe not found!</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Link to="/" className="flex items-center gap-2 text-gray-600 mb-6 hover:text-orange-500 transition">
        <ArrowLeft size={20} /> Back to Search
      </Link>

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <img src={recipe.strMealThumb} alt={recipe.strMeal} className="w-full h-80 object-cover" />
        
        <div className="p-8">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4">{recipe.strMeal}</h1>
          
          <div className="flex flex-wrap gap-4 mb-8">
            <span className="px-4 py-2 bg-orange-100 text-orange-600 rounded-full font-semibold">
              {recipe.strArea} Cuisine
            </span>
            <span className="px-4 py-2 bg-green-100 text-green-600 rounded-full font-semibold">
              {recipe.strCategory}
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Ingredients</h2>
              <ul className="space-y-2 text-gray-700">
                
                {Array.from({ length: 20 }).map((_, i) => {
                  const ingredient = recipe[`strIngredient${i + 1}`];
                  const measure = recipe[`strMeasure${i + 1}`];
                  return ingredient ? (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                      <span className="font-medium">{measure}</span> {ingredient}
                    </li>
                  ) : null;
                })}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Instructions</h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                {recipe.strInstructions}
              </p>
              
              {recipe.strYoutube && (
                <a 
                  href={recipe.strYoutube} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block mt-6 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  Watch on YouTube
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;