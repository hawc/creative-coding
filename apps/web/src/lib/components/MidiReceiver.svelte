<script lang="ts">
  import { onMount } from 'svelte';

  import { midiControls, midiReady } from '$lib/store';
  import { log } from '$lib/utils/logUtils';
  import { roundDecimals } from '$lib/utils/mathUtils';
  import { initMIDIAccess, type MidiHandler } from '$lib/utils/webMidiUtils';

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
