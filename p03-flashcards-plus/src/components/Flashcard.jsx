/*Show single flashcard*/
const Flashcard = ({ front, back, isFlipped, onFlip }) => {
  return (
    /*Flip container*/
    <div className={`flip-card ${isFlipped ? 'flipped' : ''}`}>
      {/*Rotate inner panel*/}
      <div className="flip-card-inner" onClick={onFlip}>
        {/*Front face content*/}
        <div className="flip-card-front">
          <p>{front}</p>
        </div>
        {/*Back face content*/}
        <div className="flip-card-back">
          <p>{back}</p>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
