<script lang="ts">
  import type { Bindable } from '@tweakpane/core';
  import { onMount } from 'svelte';
  import type { Writable } from 'svelte/store';

  import Pane from './Pane.svelte';

  import { initPeer, sendMessage } from '$lib/client/peerUtils';

  export let params: Writable<Bindable>;

  params.subscribe((p) => sendMessage(p));

  onMount(async () => {
    const code = new URL(window.location.href).searchParams.get('k') ?? '';
    initPeer(code);
  });
</script>

<div class="m-2 max-w-sm rounded overflow-hidden">
  <Pane bind:params={$params} />
</div>

<slot />
