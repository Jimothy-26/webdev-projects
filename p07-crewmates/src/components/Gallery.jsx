import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../client';
import CrewmateCard from '../components/CrewmateCard';

export default function Gallery() {
  const [crewmates, setCrewmates] = useState([]);

  // read all crewmates from the table and order them by creation date
  useEffect(() => {
    const fetchCrewmates = async () => {
      const { data, error } = await supabase
        .from('Crewmates')
        .select()
        .order('created_at', { ascending: false });

      if (error) {
        console.error(error);
      } else {
        setCrewmates(data);
      }
    };

    fetchCrewmates();
  }, []);

  // summary page still works when there are no crewmates yet
  if (crewmates.length === 0) {
    return (
      <div className="page gallery-page">
        <h1>Your Crewmate Gallery!</h1>
        <p>You haven't made a crewmate yet!</p>
        <Link to="/create" className="button">
          Create one here!
        </Link>
      </div>
    );
  }

  return (
    <div className="page gallery-page">
      <h1>Your Crewmate Gallery!</h1>

      {/* shows all crewmates the user has made so far */}
      <div className="gallery-grid">
        {crewmates.map((c) => (
          <CrewmateCard key={c.id} crewmate={c} />
        ))}
      </div>
    </div>
  );
}