<script lang="ts">
  import { Canvas } from '@threlte/core';
  import { setContext } from 'svelte';

  import Scene from './scene.svelte';
  import { controls, midiMapping } from './store';

  import Pane from '$lib/components/Pane.svelte';
  import PeerClient from '$lib/components/PeerClient.svelte';
  import Renderer from '$lib/components/Renderer.svelte';
  import { fullScreen, screenDimensions } from '$lib/store';
  import { canvasDimensions } from '$lib/utils/canvasUtils';

  setContext('controls', controls);
  setContext('midiMapping', midiMapping);
</script>

<Renderer>
  <Canvas
    renderMode="always"
    size={{
      width: $fullScreen ? $screenDimensions[0] : canvasDimensions[0],
      height: $fullScreen ? $screenDimensions[1] : canvasDimensions[1]
    }}
  >
    <Scene params={$controls} />
  </Canvas>
</Renderer>

<Pane fixed />
<PeerClient />
