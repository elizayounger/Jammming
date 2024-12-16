import React from "react";
import "./SearchResults.css";
import SongContainer from "../containers/SongContainer.js";

export default function SearchResults({searchResults=[], setNewPlaylist}) {
    
    const songList = searchResults.map((song, index) => (
        <li key={index}>
            <SongContainer spotifyId={song.spotifyId} songName={song.songName} album={song.album} artist={song.artist} setNewPlaylist={setNewPlaylist} />
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
