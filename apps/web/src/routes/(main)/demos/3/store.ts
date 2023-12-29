import { writable } from 'svelte/store';

import type { Config } from '$lib/client/canvasUtils';

export const base: Config = {
  color: {
    value: '#ee11ff'
  },
  diameter: {
    type: 'slider',
    value: 1,
    options: {
      min: 0,
      max: 1,
    }
  },
  sineFrequency: {
    type: 'slider',
    value: 10,
    options: {
      min: 0,
      max: 10,
    }
  }
}

export const midiControls = writable({ key: 0, velocity: 1 });
export const controls = writable(base);
