import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../client';

const COLORS = ['Red', 'Green', 'Blue', 'Purple', 'Yellow', 'Orange', 'Pink', 'Rainbow'];

export default function CreateCrewmate() {
  const [name, setName] = useState('');
  const [speed, setSpeed] = useState('');
  const [color, setColor] = useState(COLORS[0]);
  const navigate = useNavigate();

  const handleCreate = async (event) => {
    event.preventDefault();

    // simple guard
    if (!name || !speed) return;

    await supabase
      .from('Crewmates')
      .insert({
        name,
        speed: Number(speed),
        color,
      })
      .select(); // not strictly needed but mirrors the lab

    // go to gallery after creating
    navigate('/gallery');
  };

  return (
    <div className="page create-page">
      <h1>Create a New Crewmate</h1>

      <form onSubmit={handleCreate} className="crewmate-form">
        <div>
          <label>Name:</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter crewmate's name"
          />
        </div>

        <div>
          <label>Speed (mph):</label>
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
