import React, { useState, useEffect } from "react";
import './Button.css';
import { getAuthorization, extractAccessToken } from "../spotifyAPI.js"; // Import extractAccessToken

export default function Button() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);  // State to track if the user is logged in

    // Function to check if user is logged in
    const checkLoginStatus = () => {
        const token = localStorage.getItem('access_token');
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    };

    // Check login status on initial load and after redirect
    useEffect(() => {
        // Check if an access token is present in the URL after redirect
        const accessToken = extractAccessToken();
        if (accessToken) {
            // If token is found, set it in localStorage and update login state
            localStorage.setItem('access_token', accessToken);
            setIsLoggedIn(true);
        } else {
            // Otherwise, just check localStorage for a token
            checkLoginStatus();
        }
    }, []); // Empty array ensures this only runs on component mount

    // Handle button click
    const handleClick = () => {
        if (isLoggedIn) {
            localStorage.removeItem('access_token'); 
            setIsLoggedIn(false);
        } else {
            getAuthorization();  // Call the getAuthorization function for login
            setIsLoggedIn(true);  // Change state to show "LOGOUT" before redirection
        }
    };

    return (
        <button className="button header-button" onClick={handleClick}>
            {isLoggedIn ? "LOGOUT" : "LOGIN"}
        </button>
    );
}
