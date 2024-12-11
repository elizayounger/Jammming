// -----------------------Step 1: Generate Code Verifier -----------------------------
import { createHash } from 'crypto'; // using crypto-browserify to enable use in browser

const generateRandomString = (length) => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
}
// example output: vDcOwbRhUK3u8GzfNefvI6TnUel5X3gA1EKphvWzH8PQFBYLqvjrzSv6BxcGGGXz

export const getCodeVerifier = (length) => generateRandomString(length);

// -----------------------Step 2: Pass Code Verifier through hashing function -----------------------------

export const sha256 = async (plain) => {
  const hash = createHash('sha256');
  hash.update(plain);
  const buffer = hash.digest(); // This is a Node.js Buffer
  return buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength); // Convert Buffer to ArrayBuffer
};
// example input: "Huid1nZeQ3B9zWCB1LMumXWjwr4egXSJ8P4CTWZ8KIlj33OgHs72AEZn6HzCEVna"
// example output: ""

// -----------------------Step 3: Make hash URL safe (remove reserved url symbols) ----------------------

export const base64encode = (input) => {
    return btoa(String.fromCharCode(...new Uint8Array(input))) // converts the binary code to askii values here
      // makes the string url safe from here
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
};
// example input: Uint8Array(32) [ 185, 100, 96, 62, 161, 107, 18, 70, 29, 67, 3, 9, 92, 74, 126, 28, 129, 207, 82, 75, 151, 16, 155, 213, 121, 134, 28, 241, 249, 193, 121, 167]
// example output: uWBgPqFrEkaNQwMJXEp-HIHPUkuXELbVeYYc8fnBeac


// -----------------------Step 4: Combine previous steps ----------------------

export async function getCodeChallenge(plain) {
  const hashed = await sha256(plain);
  const codeChallenge = base64encode(hashed); 
  return codeChallenge;
};


const codeChallenge = getCodeChallenge("Huid1nZeQ3B9zWCB1LMumXWjwr4egXSJ8P4CTWZ8KIlj33OgHs72AEZn6HzCEVna");
console.log(codeChallenge);