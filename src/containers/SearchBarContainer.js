import React, { useState } from "react";
import Searchbar from "../components/Searchbar.js";

const GUINEAPATHS = [
  "https://content.codecademy.com/courses/React/react_photo-guineapig-1.jpg",
  "https://content.codecademy.com/courses/React/react_photo-guineapig-2.jpg",
  "https://content.codecademy.com/courses/React/react_photo-guineapig-3.jpg",
  "https://content.codecademy.com/courses/React/react_photo-guineapig-4.jpg",
];

export default function SearchbarContainer() {

    const [search, setSearch] = useState(""); // state variable

    const onChangeHandler = ({target}) => { // when anything happens in the input
        setSearch(target.value);
    }

    const resetFavoriteHandler = () => {
        setSearch("");
    }

	return (
    <>
      < Searchbar search={search} changeHandler={onChangeHandler} onSubmit={resetFavoriteHandler} />
    </>
  );
};
