// src/components/RecipeRow.jsx

export default function RecipeRow({ recipe }) {
  const price =
    recipe.pricePerServing && recipe.pricePerServing > 0
      ? `$${(recipe.pricePerServing / 100).toFixed(2)}`
      : "—";

  return (
    <li className="recipe-row">
      <span className="cell recipe-name">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="recipe-thumb"
        />
        {recipe.title}
      </span>
      <span className="cell">{recipe.calories} cal</span>
      <span className="cell">{recipe.protein}</span>
      <span className="cell">{price}</span>
    </li>
  );
}
