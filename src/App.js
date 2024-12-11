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
    </div>
  );
}

export default App;
