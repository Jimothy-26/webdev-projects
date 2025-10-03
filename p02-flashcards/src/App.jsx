//Import state hook to track changing values
import { useState } from 'react';
//Import styles from app screen
import './App.css';
//Import Flashcard component to render the flips
import Flashcard from './components/Flashcard';

const App = () => {
  //Stores flashcards
  const cards = [
    { q: 'What does a solid red traffic light mean?', a: 'Stop and remain stopped until green.' },
    { q: 'What is the legal BAC limit for adults (21+)?', a: '0.08% in California.' },
    { q: 'When must headlights be used?', a: 'From 30 minutes after sunset to 30 minutes before sunrise, and in poor visibility.' },
    { q: 'What does a broken yellow line mean?', a: 'Passing is allowed if safe.' },
    { q: 'At a 4-way stop, who goes first?', a: 'The first vehicle to stop; otherwise yield to the right.' },
    { q: 'Minimum following distance (good weather)?', a: '3-second rule (more if heavy/poor conditions).' },
    { q: 'School bus with flashing red lights?', a: 'Stop from either direction until the lights stop.' },
    { q: 'What does a flashing yellow signal mean?', a: 'Proceed with caution.' },
    { q: 'What is a double solid yellow line?', a: 'No passing in either direction (except left turns across it when safe).' },
    { q: 'When to signal before turning?', a: 'At least 100 feet before the turn.' },
  ];

  //Tracks which card index is shown
  const [index, setIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  //Tracks if the card is showing the opposite side
  const handleFlip = () => setIsFlipped(prev => !prev);
  //Placeholder back button
  const handleBack = () => {
    console.log('Back clicked (no behavior yet).');
  };
  //Chooses the next randomize card 
  const nextRandom = () => {
    if (cards.length <= 1) 
      return; //If only one card, skip
    let n = index;
    while (n === index) {
      n = Math.floor(Math.random() * cards.length);
    }
    setIndex(n); //Updates the shown card
    setIsFlipped(false); //Ensures the new card starts on the front
  };

  return (
    //Shows the heading with the title and description 
    <div className="App">
      <div className="header">
        <h1>Keys to the Road: CA DMV Flashcards</h1>
        <h2> Are you practicing to take (or retake) your DMV permit exam? Test yourself before the real permit exam!</h2>
        <h3> Number of cards: {cards.length} </h3>
      </div>


      {/*Center the flashcard to the page*/}
      <div className="stage"> 
        <Flashcard
          front={cards[index].q}
          back={cards[index].a}
          isFlipped={isFlipped}
          onFlip={handleFlip}
        />
      </div>
  
      {/*Controls centered under the card*/}
      <div className="controls">
      <button className="arrow-btn" onClick={handleBack}>Back</button>
      <button className="arrow-btn" onClick={nextRandom}>Next</button>  
      </div>
    </div>
  );
};

export default App;
