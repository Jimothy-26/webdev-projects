// fetches one crewmate by id and shows extra information
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../client';

export default function CrewmateDetail() {
  const { id } = useParams();
  const [crewmate, setCrewmate] = useState(null);

  // read a single crewmate from the database using its id
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

  return (
    <div className="page detail-page">
      <h1>Crewmate: {crewmate.name}</h1>

      <h2>Stats:</h2>
      <p>Color: {crewmate.color}</p>
      <p>Speed: {crewmate.speed} mph</p>



      {/* user can navigate from detail page to the edit form */}
      <Link to={`/crewmate/${crewmate.id}/edit`} className="button">
        Wanna edit this Crewmate?
      </Link>
    </div>
  );
}