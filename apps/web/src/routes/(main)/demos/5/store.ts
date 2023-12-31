/* eslint-disable indent */
import { sha256 } from 'crypto-hash';
import { derived, writable } from 'svelte/store';

import type { Config } from '$lib/store';
import type { MidiMapping } from '$lib/utils/webMidiUtils';

export const base: Config = {
  lightColor: {
    value: '#ffffff'
  },
  minHeight: {
    type: 'slider',
    value: 5,
    options: {
      min: 0,
      max: 20,
      step: 1
    }
  },
  maxHeight: {
    type: 'slider',
    value: 25,
    options: {
      min: 20,
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

export const midiControls = writable({ key: 0, velocity: 1 });

export const controls = writable(base);

export const rerenderKey = derived(controls, params => {
  return `${params.minHeight.value}${params.maxHeight.value}${params.count.value}`;
})

export const midiMapping: MidiMapping = {
  0: (key, velocity) => (base.diameter.value = velocity),
  1: (key, velocity) =>
  (base.sineFrequency.value = Math.max(
    (base.sineFrequency.options?.max as number | undefined) ?? 10,
    Math.floor(velocity * 100)
  ))
};
