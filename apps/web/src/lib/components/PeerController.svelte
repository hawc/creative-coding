<script lang="ts">
  import { getContext, onMount } from 'svelte';
  import type { Writable } from 'svelte/store';

  import { initPeer, sendMessage } from '$lib/client/peerUtils';
  import { base, type Config } from '$lib/store';

  const controls: Writable<Config> = getContext('controls');

  base.subscribe((data) =>
    sendMessage({
      global: data
    })
  );
  controls.subscribe((data) =>
    sendMessage({
      controls: data
    })
  );

  onMount(async () => {
    const code = new URL(window.location.href).searchParams.get('k') ?? '';
    initPeer(code, (data) => {
      if (data.controls) {
        controls.set(data.controls);
      }
      if (data.global) {
        base.set(data.global);
      }
    });
  });
</script>
