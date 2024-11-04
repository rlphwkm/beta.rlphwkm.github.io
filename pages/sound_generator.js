import * as Tone from "https://unpkg.com/tone@latest";

async function generateHoverSound() {
    const synth = new Tone.Synth({
        oscillator: {
            type: "sine"
        },
        envelope: {
            attack: 0.01,
            decay: 0.1,
            sustain: 0,
            release: 0.1
        }
    }).toDestination();

    await Tone.start();
    synth.triggerAttackRelease("C5", "32n");
}

async function generateSelectSound() {
    const synth = new Tone.Synth({
        oscillator: {
            type: "triangle"
        },
        envelope: {
            attack: 0.01,
            decay: 0.1,
            sustain: 0.2,
            release: 0.2
        }
    }).toDestination();

    await Tone.start();
    synth.triggerAttackRelease("G4", "16n");
}

async function generateSwitchSound() {
    const synth = new Tone.Synth({
        oscillator: {
            type: "square"
        },
        envelope: {
            attack: 0.05,
            decay: 0.2,
            sustain: 0.1,
            release: 0.3
        }
    }).toDestination();

    await Tone.start();
    synth.triggerAttackRelease("E4", "8n");
}

export { generateHoverSound, generateSelectSound, generateSwitchSound };
