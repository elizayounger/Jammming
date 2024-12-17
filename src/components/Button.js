import React, { useState } from "react";
import './Button.css';
import { handleSpotifyAuth } from "../spotifyAPI.js"; // Import extractAccessToken

export default function Button() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);  // State to track if the user is logged in

    // Function to check if user is logged in
    const checkLoginStatus = () => {
        const storedToken = localStorage.getItem('access_token');
        if (storedToken) {
            console.log("Token truthy, setIsLoggedIn.");
            setIsLoggedIn(true);
        } else {
            console.log("Token falsy, setIsLoggedOut.");
            setIsLoggedIn(false);
        }
    };

    const handleClick = async () => {
        if (isLoggedIn) {
            localStorage.removeItem('access_token'); 
            setIsLoggedIn(false);
        } else {
            handleSpotifyAuth();  // Call the getAuthorization function for login
            setIsLoggedIn(true);  // Change state to show "LOGOUT" before redirection
        }
    };

    return (
        <button className="button header-button" onClick={handleClick}>
            {isLoggedIn ? "LOGOUT" : "LOGIN"}
        </button>
    );
}
