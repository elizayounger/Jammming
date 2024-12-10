import NodePolyfillPlugin from 'node-polyfill-webpack-plugin';
import { resolve } from 'path'; // Optional if needed for paths

export default {
  resolve: {
    fallback: {
      crypto: 'crypto-browserify', // Use string instead of `require.resolve` in ES Modules
    },
  },
  plugins: [
    new NodePolyfillPlugin(), // Adds polyfills for other Node.js modules
  ],
};
