//Shows a single flashcard and flips vertically on click.
const Flashcard = ({ front, back, isFlipped, onFlip }) => {
  return (
    <div className={`flip-card ${isFlipped ? 'flipped' : ''}`}>
      {/* The inner panel rotates when .flipped is present on the parent */}
      <div className="flip-card-inner" onClick={onFlip}>
        <div className="flip-card-front">
          <p>{front}</p>
        </div>
        <div className="flip-card-back">
          <p>{back}</p>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
