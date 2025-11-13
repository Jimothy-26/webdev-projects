// src/App.jsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from "./components/Home";
import CreateCrewmate from "./components/CreateCrewmate";
import Gallery from "./components/Gallery";
import CrewmateDetail from "./components/CrewmateDetail";
import EditCrewmate from "./components/EditCrewmate";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        {/* Sidebar - keep your existing styles */}
        <aside className="sidebar">
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/create">Create a Crewmate!</Link></li>
              <li><Link to="/gallery">Crewmate Gallery</Link></li>
            </ul>
          </nav>
        </aside>

        {/* Main content */}
        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateCrewmate />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/crewmate/:id" element={<CrewmateDetail />} />
            <Route path="/crewmate/:id/edit" element={<EditCrewmate />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
