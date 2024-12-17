import React, { useState } from "react";
import PlaylistBuilder from "../components/PlaylistBuilder.js";
import { createSpotifyPlaylist } from "../spotifyAPI.js";

export default function PlaylistBuilderComponent({ newPlaylist, setNewPlaylist, setSearchResults }) {
    
    const [newPlaylistName, setNewPlaylistName] = useState("");

    function handlePlaylistNameChange({target}) {
        setNewPlaylistName(target.value);
    }

    const handleSubmitNewPlaylist = async (event) => {
        event.preventDefault(); 
        const response = await createSpotifyPlaylist(newPlaylistName);
        console.log(`response: ${response}`);
        // populateNewPlaylist(tracks)
        setNewPlaylistName("");
        console.log("setNewPlaylistName set to '");
        setNewPlaylist([]);
        console.log("setNewPlaylist set to []");
    };

    return (
        < PlaylistBuilder 
            newPlaylistName={newPlaylistName} // for playlist name
            handlePlaylistNameChange={handlePlaylistNameChange} 
            newPlaylist={newPlaylist}
            setNewPlaylist={setNewPlaylist}
            onSubmitPlaylist={handleSubmitNewPlaylist}
        />
    );
}
