// src/App.jsx
// Recipe helper dashboard (Spoonacular)
// - fetch 10 recipes by nutrients
// - for each recipe, fetch info to get pricePerServing
// - top: 3 summary cards (count, avg price, avg calories)
// - bottom: search + filter + list
// REQUIRED FEATURES satisfied:
// 1) dashboard list fetched from API
// 2) at least 10 unique items
// 3) useEffect + async/await
// 4) 3 summary statistics
// 5) search bar (title)
// 6) extra filter (calorie band)

import { useEffect, useMemo, useState } from "react";
import "./App.css";
import RecipeRow from "./components/RecipeRow.jsx";

const API_KEY = import.meta.env.VITE_SPOONACULAR_KEY;

export default function App() {
  const [recipes, setRecipes] = useState([]); // raw combined recipes
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ui state
  const [searchInput, setSearchInput] = useState("");
  const [calorieFilter, setCalorieFilter] = useState("all");

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      setError("");

      if (!API_KEY) {
        setError(
          "API key missing. Add VITE_SPOONACULAR_KEY to .env. Showing nothing."
        );
        setLoading(false);
        return;
      }

      try {
        // 1) get recipes by nutrients (10 recipes)
        // keep it simple: moderate calories, random
        const nutrientsUrl = `https://api.spoonacular.com/recipes/findByNutrients?minCalories=200&maxCalories=800&number=10&random=true&apiKey=${API_KEY}`;
        const baseRes = await fetch(nutrientsUrl);

        if (!baseRes.ok) {
          const txt = await baseRes.text();
          console.warn("Spoonacular nutrients error:", txt);
          setError("Could not load recipes by nutrients.");
          setLoading(false);
          return;
        }

        const nutrientsData = await baseRes.json(); // array of 10
        // nutrientsData items: { id, title, image, calories, protein, fat, carbs }

        // 2) for each recipe, get full info (to get pricePerServing)
        // we'll do them sequentially to keep code simple
        const fullRecipes = [];
        for (const recipe of nutrientsData) {
          const infoUrl = `https://api.spoonacular.com/recipes/${recipe.id}/information?includeNutrition=false&apiKey=${API_KEY}`;
          try {
            const infoRes = await fetch(infoUrl);
            if (!infoRes.ok) {
              console.warn("info failed for id", recipe.id);
              // still push partial so we don't lose the row
              fullRecipes.push({
                ...recipe,
                pricePerServing: null,
                readyInMinutes: null,
              });
              continue;
            }
            const infoData = await infoRes.json();
            fullRecipes.push({
              ...recipe,
              pricePerServing: infoData.pricePerServing ?? null,
              readyInMinutes: infoData.readyInMinutes ?? null,
            });
          } catch (innerErr) {
            console.warn("info fetch error for id", recipe.id, innerErr);
            fullRecipes.push({
              ...recipe,
              pricePerServing: null,
              readyInMinutes: null,
            });
          }
        }

        setRecipes(fullRecipes);
      } catch (err) {
        console.error(err);
        setError("Network error while fetching recipes.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes().catch(console.error);
  }, []);

  // ===== FILTERED LIST =====
  const filteredRecipes = useMemo(() => {
    return recipes.filter((r) => {
      // search by title
      const matchesSearch = r.title
        .toLowerCase()
        .includes(searchInput.toLowerCase());

      // filter by calories
      const calories = Number(r.calories); // from findByNutrients it's a number
      let matchesCalories = true;
      if (calorieFilter !== "all") {
        if (calorieFilter === "low") {
          matchesCalories = calories <= 400;
        } else if (calorieFilter === "mid") {
          matchesCalories = calories > 400 && calories <= 600;
        } else if (calorieFilter === "high") {
          matchesCalories = calories > 600;
        }
      }

      return matchesSearch && matchesCalories;
    });
  }, [recipes, searchInput, calorieFilter]);

  // ===== SUMMARY STATS =====
  const totalRecipes = filteredRecipes.length || recipes.length;

  // avg cost per recipe (pricePerServing is in cents for Spoonacular → divide by 100)
  const avgCost =
    recipes.length > 0
      ? (() => {
          const prices = recipes
            .map((r) => (r.pricePerServing ? r.pricePerServing / 100 : 0))
            .filter((p) => p > 0);
          if (prices.length === 0) return 0;
          const sum = prices.reduce((acc, p) => acc + p, 0);
          return (sum / prices.length).toFixed(2);
        })()
      : 0;

  // average calories from original 10
  const avgCalories =
    recipes.length > 0
      ? Math.round(
          recipes.reduce((acc, r) => acc + Number(r.calories || 0), 0) /
            recipes.length
        )
      : 0;

  return (
    <div className="page page-wide">
      {/* HEADING */}
      <header className="header header-centered">
        <h1 className="title">RecipeDash 🍽️</h1>
        <p className="subtitle">
          Spoonacular recipe helper using “search by nutrients” + recipe details.
        </p>
      </header>

      {/* SUMMARY CARDS */}
      <section className="summary-row centered-row">
        <div className="summary-card">
          <div className="summary-label">Total recipes</div>
          <div className="summary-value">{totalRecipes}</div>
        </div>
        <div className="summary-card">
          <div className="summary-label">Avg cost / recipe</div>
          <div className="summary-value">
            {avgCost ? `$${avgCost}` : "—"}
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-label">Avg calories</div>
          <div className="summary-value">{avgCalories}</div>
        </div>
      </section>

      {/* MAIN PANEL */}
      <main className="dashboard-panel centered-panel">
        <h2 className="panel-title">Recipes</h2>
        <p className="panel-subtitle">
          Search by recipe title. Filter by calorie range.
        </p>

        {/* SEARCH + FILTER */}
        <div className="controls">
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <select
            value={calorieFilter}
            onChange={(e) => setCalorieFilter(e.target.value)}
          >
            <option value="all">All calories</option>
            <option value="low">≤ 400 cal</option>
            <option value="mid">401–600 cal</option>
            <option value="high">≥ 601 cal</option>
          </select>
        </div>

        {/* LIST */}
        {loading ? (
          <p>Loading recipes…</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : filteredRecipes.length === 0 ? (
          <p>No recipes match your search/filter.</p>
        ) : (
          <ul className="recipe-list">
            {/* header row */}
            <li className="recipe-header">
              <span>Recipe</span>
              <span>Calories</span>
              <span>Protein</span>
              <span>Price</span>
            </li>
            {filteredRecipes.map((r) => (
              <RecipeRow key={r.id} recipe={r} />
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
