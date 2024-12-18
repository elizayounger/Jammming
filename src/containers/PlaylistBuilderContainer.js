import React, { useState } from "react";
import PlaylistBuilder from "../components/PlaylistBuilder.js";
import { createSpotifyPlaylist, populateNewPlaylist } from "../spotifyAPI.js";

export default function PlaylistBuilderComponent({ newPlaylist, setNewPlaylist }) {
    
    const [newPlaylistName, setNewPlaylistName] = useState("");

    function handlePlaylistNameChange({target}) {
        setNewPlaylistName(target.value);
    }

    const handleSubmitNewPlaylist = async (event) => {
        event.preventDefault(); 
        const playlist = await createSpotifyPlaylist(newPlaylistName);
        console.log(`playlist: ${JSON.stringify(playlist)}`);

        if (newPlaylist.length !== 0) {
            await populateNewPlaylist(playlist, newPlaylist);
        };

        setNewPlaylistName("");
        setNewPlaylist([]);
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
