import { JSDOM } from 'jsdom';
import crypto from 'crypto'; // Import Node.js crypto module

const dom = new JSDOM(`<!DOCTYPE html><html><head></head><body></body></html>`);
global.window = dom.window;
global.TextEncoder = dom.window.TextEncoder;

// Use Node.js's crypto to provide the crypto.subtle.digest functionality
global.crypto = {
  subtle: {
    digest: async (algorithm, data) => {
      if (algorithm !== 'SHA-256') {
        throw new Error(`Algorithm not supported: ${algorithm}`);
      }
      const hash = crypto.createHash('sha256');
      hash.update(Buffer.from(data));
      return hash.digest();
    },
  },
};
