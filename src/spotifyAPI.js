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
   const scope = [
      'user-read-private',         // Allows reading user profile info
      'user-read-email',           // Allows reading user email
      'playlist-modify-public',    // Required for creating/altering public playlists
      'playlist-modify-private'    // Required for creating/altering private/collaborative playlists
   ].join(' '); // Join the scopes as a space-separated string

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

export async function getProfile() {
   console.log("getProfile called");
   const token = localStorage.getItem('access_token'); // Assuming the access token is stored in localStorage
   if (!token) {
     throw new Error("Access token is missing");
   }
 
   const response = await fetch('https://api.spotify.com/v1/me', {
     method: 'GET',
     headers: {
       'Authorization': `Bearer ${token}`,
     },
   });
 
   if (!response.ok) {
     const errorData = await response.json();
     throw new Error(`Error fetching profile: ${errorData.error.message}`);
   }
 
   const profileData = await response.json();
   const filteredProfile = storeProfile(profileData);
   return filteredProfile;
 };

 function storeProfile(profileData) {
   const allowed = ["display_name", "id", "uri"];
   const filteredProfile = {};
   for (const [key, value] of Object.entries(profileData)) {
      if (allowed.includes(key)) {
         filteredProfile[key] = value;
      }
   };
   try {
      localStorage.setItem('profileData', JSON.stringify(filteredProfile));
   } catch (error) {
      console.error('Error storing profile data:', error);
   }
   return filteredProfile;
 };

 function getUserId() {
   const profileData = localStorage.getItem('profileData'); // get profile data
   const parsedProfile = profileData ? JSON.parse(profileData) : null; // change from string to object
   console.log(`profile data: ${JSON.stringify(parsedProfile)}`);
   const userId = parsedProfile ? parsedProfile.id : null;  // if id exists, return else null
   return userId;
 };
 

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
      spotifyId: item.uri,
      songName: item.name,
      album: item.album.name,
      artist: item.artists.map(artist => artist.name).join(", ")
   }));

   return trackDetails;
};

// --------------------Step 6: Create New Playlist -------------------------------

export async function createSpotifyPlaylist(newPlaylistName) {
   getProfile();
   console.log(`new playlist name: ${newPlaylistName}`);
   if (!newPlaylistName) {
      console.warn("No new playlist name entered.");
      return;
   }
   const accessToken = localStorage.getItem('access_token');
   const userId = getUserId();
   let isPublic = true;
   let isCollaborative = false;
   let description = "this playlist was made with the jammmin react app!";

   const url = `https://api.spotify.com/v1/users/${userId}/playlists`;
   // playlist-modify-public
   const requestBody = {
      name: newPlaylistName,          // Playlist name
      public: isPublic,            // Public or private
      collaborative: isCollaborative, // Collaborative playlist
      description: description     // Playlist description
   };

   const response = await fetch(url, {
      method: "POST",
      headers: {
         "Authorization": `Bearer ${accessToken}`, // Add OAuth token to request
         "Content-Type": "application/json"  // Indicate JSON payload
      },
      body: JSON.stringify(requestBody) // Convert payload to JSON
   });

   if (!response.ok) {
      const errorDetails = await response.json();
      throw new Error(`Error ${errorDetails.error.status}: ${errorDetails.error.message}`);
   }
   const playlistData = await response.json();
   const storedData = storeNewPlaylist(playlistData);
   alert(`Playlist "${newPlaylistName}" was created successfully`);

   return storedData;
};

function filterNewPlaylistData(playlistData) {
   const allowed = ["id", "name", "uri"];
   const filteredData = {};
   for (const [key, value] of Object.entries(playlistData)) {
      if (allowed.includes(key)) {
         filteredData[key] = value;
      }
   }
   const tracksAllowed = ["total", "items"];
   const filteredTracks = {};
   for (const [key, value] of Object.entries(playlistData.tracks)) {
      if (tracksAllowed.includes(key)) {
         filteredTracks[key] = value;
      }
   }
   filteredData["tracks"] = filteredTracks;

   return filteredData;
}

function storeNewPlaylist(playlistData) {
   const filteredPlaylistData = filterNewPlaylistData(playlistData);
   console.log(`newPlaylistData: ${JSON.stringify(filteredPlaylistData)}`);

   try {
      if (!localStorage.getItem('newPlaylists')) {
         localStorage.setItem('newPlaylists', JSON.stringify([]));
      }
      const playlists = JSON.parse(localStorage.getItem('newPlaylists'));
      playlists.push(filteredPlaylistData);
      localStorage.setItem('newPlaylists', JSON.stringify(playlists));
   } catch (error) {
      console.error('Error storing new playlist:', error);
   }
   return filteredPlaylistData;
}

// --------------------Step 7: Populate New Playlist with Selected Songs -------------------------------

export async function populateNewPlaylist(playlist, tracks) {
   const playlistId = playlist.id;
   const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
   const accessToken = localStorage.getItem('access_token');
   const requestBody = { uris: tracks.map(track => track.spotifyId) };

   try {
      const response = await fetch(url, {
         method: "POST",
         headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json"
         },
         body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
         const errorDetails = await response.json();
         throw new Error(`Error ${errorDetails.error.status}: ${errorDetails.error.message}`);
      }

      const trackPopulationData = await response.json();
      console.log(`Track population successful:`, trackPopulationData);

   } catch (error) {
      console.error("Error populating playlist:", error.message);
      throw error;
   }
   const trackList = tracks
   .map(track => `- ${track.songName} by ${track.artist} (Album: ${track.album})`)
   .join("\n");

   alert(`Tracks successfully added to playlist "${playlist.name}":\n\n${trackList}`);

};
 