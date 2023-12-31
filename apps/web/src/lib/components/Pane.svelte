<script lang="ts">
  import { getContext } from 'svelte';
  import type { Writable } from 'svelte/store';
  import { Folder, AutoObject, Slider, AutoValue, Element, Pane } from 'svelte-tweakpane-ui';
  import { renderSVG } from 'uqr';

  import Log from './Log.svelte';

  import { base, debug, senderLink, type Config } from '$lib/store';

  export let fixed = false;
  export let sender = false;

  let expandedGlobal = true;
  let expandedControls = true;
  let expandedDebug = true;
  let expandedSenderLink = false;

  const controls: Writable<Config> = getContext('controls');
</script>

<Pane position={fixed ? 'fixed' : 'inline'} y={50} title="Controls">
  <Folder bind:expanded={expandedGlobal} title="Global">
    <AutoObject bind:object={$base} />
  </Folder>
  {#if $controls}
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
  {#if !sender && $senderLink}
    {#if $debug}
      <Folder bind:expanded={expandedDebug} title="Debug">
        <Element>
          <Log />
          {$senderLink}
        </Element>
      </Folder>
    {/if}
    <Folder bind:expanded={expandedSenderLink} title="External Controller">
      <Element>
        <a href={$senderLink} target="_new">
          <!-- eslint-disable-next-line svelte/no-at-html-tags -->
          {@html renderSVG($senderLink)}
        </a>
      </Element>
    </Folder>
  {/if}
</Pane>
