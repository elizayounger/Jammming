import React from "react";
import "./SearchResults.css";
import Song from "./Song.js";

export default function SearchResults() {
    return (<div className="searchResults">
        <div className="resultsTabs">
            <button className="tab tabResults selected">RESULTS</button>
            <button className="tab tabPlaylists">PLAYLISTS</button>
        </div>
        <div className="songResults">
            < Song />
            < Song />
            < Song />
            < Song />
            < Song />
            < Song />
            < Song />
            < Song />
        </div>
    </div>);
}
