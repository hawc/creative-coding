<script lang="ts">
  import type p5 from 'p5';
  import type { Sketch } from 'p5-svelte';
  import P5 from 'p5-svelte/P5.svelte';

  import { PARAMS } from './params';

  import { canvasDimensions } from '$lib/client/canvasUtils';
  import { sine } from '$lib/client/mathUtils';
  import type { MidiHandler } from '$lib/client/webMidiUtils';
  import Renderer from '$lib/components/Renderer.svelte';
  import { darkScreen, fullScreen } from '$lib/store';

  darkScreen.set(true);
  const { diameter, sineFrequency, color } = $PARAMS;

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
          p5.radians(Math.random() * 360),
          p5.radians(Math.random() * 360)
        );
      }
    };

    p5.draw = () => {
      p5.strokeWeight(2);
      p5.fill(color.value);
      let x = centerX + radius * p5.cos(angle);
      let y = centerY + radius * p5.sin(angle);
      const ellipseSize = 100 * diameter.value * getSine(sineFrequency.value);
      p5.ellipse(x, y, ellipseSize, ellipseSize).fill(color.value);

      angle = angle + speed;
    };

    fullScreen.subscribe(() => {
      p5.setup();
    });
  };

  const midiFunc: MidiHandler = (key, velocity) => {
    switch (key) {
      case 0:
        // todo: fix: don't trigger on first render (resets selection on rerender)
        diameter.value = velocity;
        break;
      case 1:
        // todo: use same scaling logic as TweakPane
        sineFrequency.value = Math.max(10, Math.floor(velocity * 100));
        break;
      default:
    }
  };
</script>

<svelte:window bind:innerWidth bind:innerHeight />

<Renderer bind:object={$PARAMS} {midiFunc}>
  <P5 {sketch} />
</Renderer>
