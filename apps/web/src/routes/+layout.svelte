<script lang="ts">
  import '@partnerds-de/ui/styles.css';
  import { PageFrame } from '@partnerds-de/ui';

  import MidiReceiver from '$lib/components/MidiReceiver.svelte';
  import WebSocketReceiver from '$lib/components/WebSocketReceiver.svelte';
  import { darkScreen } from '$lib/store';

  let textColorClass = 'text-red';

  darkScreen.subscribe((value) => {
    console.log('sub', value);
    textColorClass = value ? 'text-white' : 'text-black';
  });
</script>

<PageFrame {textColorClass}>
  <MidiReceiver>
    <WebSocketReceiver>
      <slot />
    </WebSocketReceiver>
  </MidiReceiver>
</PageFrame>
