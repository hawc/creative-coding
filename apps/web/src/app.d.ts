import type { ExtendedWebSocketServer } from '$lib/server/webSocketUtils';

declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      wss?: ExtendedWebSocketServer;
    }
    // interface PageData {}
    // interface Platform {}
  }
}

declare module '@macfja/svelte-p5' { };

declare module 'ws' {
  interface WebSocket {
    socketId?: string;
  }
}

export { };
