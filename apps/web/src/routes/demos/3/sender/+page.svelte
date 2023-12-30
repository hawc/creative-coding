<script lang="ts">
  import { setContext } from 'svelte';

  import { controls, midiMapping } from '../store';

  import Pane from '$lib/components/Pane.svelte';
  import PeerController from '$lib/components/PeerController.svelte';

  setContext('controls', controls);
  setContext('midiMapping', midiMapping);
</script>

<Pane sender />
<PeerController />
