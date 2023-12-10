<script lang="ts">
  import Button from '@partnerds-de/ui/components/Button.svelte';
  import { onMount } from 'svelte';

  import { appendMessage } from '$lib';
  import {
    establishWebSocket,
    webSocketEstablished,
    requestData
  } from '$lib/client/webSocketUtils';
  import { debug } from '$lib/store';

  let messages = [''];
  let allowLogging = false;

  debug.subscribe((value) => {
    allowLogging = value;
  });

  onMount(async () => {
    establishWebSocket();
  });

  async function setMessage() {
    messages = appendMessage(messages, await requestData());
  }
</script>

{#if allowLogging}
  <Button on:click={() => setMessage()}>set message</Button>
  {webSocketEstablished ? 'connected' : 'not connected'}
  <p>WS-Messages:<br />{messages}</p>
{/if}

<slot />
