<script lang="ts">
  import type { Bindable } from '@tweakpane/core';
  import { onMount } from 'svelte';
  import { renderSVG } from 'uqr';

  import { initPeerClient } from '$lib/client/peerUtils';

  let peerID: string;
  let link: string;

  export let params: Bindable;

  onMount(async () => {
    initPeerClient(
      window.location.origin,
      (data) => params.set(data),
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

<slot />
