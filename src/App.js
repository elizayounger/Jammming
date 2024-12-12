import './App.css';
import Header from "./components/Header.js";
import SearchbarContainer from "./containers/SearchbarContainer.js";
import SearchResultsContainer from "./containers/SearchResultsContainer.js";
import PlaylistCreator from "./components/PlaylistCreator.js";

function App() {
   const mockAPIList = [
      { songName: "Hello", artist: "Adele" },
      { songName: "Mamma Mia", artist: "Abba" },
      { songName: "Wagon Wheel", artist: "Bodega" },
      { songName: "Save a horse ride a cowboy", artist: "Who Knows" },
   ];
   return (
      <div className="App">
         < Header />
         < SearchbarContainer />
         <div className="resultsAndPlaylistContainer">
            < SearchResultsContainer apiSongList={mockAPIList} />
            < PlaylistCreator />
         </div>
      </div>
);
}

export default App;
