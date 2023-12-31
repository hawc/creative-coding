<script lang="ts">
  import { Canvas } from '@threlte/core';
  import { setContext } from 'svelte';

  import Scene from './scene.svelte';
  import { rerenderKey, controls, midiMapping } from './store';

  import Pane from '$lib/components/Pane.svelte';
  import PeerClient from '$lib/components/PeerClient.svelte';
  import Renderer from '$lib/components/Renderer.svelte';
  import { fullScreen, screenDimensions } from '$lib/store';
  import { canvasDimensions } from '$lib/utils/canvasUtils';

  setContext('controls', controls);
  setContext('midiMapping', midiMapping);

  let renderKey = $rerenderKey;

  rerenderKey.subscribe((key) => {
    renderKey = key;
  });
</script>

<Renderer>
  <div class="bg-ddd">
    <Canvas
      renderMode="always"
      size={{
        width: $fullScreen ? $screenDimensions[0] : canvasDimensions[0],
        height: $fullScreen ? $screenDimensions[1] : canvasDimensions[1]
      }}
    >
      {#key renderKey}
        <Scene params={$controls} />
      {/key}
    </Canvas>
  </div>
</Renderer>
<Pane fixed />
<PeerClient />

<style>
  .bg-ddd {
    background-color: #dddddd;
  }
</style>
