<script lang="ts">
  import { Button } from '@partnerds-de/ui';
  import type { Bindable } from '@tweakpane/core';
  import { onMount } from 'svelte';
  import type { Writable } from 'svelte/store';

  import Pane from './Pane.svelte';

  import { initPeer, sendMessage } from '$lib/client/peerUtils';

  export let params: Writable<Bindable>;

  let code = '';

  params.subscribe((p) => sendMessage(p));

  onMount(async () => {
    code = new URL(window.location.href).searchParams.get('k') ?? '';

    initPeer(code);
  });
</script>

<div class="m-2 max-w-sm rounded overflow-hidden">
  <Pane bind:params={$params} />
</div>

<Button onClick={() => sendMessage('test')}>send</Button>

<slot />
