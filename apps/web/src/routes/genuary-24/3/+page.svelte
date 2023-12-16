<script lang="ts">
  import { Canvas } from '@threlte/core';
  import { onMount } from 'svelte';

  import Scene from './scene.svelte';
  import { PARAMS } from './store';

  import { canvasDimensions } from '$lib/client/canvasUtils';
  import Pane from '$lib/components/Pane.svelte';
  import PaneConnector from '$lib/components/PaneConnector.svelte';
  import { darkScreen, fullScreen, midiControls, midiReady } from '$lib/store';

  darkScreen.set(true);
  let dimensions = canvasDimensions;

  let innerWidth = dimensions[0];
  let innerHeight = dimensions[1];

  const { diameter, sineFrequency } = $PARAMS;

  const midiSetup = () => {
    midiControls.subscribe((controlsData) => {
      switch (controlsData.key) {
        case 0:
          // todo: fix: don't trigger on first render (resets selection on rerender)
          diameter.value = controlsData.velocity;
          break;
        case 1:
          // todo: use same logic as TweakPane
          sineFrequency.value = Math.max(
            (sineFrequency.options?.max as number | undefined) ?? 10,
            Math.floor(controlsData.velocity * 100)
          );
          break;
        default:
      }
    });
  };

  onMount(async () => {
    midiReady.subscribe(() => {
      midiSetup();
    });
  });
</script>

<svelte:window bind:innerWidth bind:innerHeight />

<Pane bind:object={$PARAMS} />
<PaneConnector>
  <Canvas
    renderMode="always"
    size={{
      width: $fullScreen ? innerWidth : dimensions[0],
      height: $fullScreen ? innerHeight : dimensions[1]
    }}
  >
    <Scene bind:object={$PARAMS} />
  </Canvas>
</PaneConnector>
