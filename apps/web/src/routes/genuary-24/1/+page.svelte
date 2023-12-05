<script lang="ts">
  import { appendMessage } from '$lib';
  import { initMIDIAccess } from '$lib/client/webMidiUtils';
  import {
    establishWebSocket,
    webSocketEstablished,
    requestData
  } from '$lib/client/webSocketUtils';
  import P5Canvas from '$lib/components/P5Canvas.svelte';
  import { Button } from '@partnerds-de/ui';

  import type p5 from 'p5';
  import { onMount } from 'svelte';

  const PARAMS = {
    width: 123,
    height: 123,
    color: '#ff0055'
  };

  let messages = [''];

  const sketch = (p5: p5) => {
    p5.setup = () => {
      p5.createCanvas(window.innerWidth, window.innerHeight);
    };

    p5.draw = () => {
      p5.ellipse(p5.width / 2, p5.height / 2, PARAMS.width, PARAMS.height).fill(PARAMS.color);
    };
  };

  onMount(async () => {
    const { Pane } = await import('tweakpane');

    const pane = new Pane();

    pane.addBinding(PARAMS, 'width');
    pane.addBinding(PARAMS, 'height');
    pane.addBinding(PARAMS, 'color');

    const handler = (command: number, key: number, velocity: number) => {
      console.log(command, key, velocity);
    };

    await initMIDIAccess(handler);
  });

  async function setMessage() {
    messages = appendMessage(messages, await requestData());
  }
</script>

<main>
  <h1>SvelteKit with WebSocket Integration</h1>

  <Button disabled={webSocketEstablished} on:message={() => establishWebSocket()}>
    Establish WebSocket connection
  </Button>

  <Button on:message={async () => setMessage()}>Request Data from GET endpoint</Button>

  {#each messages as message}
    <p>{message}</p>
  {/each}
</main>

<div><P5Canvas {sketch} /></div>

<style>
  main {
    font-family: sans-serif;
  }
</style>
