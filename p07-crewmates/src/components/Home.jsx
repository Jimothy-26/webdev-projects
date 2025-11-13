// src/pages/Home.jsx
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="page home-page">
      <h1>Welcome to the Crewmate Creator!</h1>
      <p>Here is where you can create your very own set of crewmates before sending them off into space!</p>

      <Link to="/create" className="button">
        Create a Crewmate
      </Link>
    </div>
  );
}
