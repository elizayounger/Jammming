import React from "react";
import Searchbar from "../components/Searchbar.js";
import { getSpotifySearch } from "../spotifyAPI.js";


export default function SearchbarContainer({ userSearch , setUserSearch, makeSearch }) {

   const onChangeHandler = ({target}) => {
      setUserSearch(target.value);
   }

   const handleSubmit = async ({ searchQuery }) => {
      try {
         const searchQuery = "your search query here"; // Replace with an actual search query
         const searchResults = await getSpotifySearch(searchQuery);
         console.log(searchResults); // Already formatted track details
      } catch (error) {
         console.error(error);
      }
      // makeSearch(searchAPI(userSearch));
      setUserSearch("");
   }

   return (
      <>
         < Searchbar search={userSearch} changeHandler={onChangeHandler} onSubmit={handleSubmit} />
         <p>Search Results for: "{userSearch}"</p>
      </>
   );
};
