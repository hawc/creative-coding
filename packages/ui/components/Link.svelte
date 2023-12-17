<script lang="ts">
  export let to = '/';
  export let highlight = 'rgb(255, 233, 0)';
  export let hide = false;
  export let target = '_self';
</script>

<a
  {target}
  style="--color: {highlight}; --width: {hide ? '0' : '1rem'}"
  href={to}
  class="link-animated"
>
  <slot />
</a>

<style bind:highlight>
  .link-animated {
    --line: linear-gradient(var(--color), var(--color));
    --thickness: 6px;

    background-image: var(--line);
    background-size: 0% var(--thickness);
    background-repeat: no-repeat;
    transition: all 500ms ease;
    background-position: bottom left;
    background-size: var(--width) var(--thickness);
  }

  .link-animated:hover {
    background-size: 100% var(--thickness);
    transition: all 250ms ease;
  }

  .link-animated:focus,
  .link-animated:active {
    --thickness: 1rem;
    background-size: 100% var(--thickness);
  }
</style>
