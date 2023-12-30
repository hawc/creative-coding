<script lang="ts">
  import { getContext, onMount } from 'svelte';
  import type { Writable } from 'svelte/store';
  import { renderSVG } from 'uqr';

  import type { Config } from '$lib/client/canvasUtils';
  import { initPeerClient } from '$lib/client/peerUtils';

  let peerID: string;
  let link: string;

  const controls: Writable<Config> = getContext('controls');

  onMount(async () => {
    initPeerClient(
      `${window.location.origin}/sender${window.location.pathname}`,
      (data) => {
        controls.set(data as Config);
      },
      (connectUrl) => (link = connectUrl)
    );
  });
</script>

{#if link}
  <a title={peerID} class="absolute top-0 left-0" href={link} target="_new">
    <div class="w-32 h-32">
      <!-- eslint-disable-next-line svelte/no-at-html-tags -->
      {@html renderSVG(link)}
    </div>
  </a>
{/if}
