import React, { useState } from 'react';
import './App.css';
import Header from "./components/Header.js";
import SearchbarContainer from "./containers/SearchBarContainer.js";
import SearchResults from "./components/SearchResults.js";
import PlaylistBuilderContainer from "./containers/PlaylistBuilderContainer.js";

function App() {
// -------------------------------------------User's Search-------------------------------------------

   const [userSearch, setUserSearch] = useState("");

// -------------------------------------------Search Results (API)-------------------------------------------
   
   const mockAPIList = [
      { spotifyId:"001", songName: "Hello", artist: "Adele" },
      { ispotifyIdd:"002", songName: "Mamma Mia", artist: "Abba" },
      { spotifyId:"003", songName: "Wagon Wheel", artist: "Bodega" },
      { spotifyId:"004", songName: "Save a horse ride a cowboy", artist: "Who Knows" },
   ];

   const [searchResults, makeSearch] = useState(mockAPIList);

// -------------------------------------------new Playlist-------------------------------------------

   const mockNewPlaylist = [
      { spotifyId:"005", songName: "Heavy is the Crown", artist: "Mike Shinoda" },
      { spotifyId:"006", songName: "JOYRIDE", artist: "Kesha" },
      { spotifyId:"007", songName: "Good Bi", artist: "Beth McCarthy" },
      { spotifyId:"008", songName: "Wide Open Spaces", artist: "The Chicks" },
   ];

   const [newPlaylist, setNewPlaylist] = useState(mockNewPlaylist);

   return (
      <div className="App">
         < Header />
         < SearchbarContainer userSearch={userSearch} setUserSearch={setUserSearch} makeSearch={makeSearch} />
         <div className="resultsAndPlaylistContainer">
            < SearchResults searchResults={searchResults} setNewPlaylist={setNewPlaylist} />
            < PlaylistBuilderContainer newPlaylist={newPlaylist} setNewPlaylist={setNewPlaylist} />
         </div>
      </div>
   );
}

export default App;
