<script lang="ts">
  import { onMount } from 'svelte';
  import { renderSVG } from 'uqr';

  import { initPeerClient } from '$lib/client/peerUtils';

  let peerID: string;
  let link: string;

  export let handleChange: (data: unknown) => void;

  onMount(async () => {
    initPeerClient(window.location.origin, handleChange, (connectUrl) => (link = connectUrl));
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

<slot />
