<script lang="ts">
  import type { Bindable } from '@tweakpane/core';
  import { Folder, AutoObject, Slider, AutoValue, Element, Pane } from 'svelte-tweakpane-ui';

  import Log from './Log.svelte';

  import { BASE_PARAMS, debug } from '$lib/store';

  export let object: Bindable;

  let expandedGlobal = true;
  let expanded = true;
  let expandedDebug = true;
</script>

<Pane position="fixed" y={50} title="">
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
  {#if $debug}
    <Folder bind:expanded={expandedDebug} title="Debug">
      <Element>
        <Log />
      </Element>
    </Folder>
  {/if}
</Pane>
