import React from "react";
import "./PlaylistBuilder.css";
import SongContainer from "../containers/SongContainer.js";

export default function PlaylistBuilder({ 
        newPlaylistName, 
        handlePlaylistNameChange, 
        newPlaylist, 
        setNewPlaylist ,
        onSubmitPlaylist
    }) {

    const playlistItems = newPlaylist.map((song, index) => (
        <li key={index}>
            <SongContainer spotifyId={song.spotifyId} songName={song.songName} album={song.album} artist={song.artist} setNewPlaylist={setNewPlaylist} plusOperator={false} />
        </li>
    ));

    return (
        <div className="playlistBuilder">
          <form className="playlistNameInput" onSubmit={onSubmitPlaylist}>
            <input 
              className="playlistName"
              type="text" 
              name="search" 
              placeholder="Enter Playlist Name..."
              maxLength={30}
              value={newPlaylistName}
              onChange={handlePlaylistNameChange}
            />
            <button type="submit" className="greenButton">Submit</button>
          </form>
      
          <ul className="playlistSongs">
            {newPlaylist.length > 0 ? playlistItems : <li>Selected songs for your new playlist will appear here.</li>}
          </ul>
        </div>
      );
      
}
