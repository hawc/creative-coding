<script lang="ts">
	import {
		establishWebSocket,
		webSocketEstablished,
		requestData
	} from '$lib/client/webSocketUtils';

	import type p5 from 'p5';
	import P5 from 'p5-svelte';

	let messages = [''];
	let width = 55;
	let height = 55;

	const sketch = (p5: p5) => {
		p5.setup = () => {
			p5.createCanvas(400, 400);
		};

		p5.draw = () => {
			p5.ellipse(p5.width / 2, p5.height / 2, width, height);
		};
	};

	const appendMessage = (message: string) => {
		messages = [...messages, message];
	};
</script>

<main>
	<h1>SvelteKit with WebSocket Integration</h1>

	<button disabled={webSocketEstablished} on:click={() => establishWebSocket()}>
		Establish WebSocket connection
	</button>

	<button on:click={async () => appendMessage(await requestData())}>
		Request Data from GET endpoint
	</button>
</main>

<label>
	Width
	<input type="range" bind:value={width} min="100" max="1000" step="0.01" />
	{width}
</label>

<label>
	Height
	<input type="range" bind:value={height} min="100" max="1000" step="0.01" />
	{height}
</label>

<P5 {sketch} />

{#each messages as message}
	<p>{message}</p>
{/each}

<style>
	main {
		font-family: sans-serif;
	}
</style>
