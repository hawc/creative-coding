<script lang="ts">
  import { setContext } from 'svelte';

  import { controls, midiMapping } from './store';

  import { page } from '$app/stores';
  import Pane from '$lib/components/Pane.svelte';
  import PeerClient from '$lib/components/PeerClient.svelte';
  import PeerController from '$lib/components/PeerController.svelte';
  import Renderer from '$lib/components/Renderer.svelte';

  const isSender = $page.params.page === 'sender';

  setContext('controls', controls);
  setContext('midiMapping', midiMapping);
</script>

{#if isSender}
  <Pane />
  <PeerController />
{:else}
  <Pane fixed />
  <PeerClient />
  <Renderer>
    <slot />
  </Renderer>
{/if}
