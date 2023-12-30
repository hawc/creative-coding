<script lang="ts">
  import { getContext, onMount } from 'svelte';
  import type { Writable } from 'svelte/store';

  import type { Config } from '$lib/client/canvasUtils';
  import { initPeerClient } from '$lib/client/peerUtils';
  import { senderLink } from '$lib/store';

  const controls: Writable<Config> = getContext('controls');

  onMount(async () => {
    initPeerClient(
      `${window.location.href}/sender`,
      (data) => {
        controls.set(data as Config);
      },
      (connectUrl) => {
        senderLink.set(connectUrl);
      }
    );
  });
</script>
