import React from 'react';
import { Link } from 'react-router-dom';

const RecipeCard = ({ recipe }) => (
  <div className="recipe-card">
    <img src={recipe.image || '/default-image.jpg'} alt={recipe.name} className="recipe-image" />
    <div className="recipe-info">
      <h3>{recipe.name}</h3>
      <p>Cuisine: {recipe.cuisine}</p>
      <Link to={`/recipe/${recipe.id}`}>View Details</Link>
    </div>
  </div>
);

export default RecipeCard;
