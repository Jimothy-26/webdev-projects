// show each crewmate and provide links to the detail and edit pages.

import { Link } from 'react-router-dom';

export default function CrewmateCard({ crewmate }) {
  return (
    <div className={`crewmate-card ${crewmate.color.toLowerCase()}`}>
      {/* clicking on a crewmate in the summary page navigates to its info page */}
      <Link to={`/crewmate/${crewmate.id}`} className="card-body">
        <h2>{crewmate.name}</h2>
        <p>Speed: {crewmate.speed} mph</p>
        <p>Color: {crewmate.color}</p>
      </Link>

      {/* edit button that goes to the update form */}
      <Link to={`/crewmate/${crewmate.id}/edit`} className="edit-button">
        Edit Crewmate
      </Link>
    </div>
  );
}