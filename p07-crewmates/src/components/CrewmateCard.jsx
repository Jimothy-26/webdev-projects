// src/components/CrewmateCard.jsx
import { Link } from 'react-router-dom';

export default function CrewmateCard({ crewmate }) {
  return (
    <div className={`crewmate-card ${crewmate.color.toLowerCase()}`}>
      {/* Clicking card goes to detail page */}
      <Link to={`/crewmate/${crewmate.id}`} className="card-body">
        <h2>{crewmate.name}</h2>
        <p>Speed: {crewmate.speed} mph</p>
        <p>Color: {crewmate.color}</p>
      </Link>

      {/* Edit button */}
      <Link to={`/crewmate/${crewmate.id}/edit`} className="edit-button">
        Edit Crewmate
      </Link>
    </div>
  );
}
