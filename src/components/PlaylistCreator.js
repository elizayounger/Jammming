import React from "react";
import "./PlaylistCreator.css";
import Song from "./Song.js";

export default function SearchResults() {
    return (<div className="playlistCreator">

        <form className="playlistNameInput">
            <input className="playlistName"
                type="text" 
                name="search" 
                placeholder="Enter Playlist Name..."
                maxLength={30}
            />
            <svg className="add" xmlns="http://www.w3.org/2000/svg" height="34px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
        </form>

        <div className="playlistSongs">
            < Song songName="Hello" artist="Adele" />
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
