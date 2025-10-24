//Imports React hooks, styles, and child components
import { useState } from "react";
import "./App.css";
import CatCard from "./components/CatCard";
import BanList from "./components/BanList";

//Loads the Cat API access key from the Vite environment
const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

function App() {
  //Stores the current cat and the set of banned breeds
  const [currentCat, setCurrentCat] = useState(null);
  const [bannedBreeds, setBannedBreeds] = useState(new Set());

  //Creates the API URL using fixed parameters
  const url =
    "https://api.thecatapi.com/v1/images/search?limit=1&has_breeds=1&order=RAND";

  //Fetches one random cat
  const fetchCat = async () => {
    setCurrentCat(null);
    const headers = { "x-api-key": ACCESS_KEY };

    while (true) {
      const res = await fetch(url, { headers });
      const data = await res.json();
      const cat = data[0];

      const breedName = cat.breeds[0].name;

      //Skip if breed is banned
      if (bannedBreeds.has(breedName)) continue;

      //Show cat
      setCurrentCat(cat);
      break;
    }
  };

  //Adds breed to the ban list
  const handleBanBreed = (breedName) => {
    if (breedName) {
      setBannedBreeds((prev) => new Set(prev).add(breedName));
    }
  };

  //Removes breed from the ban list
  const handleRemoveBreed = (breedName) => {
    const copy = new Set(bannedBreeds);
    copy.delete(breedName);
    setBannedBreeds(copy);
  };

  return (
    <div className="app">
      {/*Title and subtitle*/}
      <h1 className="title">Oh My Gatos!</h1>
      <h2 className="subtitle">So many cats! Discover new cats with every click!</h2>

      {/*Display current cat*/}
      {currentCat ? (
        <CatCard cat={currentCat} onBanBreed={handleBanBreed} />
      ) : (
        <p>Click the button to learn about a random cat!</p>
      )}

      {/*Button to fetch a new random cat*/}
      <button className="pspsps-button" onClick={fetchCat}>
        pspsps, Here Kitty Kitty!
      </button>

      {/*Ban list sidebar*/}
      <BanList bannedBreeds={bannedBreeds} onRemove={handleRemoveBreed} />
    </div>
  );
}

export default App;
