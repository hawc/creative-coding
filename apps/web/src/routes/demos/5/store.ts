import { writable } from 'svelte/store';

import type { Config } from '$lib/client/canvasUtils';

export const base: Config = {
  color: {
    value: '#000000'
  },
  minHeight: {
    type: 'slider',
    value: 5,
    options: {
      min: 0,
      max: 25,
      step: 1
    }
  },
  maxHeight: {
    type: 'slider',
    value: 25,
    options: {
      min: 25,
      max: 50,
      step: 1
    }
  },
  count: {
    type: 'slider',
    value: 10,
    options: {
      min: 1,
      max: 30,
      step: 1
    }
  }
}

export const controls = writable({ key: 0, velocity: 1 });
export const PARAMS = writable(base);
