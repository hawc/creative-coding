<script lang="ts">
  import { Canvas } from '@threlte/core';

  import Scene from './scene.svelte';
  import { controls } from './store';

  import { canvasDimensions } from '$lib/client/canvasUtils';
  import { fullScreen, screenDimensions } from '$lib/store';

  let dimensions = canvasDimensions;
</script>

<Canvas
  renderMode="always"
  size={{
    width: $fullScreen ? $screenDimensions[0] : dimensions[0],
    height: $fullScreen ? $screenDimensions[1] : dimensions[1]
  }}
>
  <Scene params={$controls} />
</Canvas>
