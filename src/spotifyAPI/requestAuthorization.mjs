
require('dotenv').config({ path: './authentication.env' });

export default async function requestAuthorization(codeVerifier, codeChallenge) {
    const clientId = process.env.SPOTIFY_CLIENT_ID; // makes sure there's a spotify client
    if (!clientId) {
        throw new Error("Missing SPOTIFY_CLIENT_ID in environment variables.");
    }

    const redirectUri = 'http://localhost:8080'; 
    const scope = 'user-read-private user-read-email';

    // Save the code_verifier to localStorage for later use
    window.localStorage.setItem('code_verifier', codeVerifier);

    const authUrl = new URL("https://accounts.spotify.com/authorize");
    const params = {
        response_type: 'code',
        client_id: clientId,
        scope,
        code_challenge_method: 'S256',
        code_challenge: codeChallenge,
        redirect_uri: redirectUri,
    };

    authUrl.search = new URLSearchParams(params).toString();
    window.location.href = authUrl.toString();
}
