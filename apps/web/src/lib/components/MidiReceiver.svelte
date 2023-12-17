<script lang="ts">
  import { onMount } from 'svelte';

  import { roundDecimals } from '$lib/client/mathUtils';
  import { initMIDIAccess, type MidiHandler } from '$lib/client/webMidiUtils';
  import { debug, messages, midiReady } from '$lib/store';
  import { midiControls } from '$lib/store.js';

  let allowLogging = false;

  debug.subscribe((isDebugEnabled) => (allowLogging = isDebugEnabled));

  onMount(async () => {
    const handler: MidiHandler = (key, velocity) => {
      if (allowLogging) {
        messages.set([
          ...$messages,
          `MIDI: 🔑 ${key} 🎚️ ${velocity} 📈 ${roundDecimals(velocity / 127)}`
        ]);
      }

      $midiControls = { key, velocity: roundDecimals(velocity / 127) };
    };

    const isReady = await initMIDIAccess(handler);
    midiReady.set(isReady);
  });
</script>

<slot />
