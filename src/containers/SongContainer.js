
import React from 'react';
import Song from "../components/Song.js";


export default function SongContainer({spotifyId, songName, artist, setNewPlaylist, plusOperator=true}) {
    
    function onAddClick(song) {
        setNewPlaylist(prev => [...prev, song]);
    }
    function onRemoveClick(song) {
        setNewPlaylist(prev => prev.filter(item => item.spotifyId !== song.spotifyId));
    }
    
    
    return (<>
        {plusOperator ? 
            (< Song spotifyId={spotifyId} songName={songName} artist={artist} plusOperator={plusOperator} OnOperatorClick={onAddClick} />) : // with add song functionality
            (< Song spotifyId={spotifyId} songName={songName} artist={artist} plusOperator={plusOperator} OnOperatorClick={onRemoveClick} />) // with remove song functionality
        }
    </>);
}