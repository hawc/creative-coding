import { derived, writable } from 'svelte/store';

export const midiControls = writable({ key: 0, velocity: 1 });

export const BASE_PARAMS = writable({
  debug: false,
  fullScreen: false,
})

export const debug = derived(BASE_PARAMS, (base) => base.debug);
export const fullScreen = derived(BASE_PARAMS, (base) => base.fullScreen);

// export const debug = writable(false);
export const darkScreen = writable(false);
export const midiReady = writable(false);
export const rerender = writable('0');
export const screenDimensions = writable([0, 0]);