// app shell for left sidebar and routed pages

import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard.jsx";
import RecipeDetail from "./components/RecipeDetail.jsx";
import "./App.css";

export default function App() {
  return (
    <div className="app-shell">
      {/* left sidebar shown on every page */}
      <aside className="sidebar">
        <h1 className="sidebar-title">DishDash!</h1>
        <nav className="sidebar-nav">
          <div className="sidebar-item sidebar-item-active">Dashboard</div>
          <div className="sidebar-item">Search</div>
          <div className="sidebar-item">About</div>
        </nav>
      </aside>

      {/* main area: dashboard or detail view */}
      <div className="page page-wide">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
        </Routes>
      </div>
    </div>
  );
}
