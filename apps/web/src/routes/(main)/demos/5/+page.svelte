<script lang="ts">
  import { Canvas } from '@threlte/core';

  import Scene from './scene.svelte';
  import { controls, rerenderHash } from './store';

  import { canvasDimensions } from '$lib/client/canvasUtils';
  import type { MidiMapping } from '$lib/client/webMidiUtils';
  import PeerClient from '$lib/components/PeerClient.svelte';
  import Renderer from '$lib/components/Renderer.svelte';
  import { fullScreen, screenDimensions } from '$lib/store';

  let dimensions = canvasDimensions;
  let renderKey = '';

  rerenderHash.subscribe(async (param) => {
    renderKey = await param;
  });

  const midiMapping: MidiMapping = {
    0: (key, velocity) => ($controls.diameter.value = velocity),
    1: (key, velocity) =>
      ($controls.sineFrequency.value = Math.max(
        ($controls.sineFrequency.options?.max as number | undefined) ?? 10,
        Math.floor(velocity * 100)
      ))
  };
</script>

<PeerClient params={controls}>
  <Renderer bind:params={$controls} {midiMapping}>
    <Canvas
      renderMode="always"
      size={{
        width: $fullScreen ? $screenDimensions[0] : dimensions[0],
        height: $fullScreen ? $screenDimensions[1] : dimensions[1]
      }}
    >
      {#key renderKey}
        <Scene params={$controls} />
      {/key}
    </Canvas>
  </Renderer>
</PeerClient>
