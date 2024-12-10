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
  return hash.digest('hex'); // 'hex', 'base64', or other encoding formats as needed
};
// example input: vDcOwbRhUK3u8GzfNefvI6TnUel5X3gA1EKphvWzH8PQFBYLqvjrzSv6BxcGGGXz
// example output: Uint8Array(32) [  185, 100, 96, 62, 161, 107, 18, 70, 29, 67, 3, 9, 92, 74, 126, 28, 129, 207, 82, 75, 151, 16, 155, 213, 121, 134, 28, 241, 249, 193, 121, 167]

// -----------------------Step 3: Make hash URL safe (remove reserved url symbols) ----------------------

export const base64encode = (input) => {
    return btoa(String.fromCharCode(...new Uint8Array(input))) // converts the binary code to askii values here
      // makes the string url safe from here
      .replace(/=/g, '') // removes =
      .replace(/\+/g, '-') // switch 
      .replace(/\//g, '_');
};
// example input: Uint8Array(32) [ 185, 100, 96, 62, 161, 107, 18, 70, 29, 67, 3, 9, 92, 74, 126, 28, 129, 207, 82, 75, 151, 16, 155, 213, 121, 134, 28, 241, 249, 193, 121, 167]
// example output: uWBgPqFrEkaNQwMJXEp-HIHPUkuXELbVeYYc8fnBeac


// -----------------------Step 4: Combine previous steps ----------------------

export function getCodeChallenge(plain) {
  const hashed = sha256(plain);
  const codeChallenge = base64encode(hashed); 
  return codeChallenge;
};

