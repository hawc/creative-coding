<script lang="ts">
  import { onMount } from 'svelte';

  import { establishWebSocket, webSocketEstablished } from '$lib/client/webSocketUtils';
  import { debug, messages } from '$lib/store';

  let allowLogging = false;

  debug.subscribe((isDebugEnabled) => {
    allowLogging = isDebugEnabled;
  });

  const logger = (string: string) => {
    messages.set([...$messages, string]);
  };

  onMount(async () => {
    establishWebSocket(logger);
    if (allowLogging) {
      if (webSocketEstablished) {
        messages.set([...$messages, 'connected']);
      } else {
        messages.set([...$messages, 'not connected']);
      }
    }
  });
</script>

<slot />
