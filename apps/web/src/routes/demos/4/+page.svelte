<script lang="ts">
  import type p5 from 'p5';
  import type { Sketch } from 'p5-svelte';
  import { default as P5 } from 'p5-svelte';
  import { setContext } from 'svelte';

  import { controls, midiMapping } from './store';

  import { canvasDimensions } from '$lib/client/canvasUtils';
  import { sine } from '$lib/client/mathUtils';
  import Pane from '$lib/components/Pane.svelte';
  import PeerClient from '$lib/components/PeerClient.svelte';
  import { fullScreen, mousePosition, screenDimensions } from '$lib/store';

  setContext('controls', controls);
  setContext('midiMapping', midiMapping);

  let getSine = sine(0, 1);

  const sketch: Sketch = (p5: p5) => {
    let dimensions = [0, 0];
    p5.setup = () => {
      dimensions = $fullScreen ? $screenDimensions : canvasDimensions;
      p5.createCanvas(dimensions[0], dimensions[1]);
      p5.background('#000000');
    };

    p5.draw = () => {
      p5.background('#ffffff');
      const cellSize = $controls.r.value;
      const radius =
        cellSize * $controls.diameter.value * (($mousePosition.x + $mousePosition.y) / 1000);
      const rows = dimensions[0] / cellSize;
      const cols = dimensions[1] / cellSize;

      p5.fill($controls.color.value);
      const si = getSine($controls.sineFrequency.value * 100);
      for (let x = 0; x < rows + 1; x += 1) {
        for (let y = 0; y < cols + 1; y += 1) {
          p5.ellipse(
            x * cellSize + (cellSize / 2) * si + p5.random(1, -1),
            y * cellSize + (cellSize / 2) * si + p5.random(1, -1),
            radius,
            radius
          );
        }
      }
    };

    fullScreen.subscribe(() => {
      p5.setup();
    });
  };
</script>

<P5 {sketch} />

<Pane fixed />
<PeerClient />
