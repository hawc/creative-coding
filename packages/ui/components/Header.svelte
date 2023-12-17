<script lang="ts">
  import Link from './Link.svelte';

  export let className = '';
</script>

<header class={className}>
  <div class="flex justify-between p-2 border-b border-black">
    <h1 class="my-0">
      <Link to="/" hide>Creative Coding</Link>
    </h1>
    <div>
      <slot />
    </div>
  </div>
</header>
