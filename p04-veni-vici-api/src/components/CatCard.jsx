//Displays one cat image and 3 attributes; Breed is clickable to add to ban list
export default function CatCard({ cat, onBanBreed }) {
  //Reads the first breed object from the API response
  const breed = cat.breeds?.[0] || {};
  const { name, origin, weight } = breed;

  return (
    <div className="cat-card">
      {/*Renders the cat image from the API*/}
      <img src={cat.url} alt={name} className="cat-image" />

      {/*Shows three attributes*/}
      <ul className="cat-info">
        {/*Breed button*/}
        <li>
          <strong>Breed:</strong>{" "}
          <button className="breed-pill" onClick={() => onBanBreed(name)}>
            {name}
          </button>
        </li>

        {/*Displays weight*/}
        <li>
          <strong>Weight:</strong> {weight?.imperial} lbs
        </li>

        {/*Displays country of origin*/}
        <li>
          <strong>Origin:</strong> {origin}
        </li>
      </ul>
    </div>
  );
}
