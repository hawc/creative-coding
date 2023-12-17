<script lang="ts">
  import P5 from 'p5-svelte/P5.svelte';
  import type { Sketch } from 'p5-svelte/types';

  import { darkScreen } from '$lib/store';

  export let sketch: Sketch | undefined = undefined;

  let bgColorClass = '';
  let screenBgColorClass = '';

  darkScreen.subscribe((value) => {
    bgColorClass = value ? 'bg-gray-900' : '';
  });

  darkScreen.subscribe((value) => {
    screenBgColorClass = value ? 'bg-black text-white' : 'text-black';
  });
</script>

<div class={`h-full grid place-items-center -z-10 ${bgColorClass}`}>
  <div class={`shadow-xl ${screenBgColorClass}`}>
    {#if sketch}
      <P5 {sketch} />
    {/if}
    <slot />
  </div>
</div>
