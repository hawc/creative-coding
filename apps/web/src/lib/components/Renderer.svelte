<script lang="ts">
  import { getContext, onMount } from 'svelte';

  import type { MidiHandler, MidiMapping } from '$lib/client/webMidiUtils';
  import { midiControls, midiReady, mousePosition } from '$lib/store';

  export let darkScreen = false;

  const bgColorClass = darkScreen ? 'bg-neutral-900' : '';
  const screenBgColorClass = darkScreen ? 'bg-black text-white' : 'text-black';

  const midiMapping: MidiMapping = getContext('midiMapping');

  let init = false;
  const onMidiMessage: MidiHandler = (key, velocity) => {
    if (init) {
      midiMapping[key]?.(key, velocity);
    }
    init = true;
  };

  onMount(async () => {
    midiReady.subscribe((isReady) => {
      if (isReady) {
        midiControls.subscribe(({ key, velocity }) => onMidiMessage(key, velocity));
      }
    });
  });
</script>

<div class={`h-full grid place-items-center -z-10 ${bgColorClass}`}>
  <div
    role="figure"
    on:mousemove={(event) => mousePosition.set({ x: event.offsetX, y: event.offsetY })}
    class={`shadow-xl ${screenBgColorClass}`}
  >
    <slot />
  </div>
</div>
