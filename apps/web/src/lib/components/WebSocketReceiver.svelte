<script lang="ts">
  import { Button } from '@partnerds-de/ui';
  import { onMount } from 'svelte';

  import {
    establishWebSocket,
    webSocketEstablished,
    requestData
  } from '$lib/client/webSocketUtils';
  import { debug, messages } from '$lib/store';

  let allowLogging = false;

  debug.subscribe((value) => {
    allowLogging = value;
  });

  const logger = (string: string) => {
    messages.set([...$messages, string]);
  };

  onMount(async () => {
    establishWebSocket(logger);
    if (webSocketEstablished) {
      messages.set([...$messages, 'connected']);
    } else {
      messages.set([...$messages, 'not connected']);
    }
  });

  async function setMessage() {
    const data = await requestData();
    messages.set([...$messages, data]);
  }
</script>

{#if allowLogging}
  <Button className="absolute top-0 left-0" onClick={setMessage}>set message</Button>
{/if}

<slot />
