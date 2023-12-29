<script lang="ts">
  import '@partnerds-de/ui/styles.css';
  import { PageFrame, Footer } from '@partnerds-de/ui';

  import MidiReceiver from '$lib/components/MidiReceiver.svelte';
  import { rerender, screenDimensions } from '$lib/store';

  let textColorClass = 'text-red';
  let rerenderKey = '';

  rerender.subscribe((value) => {
    rerenderKey = value;
  });
</script>

<PageFrame className="flex flex-col font-body tracking-wider">
  <main
    class={`${textColorClass} grow relative`}
    bind:clientWidth={$screenDimensions[0]}
    bind:clientHeight={$screenDimensions[1]}
  >
    <MidiReceiver>
      {#key rerenderKey}
        <slot />
      {/key}
    </MidiReceiver>
  </main>
  <Footer />
</PageFrame>
