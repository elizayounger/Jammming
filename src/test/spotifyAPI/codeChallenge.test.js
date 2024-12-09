import { expect } from 'chai';
import { sha256 } from '../../spotifyAPI/codeChallenge.mjs';  // Adjust the path as needed

describe('sha256', function () {
  it('should hash a plain string correctly', async function () {
    const plainText = 'vDcOwbRhUK3u8GzfNefvI6TnUel5X3gA1EKphvWzH8PQFBYLqvjrzSv6BxcGGGXz';
    const expectedHash = 'e2afda462db864832b1c4ce2419657993fbe7ef04fdd40791068df3f727bc7f4';  // Replace with the correct hash for your input string

    const result = await sha256(plainText);
    
    // Assert that the result matches the expected hash
    expect(result).to.equal(expectedHash);
  });
});
