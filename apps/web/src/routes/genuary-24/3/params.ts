import type { TpEvent } from '@tweakpane/core';
import { writable } from 'svelte/store';

import { BASE_PARAMS, initPaneFolder } from '$lib/client/canvasUtils';

const base = {
  ...BASE_PARAMS,
  color: '#ee11ff',
  diameter: 1,
  sineFrequency: 10
}

export const controls = writable({ key: 0, velocity: 1 });
export const PARAMS = writable(base);

export const paneSetup = () => {
  console.log('initPaneFolder');
  const folder = initPaneFolder('Render Options', base, {
    color: null,
    diameter: { max: 1, min: 0, step: 0.01 },
    sineFrequency: { max: 40, min: 5, step: 1 }
  });

  folder.on('change', (e: TpEvent) => console.log('e', base, e));
};