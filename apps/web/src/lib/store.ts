import { derived, writable, type Writable } from 'svelte/store';
import type { BindingParams, ColorInputParams, NumberInputParams } from 'tweakpane';

type TPType = BindingParams | ColorInputParams | NumberInputParams;

type ValueType<T extends TPType> = {
  type?: 'slider' | 'color';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any,
  options?: T;
}

export type Config = { [key: string]: ValueType<TPType> };

export type Params = {
  [key: string]: boolean;
};

export const midiControls = writable({ key: 0, velocity: 1 });

export const base: Writable<Params> = writable({
  debug: false,
  fullScreen: true,
});

export const debug = derived(base, (base) => base.debug);
export const fullScreen = derived(base, (base) => base.fullScreen);

export const midiReady = writable(false);
export const rerender = writable('');
export const senderLink = writable('');
export const messages = writable([] as string[]);
export const screenDimensions = writable([0, 0]);
export const mousePosition = writable({ x: 0, y: 0 });