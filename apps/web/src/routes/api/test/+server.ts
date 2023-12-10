import { json } from '@sveltejs/kit';
import type { WebSocket } from 'ws';

import type { RequestHandler } from './$types';

export const GET = (async ({ url, locals }) => {
  if (locals.wss) {
    locals.wss.clients.forEach((client: WebSocket) => {
      if (client.readyState === 1) {
        client.send(
          `Hello from the GET handler at ${new Date().toLocaleString()} ${client.socketId}`
        );
      }
    });
  }
  return json({ success: true, message: 'Hello world from GET handler', url });
}) satisfies RequestHandler;
