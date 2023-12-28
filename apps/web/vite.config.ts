import { sveltekit } from '@sveltejs/kit/vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [
    nodePolyfills({
      protocolImports: true,
    }),
    sveltekit()
  ],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}']
  },
  optimizeDeps: {
    exclude: ['@partnerds-de/ui']
  },
  build: {
    commonjsOptions: {
      include: [/@partnerds-de-ui/, /node_modules/]
    }
  },
  ssr: {
    noExternal: ['three']
  },
});
