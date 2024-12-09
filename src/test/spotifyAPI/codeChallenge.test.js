import getCodeChallenge, { sha256 } from "../../spotifyAPI/codeChallenge.mjs";
import { assert } from 'chai';

describe('sha256', () => {    
    it('should return take input and return a Uint8Array', () => {
      const input = 'vDcOwbRhUK3u8GzfNefvI6TnUel5X3gA1EKphvWzH8PQFBYLqvjrzSv6BxcGGGXz'; // Setup
      const actual = sha256(input); // exercise
      assert.typeOf(actual, 'Uint8Array', 'sha256 returns a Uint8Array'); // verify
    });    
});
