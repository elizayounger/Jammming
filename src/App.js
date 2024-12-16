import React, { useState, useEffect } from 'react';
import './App.css';
import Header from "./components/Header.js";
import SearchbarContainer from "./containers/SearchBarContainer.js";
import SearchResults from "./components/SearchResults.js";
import PlaylistBuilderContainer from "./containers/PlaylistBuilderContainer.js";
import { getAuthorization, extractAccessToken } from './spotifyAPI.js';

function App() {

   // -------------------------------------------API Setup-------------------------------------------

   // // Call this function on page load (in the callback page)
   // window.onload = () => {
   // extractAccessToken();
   // };

// -------------------------------------------User's Search-------------------------------------------

   const [userSearch, setUserSearch] = useState("");

// -------------------------------------------Search Results (API)-------------------------------------------
   
   const mockAPIList = [
      { spotifyId:"001", songName: "Hello", album: "25", artist: "Adele" },
      { ispotifyIdd:"002", songName: "Mamma Mia", album: "ABBA Gold", artist: "Abba" },
      { spotifyId:"003", songName: "Wagon Wheel", album: "BODEGA", artist: "Bodega" },
      { spotifyId:"004", songName: "Save a horse ride a cowboy", album: "Horse of a Different Colour", artist: "Big & Rich" },
      { spotifyId:"005", songName: "Heavy is the Crown", album: "Arcane League of Legends", artist: "Mike Shinoda" },
      { spotifyId:"006", songName: "JOYRIDE", album: "KESHA", artist: "Kesha" },
      { spotifyId:"007", songName: "Good Bi", album: "SINGLE", artist: "Beth McCarthy" },
      { spotifyId:"008", songName: "Wide Open Spaces", album: "The Chicks", artist: "Dixie Chicks" },
   ];

   const [searchResults, makeSearch] = useState([]);

// -------------------------------------------new Playlist-------------------------------------------

   const [newPlaylist, setNewPlaylist] = useState([]);

// ------------------------------------------- JSX ----------------------------------------------------

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
