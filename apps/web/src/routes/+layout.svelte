<script lang="ts">
  import '@partnerds-de/ui/styles.css';
  import { PageFrame, Header, Footer, Link } from '@partnerds-de/ui';

  import { page } from '$app/stores';
  import MidiReceiver from '$lib/components/MidiReceiver.svelte';
  import WebSocketReceiver from '$lib/components/WebSocketReceiver.svelte';
  import { rerender, screenDimensions } from '$lib/store';

  let routeId = '';
  page.subscribe((p) => (routeId = p.route.id ?? ''));

  let textColorClass = 'text-red';
  let rerenderKey = '';

  rerender.subscribe((value) => {
    rerenderKey = value;
  });
</script>

<PageFrame className="flex flex-col font-body tracking-wider">
  <Header className="font-semibold">
    {#if routeId.includes('genuary-24/')}
      <div>
        <Link to="/genuary-24" hide>Genuary '24</Link>
      </div>
    {/if}
    {#if routeId.includes('demos/')}
      <div>
        <Link to="/demos" hide>Demos</Link>
      </div>
    {/if}
  </Header>
  <main
    class={`${textColorClass} grow relative`}
    bind:clientWidth={$screenDimensions[0]}
    bind:clientHeight={$screenDimensions[1]}
  >
    <MidiReceiver>
      <WebSocketReceiver>
        {#key rerenderKey}
          <slot />
        {/key}
      </WebSocketReceiver>
    </MidiReceiver>
  </main>
  <Footer />
</PageFrame>
