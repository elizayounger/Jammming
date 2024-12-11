import React from 'react';
import "./Song.css";

export default function Song({songName="SONG NAME", artist="Artist"}) {
    return (<div className="song">
        <svg 
            className="icon"
            xmlns="http://www.w3.org/2000/svg" 
            height="34px" 
            viewBox="0 -960 960 960" 
            width="24px" 
            fill="#5f6368"
        >
            <path d="m380-300 280-180-280-180v360ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
        </svg>

        <div className="songDetails">
            <p className="songName">{songName}</p>
            <p className="artist">{artist}</p>
        </div>

        <svg 
            className="icon"
            xmlns="http://www.w3.org/2000/svg" 
            height="34px" 
            viewBox="0 -960 960 960" 
            width="24px" 
            fill="#5f6368"
        >
            <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/>
        </svg>
    </div>);
}