import React from "react";
import "./SearchResults.css";
import Song from "./Song.js";

export default function SearchResults({ resultsList = [] }) {
    const songList = resultsList.length ? (
        resultsList.map((song, index) => (
            <Song
                key={index}
                songName={song.songName}
                artist={song.artist}
            />
        ))
    ) : (
        <p className="noResults">No results found</p>
    );

    return (
        <section className="searchResults">
            <div className="resultsTabs">
                <button className="tab tabResults selected">SEARCH RESULTS</button>
                {/* <button className="tab tabPlaylists">PLAYLISTS</button> */}
            </div>

            <div className="songResults">
                <ul>{songList}</ul>
            </div>
        </section>
    );
}
