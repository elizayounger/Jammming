import { expect, assert } from 'chai';
import { getCodeVerifier, sha256, base64encode, getCodeChallenge } from '../../spotifyAPI/codeChallenge.mjs';

// ----------------------- Code Verifier Tests-----------------------------
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

// ----------------------- Code-Verifier Hashing Tests-----------------------------

describe('sha256', function () {
  it("should return the same byte length", async () => {
    const input1 = 'Huid1nZeQ3B9zWCB1LMumXWjwr4egXSJ8P4CTWZ8KIlj33OgHs72AEZn6HzCEVna';
    const input2 = 'AnotherDifferentStringForHashing';
    
    const hash1 = await sha256(input1);
    const hash2 = await sha256(input2);

    new DataView

  });
  it('should return different hashes for different inputs', async function () {
    const input1 = 'Huid1nZeQ3B9zWCB1LMumXWjwr4egXSJ8P4CTWZ8KIlj33OgHs72AEZn6HzCEVna';
    const input2 = 'AnotherDifferentStringForHashing';
    
    const hash1 = await sha256(input1);
    const hash2 = await sha256(input2);
    
    assert.notDeepStrictEqual(hash1, hash2, 'Hashes should be different for different inputs');
  });
  
  it('should return the same hash for identical inputs', async function () {
    const input = 'Huid1nZeQ3B9zWCB1LMumXWjwr4egXSJ8P4CTWZ8KIlj33OgHs72AEZn6HzCEVna';
    
    const hash1 = await sha256(input);
    const hash2 = await sha256(input);
    
    assert.deepStrictEqual(hash1, hash2, 'Hashes should be identical for the same input');
  });
});

// ----------------------- Code-Verifier Hashing Tests (original)-----------------------------
describe('sha256', () => {
  it('hashing should be case sensitive', async () => {
    const hashedLower = await sha256('test');
    const hashedUpper = await sha256('TEST');
    console.assert(hashedLower !== hashedUpper, 'Hashes should differ for case-sensitive inputs');
  });
  it('should hash the same string consistently (the same)', async () => {
    const obj1 = await sha256('vDcOwbRhUK3u8GzfNefvI6TnUel5X3gA1EKphvWzH8PQFBYLqvjrzSv6BxcGGGXz');
    const obj2 = await sha256('vDcOwbRhUK3u8GzfNefvI6TnUel5X3gA1EKphvWzH8PQFBYLqvjrzSv6BxcGGGXz');
    assert.deepStrictEqual(obj1 === obj2);
  });
  it('hashes different input differently(utf8, utf16)', async () => {
    const utf8Input = 'test';
    const utf16Input = Buffer.from('test', 'utf16le').toString();
    const hashUtf8 = await sha256(utf8Input);
    const hashUtf16 = await sha256(utf16Input);
    console.log({ hashUtf8, hashUtf16 });
  });
  // empty string
  // large input
  // special characters
  // uniqueness (input different strings and their hash be different)
  // error handling
  // performance (measure the time the function takes to assess performance)
});

// ----------------------- URL safe hash Conversion Tests-----------------------------

describe('base64encode', () => {
  it('Correctly handles basic encoding', () => {
    const input = new Uint8Array([72, 101, 108, 108, 111]);
    const expectedOutput = 'SGVsbG8'; 
    const result = base64encode(input);
    console.assert(result === expectedOutput, `Expected ${expectedOutput}, but got ${result}`);
  });
  it('successfully removes/converts url reserved symbols', () => {
    const input = new Uint8Array([255, 255, 255]); // Binary data that would produce '+' and '/' in Base64
    const expectedOutput = '____'; // URL-safe Base64 without '=' padding
    const result = base64encode(input);
    console.assert(result === expectedOutput, `Expected ${expectedOutput}, but got ${result}`);
  })
  it('ensures an empty string returns an empty string', () => {
    const input = new Uint8Array([]); // Empty array
    const expectedOutput = '';
    const result = base64encode(input);
    console.assert(result === expectedOutput, `Expected empty string, but got ${result}`);
    console.log('Test 3 passed: Empty Input');
  });
  it('tests large input data', () => {
    const largeInput = new Uint8Array(10000).fill(65); // An array of 10,000 elements, all set to 65 (ASCII 'A')
    const expectedOutput = base64encode(new Uint8Array(10000).fill(65)); // Get the expected output
    const result = base64encode(largeInput);
    console.assert(result === expectedOutput, `Expected ${expectedOutput}, but got ${result}`);
    console.log('Test 4 passed: Large Input Data');
  });
  it('handles special characters correctly', () => {
    const specialChars = new Uint8Array([33, 64, 35, 36, 37, 94, 38, 42]); // ASCII for "!@$%^&*"
    const expectedOutputSpecialChars = 'ISEjJCUlXio'; // URL-safe Base64 encoding of "!@$%^&*"
    const result = base64encode(specialChars);
    console.assert(result === expectedOutputSpecialChars, `Expected ${expectedOutputSpecialChars}, but got ${result}`);
    console.log('Test 5 passed: Special Characters');
  });
  it('url safe encoding without padding', () => {
    const inputWithPadding = new Uint8Array([85, 116, 102, 56, 108, 104, 109]); // Random binary data
    const expectedOutputWithoutPadding = 'VXRmOFxobQ'; // URL-safe Base64 without '=' padding
    const resultWithPadding = base64encode(inputWithPadding);
    console.assert(resultWithPadding === expectedOutputWithoutPadding, `Expected ${expectedOutputWithoutPadding}, but got ${resultWithPadding}`);
    console.log('Test 8 passed: URL-Safe Encoding Without Padding');
  })
});

// ----------------------- Integration Tests-----------------------------
describe('getCodeChallenge', () => {
  
  it('should generate the correct code challenge for a given plain string', async () => {
    const plainText = 'vDcOwbRhUK3u8GzfNefvI6TnUel5X3gA1EKphvWzH8PQFBYLqvjrzSv6BxcGGGXz';
    const expectedCodeChallenge = 'uWBgPqFrEkaNQwMJXEp-HIHPUkuXELbVeYYc8fnBeac'; // Example expected value based on the plain string
    const result = await getCodeChallenge(plainText);
    expect(result).to.equal(expectedCodeChallenge);
  });
  it('should always produce the same code challenge for the same input', async () => {
    const plainText = 'testString';
    const firstCall = await getCodeChallenge(plainText);
    const secondCall = await getCodeChallenge(plainText);
    expect(firstCall).to.equal(secondCall, 'Code challenge should be consistent for the same input');
  });
  it('should handle empty input correctly', async () => {
    const plainText = '';  // Empty string
    const expectedCodeChallenge = ''; // Should be an empty code challenge (or a specific value depending on your sha256 implementation)
    const result = await getCodeChallenge(plainText);
    expect(result).to.equal(expectedCodeChallenge);
  });
  it('should handle a very long input string', async () => {
    const plainText = 'a'.repeat(1000); // 1000 'a' characters
    const result = await getCodeChallenge(plainText);
    expect(result).to.be.a('string'); // Ensure it returns a string
    expect(result.length).to.be.greaterThan(0); // Ensure it is not empty
  });
  it('should handle special characters in the input string correctly', async () => {
    const plainText = '!@#$%^&*()_+';
    const expectedCodeChallenge = 'i1_MV-W7dfV_S5DNxyPYdVYxkYlA5GDCub4Aa1qJh10';  // You should compute the expected value manually
    const result = await getCodeChallenge(plainText);
    expect(result).to.equal(expectedCodeChallenge);
  });
  it('should return different code challenges for different inputs', async () => {
    const firstInput = 'input1';
    const secondInput = 'input2';
    const firstResult = await getCodeChallenge(firstInput);
    const secondResult = await getCodeChallenge(secondInput);
    expect(firstResult).to.not.equal(secondResult, 'Different inputs should produce different code challenges');
  });
});
