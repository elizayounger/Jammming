import React, { useState } from "react";
import Searchbar from "../components/Searchbar.js";
import { mockAPICall, getSpotifySearch } from "../spotifyAPI.js";

export default function SearchbarContainer({ setSearchResults }) {
   const [userSearchInput, setUserSearchInput] = useState(""); 

   const onChangeHandler = ({ target }) => {
      setUserSearchInput(target.value);
   };

   const handleSubmit = async (event) => {
      event.preventDefault(); 
      
      setSearchResults([]);
      try {
         if (!userSearchInput.trim()) {
            console.warn("Search query is empty.");
            return;
         }
         const results = await getSpotifySearch(userSearchInput); 
         setSearchResults(results);
         console.log(results); // for debugging, remember to remove

      } catch (error) {
         console.error("Error fetching search results:", error);
      }
      // const searchResultsFor = getElementById(); // change this so that only changes after submit
   };

   return (
      <>
         <Searchbar
            search={userSearchInput}
            changeHandler={onChangeHandler}
            onSubmit={handleSubmit}
         />
         {/* Display the current search term */}
         <p>Search Results for: "{userSearchInput}"</p>
      </>
   );
}
