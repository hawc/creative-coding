<script lang="ts">
  import P5 from 'p5-svelte/P5.svelte';
  import type { Sketch } from 'p5-svelte/types';
  import { onMount, onDestroy } from 'svelte';
  import type { Pane } from 'tweakpane/dist/types/pane/pane';

  import { initPaneFolder, initPane, type Params } from '$lib/client/canvasUtils';
  import { debug, midiReady, rerender } from '$lib/store';

  export let sketch: Sketch | undefined = undefined;
  export let params: Params;
  export let paneSetup: () => void;

  let pane: Pane;

  onMount(async () => {
    await initPane();

    midiReady.subscribe((isMidiReady) => {
      if (isMidiReady) {
        const folder = initPaneFolder('Global Options', params, {
          debug: null,
          fullScreen: null
        });

        folder.on('change', (event) => {
          // force rerender on global settings change
          rerender.set(Math.random().toString());
          if ('key' in event.target && event.target.key === 'debug') {
            debug.set(params.debug as boolean);
          }
        });

        return paneSetup();
      }
    });

    midiReady.set(true);
  });

  onDestroy(async () => {
    if (pane) {
      pane.dispose();
    }
  });
</script>

<div class="absolute top-0 left-0 grid place-items-center h-screen w-screen -z-10 bg-gray-900">
  <div class="shadow-xl bg-black">
    {#if sketch}
      <P5 {sketch} />
    {/if}
    <slot />
  </div>
</div>
