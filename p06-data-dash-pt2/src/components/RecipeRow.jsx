// renders one recipe row in the list and links to the detail page

import { Link } from "react-router-dom";

export default function RecipeRow({ recipe }) {
  // show price when API gives a positive number
  let price = "—";
  if (recipe.pricePerServing && recipe.pricePerServing > 0) {
    price = `$${(recipe.pricePerServing / 100).toFixed(2)}`;
  }

  return (
    <li>
      <Link to={`/recipe/${recipe.id}`} className="recipe-row">
        {/* name and image */}
        <span className="cell recipe-name">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="recipe-thumb"
          />
          {recipe.title}
        </span>
        {/* calories */}
        <span className="cell">{recipe.calories} cal</span>
        {/* protein */}
        <span className="cell">{recipe.protein}</span>
        {/* price */}
        <span className="cell">{price}</span>
      </Link>
    </li>
  );
}