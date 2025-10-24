//Shows the banned breeds list and lets the user remove a breed by clicking it
export default function BanList({ bannedBreeds, onRemove }) {
//Renders set of banned breeds
const breeds = Array.from(bannedBreeds);

  return (
    <div className="banlist">
      {/*Litter Box/ Banned List*/}
      <h3>Litter Box</h3>

      {/*Button for banned breeds*/}
      {breeds.map((b) => (
        <button key={b} className="ban-pill" onClick={() => onRemove(b)}>
          X {b}
        </button>
))}
    </div>
  );
}
