import { writable } from 'svelte/store';


export const controls = writable({ key: 0, velocity: 1 });

const base = {
  color: { value: '#ff0055' },
  diameter: { value: 1 },
  sineFrequency: { value: 10 }
};

export const PARAMS = writable(base);