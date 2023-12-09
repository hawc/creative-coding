import { BASE_PARAMS } from '$lib/client/canvasUtils';
import { writable } from 'svelte/store';

export const controls = writable({ key: 0, velocity: 1 });

export const PARAMS = {
  ...BASE_PARAMS,
  width: 10,
  height: 10,
  color: '#ff0055',
  diameter: 1,
  sineFrequency: 10
};
