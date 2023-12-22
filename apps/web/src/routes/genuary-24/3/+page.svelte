<script lang="ts">
  import { Canvas } from '@threlte/core';

  import Scene from './scene.svelte';
  import { PARAMS } from './store';

  import { canvasDimensions } from '$lib/client/canvasUtils';
  import type { MidiMapping } from '$lib/client/webMidiUtils';
  import Renderer from '$lib/components/Renderer.svelte';
  import { fullScreen, screenDimensions } from '$lib/store';

  let dimensions = canvasDimensions;

  const midiMapping: MidiMapping = {
    0: (key, velocity) => ($PARAMS.diameter.value = velocity),
    1: (key, velocity) =>
      ($PARAMS.sineFrequency.value = Math.max(
        ($PARAMS.sineFrequency.options?.max as number | undefined) ?? 10,
        Math.floor(velocity * 100)
      ))
  };
</script>

<Renderer darkScreen bind:params={$PARAMS} {midiMapping}>
  <Canvas
    renderMode="always"
    size={{
      width: $fullScreen ? $screenDimensions[0] : dimensions[0],
      height: $fullScreen ? $screenDimensions[1] : dimensions[1]
    }}
  >
    <Scene params={$PARAMS} />
  </Canvas>
</Renderer>
