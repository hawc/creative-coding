<script lang="ts">
  import type { Bindable } from '@tweakpane/core';
  import { Folder, AutoObject, Slider, AutoValue, Pane } from 'svelte-tweakpane-ui';

  import { BASE_PARAMS } from '$lib/store';

  let expandedGlobal = true;
  let expanded = true;
  export let object: Bindable;
</script>

<Pane title="">
  <Folder bind:expanded={expandedGlobal} title="Global">
    <AutoObject bind:object={$BASE_PARAMS} />
  </Folder>
  <Folder bind:expanded title="Renderer">
    {#each Object.keys(object) as key}
      {#if object[key].type}
        {#if object[key].type === 'slider'}
          <Slider label={key} bind:value={object[key].value} {...object[key].options} />
        {/if}
      {:else}
        <AutoValue label={key} bind:value={object[key].value} />
      {/if}
    {/each}
  </Folder>
</Pane>
