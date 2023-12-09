type DeviceOffsetConfig = { [key: string]: number };

export type MidiHandler = (key: number, velocity: number) => void;

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
    console.log('MIDI ready!');
    midiAccess.inputs.forEach((entry) => {
      const offset = entry.id in deviceOffset ? deviceOffset[entry.id] : 0;
      entry.onmidimessage = (event) => {
        onMIDIMessage(event, offset, handler);
      };
    });
  } catch (err) {
    console.log('Failed to get MIDI access - ' + err);
  }
}
