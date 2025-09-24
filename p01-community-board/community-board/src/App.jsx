//Root component to display a title/subtitle and the Board 
import './App.css';
import Board from './components/Board'; /*import Board component*/

const App = () => {

  return (
    <div className="App">
      {/*Main heading*/}
      <h1>Campus Connect: Student Resources</h1>
      {/*description of the board*/}
      <h2>Your one-stop board for accessing important resources from personal to professional </h2>
      <Board/> {/*adds Board component*/}
    </div>
  );
}

export default App