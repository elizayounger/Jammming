import logo from './logo.svg';
import './App.css';
import Header from "./components/Header.js";
import Searchbar from "./components/Searchbar.js";
import SearchResults from "./components/SearchResults.js";

function App() {
  return (
    <div className="App">
      < Header />
      < Searchbar />
      <div className="resultsAndPlaylistContainer">
        < SearchResults />
        < SearchResults />
      </div>
      
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
