import { derived, writable } from 'svelte/store';

export const midiControls = writable({ key: 0, velocity: 1 });

export const base = writable({
  debug: false,
  fullScreen: true,
})

export const debug = derived(base, (base) => base.debug);
export const fullScreen = derived(base, (base) => base.fullScreen);

export const midiReady = writable(false);
export const rerender = writable('0');
export const senderLink = writable('');
export const messages = writable([] as string[]);
export const screenDimensions = writable([0, 0]);
export const mousePosition = writable({ x: 0, y: 0 });