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

  const handleMidiMessage: MidiHandler = (key, velocity) => {
    let init = false;
    if (init) {
      midiMapping[key]?.(key, velocity);
    }
    init = true;
  };

  let bgColorClass = '';
  let screenBgColorClass = 'text-black';

  onMount(async () => {
    if (darkScreen) {
      bgColorClass = 'bg-neutral-900';
      screenBgColorClass = 'bg-black text-white';
    }

    midiReady.subscribe((isReady) => {
      if (isReady) {
        midiControls.subscribe(({ key, velocity }) => handleMidiMessage(key, velocity));
      }
    });
  });
</script>

<Pane bind:params />

<div class={`h-full grid place-items-center -z-10 ${bgColorClass}`}>
  <div role="figure" on:mousemove={handleMousemove} class={`shadow-xl ${screenBgColorClass}`}>
    <slot />
  </div>
</div>
