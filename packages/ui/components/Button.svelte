<script lang="ts">
  export let disabled = false;
  export let className = '';
  export let onClick = () => {};
</script>

<button
  {disabled}
  on:click={onClick}
  type="button"
  class={`bg-white text-black border-2 px-2 py-0 border-black cursor-pointer ${className}`}
>
  <slot />
</button>
