import { writable } from 'svelte/store';

export const midiControls = writable({ key: 0, velocity: 1 });

export const debug = writable(false);
export const darkScreen = writable(false);
export const midiReady = writable(false);