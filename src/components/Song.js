import React from 'react';
import "./Song.css";
import { ReactComponent as AddIcon } from '../resources/icons/add.svg';
import { ReactComponent as SubtractIcon } from '../resources/icons/remove.svg';
import { ReactComponent as PlayIcon } from '../resources/icons/playCircle.svg';


export default function Song({songName="SONG NAME", artist="Artist", plusOperator=true, OnOperatorClick}) {

    return (<div className="song">
        < PlayIcon className="icon" /> 

        <div className="songDetails">
            <p className="songName">{songName}</p>
            <p className="artist">{artist}</p>
        </div>

        {plusOperator ? // if plusOperator true will return song with addSongCapabilites
            (<AddIcon className="icon" handleAddSongToPlaylist={OnOperatorClick}/>) :
            (<SubtractIcon className="icon"/>)
        }

    </div>);
}