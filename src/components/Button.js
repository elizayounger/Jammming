import React, { useState, useEffect } from "react";
import './Button.css';
import { handleSpotifyAuth } from "../spotifyAPI.js"; // Import extractAccessToken

export default function Button() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);  // State to track if the user is logged in

    useEffect(() => {
        checkLoginStatus(); // check if user is logged in
    }, []);

    const checkLoginStatus = () => {
        const storedToken = localStorage.getItem('access_token');
        if (storedToken) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    };

    const handleClick = async () => {
        if (isLoggedIn) {
            localStorage.removeItem('access_token'); 
            checkLoginStatus();
        } else {
            handleSpotifyAuth();  // Call the getAuthorization function for login
            checkLoginStatus();  // Change state to show "LOGOUT" before redirection
        }
    };

    return (
        <button className="button header-button" onClick={handleClick}>
            {isLoggedIn ? "LOGOUT" : "LOGIN"}
        </button>
    );
}
