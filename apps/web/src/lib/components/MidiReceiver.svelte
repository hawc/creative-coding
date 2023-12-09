<script lang="ts">
  import { initMIDIAccess, type MidiHandler } from '$lib/client/webMidiUtils';
  import { onMount } from 'svelte';
  import { controls } from '$lib/store.js';
  import { debug } from '$lib/store';

  let messages = '';
  let allowLogging = false;

  debug.subscribe((value) => {
    allowLogging = value;
  });
  onMount(async () => {
    const handler: MidiHandler = (key, velocity) => {
      if (allowLogging) {
        messages = `${key}.${velocity}`;
      }

      // console.log({ key, velocity: velocity / 127 });

      $controls = { key, velocity: Math.floor((velocity / 127) * 100) / 100 };
    };

    await initMIDIAccess(handler);
  });
</script>

<p>Midi-Messages:<br />{messages}</p>

<slot />
