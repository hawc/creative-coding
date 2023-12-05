<script>
  export let disabled = false;
</script>

<button
  class="bg-white border-purple-600 border-2 px-4 py-1 rounded-full disabled:border-purple-200"
  {disabled}
>
  <slot />
</button>
