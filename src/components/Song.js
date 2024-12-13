import React from 'react';
import "./Song.css";
import { ReactComponent as AddIcon } from '../resources/icons/add.svg';
import { ReactComponent as SubtractIcon } from '../resources/icons/remove.svg';
import { ReactComponent as PlayIcon } from '../resources/icons/playCircle.svg';


export default function Song({spotifyId, songName="SONG NAME", artist="Artist", plusOperator, OnOperatorClick }) {

    return (<div id={spotifyId} className="song">
        < PlayIcon className="icon" /> 

        <div className="songDetails">
            <p className="songName">{songName}</p>
            <p className="artist">{artist}</p>
        </div>

        {plusOperator ? // if plusOperator true will return song with plus icon 
            (< AddIcon className="icon" onClick={() => OnOperatorClick({ spotifyId, songName, artist })} />) :
            (< SubtractIcon className="icon" /*onClick={() => onRemoveClick({ spotifyId })}*/ />) // else subtract icon
        }
    </div>);
}