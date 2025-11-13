// introductory page for user

import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="page-panel">
      <h1>Welcome to Crewmate Creator!</h1>
      <p>
        Here is where you can create your very own set of crewmates before sending
        them off into space!
      </p>

      {/* Links user to the required create form feature */}
      <Link to="/create" className="button">
        Create a Crewmate!
      </Link>
    </div>
  );
}