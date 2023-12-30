<script lang="ts">
  import { page } from '$app/stores';
  import Pane from '$lib/components/Pane.svelte';
  import Renderer from '$lib/components/Renderer.svelte';

  const isSender = $page.params.page === 'sender';
</script>

{#if isSender}
  <Pane />
{:else}
  <Pane fixed />
  <Renderer>
    <slot />
  </Renderer>
{/if}
