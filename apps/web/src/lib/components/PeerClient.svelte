<script lang="ts">
  import type { DataConnection, Peer } from 'peerjs';
  import { onMount } from 'svelte';
  import { renderSVG } from 'uqr';

  // import { getPeer } from '$lib/client/peerUtils';

  let peer: Peer;
  let peerID: string;
  let link: string;
  let qrcodeImage: string;
  let connection: DataConnection;
  let messages = '';

  export let handleChange: (data: unknown) => void;

  const generateQrCode = (text: string) => {
    console.log('gen id', text);
    qrcodeImage = renderSVG(text);
    link = `http://localhost:3004/sender?k=${text}`;
  };

  const initPeer = () => {
    peer.on('open', () => {
      peerID = `${peer.id}`;
      generateQrCode(peerID);

      peer.on('connection', (conn) => {
        connection = conn;
        connection.on('open', () => {
          sendMessage('message');
        });
        connection.on('data', (data: unknown) => {
          handleChange(data);
          messages = messages + JSON.stringify(data);
        });
      });

      peer.on('close', () => {
        console.log('Connection closed');
      });
    });
  };
  const sendMessage = (data = {}) => {
    if (connection) {
      connection.send(data);
    }
  };

  onMount(async () => {
    const { Peer } = await import('peerjs');
    // peer = getPeer();
    peer = new Peer();

    initPeer();
  });
</script>

<a title={peerID} class="joystick absolute top-0 left-0" href={link} target="_new">
  {#if qrcodeImage}
    <div class="w-32 h-32">
      <!-- eslint-disable-next-line svelte/no-at-html-tags -->
      {@html qrcodeImage}
    </div>
  {/if}
</a>

<slot />
