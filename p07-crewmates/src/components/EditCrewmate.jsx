import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../client';

const COLORS = ['Red', 'Green', 'Blue', 'Purple', 'Yellow', 'Orange', 'Pink', 'Rainbow'];

export default function EditCrewmate() {
  const { id } = useParams();
  const navigate = useNavigate();

  // track editable fields for the selected crewmate
  const [name, setName] = useState('');
  const [speed, setSpeed] = useState('');
  const [color, setColor] = useState(COLORS[0]);

  // load the current attributes of the crewmate into the update form
  useEffect(() => {
    const fetchCrewmate = async () => {
      const { data, error } = await supabase
        .from('Crewmates')
        .select()
        .eq('id', id)
        .single();

      if (error) {
        console.error(error);
      } else if (data) {
        setName(data.name);
        setSpeed(data.speed);
        setColor(data.color);
      }
    };

    fetchCrewmate();
  }, [id]);

  // update the existing crewmate entry with edited attribute values
  const handleUpdate = async (event) => {
    event.preventDefault();

    await supabase
      .from('Crewmates')
      .update({
        name,
        speed: Number(speed),
        color,
      })
      .eq('id', id);

    // after updating, show the changes on the detail page
    navigate(`/crewmate/${id}`);
  };

  // delete the current crewmate from the database
  const handleDelete = async (event) => {
    event.preventDefault();

    await supabase
      .from('Crewmates')
      .delete()
      .eq('id', id);

    // after deleting, the crewmate will no longer appear in the summary page
    navigate('/gallery');
  };

  return (
    <div className="page edit-page">
      <h1>Update Your Crewmate :</h1>
      <p>Current Crewmate Info: Name: {name}, Speed: {speed}, Color: {color}</p>

      {/* update form showing current attributes */}
      <form onSubmit={handleUpdate} className="crewmate-form">
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

        <button type="submit">Update Crewmate</button>

        {/* delete button to remove the crewmate from the list */}
        <button
          type="button"
          className="delete-button"
          onClick={handleDelete}
          style={{ marginLeft: '1rem' }}
        >
          Delete Crewmate
        </button>
      </form>
    </div>
  );
}