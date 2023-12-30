<script lang="ts">
  import { getContext } from 'svelte';
  import type { Writable } from 'svelte/store';
  import { Folder, AutoObject, Slider, AutoValue, Element, Pane } from 'svelte-tweakpane-ui';

  import Log from './Log.svelte';

  import type { Config } from '$lib/client/canvasUtils';
  import { base, debug } from '$lib/store';

  export let fixed = false;

  let expandedGlobal = true;
  let expandedControls = true;
  let expandedDebug = true;

  const controls: Writable<Config> = getContext('controls');
</script>

<Pane position={fixed ? 'fixed' : 'inline'} y={50} title="">
  <Folder bind:expanded={expandedGlobal} title="Global">
    <AutoObject bind:object={$base} />
  </Folder>
  {#if controls}
    <Folder bind:expanded={expandedControls} title="Renderer">
      {#each Object.keys($controls) as key}
        {#if $controls[key].type}
          {#if $controls[key].type === 'slider'}
            <Slider label={key} bind:value={$controls[key].value} {...$controls[key].options} />
          {/if}
        {:else}
          <AutoValue label={key} bind:value={$controls[key].value} />
        {/if}
      {/each}
    </Folder>
  {/if}
  {#if $debug}
    <Folder bind:expanded={expandedDebug} title="Debug">
      <Element>
        <Log />
      </Element>
    </Folder>
  {/if}
</Pane>
