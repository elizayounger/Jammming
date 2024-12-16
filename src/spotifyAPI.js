// Define generateRandomString function
export function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';
  for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters[randomIndex];
  }
  return randomString;
}

// --------------------Step 1: Get authorization -------------------------------

export function getAuthorization() {
  const client_id = '4f0b273baf284fdeaf246e9f04f77aca'; // Your Spotify client ID
  const redirect_uri = 'http://localhost:3000'; // Your registered redirect URI
  const stateKey = 'spotify_auth_state'; // Key to store state in localStorage

  // Generate a random state string
  const state = generateRandomString(16);

  // Save the state in localStorage to verify later
  localStorage.setItem(stateKey, state);

  // Define the scopes your app needs
  const scope = 'user-read-private user-read-email';

  // Construct the Spotify authorization URL
  let url = 'https://accounts.spotify.com/authorize';
  url += '?response_type=token';
  url += '&client_id=' + encodeURIComponent(client_id);
  url += '&scope=' + encodeURIComponent(scope);
  url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
  url += '&state=' + encodeURIComponent(state);

  // Redirect the user to the Spotify authorization page
  window.location.href = url;
}
// --------------------Step 2: Get Access Token  -------------------------------
export function extractAccessToken() {
  const hash = window.location.hash; // Get the URL fragment (after #)
  const params = new URLSearchParams(hash.substring(1)); // Parse the fragment
  const accessToken = params.get('access_token'); // Extract the access token
  const state = params.get('state'); // Extract the returned state
  const storedState = localStorage.getItem('spotify_auth_state'); // Get the stored state

  if (state !== storedState) {
      console.error('State mismatch! Possible CSRF attack.');
      return null;
  }

  // Clear the stored state after successful validation
  localStorage.removeItem('spotify_auth_state');

  if (accessToken) {
      localStorage.setItem('access_token', accessToken); // Store the token
      console.log('Access token saved:', accessToken);
  } else {
      console.error('No access token found in the URL.');
  }

  return accessToken;
}

// --------------------Step 3: Submit Spotify Search -------------------------------
export async function getSpotifySearch(search) {
  const accessToken = localStorage.getItem('access_token');
  const params = "offset=0&limit=50&query=" + encodeURIComponent(search) + 
                 "&type=track&include_external=audio&locale=en-GB,en-US;q%3D0.9,en;q%3D0.8";
  const url = 'https://api.spotify.com/v1/search?' + params;

  if (!accessToken) {
    throw new Error('Access token not found in local storage');
  }

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return extractTrackDetails(data);
    
  } catch (error) {
    console.error('Failed to fetch search results:', error);
    throw error; // Re-throw the error if needed
  }
}

// --------------------Step 4: Extract Track Details -------------------------------

export function extractTrackDetails(jsonResponse) {
  if (!jsonResponse || !jsonResponse.tracks || !jsonResponse.tracks.items) {
    throw new Error('Invalid JSON response format');
  }

  const trackDetails = jsonResponse.tracks.items.map((item) => ({
    spotifyId: item.id,
    songName: item.name,
    album: item.album.name,
    artist: item.artists.map(artist => artist.name).join(", ")
  }));
  console.log(`track id: ${trackDetails[0].spotifyId}`);

  return trackDetails;
};