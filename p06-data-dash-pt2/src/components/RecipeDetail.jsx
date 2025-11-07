// detail view for a single recipe

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const API_KEY = import.meta.env.VITE_SPOONACULAR_KEY;

export default function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const loadDetail = async () => {
      const res = await fetch(
        `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${API_KEY}`
      );
      const data = await res.json();
      setRecipe(data);
    };

    loadDetail().catch(console.error);
  }, [id]);

  if (!recipe) {
    return <p>Loading recipe details…</p>;
  }

  // tags out of summary to show plain text
  const summaryText = recipe.summary
    ? recipe.summary.replace(/<[^>]+>/g, "")
    : "";

  return (
    <div className="detail-page">
      <Link to="/" className="back-link">
        ← Back to dashboard
      </Link>

      <div className="detail-card">
        <h2>{recipe.title}</h2>

        <img
          src={recipe.image}
          alt={recipe.title}
          className="detail-image"
        />

        <p>
          <strong>Ready in:</strong> {recipe.readyInMinutes} minutes
        </p>
        <p>
          <strong>Servings:</strong> {recipe.servings}
        </p>
        <p>
          <strong>Health score:</strong> {recipe.healthScore}
        </p>
        <p>
          <strong>Dish types:</strong>{" "}
          {recipe.dishTypes && recipe.dishTypes.length > 0
            ? recipe.dishTypes.join(", ")
            : "None listed"}
        </p>

        <p className="detail-summary">{summaryText}</p>
      </div>
    </div>
  );
}
