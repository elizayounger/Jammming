import React from "react";
import "./SearchResults.css";
import Song from "./Song.js";

export default function SearchResults({resultsList=[]}) {
    
    const songList = resultsList.map((song, index) => (
        <li key={index}>
            <Song spotifyId={song.spotifyId} songName={song.songName} artist={song.artist} />
        </li>
    ));

    return (
        <section className="searchResults">
            <div className="resultsTabs">
                <button className="tab tabResults selected">SEARCH RESULTS</button>
                {/* <button className="tab tabPlaylists">PLAYLISTS</button> */}
            </div>

            <div className="songResults">
                <ul>
                    {songList.length > 0 ? songList : <li>No results found.</li>}
                </ul>
            </div>
        </section>
    );
}
