import type { Pane } from 'tweakpane/dist/types/pane/pane';

const canvasDimensions: [number, number] = [400, 400];

export const BASE_PARAMS = {
  debug: false,
  fullScreen: false,
}

export function getDimensions(fullScreen: boolean) {
  if (fullScreen) {
    return [window.innerWidth, window.innerHeight];
  }
  return canvasDimensions;
}

let pane: Pane;

export async function initPane() {
  const { Pane } = await import('tweakpane');
  pane = new Pane();

  return true;
}

export function getPane() {
  return pane;
}
