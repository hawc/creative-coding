/* eslint-disable indent */
import { writable } from 'svelte/store';

import type { MidiMapping } from '$lib/client/webMidiUtils';
import type { Config } from '$lib/store';

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

export const midiMapping: MidiMapping = {
  0: (key, velocity) => (base.diameter.value = velocity),
  1: (key, velocity) =>
  (base.sineFrequency.value = Math.max(
    (base.sineFrequency.options?.max as number | undefined) ?? 10,
    Math.floor(velocity * 100)
  ))
};