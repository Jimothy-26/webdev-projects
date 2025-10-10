/*Import state hook*/
import { useState } from 'react';
/*Import app styles*/
import './App.css';
/*Import flashcard component*/
import Flashcard from './components/Flashcard';

const App = () => {
  /*Store flashcards*/
  const cards = [
    { q: 'When is it legal to turn right on red?', a: 'After a full stop, no sign prohibiting, and the way is clear' },
    { q: 'What do you do at a flashing red signal?', a: 'Stop then proceed when safe' },
    { q: 'What is the speed limit near schools when children are present?', a: '25 mph unless a lower 15 mph is posted' },
    { q: 'When must headlights be on?', a: '30 minutes after sunset to 30 minutes before sunrise and when visibility is poor' },
    { q: 'What is the BAC limit for drivers under 21?', a: '0.01% or higher is illegal' },
    { q: 'How should you handle a tailgater?', a: 'Maintain speed and lane then change lanes when safe to let them pass' },
    { q: 'What do you do for a school bus with flashing red lights?', a: 'Stop from either direction until the lights stop' },
    { q: 'What is the hand signal for a left turn?', a: 'Left arm extended straight out' },
    { q: 'How do you park uphill with a curb?', a: 'Turn wheels away from the curb and let the tire rest on the curb' },
    { q: 'When can minors use a cell phone while driving?', a: 'Only to call for emergency otherwise not allowed' },
  ];

  /*Track current card index*/
  const [index, setIndex] = useState(0);
  /*Track flip state*/
  const [isFlipped, setIsFlipped] = useState(false);

  /*Track user guess*/
  const [guess, setGuess] = useState('');
  /*Track feedback status*/
  const [status, setStatus] = useState('idle');
  /*Track current streak*/
  const [currentStreak, setCurrentStreak] = useState(0);
  /*Track best streak*/
  const [bestStreak, setBestStreak] = useState(0);

  /*Normalize text basic*/
  const strip = (s) => s.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();

  /*Fuzzy or partial match*/
  const partialMatch = (guess, answer) => {
    const g = strip(guess);
    const a = strip(answer);
    if (!g) return false;

    /*Exact match*/
    if (g === a) return true;

    /*Substring only if long*/
    if (g.length >= 4 && a.includes(g)) return true;

    /*Token ratio check*/
    const gTokens = g.split(/\s+/).filter(Boolean).filter(t => t.length >= 3);
    if (gTokens.length === 0) return false;

    const aTokens = new Set(a.split(/\s+/).filter(Boolean));
    const hits = gTokens.filter(t => aTokens.has(t)).length;
    const ratio = hits / gTokens.length;

    return ratio >= 0.6;
  };

  /*Toggle flip state*/
  const handleFlip = () => setIsFlipped(prev => !prev);

  /*Go to previous card*/
  const prevCard = () => {
    if (index > 0) {
      setIndex(index - 1);
      setIsFlipped(false);
      setGuess('');
      setStatus('idle');
    }
  };

  /*Go to next card*/
  const nextCard = () => {
    if (index < cards.length - 1) {
      setIndex(index + 1);
      setIsFlipped(false);
      setGuess('');
      setStatus('idle');
    }
  };

  /*Handle guess typing*/
  const handleGuessChange = (e) => {
    setGuess(e.target.value);
    if (status !== 'idle') setStatus('idle');
  };

  /*Submit and validate guess*/
  const handleGuessSubmit = (e) => {
    e.preventDefault();
    const user = guess;
    const ans = cards[index].a;
    if (!user.trim()) return;

    if (partialMatch(user, ans)) {
      setStatus('correct');
      setCurrentStreak((s) => {
        const next = s + 1;
        setBestStreak((b) => Math.max(b, next));
        return next;
      });
    } else {
      setStatus('wrong');
      setCurrentStreak(0);
      setIsFlipped(false);
    }
  };

  /*Render UI*/
  return (
    <div className="App">
      <div className="header">
        <h1>Keys to the Road: CA DMV Flashcards</h1>
        <h2>Are you practicing to take (or retake) your DMV permit exam? Test yourself before the real permit exam!</h2>
        <h3>Number of cards: {cards.length}</h3>
        <div className="meta">
          <span>Current Streak: {currentStreak}</span>
          <span>Best Streak: {bestStreak}</span>
        </div>
      </div>

      {/*Center flashcard*/}
      <div className="stage">
        <Flashcard
          front={cards[index].q}
          back={cards[index].a}
          isFlipped={isFlipped}
          onFlip={handleFlip}
        />
      </div>

      {/*Guess input row*/}
      <form className="guess-row" onSubmit={handleGuessSubmit}>
        <label htmlFor="guess" className="guess-label">Your guess:</label>
        <input
          id="guess"
          className={`guess-input ${status === 'correct' ? 'good' : ''} ${status === 'wrong' ? 'bad' : ''}`}
          type="text"
          placeholder="Type your answer…"
          value={guess}
          onChange={handleGuessChange}
        />
        <button type="submit" className="submit-btn">Submit</button>
      </form>

      {/*Feedback bubble*/}
      <div className="feedback" aria-live="polite">
        {status === 'correct' && <div className="bubble good-bubble">Correct</div>}
        {status === 'wrong' && <div className="bubble bad-bubble">Incorrect</div>}
      </div>

      {/*Navigation controls*/}
      <div className="controls">
        <button
          className="arrow-btn"
          onClick={prevCard}
          disabled={index === 0}
        >
          Back
        </button>

        <button
          className="arrow-btn"
          onClick={nextCard}
          disabled={index === cards.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
