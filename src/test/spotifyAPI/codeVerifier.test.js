import getCodeVerifier from "../../spotifyAPI/codeVerifier.mjs";

import { assert } from 'chai';

describe('getCodeVerifier', () => {    
    it('should return a string of specified length', () => {
      const length = 64; // Setup
      const actual = getCodeVerifier(length); // Exercise
      assert.typeOf(actual, 'string', 'actual is a string'); // Verify
      assert.lengthOf(actual, length, `getCodeVerifier returns a string of length ${length}`); // Verify
    });

    it('should return a string containing only valid characters', () => {
      const length = 20; // Setup
      const result = getCodeVerifier(length); // Exercise
      const regex = /^[A-Za-z0-9]+$/; // matches only alphanumeric characters
      assert.match(result, regex); // Verify
    });
    
    it('should generate different random strings', () => {
      const result1 = getCodeVerifier(10);
      const result2 = getCodeVerifier(10);
      assert.notEqual(result1, result2);
    });
    
});
