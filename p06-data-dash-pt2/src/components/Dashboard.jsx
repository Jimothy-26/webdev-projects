// dashboard view for summary stats, charts, search, filter, and list

import { useEffect, useMemo, useState } from "react";
import RecipeRow from "./RecipeRow.jsx";
import RecipeCharts from "./RecipeCharts.jsx";

const API_KEY = import.meta.env.VITE_SPOONACULAR_KEY;

export default function Dashboard() {
  // loading recipes
  const [recipes, setRecipes] = useState([]);
  // loading flag while we fetch
  const [loading, setLoading] = useState(true);
  // search text
  const [searchInput, setSearchInput] = useState("");
  // calorie filter choice
  const [calorieFilter, setCalorieFilter] = useState("all");

  // load data once
  useEffect(() => {
    const loadData = async () => {
      // get at least 10 recipes with basic nutrient data
      const res = await fetch(
        `https://api.spoonacular.com/recipes/findByNutrients?minCalories=200&maxCalories=800&number=10&random=true&apiKey=${API_KEY}`
      );
      const base = await res.json();

      // get price for charts and list info 
      const detailed = await Promise.all(
        base.map(async (r) => {
          const infoRes = await fetch(
            `https://api.spoonacular.com/recipes/${r.id}/information?includeNutrition=false&apiKey=${API_KEY}`
          );
          const info = await infoRes.json();
          return {
            ...r,
            pricePerServing: info.pricePerServing ?? null,
          };
        })
      );

      setRecipes(detailed);
      setLoading(false);
    };

    loadData().catch(console.error);
  }, []);

  // build the list based on search and calorie filter
  const filteredRecipes = useMemo(() => {
    return recipes.filter((r) => {
      // match title
      const matchesSearch = r.title
        .toLowerCase()
        .includes(searchInput.toLowerCase());

      // match calories
      const cals = Number(r.calories || 0);
      let matchesCalories = true;
      if (calorieFilter === "low") matchesCalories = cals <= 400;
      if (calorieFilter === "mid") matchesCalories = cals > 400 && cals <= 600;
      if (calorieFilter === "high") matchesCalories = cals > 600;

      return matchesSearch && matchesCalories;
    });
  }, [recipes, searchInput, calorieFilter]);

  // total recipes currently shown
  const totalRecipes = filteredRecipes.length;

  // average price from all recipes
  const avgPrice = (() => {
    if (!recipes.length) return 0;
    const dollars = recipes
      .map((r) => (r.pricePerServing ? r.pricePerServing / 100 : 0))
      .filter((p) => p > 0);
    if (!dollars.length) return 0;
    const sum = dollars.reduce((a, b) => a + b, 0);
    return (sum / dollars.length).toFixed(2);
  })();

  // average calories from all recipes
  const avgCalories = (() => {
    if (!recipes.length) return 0;
    const sum = recipes.reduce((a, r) => a + Number(r.calories || 0), 0);
    return Math.round(sum / recipes.length);
  })();

  return (
    <>
      {/* heading */}
      <header className="header header-centered">
        <p className="subtitle">
          Browse recipes, compare calories and prices, and click for details.
        </p>
      </header>

      {/* summary cards */}
      <section className="summary-row centered-row">
        <div className="summary-card">
          <div className="summary-label">Total recipes</div>
          <div className="summary-value">{totalRecipes}</div>
        </div>
        <div className="summary-card">
          <div className="summary-label">Avg cost / recipe</div>
          <div className="summary-value">
            {avgPrice > 0 ? `$${avgPrice}` : "—"}
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-label">Avg calories</div>
          <div className="summary-value">{avgCalories}</div>
        </div>
      </section>

      {/* charts based on full recipe list */}
      <RecipeCharts recipes={recipes} />

      {/* main dashboard panel */}
      <main className="dashboard-panel centered-panel">
        <h3 className="panel-title">Recipes</h3>
        <p className="panel-subtitle">
          Search by title. Filter by calorie band.
        </p>

        {/* controls */}
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

        {/* list */}
        {loading ? (
          <p>Loading recipes…</p>
        ) : filteredRecipes.length === 0 ? (
          <p>No recipes match your search/filter.</p>
        ) : (
          <ul className="recipe-list">
            <li className="recipe-header">
              <span>Recipe</span>
              <span>Calories</span>
              <span>Protein</span>
              <span>Price</span>
            </li>
            {filteredRecipes.map((recipe) => (
              <RecipeRow key={recipe.id} recipe={recipe} />
            ))}
          </ul>
        )}
      </main>
    </>
  );
}
