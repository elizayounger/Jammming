
import React from 'react';
import Song from "../components/Song.js";


export default function Song({spotifyId, songName, artist, plusOperator=true}) {
    
    function handleAddSongToPlaylist({ target }) {

    };
    function handleRemoveSongFromPlaylist() {}
    
    return (<>
        {plusOperator ? 
            (< Song songName="SONG NAME" artist="Artist" OnOperatorClick />) : 
            (< Song songName="SONG NAME" artist="Artist" plusOperator="false" OnOperatorClick />)
        }
    </>);
}