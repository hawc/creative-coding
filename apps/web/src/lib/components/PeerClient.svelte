<script lang="ts">
  import { getContext, onMount } from 'svelte';
  import type { Writable } from 'svelte/store';

  import { initPeer, sendMessage } from '$lib/client/peerUtils';
  import { base, senderLink, type Config } from '$lib/store';

  const controls: Writable<Config> = getContext('controls');

  onMount(async () => {
    initPeer(
      undefined,
      (data) => {
        if (data.controls) {
          controls.set(data.controls);
        }
        if (data.global) {
          base.set(data.global);
        }
      },
      () => sendMessage({ global: $base, controls: $controls }),
      (peerID) => {
        senderLink.set(`${window.location.href}/sender?k=${peerID}`);
      }
    );
  });
</script>
