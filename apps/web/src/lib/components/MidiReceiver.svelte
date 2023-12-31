<script lang="ts">
  import { onMount } from 'svelte';

  import { log } from '$lib/client/logUtils';
  import { roundDecimals } from '$lib/client/mathUtils';
  import { initMIDIAccess, type MidiHandler } from '$lib/client/webMidiUtils';
  import { midiControls, midiReady } from '$lib/store';

  const handler: MidiHandler = (key, velocity) => {
    log(`MIDI: 🔑 ${key} 🎚️ ${velocity} 📈 ${roundDecimals(velocity / 127)}`);
    midiControls.set({ key, velocity: roundDecimals(velocity / 127) });
  };

  onMount(async () => {
    const isReady = await initMIDIAccess(handler);
    midiReady.set(isReady);
  });
</script>

<slot />
