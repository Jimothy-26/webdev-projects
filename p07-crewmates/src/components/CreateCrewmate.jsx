// contains a page that s a create form to add a new crewmate"
// users enter a name and attributes (speed and color) and saves them to the database.

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../client';

const COLORS = ['Red', 'Green', 'Blue', 'Purple', 'Yellow', 'Orange', 'Pink', 'Rainbow'];

export default function CreateCrewmate() {
  // track form fields for the new crewmate
  const [name, setName] = useState('');
  const [speed, setSpeed] = useState('');
  const [color, setColor] = useState(COLORS[0]);
  const navigate = useNavigate();

  // creates a new crewmate entry in the table when the form is submitted
  const handleCreate = async (event) => {
    event.preventDefault();

    // avoid creating a crewmate with empty fields
    if (!name || !speed) return;

    await supabase
      .from('Crewmates')
      .insert({
        name,
        speed: Number(speed),
        color,
      })
      .select();

    // after creating a crewmate, go to the summary page (gallery)
    navigate('/gallery');
  };

  return (
    <div className="page create-page">
      <h1>Create a New Crewmate</h1>

      {/* create form to add a new crewmate */}
      <form onSubmit={handleCreate} className="crewmate-form">
        <div>
          <label>Name:</label>
          {/* user can name the crewmate */}
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter crewmate's name"
          />
        </div>

        <div>
          <label>Speed (mph):</label>
          {/* user can set an attribute by entering speed */}
          <input
            type="number"
            step="0.1"
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
            placeholder="Enter speed in mph"
          />
        </div>

        <div>
          <label>Color:</label>
          {/* user can set an attribute by clicking one of colors */}
          {COLORS.map((c) => (
            <label key={c} style={{ display: 'block' }}>
              <input
                type="radio"
                value={c}
                checked={color === c}
                onChange={() => setColor(c)}
              />
              {c}
            </label>
          ))}
        </div>

        <button type="submit">Create Crewmate</button>
      </form>
    </div>
  );
}