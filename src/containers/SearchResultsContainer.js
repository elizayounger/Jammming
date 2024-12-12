import React, { useState, useEffect } from "react";
import SearchResults from "../components/SearchResults.js";

export default function SearchbarContainer({searchResults}) {

    function handleAddSongToPlaylist({ target }) {
        
    }

    return (
        <>
            < SearchResults resultsList={searchResults} />
        </>
    );        
}
