import { writable } from 'svelte/store';

import type { MidiMapping } from '$lib/client/webMidiUtils';

export const midiControls = writable({ key: 0, velocity: 1 });

const base = {
  color: {
    type: 'color',
    value: '#ff0055'
  },
  diameter: {
    type: 'slider',
    value: 1,
    options: {
      min: 0,
      max: 20,
      step: 1
    }
  },
  sineFrequency: {
    type: 'slider',
    value: 10,
    options: {
      min: 0,
      max: 40,
      step: 1
    }
  }
};

export const controls = writable(base);

export const midiMapping: MidiMapping = {
  0: (key, velocity) => (base.diameter.value = velocity),
  1: (key, velocity) => (base.sineFrequency.value = Math.max(10, Math.floor(velocity * 100)))
};