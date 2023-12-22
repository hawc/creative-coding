<script lang="ts">
  import type { Bindable } from '@tweakpane/core';
  import { onMount } from 'svelte';

  import Pane from './Pane.svelte';

  import type { MidiHandler } from '$lib/client/webMidiUtils';
  import { darkScreen, midiControls, midiReady } from '$lib/store';

  let bgColorClass = '';
  let screenBgColorClass = '';

  export let object: Bindable;
  export let midiFunc: MidiHandler = () => {};
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  export let handleMousemove = (event: MouseEvent) => {};

  onMount(async () => {
    darkScreen.subscribe((value) => {
      bgColorClass = value ? 'bg-neutral-900' : '';
      screenBgColorClass = value ? 'bg-black text-white' : 'text-black';
    });

    midiReady.subscribe((isReady) => {
      if (isReady) {
        midiControls.subscribe(({ key, velocity }) => midiFunc(key, velocity));
      }
    });
  });
</script>

<Pane bind:object />

<div class={`h-full grid place-items-center -z-10 ${bgColorClass}`}>
  <div role="figure" on:mousemove={handleMousemove} class={`shadow-xl ${screenBgColorClass}`}>
    <slot />
  </div>
</div>
