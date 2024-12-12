import React, { useState, useEffect } from "react";
import SearchResults from "../components/SearchResults.js";

export default function SearchbarContainer({apiSongList}) {

    const APIList = [
        { songName: "Hello", artist: "Adele" },
        { songName: "Mamma Mia", artist: "Abba" },
        { songName: "Wagon Wheel", artist: "Bodega" },
        { songName: "Save a horse ride a cowboy", artist: "Who Knows" },
     ];

    const [resultsList, setResultsList] = useState([]);

    useEffect(() => {
        setResultsList(apiSongList);
    }, []);

    return (
        < SearchResults resultsList={resultsList} />
    );
}
