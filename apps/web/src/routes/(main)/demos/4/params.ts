import { writable } from 'svelte/store';


export const midiControls = writable({ key: 0, velocity: 1 });

const base = {
  color: { value: '#ff0055' },
  diameter: {
    type: 'slider',
    value: 1.5,
    options: {
      min: 0,
      max: 4,
      step: 0.01
    }
  },
  r: {
    type: 'slider',
    value: 50,
    options: {
      min: 10,
      max: 60,
      step: 1
    }
  },
  sineFrequency: {
    type: 'slider',
    value: 0.9,
    options: {
      min: 0.75,
      max: 1,
      step: 0.01
    }
  }
};

export const controls = writable(base);