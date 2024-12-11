// import { expect, assert } from 'chai';
// import { getCodeVerifier, sha256, base64encode, getCodeChallenge } from '../../spotifyAPI/codeChallenge.mjs';

// import { expect } from 'chai';
// import { JSDOM } from 'jsdom';
// import dotenv from 'dotenv';
// import requestAuthorization from './requestAuthorization.js';

// dotenv.config({ path: './authentication.env' });

// describe('requestAuthorization', function () {
//     let jsdom;
//     let window;
//     let localStorageMock;

//     beforeEach(() => {
//         // Create a mock DOM
//         jsdom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
//             url: 'http://localhost/',
//         });
//         window = jsdom.window;
//         global.window = window;
//         global.document = window.document;

//         // Mock localStorage
//         localStorageMock = (() => {
//             let store = {};
//             return {
//                 getItem: (key) => store[key] || null,
//                 setItem: (key, value) => {
//                     store[key] = value;
//                 },
//                 clear: () => {
//                     store = {};
//                 },
//             };
//         })();
//         Object.defineProperty(window, 'localStorage', {
//             value: localStorageMock,
//         });

//         // Mock location.href
//         Object.defineProperty(window, 'location', {
//             value: { href: '' },
//             writable: true,
//         });

//         // Mock environment variables
//         process.env.SPOTIFY_CLIENT_ID = 'test-client-id';
//     });

//     afterEach(() => {
//         delete global.window;
//         delete global.document;
//         delete process.env.SPOTIFY_CLIENT_ID;
//     });

//     it('should save the code_verifier in localStorage', () => {
//         const codeVerifier = 'testCodeVerifier';
//         const codeChallenge = 'testCodeChallenge';

//         requestAuthorization(codeVerifier, codeChallenge);

//         expect(window.localStorage.getItem('code_verifier')).to.equal(codeVerifier);
//     });

//     it('should redirect to the correct Spotify authorization URL', () => {
//         const codeVerifier = 'testCodeVerifier';
//         const codeChallenge = 'testCodeChallenge';

//         requestAuthorization(codeVerifier, codeChallenge);

//         const redirectUri = 'http://localhost:8080';
//         const scope = 'user-read-private user-read-email';

//         const expectedUrl = new URL('https://accounts.spotify.com/authorize');
//         expectedUrl.search = new URLSearchParams({
//             response_type: 'code',
//             client_id: process.env.SPOTIFY_CLIENT_ID,
//             scope,
//             code_challenge_method: 'S256',
//             code_challenge,
//             redirect_uri: redirectUri,
//         }).toString();

//         expect(window.location.href).to.equal(expectedUrl.toString());
//     });
// });