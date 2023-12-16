import type { BindingParams, ColorInputParams, NumberInputParams } from 'tweakpane';

export type Params = {
  [key: string]: number | string | boolean;
};

export const canvasDimensions: [number, number] = [400, 400];

type TPType = BindingParams | ColorInputParams | NumberInputParams;

type ValueType = {
  type?: 'slider' | 'color';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any,
  options?: TPType;
}

export type Config = { [key: string]: ValueType };
