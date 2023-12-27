<script lang="ts">
  import { Button } from '@partnerds-de/ui';
  import type { Bindable } from '@tweakpane/core';
  import type { DataConnection, Peer } from 'peerjs';
  import { onMount } from 'svelte';
  import type { Writable } from 'svelte/store';

  import Pane from './Pane.svelte';

  let peer: Peer;
  let connection: DataConnection;
  let isConnected = false;
  let code = '';
  export let params: Writable<Bindable>;

  const connectPeers = (code: string) => {
    if (code) {
      connection = peer.connect(code);
      connection.on('open', () => {
        isConnected = true;
        connection.on('data', (data) => {
          console.log('data controller', data);
        });
        connection.on('close', () => {
          isConnected = false;
        });

        console.log('message', "You're connected.");
      });
      connection.on('error', (error) => {
        console.error('Error connecting: ', error);
        isConnected = false;
      });
    } else {
      console.log('No connection key.');
    }
  };

  const reconnect = () => {
    peer.reconnect();
    console.log('message', "You're connected.");
  };

  const disconnect = () => {
    connection.close();
    peer.disconnect();
  };

  const initPeer = () => {
    peer.on('open', () => {
      console.log('message', 'Please connect.');
      connectPeers(code);

      peer.on('close', () => {
        isConnected = false;
      });

      peer.on('disconnected', () => {
        isConnected = false;
        console.log('message', 'You are Disconnected. Please reload.');
      });
    });

    peer.on('error', (data) => {
      console.error(data);
    });
  };

  const sendMessage = (data = {}) => {
    if (connection && isConnected) {
      connection.send(data);
    }
  };

  params.subscribe((p) => sendMessage(p));

  onMount(async () => {
    code = new URL(window.location.href).searchParams.get('k') ?? '';
    const { Peer } = await import('peerjs');
    // peer = getPeer();
    peer = new Peer();

    initPeer();
  });
</script>

<div class="m-2 max-w-sm rounded overflow-hidden">
  <Pane bind:params={$params} />
</div>

<Button onClick={() => sendMessage('test')}>send</Button>
{#if isConnected}
  <Button onClick={() => disconnect()}>disconnect</Button>
{:else}
  <Button onClick={() => reconnect()}>reconnect</Button>
{/if}
<slot />
