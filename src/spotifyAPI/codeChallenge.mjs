import getCodeVerifier from "./codeVerifier.mjs";

export const sha256 = async (plain) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return await window.crypto.subtle.digest('SHA-256', data);
}

const hashed = sha256("vDcOwbRhUK3u8GzfNefvI6TnUel5X3gA1EKphvWzH8PQFBYLqvjrzSv6BxcGGGXz"); // 2. hash the Code Verifier
console.log(`Code Verifier: ${hashed}`);
// example input: vDcOwbRhUK3u8GzfNefvI6TnUel5X3gA1EKphvWzH8PQFBYLqvjrzSv6BxcGGGXz
// example output: Uint8Array(32) [  185, 100, 96, 62, 161, 107, 18, 70, 29, 67, 3, 9, 92, 74, 126, 28,   129, 207, 82, 75, 151, 16, 155, 213, 121, 134, 28, 241, 249, 193, 121, 167]







// const base64encode = (input) => {
//     return btoa(String.fromCharCode(...new Uint8Array(input)))
//       .replace(/=/g, '')
//       .replace(/\+/g, '-')
//       .replace(/\//g, '_');
// } 

// const codeChallenge = base64encode(hashed); // 3. not sure what this step is for... further encoding?
// console.log(`Code Verifier: ${codeChallenge}`);

