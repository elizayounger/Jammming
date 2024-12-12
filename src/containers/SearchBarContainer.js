import React, { useState } from "react";
import Searchbar from "../components/Searchbar.js";


export default function SearchbarContainer() {

    const [search, setSearch] = useState(""); // state variable

    const onChangeHandler = ({target}) => { // when anything happens in the input
        setSearch(target.value);
    }

    const handleSubmit = () => {
        setSearch("");
    }

	return (
    <>
      < Searchbar search={search} changeHandler={onChangeHandler} onSubmit={handleSubmit} />
    </>
  );
};
