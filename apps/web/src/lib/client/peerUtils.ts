import type { DataConnection, Peer } from 'peerjs';

export const webSocketEstablished = false;

let peer: Peer;
let connection: DataConnection | undefined;

async function loadPeer() {
  if (!peer) {
    const { Peer } = await import('peerjs');
    peer = new Peer();
  }
}

export async function initPeerClient(baseUrl: string, onData: (data: unknown) => void,
  connectionCallback: (link: string) => void) {
  await loadPeer();

  peer.on('open', () => {
    connectionCallback(`${baseUrl}/sender?k=${peer.id}`);

    peer.on('connection', (conn) => {
      connection = conn;
      onConnection(connection, onData);
    });
  });

  peer.on('error', (data) => console.error(data));
}

export async function initPeer(
  code: string,
  onData?: (data: unknown) => void,
  connectionCallback?: (connection: DataConnection) => void
) {
  await loadPeer();

  peer.on('open', () => {
    connection = connectPeers(code);

    if (connection) {
      if (connectionCallback) {
        // exposes connection, probably not needed
        connectionCallback(connection);
      }
      onConnection(connection, onData);
    }
  });

  peer.on('error', (data) => console.error(data));
};

export function reconnect() {
  peer.reconnect();
  console.log('Reconnected.');
};

export function disconnect() {
  if (connection) {
    connection.close();
  }
  peer.disconnect();
  console.log('Disconnected.');
};

export function connectPeers(code: string) {
  if (code) {
    return peer.connect(code);
  }
  console.error('No connection key.');

  return;
};

export function onConnection(
  connection: DataConnection,
  onData?: (data: unknown) => void
) {
  connection.on('data', (data) => {
    if (onData) {
      onData(data);
    }
    console.log('data reveiced: ', data);
  });

  connection.on('error', (error) => {
    console.error('Error connecting: ', error);
  });
};

export function sendMessage(data: unknown) {
  if (connection?.open && data) {
    connection.send(data);
  }
};
