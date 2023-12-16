<script lang="ts">
  import { Canvas } from '@threlte/core';
  import { onDestroy, onMount } from 'svelte';
  import { derived } from 'svelte/store';
  import type { Pane } from 'tweakpane/dist/types/pane/pane';

  import { PARAMS, paneSetup } from './params';
  import Scene from './scene.svelte';

  import PaneConnector from '$lib/components/PaneConnector.svelte';
  import { darkScreen, midiControls, midiReady } from '$lib/store';

  let destroyP5 = () => {};
  darkScreen.set(true);

  let pane: Pane;

  onDestroy(async () => {
    console.log('destroy');
    destroyP5();
  });

  const midiSetup = () => {
    midiControls.subscribe((controlsData) => {
      switch (controlsData.key) {
        case 0:
          // todo: fix: don't trigger on first render (resets selection on rerender)
          $PARAMS.diameter = controlsData.velocity;
          break;
        case 1:
          // todo: use same logic as TweakPane
          $PARAMS.sineFrequency = Math.max(10, Math.floor(controlsData.velocity * 100));
          break;
        default:
      }
      if (pane) {
        pane.refresh();
      }
    });
  };

  onMount(async () => {
    midiReady.subscribe(() => {
      midiSetup();
    });
  });

  const diameter = derived(PARAMS, (pb) => pb.diameter);
  console.log('diameter', diameter);
</script>

{$PARAMS.diameter}

<PaneConnector params={$PARAMS} {paneSetup}>
  <Canvas>
    <Scene diameter={$PARAMS.diameter} />
  </Canvas>
</PaneConnector>
