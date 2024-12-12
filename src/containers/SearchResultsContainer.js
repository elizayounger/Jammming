import React, { useState, useEffect } from "react";
import SearchResults from "../components/SearchResults.js";

export default function SearchbarContainer({searchResults}) {

    return (
        <>
            < SearchResults resultsList={searchResults} />
        </>
    );        
}
