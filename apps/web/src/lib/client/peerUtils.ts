import type { DataConnection, Peer } from 'peerjs';

import { log } from './logUtils';

import type { Params, Config } from '$lib/store';

type PeerPayload = {
  global?: Params;
  controls?: Config;
}

type PeerCallback = (data: PeerPayload) => void;

let peer: Peer;
let connection: DataConnection | undefined;


async function loadPeer() {
  if (!peer) {
    const { Peer } = await import('peerjs');
    peer = new Peer();
  }
}

export async function initPeer(
  code?: string,
  onData?: PeerCallback,
  onConnection?: () => void,
  onOpen?: (link: string) => void
) {
  await loadPeer();

  peer.on('open', () => {
    if (onOpen) {
      onOpen(peer.id);
    }
    if (code) {
      connection = peer.connect(code);
      openConnection(connection, onData, onConnection);
    } else {
      peer.on('connection', (conn) => {
        connection = conn; // muss nicht überschrieben werden wenn code == true
        openConnection(connection, onData, onConnection);
      });
    }
  });

  peer.on('error', (error) => log(JSON.stringify(error)));
};

function openConnection(connection: DataConnection, onData?: PeerCallback, onConnection?: () => void) {
  connection.on('open', () => {
    if (connection) {
      handleConnection(connection, onData);
      if (onConnection) {
        onConnection();
      }
    }
  })
};

function handleConnection(
  connection: DataConnection,
  onData?: PeerCallback
) {
  connection.on('data', (data) => {
    if (onData) {
      onData(data as PeerPayload);
    }
    log(`data received: ${JSON.stringify(data)}`);
  });

  connection.on('error', (error) => {
    log(`Error while connecting: ${error}`);
  });
};

export function sendMessage(data: PeerPayload) {
  if (connection?.open && data) {
    connection.send(data);
  }
};
