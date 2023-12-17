<script lang="ts">
  export let className = '';
</script>

<section class={`absolute t-0 l-0 h-full w-full ${className}`}>
  <slot />
</section>
