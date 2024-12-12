import React, { useState } from 'react';
import './App.css';
import Header from "./components/Header.js";
import SearchbarContainer from "./containers/SearchBarContainer.js";
import SearchResultsContainer from "./containers/SearchResultsContainer.js";
import PlaylistBuilderContainer from "./containers/PlaylistBuilderContainer.js";

function App() {
// -------------------------------------------User's Search-------------------------------------------

   const [userSearch, setUserSearch] = useState("");

// -------------------------------------------Search Results (API)-------------------------------------------
   
   const mockAPIList = [
      { songName: "Hello", artist: "Adele" },
      { songName: "Mamma Mia", artist: "Abba" },
      { songName: "Wagon Wheel", artist: "Bodega" },
      { songName: "Save a horse ride a cowboy", artist: "Who Knows" },
   ];

   const [searchResults, makeSearch] = useState(mockAPIList);

// -------------------------------------------new Playlist-------------------------------------------

   const mockNewPlaylist = [
      { songName: "Heavy is the Crown", artist: "Mike Shinoda" },
      { songName: "JOYRIDE", artist: "Kesha" },
      { songName: "Good Bi", artist: "Beth McCarthy" },
      { songName: "Wide Open Spaces", artist: "The Chicks" },
   ];

   const [newPlaylist, setNewPlaylist] = useState(mockNewPlaylist);

   return (
      <div className="App">
         < Header />
         < SearchbarContainer userSearch={userSearch} setUserSearch={setUserSearch} makeSearch={makeSearch} />
         <div className="resultsAndPlaylistContainer">
            < SearchResultsContainer searchResults={searchResults} />
            < PlaylistBuilderContainer newPlaylist={newPlaylist} setNewPlaylist={setNewPlaylist} />
         </div>
      </div>
   );
}

export default App;
