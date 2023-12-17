<script lang="ts">
  import { onMount } from 'svelte';

  import { roundDecimals } from '$lib/client/mathUtils';
  import { initMIDIAccess, type MidiHandler } from '$lib/client/webMidiUtils';
  import { debug, messages } from '$lib/store';
  import { midiControls } from '$lib/store.js';

  let allowLogging = $debug;

  onMount(async () => {
    const handler: MidiHandler = (key, velocity) => {
      if (allowLogging) {
        messages.set([...$messages, `${key}.${velocity}`]);
      }

      $midiControls = { key, velocity: roundDecimals(velocity / 127) };
    };

    await initMIDIAccess(handler);
  });
</script>

<slot />
