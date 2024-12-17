// GLOBAL VARIABLES
const client_id = '4f0b273baf284fdeaf246e9f04f77aca'; // Your Spotify client ID

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
   const redirect_uri = 'http://localhost:3000'; // Your registered redirect URI
   const stateKey = 'spotify_auth_state'; // Key to store state in localStorage
   const state = generateRandomString(16); // Generate a random state string
   localStorage.setItem(stateKey, state); // Save the state in localStorage to verify later
   const scope = 'user-read-private user-read-email'; // Define the scopes your app needs

   // Construct the Spotify authorization URL
   let url = 'https://accounts.spotify.com/authorize';
   url += '?response_type=token';
   url += '&client_id=' + encodeURIComponent(client_id);
   url += '&scope=' + encodeURIComponent(scope);
   url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
   url += '&state=' + encodeURIComponent(state);

   window.location.href = url; // Redirect the user to the Spotify authorization page
}
// --------------------Step 2: Get Access Token  -------------------------------

function extractAccessToken() {
   const hash = window.location.hash; // Get the URL fragment (after #)
   const params = new URLSearchParams(hash.substring(1)); // Parse the fragment
   const accessToken = params.get('access_token'); // Extract the access token

   const state = params.get('state'); // Extract the returned state
   const storedState = localStorage.getItem('spotify_auth_state'); // Get the stored state
   if (state !== storedState) {
      console.error('State mismatch! Possible CSRF attack.');
      return null;
   }
   localStorage.removeItem('spotify_auth_state'); // Clear the stored state after successful validation

   if (accessToken) {
      localStorage.setItem('access_token', accessToken); // Store the token
   } else {
      console.error('No access token found in the URL.');
   }
}

// --------------------Step 1+2 combined: Handle Auth in one step  -------------------------------

export function handleSpotifyAuth() {
   console.log("handleSpotifyAuth() called");
   extractAccessToken();
   const storedToken = localStorage.getItem('access_token');
   if (!storedToken) {
      getAuthorization();
   }
};

// --------------------Step 3: fetchProfile -------------------------------

export async function fetchProfile(token) {
   const result = await fetch("https://api.spotify.com/v1/me", {
       method: "GET", headers: { Authorization: `Bearer ${token}` }
   });

   return await result.json();
}


// --------------------Step 4: Submit Spotify Search -------------------------------
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

// --------------------Step 5: Extract Track Details -------------------------------

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

   return trackDetails;
};

// --------------------Step 6: Create New Playlist -------------------------------

export async function createSpotifyPlaylist(newPlaylistName) {
   console.log(`new playlist name: ${newPlaylistName}`);
  if (!newPlaylistName) {
     console.warn("No new playlist name entered.");
     return;
  }

  const accessToken = localStorage.getItem('access_token');
  
  if (!accessToken) throw new Error('Access token not found in local storage');

  try {
     // Get the current user's ID from the /me endpoint
     const userResponse = await fetch('https://api.spotify.com/v1/me', {
        headers: {
           Authorization: 'Bearer ' + accessToken
        }
     });

     if (!userResponse.ok) throw new Error(`Error fetching user data: ${userResponse.status} - ${userResponse.statusText}`);

     const userData = await userResponse.json();
     const userId = userData.id;  // User ID for the currently authenticated user

     const url = `https://api.spotify.com/v1/users/${userId}/playlists`;
     const data = {
        name: newPlaylistName,
        description: `${newPlaylistName} is created using the Jammming React app`,
        public: false
     };

     const response = await fetch(url, {
        method: 'POST',
        headers: {
           'Authorization': 'Bearer ' + accessToken,
           'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
     });

     if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
     }

     const responseData = await response.json();
     alert("New playlist created successfully!");
     return responseData; // Return the created playlist details if needed
  } catch (error) {
     console.error('Failed to create new playlist:', error);
     throw error;
  }
};