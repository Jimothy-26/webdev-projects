// Wraps the app in a router so we can have different pages for create, summary, detail, and edit.
// Defines routes that give each crewmate a unique URL and connect summary, detail, edit.

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import CreateCrewmate from "./components/CreateCrewmate";
import Gallery from "./components/Gallery";
import CrewmateDetail from "./components/CrewmateDetail";
import EditCrewmate from "./components/EditCrewmate";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        {/* Title at the top of the app */}
        <h1 className="app-title">Welcome to Crewmate Creator!</h1>
        <p className="app-subtitle">Build the your own team before sending them into space!</p>

        <div className="app-layout">
          {/* Sidebar navigation to reach all required pages */}
          <aside className="sidebar">
            <div className="sidebar-title">Navigation</div>
            <ul className="sidebar-nav">
              <li>
                <Link to="/" className="sidebar-link">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/create" className="sidebar-link">
                  Create Crewmate
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="sidebar-link">
                  Crewmate Gallery
                </Link>
              </li>
            </ul>
          </aside>

          {/* routes connecting create, summary, detail, and edit views */}
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              {/* Create form page */}
              <Route path="/create" element={<CreateCrewmate />} />
              {/* Summary list page */}
              <Route path="/gallery" element={<Gallery />} />
              {/* Unique URL detail page for each crewmate */}
              <Route path="/crewmate/:id" element={<CrewmateDetail />} />
              {/* Edit page for updating or deleting a crewmate */}
              <Route path="/crewmate/:id/edit" element={<EditCrewmate />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;