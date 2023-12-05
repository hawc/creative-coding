<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  function onClick() {
    dispatch('message');
  }

  export let disabled = false;
</script>

<button
  {disabled}
  on:click={onClick}
  type="button"
  class="bg-white border-purple-600 border-2 px-4 py-1 rounded-full disabled:border-purple-200"
>
  <slot />
</button>
