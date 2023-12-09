import { writable } from 'svelte/store';

export const controls = writable({ key: 0, velocity: 1 });

export const debug = writable(false);
export const midiReady = writable(false);