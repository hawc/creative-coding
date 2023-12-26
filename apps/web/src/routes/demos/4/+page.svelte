<script lang="ts">
  import type p5 from 'p5';
  import type { Sketch } from 'p5-svelte';
  import P5 from 'p5-svelte/P5.svelte';

  import { PARAMS } from './params';

  import { canvasDimensions } from '$lib/client/canvasUtils';
  import { sine } from '$lib/client/mathUtils';
  import type { MidiMapping } from '$lib/client/webMidiUtils';
  import Renderer from '$lib/components/Renderer.svelte';
  import { fullScreen, messages } from '$lib/store';

  const { diameter, sineFrequency, color, r } = $PARAMS;

  let getSine = sine(0, 1);

  let innerWidth = canvasDimensions[0];
  let innerHeight = canvasDimensions[1];

  let m = { x: 0, y: 0 };

  const handleMousemove = (event: MouseEvent) => {
    m.x = event.offsetX;
    m.y = event.offsetY;
    messages.set([...$messages, `${m.x} ${m.y}`]);
  };

  const sketch: Sketch = (p5: p5) => {
    let dimensions = [0, 0];
    p5.setup = () => {
      dimensions = $fullScreen ? [innerWidth, innerHeight] : canvasDimensions;
      p5.createCanvas(dimensions[0], dimensions[1]);
      p5.background('#000000');
    };

    p5.draw = () => {
      p5.background(255);
      const cellSize = r.value;
      const radius = cellSize * diameter.value;
      const rows = dimensions[0] / cellSize;
      const cols = dimensions[1] / cellSize;

      p5.fill(color.value);
      const si = getSine(sineFrequency.value * 100);
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

  const midiMapping: MidiMapping = {
    0: (key, velocity) => (diameter.value = velocity),
    1: (key, velocity) => (sineFrequency.value = velocity)
  };
</script>

<svelte:window bind:innerWidth bind:innerHeight />

<Renderer bind:params={$PARAMS} {handleMousemove} {midiMapping}>
  <P5 {sketch} />
</Renderer>
