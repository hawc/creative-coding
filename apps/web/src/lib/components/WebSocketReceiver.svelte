<script lang="ts">
  import { appendMessage } from '$lib';
  import {
    establishWebSocket,
    webSocketEstablished,
    requestData
  } from '$lib/client/webSocketUtils';
  import { onMount } from 'svelte';

  let messages = [''];

  onMount(async () => {
    establishWebSocket();
  });

  async function setMessage() {
    messages = appendMessage(messages, await requestData());
  }
</script>

{webSocketEstablished ? 'connected' : 'not connected'}
<button type="button" on:click={() => setMessage()}>set message</button>
<p>WS-Messages:<br />{messages}</p>
<slot />
