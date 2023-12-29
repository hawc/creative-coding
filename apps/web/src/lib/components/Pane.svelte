<script lang="ts">
  import type { Bindable } from '@tweakpane/core';
  import { Folder, AutoObject, Slider, AutoValue, Element, Pane } from 'svelte-tweakpane-ui';

  import Log from './Log.svelte';

  import { base, debug } from '$lib/store';

  export let params: Bindable;
  export let fixed = false;

  let expandedGlobal = true;
  let expanded = true;
  let expandedDebug = true;
</script>

<Pane position={fixed ? 'fixed' : 'inline'} y={50} title="">
  <Folder bind:expanded={expandedGlobal} title="Global">
    <AutoObject bind:object={$base} />
  </Folder>
  <Folder bind:expanded title="Renderer">
    {#each Object.keys(params) as key}
      {#if params[key].type}
        {#if params[key].type === 'slider'}
          <Slider label={key} bind:value={params[key].value} {...params[key].options} />
        {/if}
      {:else}
        <AutoValue label={key} bind:value={params[key].value} />
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
