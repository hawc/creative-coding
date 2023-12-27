export const webSocketEstablished = false;
let peer: any;
const isProd = true;

export function getKey(): string {
  return Math.floor(Math.random() * 2 ** 18)
    .toString(36)
    .padStart(4, '0')
    .toString();
}

export async function getPeer() {
  const { Peer } = await import('peerjs');
  if (!peer) {
    peer = new Peer(getKey(), {
      host: location.hostname,
      path: '/peer',
      port: isProd ? 443 : 9001, // using port 443 on prod because the nginx proxy redirects the wss traffic
      secure: isProd,
      // debug: 3,
      config: {
        iceServers: [
          {
            urls: 'turn:openrelay.metered.ca:80',
            username: 'openrelayproject',
            credential: 'openrelayproject'
          },
          {
            urls: 'turn:openrelay.metered.ca:443',
            username: 'openrelayproject',
            credential: 'openrelayproject'
          }
        ]
      }
    });
  }
  return peer;
}