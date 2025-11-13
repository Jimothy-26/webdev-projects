// src/pages/CrewmateDetail.jsx
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../client';

export default function CrewmateDetail() {
  const { id } = useParams();
  const [crewmate, setCrewmate] = useState(null);

  useEffect(() => {
    const fetchCrewmate = async () => {
      const { data, error } = await supabase
        .from('Crewmates')
        .select()
        .eq('id', id)
        .single();

      if (error) {
        console.error(error);
      } else {
        setCrewmate(data);
      }
    };

    fetchCrewmate();
  }, [id]);

  if (!crewmate) return <div className="page">Loading...</div>;

  // simple “extra info” based on speed
  let message = '';
  if (crewmate.speed < 2) {
    message = 'You may want to find a Crewmate with more speed, this one is kind of slow 😬';
  } else if (crewmate.speed < 5) {
    message = 'Nice balanced Crewmate, not too fast, not too slow.';
  } else {
    message = 'Wow, this Crewmate is SUPER fast! 🚀';
  }

  return (
    <div className="page detail-page">
      <h1>Crewmate: {crewmate.name}</h1>

      <h2>Stats:</h2>
      <p>Color: {crewmate.color}</p>
      <p>Speed: {crewmate.speed} mph</p>

      {/* Extra info not shown in gallery */}
      <p style={{ marginTop: '2rem' }}>{message}</p>

      <Link to={`/crewmate/${crewmate.id}/edit`} className="button">
        Wanna edit this Crewmate?
      </Link>
    </div>
  );
}
