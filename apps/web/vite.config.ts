import { sveltekit } from '@sveltejs/kit/vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import { defineConfig } from 'vitest/config';

import { createWSSGlobalInstance, onHttpServerUpgrade } from './src/lib/server/webSocketUtils';

export default defineConfig({
  plugins: [
    nodePolyfills({
      protocolImports: true,
    }),
    sveltekit(),
    {
      name: 'integratedWebsocketServer',
      configureServer(server) {
        createWSSGlobalInstance();
        server.httpServer?.on('upgrade', onHttpServerUpgrade);
      },
      configurePreviewServer(server) {
        createWSSGlobalInstance();
        server.httpServer?.on('upgrade', onHttpServerUpgrade);
      }
    }
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
