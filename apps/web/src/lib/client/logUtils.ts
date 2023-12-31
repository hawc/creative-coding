import { debug, messages } from '$lib/store';

let allowLogging = false;

debug.subscribe(d => allowLogging = d)

export function log(message: string) {
  if (allowLogging) {
    messages.update(m => [...m, message]);
  }
}