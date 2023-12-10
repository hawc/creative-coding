<script lang="ts">
  import type p5 from 'p5';
  import type { Sketch } from 'p5-svelte';
  import { onDestroy, onMount } from 'svelte';
  import type { Pane } from 'tweakpane/dist/types/pane/pane';

  import { PARAMS } from './params';

  import { getDimensions, getPane } from '$lib/client/canvasUtils';
  import { sine } from '$lib/client/mathUtils';
  import P5Canvas from '$lib/components/P5Canvas.svelte';
  import { darkScreen, midiControls, midiReady } from '$lib/store';

  let getSine = sine(0, 1);
  let destroyP5 = () => {};
  darkScreen.set(true);

  const sketch: Sketch = (p5: p5) => {
    let fullScreen = PARAMS.fullScreen;
    let radius = 150;
    let angle = 0;
    let speed = 0.05;
    let centerX = window.innerWidth / 2;
    let centerY = window.innerHeight / 2;

    p5.setup = () => {
      p5.createCanvas(window.innerWidth, window.innerHeight);
      p5.background('#000000');

      for (let index = 0; index < 10; index++) {
        let arcx = centerX;
        let arcy = centerY;

        p5.fill('black');
        p5.stroke(255, 255, 255);
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
      destroyP5 = () => p5.remove();
    };

    p5.draw = () => {
      if (PARAMS.fullScreen !== fullScreen) {
        fullScreen = PARAMS.fullScreen;
        const dimensions = getDimensions(fullScreen);
        centerX = dimensions[0] / 2;
        centerY = dimensions[1] / 2;
        p5.resizeCanvas(dimensions[0], dimensions[1]);
      }

      p5.strokeWeight(2);
      p5.fill('#ff0000');
      let x = centerX + radius * p5.cos(angle);
      let y = centerY + radius * p5.sin(angle);
      const ellipseSize = 100 * PARAMS.diameter * getSine(PARAMS.sineFrequency);
      p5.ellipse(x, y, ellipseSize, ellipseSize).fill(PARAMS.color);

      angle = angle + speed;
    };
  };

  let pane: Pane;

  onDestroy(async () => {
    destroyP5();
  });

  onMount(async () => {
    midiReady.subscribe((isMidiReady) => {
      if (isMidiReady) {
        pane = getPane();

        const folder = pane.addFolder({
          title: 'Render Options'
        });

        folder.addBinding(PARAMS, 'width');
        folder.addBinding(PARAMS, 'height');
        folder.addBinding(PARAMS, 'color');
        folder.addBinding(PARAMS, 'diameter', { max: 1, min: 0, step: 0.01 });
        folder.addBinding(PARAMS, 'sineFrequency', { max: 100, min: 10, step: 1 });
      }

      midiControls.subscribe((controlsData) => {
        switch (controlsData.key) {
          case 0:
            PARAMS.diameter = controlsData.velocity;
            break;
          case 1:
            // todo: use same logic as TweakPane
            PARAMS.sineFrequency = Math.max(10, Math.floor(controlsData.velocity * 100));
            break;
          default:
        }
        if (pane) {
          pane.refresh();
        }
      });
    });
  });
</script>

<P5Canvas {sketch} params={PARAMS} />
