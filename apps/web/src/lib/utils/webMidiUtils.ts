import { log } from './logUtils';

type DeviceOffsetConfig = { [key: string]: number };

export type MidiHandler = (key: number, velocity: number) => void;

export type MidiMapping = { [key: string]: MidiHandler };

const deviceOffset: DeviceOffsetConfig = {
  '163286373': 32,
}

function onMIDIMessage(
  event: WebMidi.MIDIMessageEvent,
  offset: number,
  handler: MidiHandler
) {
  const key = event.data[1];
  const velocity = event.data.length > 2 ? event.data[2] : 0;

  handler(key - offset, velocity);
}

export async function initMIDIAccess(
  handler: MidiHandler
) {
  try {
    const midiAccess = await navigator.requestMIDIAccess();
    midiAccess.inputs.forEach((entry) => {
      const offset = entry.id in deviceOffset ? deviceOffset[entry.id] : 0;
      entry.onmidimessage = (event) => {
        onMIDIMessage(event, offset, handler);
      };
    });
    return true;
  } catch (error) {
    log(`Failed to get MIDI access: ${JSON.stringify(error)}`);
    return false;
  }
}
