<script lang="ts">
  import type p5 from 'p5';
  import type { Sketch } from 'p5-svelte';
  import { default as P5 } from 'p5-svelte';
  import { setContext } from 'svelte';

  import { controls, midiMapping } from './store';

  import { canvasDimensions } from '$lib/client/canvasUtils';
  import { CIRCLE_DEGREES, sine } from '$lib/client/mathUtils';
  import Pane from '$lib/components/Pane.svelte';
  import PeerClient from '$lib/components/PeerClient.svelte';
  import Renderer from '$lib/components/Renderer.svelte';
  import { fullScreen } from '$lib/store';

  setContext('controls', controls);
  setContext('midiMapping', midiMapping);

  let getSine = sine(0, 1);

  let innerWidth = canvasDimensions[0];
  let innerHeight = canvasDimensions[1];

  const sketch: Sketch = (p5: p5) => {
    let radius = 150;
    let angle = 0;
    let speed = 0.05;
    let centerX = window.innerWidth / 2;
    let centerY = window.innerHeight / 2;

    p5.setup = () => {
      const dimensions = $fullScreen ? [innerWidth, innerHeight] : canvasDimensions;
      p5.createCanvas(dimensions[0], dimensions[1]);
      p5.background('#000000');

      centerX = dimensions[0] / 2;
      centerY = dimensions[1] / 2;

      for (let index = 0; index < 10; index++) {
        let arcx = centerX;
        let arcy = centerY;

        p5.fill('#000000');
        p5.stroke('#ffffff');
        p5.strokeCap(p5.SQUARE);
        p5.strokeWeight(4);
        p5.arc(
          arcx,
          arcy,
          300 - index * 32,
          300 - index * 32,
          p5.radians(Math.random() * CIRCLE_DEGREES),
          p5.radians(Math.random() * CIRCLE_DEGREES)
        );
      }
    };

    p5.draw = () => {
      p5.strokeWeight(2);
      p5.fill($controls.color.value);
      let x = centerX + radius * p5.cos(angle);
      let y = centerY + radius * p5.sin(angle);
      const ellipseSize = 100 * $controls.diameter.value * getSine($controls.sineFrequency.value);
      p5.ellipse(x, y, ellipseSize, ellipseSize).fill($controls.color.value);

      angle = angle + speed;
    };

    fullScreen.subscribe(() => {
      p5.setup();
    });
  };
</script>

<svelte:window bind:innerWidth bind:innerHeight />

<Renderer>
  <P5 {sketch} />
</Renderer>

<Pane fixed />
<PeerClient />
