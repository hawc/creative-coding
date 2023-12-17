<script lang="ts">
  import { Canvas } from '@threlte/core';

  import Scene from './scene.svelte';
  import { PARAMS } from './store';

  import { canvasDimensions } from '$lib/client/canvasUtils';
  import type { MidiHandler } from '$lib/client/webMidiUtils';
  import Pane from '$lib/components/Pane.svelte';
  import PaneConnector from '$lib/components/PaneConnector.svelte';
  import { darkScreen, fullScreen, screenDimensions } from '$lib/store';

  darkScreen.set(true);
  let dimensions = canvasDimensions;

  let midiFunc: MidiHandler = (key, velocity) => {
    switch (key) {
      case 0:
        // todo: fix: don't trigger on first render (resets selection on rerender)
        $PARAMS.diameter.value = velocity;
        break;
      case 1:
        // todo: use same scaling logic as TweakPane
        $PARAMS.sineFrequency.value = Math.max(
          ($PARAMS.sineFrequency.options?.max as number | undefined) ?? 10,
          Math.floor(velocity * 100)
        );
        break;
      default:
    }
  };
</script>

<Pane bind:object={$PARAMS} />
<PaneConnector {midiFunc}>
  <Canvas
    renderMode="always"
    size={{
      width: $fullScreen ? $screenDimensions[0] : dimensions[0],
      height: $fullScreen ? $screenDimensions[1] : dimensions[1]
    }}
  >
    <Scene bind:object={$PARAMS} />
  </Canvas>
</PaneConnector>
