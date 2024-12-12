import React, { useState } from "react";
import Searchbar from "../components/Searchbar.js";


export default function SearchbarContainer({ userSearch , setUserSearch, makeSearch }) {

   const onChangeHandler = ({target}) => {
      setUserSearch(target.value);
   }

   const handleSubmit = () => {
      // call the api and input the 
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
