import React, { useState } from "react";
import PlaylistBuilder from "../components/PlaylistBuilder.js";

export default function PlaylistBuilderComponent({ newPlaylist, setNewPlaylist }) {
    
    const [newPlaylistName, setNewPlaylistName] = useState("");
    function handlePlaylistNameChange({target}) {
        setNewPlaylistName(target.value);
    }

    const handleSubmitNewPlaylist = () => {};

    return (
        < PlaylistBuilder 
            newPlaylistName={newPlaylistName} // for playlist name
            handlePlaylistNameChange={handlePlaylistNameChange} 
            newPlaylist={newPlaylist}
            setNewPlaylist={setNewPlaylist}
        />
    );
}
