<script lang="ts">
  import { Canvas } from '@threlte/core';
  import { setContext } from 'svelte';

  import Scene from './scene.svelte';
  import { rerenderHash, controls, midiMapping } from './store';

  import { canvasDimensions } from '$lib/client/canvasUtils';
  import Pane from '$lib/components/Pane.svelte';
  import PeerClient from '$lib/components/PeerClient.svelte';
  import Renderer from '$lib/components/Renderer.svelte';
  import { fullScreen, screenDimensions } from '$lib/store';

  setContext('controls', controls);
  setContext('midiMapping', midiMapping);

  let dimensions = canvasDimensions;
  let renderKey = '';

  rerenderHash.subscribe(async (param) => {
    renderKey = await param;
  });
</script>

<Renderer>
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

<Pane fixed />
<PeerClient />
