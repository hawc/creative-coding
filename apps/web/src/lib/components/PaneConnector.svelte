<script lang="ts">
  import P5 from 'p5-svelte/P5.svelte';
  import type { Sketch } from 'p5-svelte/types';
  import { onMount } from 'svelte';

  import type { MidiHandler } from '$lib/client/webMidiUtils';
  import { darkScreen, midiControls, midiReady } from '$lib/store';

  export let sketch: Sketch | undefined = undefined;
  export let midiFunc: MidiHandler = () => {};

  let bgColorClass = '';
  let screenBgColorClass = '';

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

<div class={`h-full grid place-items-center -z-10 ${bgColorClass}`}>
  <div class={`shadow-xl ${screenBgColorClass}`}>
    {#if sketch}
      <P5 {sketch} />
    {:else}
      <slot />
    {/if}
  </div>
</div>
