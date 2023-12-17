<script lang="ts">
  import { onMount } from 'svelte';

  import { browser } from '$app/environment';
  import { messages } from '$lib/store';

  let log: HTMLElement;

  if (browser) {
    onMount(() => {
      const config = { childList: true };

      const callback = (mutationsList: MutationRecord[]) => {
        console.log('callback');
        for (let mutation of mutationsList) {
          if (mutation.type === 'childList') {
            log.scrollTo(0, log.scrollHeight);
          }
        }
      };

      const observer = new MutationObserver(callback);
      observer.observe(log, config);
    });
  }
</script>

<div
  bind:this={log}
  id="scroller"
  class="p-2 text-white text-xs font-body h-64 overflow-y-auto break-all"
>
  {#each $messages as message}
    <div>
      {message}
    </div>
  {/each}
</div>

<style>
  #scroller {
    overflow-anchor: auto;
  }
</style>
