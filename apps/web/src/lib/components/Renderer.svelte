<script lang="ts">
  import type { Bindable } from '@tweakpane/core';
  import { onMount } from 'svelte';

  import Pane from './Pane.svelte';

  import type { MidiHandler, MidiMapping } from '$lib/client/webMidiUtils';
  import { midiControls, midiReady } from '$lib/store';

  export let darkScreen = false;
  export let params: Bindable;
  export let midiMapping: MidiMapping;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  export let handleMousemove = (event: MouseEvent) => {};

  const bgColorClass = darkScreen ? 'bg-neutral-900' : '';
  const screenBgColorClass = darkScreen ? 'bg-black text-white' : 'text-black';

  const handleMidiMessage: MidiHandler = (key, velocity) => {
    let init = false;
    if (init) {
      midiMapping[key]?.(key, velocity);
    }
    init = true;
  };

  onMount(async () => {
    midiReady.subscribe((isReady) => {
      if (isReady) {
        midiControls.subscribe(({ key, velocity }) => handleMidiMessage(key, velocity));
      }
    });
  });
</script>

<Pane bind:params fixed />

<div class={`h-full grid place-items-center -z-10 ${bgColorClass}`}>
  <div role="figure" on:mousemove={handleMousemove} class={`shadow-xl ${screenBgColorClass}`}>
    <slot />
  </div>
</div>
