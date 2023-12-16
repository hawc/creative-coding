import { writable } from 'svelte/store';

import { BASE_PARAMS } from '$lib/client/canvasUtils';

export const controls = writable({ key: 0, velocity: 1 });

const base = {
  ...BASE_PARAMS,
  color: '#ff0055',
  diameter: 1,
  sineFrequency: 10
};

export const PARAMS = writable(base);