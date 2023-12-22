<script lang="ts">
  import { onMount } from 'svelte';

  import { browser } from '$app/environment';
  import { messages } from '$lib/store';

  let log: HTMLElement;

  if (browser) {
    onMount(() => {
      const config = { childList: true };

      const callback = (mutationsList: MutationRecord[]) => {
        for (let mutation of mutationsList) {
          if (mutation.type === 'childList') {
            log?.scrollTo(0, log.scrollHeight);
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
  class="scroller p-2 text-white text-xs font-body h-64 overflow-y-scroll break-all"
>
  {#each $messages as message}
    <div>
      {message}
    </div>
  {/each}
</div>

<style>
  .scroller {
    overflow-anchor: auto;
    scrollbar-color: black white;
  }
  .scroller::-webkit-scrollbar {
    width: 6px;
    background-color: transparent;
  }
  .scroller::-webkit-scrollbar-track {
    background: black;
  }

  .scroller::-webkit-scrollbar-thumb {
    background-color: white;
    border-radius: 6px;
    border: 1px solid black;
  }
</style>
