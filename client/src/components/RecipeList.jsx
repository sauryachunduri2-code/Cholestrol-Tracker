import React, { useState, useEffect } from 'react';
import API_BASE from '../apiConfig';

export default function RecipeList({ token }) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await fetch(`${API_BASE}/recipes`);
      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading recipes...</div>;

  return (
    <div className="recipes-container">
      <h2>Heart-Healthy Recipes</h2>
      {recipes.length === 0 ? (
        <p>Recipes coming soon! Check back later.</p>
      ) : (
        <div className="recipes-grid">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <h3>{recipe.title}</h3>
              <p className="description">{recipe.description}</p>
              <div className="recipe-info">
                <span className="cholesterol">{recipe.cholesterol_level}</span>
                {recipe.calories && <span className="calories">{recipe.calories} cal</span>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
