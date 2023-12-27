<script lang="ts">
  import { Canvas } from '@threlte/core';

  import Scene from './scene.svelte';
  import { PARAMS, rerenderHash } from './store';

  import type { Config } from '$lib/client/canvasUtils';
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
    0: (key, velocity) => ($PARAMS.diameter.value = velocity),
    1: (key, velocity) =>
      ($PARAMS.sineFrequency.value = Math.max(
        ($PARAMS.sineFrequency.options?.max as number | undefined) ?? 10,
        Math.floor(velocity * 100)
      ))
  };

  const updateStore = (data: unknown) => {
    PARAMS.set(data as Config);
  };
</script>

<PeerClient handleChange={(data) => updateStore(data)}>
  <Renderer bind:params={$PARAMS} {midiMapping}>
    <Canvas
      renderMode="always"
      size={{
        width: $fullScreen ? $screenDimensions[0] : dimensions[0],
        height: $fullScreen ? $screenDimensions[1] : dimensions[1]
      }}
    >
      {#key renderKey}
        <Scene params={$PARAMS} />
      {/key}
    </Canvas>
  </Renderer>
</PeerClient>
