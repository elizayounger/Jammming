//---------------------Step 1: Code Challenge ------------------------------

const generateRandomString = (length) => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
}
const codeVerifier  = generateRandomString(64);
    
//---------------------Step 2: Code Challenge ------------------------------

const sha256 = async (plain) => {
    const encoder = new TextEncoder()
    const data = encoder.encode(plain)
    return window.crypto.subtle.digest('SHA-256', data)
};
const base64encode = (input) => {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
};
const hashed = await sha256(codeVerifier)
const codeChallenge = base64encode(hashed);

//---------------------Step 3: Request Authorization ------------------------------

import { SPOTIFY_CLIENT_ID } from "./auth.js";

// Access the variables
const clientId = SPOTIFY_CLIENT_ID;
const redirectUri = 'http://localhost:8080';

const scope = 'user-read-private user-read-email';
const authUrl = new URL("https://accounts.spotify.com/authorize")

// saving the code verifier to the local storage
window.localStorage.setItem('code_verifier', codeVerifier);

const params =  {
  response_type: 'code',
  client_id: clientId,
  scope,
  code_challenge_method: 'S256',
  code_challenge: codeChallenge,
  redirect_uri: redirectUri,
}

authUrl.search = new URLSearchParams(params).toString(); // turning the params object into a string version of itself and setting it to the authUrl.search (ie after the ?)
window.location.href = authUrl.toString(); // allows you to get or set the current value of the browser. you are effectively redirecting the browser

// https://accounts.spotify.com/authorize?response_type=code&client_id=your-client-id&scope=user-read-private+user-read-email&code_challenge_method=S256&code_challenge=hashed-code&redirect_uri=http%3A%2F%2Flocalhost%3A8080


//---------------------Step 3: Response ------------------------------

// parse the response object to receive the code parameter
const urlParams = new URLSearchParams(window.location.search);
let code = urlParams.get('code');

// If the user does not accept your request or if an error has occurred, the response query string contains the following parameters:

// Query Parameter	Value
// error	The reason authorization failed, for example: "access_denied"
// state	The value of the state parameter supplied in the request.

//---------------------Step 4: Request Access Token ------------------------------

const getToken = async code => {

    // stored in the previous step
    let codeVerifier = localStorage.getItem('code_verifier');
  
    const payload = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: clientId,
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
        code_verifier: codeVerifier,
      }),
    }
  
    const body = await fetch(url, payload);
    const response = await body.json();
  
    localStorage.setItem('access_token', response.access_token);
  }
  
  //---------------------Step 5: Get User Profile Data ------------------------------

  async function getProfile(accessToken) {
    let accessToken = localStorage.getItem('access_token');
  
    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    });
  
    const data = await response.json();
  }
  