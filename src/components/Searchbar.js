import React from "react";
import "./Searchbar.css";

export default function Searchbar({ search, changeHandler, onSubmit }) {
    return (<div className="Searchbar">
        <form onSubmit={onSubmit} >
            <input type="search" name="search" placeholder="Enter your search here" value={search} onChange={changeHandler} />
            <button className="searchButton">SEARCH</button>
        </form>
    </div>);
}
