//---------------------Step 1: Code Challenge ------------------------------
import { getCodeChallenge, getCodeVerifier } from "./codeChallenge.mjs";

const setCodeVerifierLength = 64;
const codeVerifier = getCodeVerifier(setCodeVerifierLength);
const codeChallenge = getCodeChallenge(codeVerifier);

//---------------------Step 2: Request Authorization ------------------------------

require('dotenv').config({ path: './authentication.env' });

// Access the variables
const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const redirectUri = 'http://localhost:8080';

const scope = 'user-read-private user-read-email';
const authUrl = new URL("https://accounts.spotify.com/authorize")

// generated in the previous step
window.localStorage.setItem('code_verifier', codeVerifier);

const params =  {
  response_type: 'code',
  client_id: clientId,
  scope,
  code_challenge_method: 'S256',
  code_challenge: codeChallenge,
  redirect_uri: redirectUri,
}

authUrl.search = new URLSearchParams(params).toString();
window.location.href = authUrl.toString();
