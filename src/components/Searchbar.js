import React from "react";
import "./Searchbar.css";

export default function Searchbar() {
    return (<div className="Searchbar">
        <form>
            <input type="search" name="search" placeholder="Enter your search here"/>
            <button className="searchButton">SEARCH</button>
        </form>
    </div>);
}