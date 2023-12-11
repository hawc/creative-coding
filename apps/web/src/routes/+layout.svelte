<script lang="ts">
  import '@partnerds-de/ui/styles.css';
  import { PageFrame } from '@partnerds-de/ui';

  import MidiReceiver from '$lib/components/MidiReceiver.svelte';
  import WebSocketReceiver from '$lib/components/WebSocketReceiver.svelte';
  import { darkScreen, rerender } from '$lib/store';

  let textColorClass = 'text-red';
  let rerenderKey = '';

  darkScreen.subscribe((value) => {
    textColorClass = value ? 'text-white' : 'text-black';
  });

  rerender.subscribe((value) => {
    rerenderKey = value;
  });
</script>

<PageFrame {textColorClass}>
  <MidiReceiver>
    <WebSocketReceiver>
      {#key rerenderKey}
        <slot />
      {/key}
    </WebSocketReceiver>
  </MidiReceiver>
</PageFrame>
