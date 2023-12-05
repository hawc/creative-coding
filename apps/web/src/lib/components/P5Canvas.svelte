<script lang="ts">
  import P5, { type Sketch } from 'p5-svelte';

  export let sketch: Sketch;
</script>

<div class="absolute top-0 left-0 -z-10">
  <P5 {sketch} />
</div>
