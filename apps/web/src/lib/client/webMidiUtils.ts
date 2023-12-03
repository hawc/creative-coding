function listInputsAndOutputs(midiAccess: WebMidi.MIDIAccess) {
	for (const entry of midiAccess.inputs) {
		const input = entry[1];
		console.log("Input port [type:'" + input.type + "'] id:'" + input.id +
			"' manufacturer:'" + input.manufacturer + "' name:'" + input.name +
			"' version:'" + input.version + "'");
	}

	for (const entry of midiAccess.outputs) {
		const output = entry[1];
		console.log("Output port [type:'" + output.type + "'] id:'" + output.id +
			"' manufacturer:'" + output.manufacturer + "' name:'" + output.name +
			"' version:'" + output.version + "'");
	}
}

function onMIDIMessage(event: WebMidi.MIDIMessageEvent, handler: (command: number, key: number, velocity: number) => void) {
	const command = event.data[0];
	const key = event.data[1];
	const velocity = (event.data.length > 2) ? event.data[2] : 0; // a velocity value might not be included with a noteOff command

	handler(command, key, velocity);
}

export async function initMIDIAccess(handler: (command: number, key: number, velocity: number) => void) {
	try {
		const midiAccess = await navigator.requestMIDIAccess()
		console.log("MIDI ready!");
		midiAccess.inputs.forEach((entry) => {
			entry.onmidimessage = (event) => {
				onMIDIMessage(event, handler);
			};
		});
		listInputsAndOutputs(midiAccess);
	}
	catch (err) {
		console.log("Failed to get MIDI access - " + err);
	}
}
