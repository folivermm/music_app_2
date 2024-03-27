import React, { useState, useEffect } from 'react';
// import './Metronome.css';
import * as Tone from 'tone';

const Metronome = ({ tempo: initialTempo, isPlaying, onTempoChange }) => {
    const [tempo, setTempo] = useState(initialTempo || 60);

    useEffect(() => {
        // Store the tempo in local storage whenever it changes
        localStorage.setItem('tempo', tempo);
    }, [tempo]);

    useEffect(() => {
        if (isPlaying) {
            handleMetronomeStart();
        } else {
            handleMetronomeStop();
        }
    }, [isPlaying]);

    const handleMetronomeStart = async () => {
        await Tone.start();

        const membraneSynth = new Tone.MembraneSynth().toDestination();

        Tone.Transport.bpm.value = tempo;

        const loop = new Tone.Loop((time) => {
            // Trigger C2 for beat one, and G2 for beats 2, 3, 4
            if (Tone.Transport.position.split(':')[1] === '0') {
                membraneSynth.triggerAttackRelease('G1', '4n', time);
            } else {
                membraneSynth.triggerAttackRelease('C1', '4n', time);
            }
        }, '4n');

        loop.start(0); // Start the loop immediately
        Tone.Transport.start(); // Start the Transport to begin playback
    };

    const handleMetronomeStop = () => {
        Tone.Transport.stop();
        Tone.Transport.cancel();
    };

    const handleTempoChange = (event) => {
        const newTempo = parseInt(event.target.value, 10);
        setTempo(newTempo);
        onTempoChange(newTempo); // Notify parent component of tempo change
    };

    return (
        <div className="metronome">
            <div className="bpm-slider">
                <p>{tempo} BPM</p>
                <input
                    type="range"
                    min="30"
                    max="240"
                    value={tempo}
                    onChange={handleTempoChange}
                />
            </div>
        </div>
    );
};


export default Metronome;