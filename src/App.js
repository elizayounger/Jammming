import React, { useState, useEffect } from 'react';
import './App.css';
import Header from "./components/Header.js";
import SearchbarContainer from "./containers/SearchBarContainer.js";
import SearchResults from "./components/SearchResults.js";
import PlaylistBuilderContainer from "./containers/PlaylistBuilderContainer.js";
import { handleSpotifyAuth, getProfile } from './spotifyAPI.js';

function App() {

   useEffect(() => {
      handleSpotifyAuth();
   }, []);
   
   const [searchResults, setSearchResults] = useState([]);
   const [newPlaylist, setNewPlaylist] = useState([]);

   return (
      <div className="App">
         < Header />
         < SearchbarContainer setSearchResults={setSearchResults} />
         <div className="resultsAndPlaylistContainer">
            < SearchResults searchResults={searchResults} setNewPlaylist={setNewPlaylist} />
            < PlaylistBuilderContainer 
               newPlaylist={newPlaylist} 
               setNewPlaylist={setNewPlaylist} 
            />
         </div>
      </div>
   );
}

export default App;
