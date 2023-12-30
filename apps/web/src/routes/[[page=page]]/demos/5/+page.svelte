<script lang="ts">
  import { Canvas } from '@threlte/core';

  import Scene from './scene.svelte';
  import { rerenderHash, controls } from './store';

  import { canvasDimensions } from '$lib/client/canvasUtils';
  import { fullScreen, screenDimensions } from '$lib/store';

  let dimensions = canvasDimensions;
  let renderKey = '';

  rerenderHash.subscribe(async (param) => {
    renderKey = await param;
  });
</script>

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
