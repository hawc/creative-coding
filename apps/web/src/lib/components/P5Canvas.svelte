<script lang="ts">
  import P5 from 'p5-svelte/P5.svelte';
  import type { Sketch } from 'p5-svelte/types';
  import { onMount, onDestroy } from 'svelte';
  import type { Pane } from 'tweakpane/dist/types/pane/pane';

  import { getPane, initPane } from '$lib/client/canvasUtils';
  import { debug, midiReady, rerender, paneReady } from '$lib/store';

  type Params = {
    [key: string]: number | string | boolean;
  };

  export let sketch: Sketch;
  export let params: Params;

  let pane: Pane;

  onMount(async () => {
    await initPane();

    midiReady.subscribe((value) => {
      if (value) {
        pane = getPane();

        const folder = pane.addFolder({
          title: 'Global Options'
        });

        folder.addBinding(params, 'debug');
        folder.addBinding(params, 'fullScreen');

        folder.on('change', (event) => {
          // force rerender on global settings change
          rerender.set(Math.random().toString());
          if ('key' in event.target && event.target.key === 'debug') {
            debug.set(params.debug as boolean);
          }
        });

        paneReady.set(true);
      }
    });

    midiReady.set(true);
  });

  onDestroy(async () => {
    if (pane) {
      pane.dispose();
    }
    paneReady.set(false);
  });
</script>

<div class="absolute top-0 left-0 grid place-items-center h-screen w-screen -z-10 bg-gray-900">
  <div class="shadow-xl bg-black">
    <P5 {sketch} />
  </div>
</div>
