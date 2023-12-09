<script lang="ts">
  import '@partnerds-de/ui/styles.css';
  import { PageFrame } from '@partnerds-de/ui';
  import MidiReceiver from '$lib/components/MidiReceiver.svelte';
  import WebSocketReceiver from '$lib/components/WebSocketReceiver.svelte';
</script>

<PageFrame>
  <MidiReceiver>
    <WebSocketReceiver>
      <slot />
    </WebSocketReceiver>
  </MidiReceiver>
</PageFrame>
