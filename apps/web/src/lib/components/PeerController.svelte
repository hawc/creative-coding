<script lang="ts">
  import { getContext, onMount } from 'svelte';
  import type { Writable } from 'svelte/store';

  import type { Config } from '$lib/client/canvasUtils';
  import { initPeer, sendMessage } from '$lib/client/peerUtils';

  const controls: Writable<Config> = getContext('controls');

  controls.subscribe((data) => sendMessage(data));

  onMount(async () => {
    const code = new URL(window.location.href).searchParams.get('k') ?? '';
    initPeer(code);
  });
</script>
