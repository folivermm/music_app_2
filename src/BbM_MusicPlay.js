import React, { useState, useEffect } from 'react';
import * as Tone from 'tone';

const BbM_MusicPlay = ({ tempo, shouldStart, shouldRefreshPage, continuousPlay }) => {
    const [musicStarted, setMusicStarted] = useState(false);

    const handleMusicStart = async () => {
        // Start the Tone context if not already started
        await Tone.start();

        // Set up Tone.js synth and loop
        const synth = new Tone.Synth().toDestination();
        Tone.Transport.bpm.value = tempo;
        const notes = [
            { pitch: 'Bb3', timing: '0:0' },
            { pitch: 'C4', timing: '0:1' },
            { pitch: 'D4', timing: '0:2' },
            { pitch: 'Eb4', timing: '0:3' },
            { pitch: 'F4', timing: '0:4' },
            { pitch: 'G4', timing: '0:5' },
            { pitch: 'A4', timing: '0:6' },
            { pitch: 'Bb4', timing: '0:7' },
            { pitch: 'C5', timing: '0:8' },
            { pitch: 'Bb4', timing: '0:9' },
            { pitch: 'A4', timing: '0:10' },
            { pitch: 'G4', timing: '0:11' },
            { pitch: 'F4', timing: '0:12' },
            { pitch: 'Eb4', timing: '0:13' },
            { pitch: 'D4', timing: '0:14' },
            { pitch: 'C4', timing: '0:15' },
        ];

        let iterations = 0;
        let loopCount = 0;
        const loop = new Tone.Loop((time) => {
            const currentNote = notes[iterations % notes.length];

            if (currentNote.pitch === 'rest') {
                // Do nothing for rests
            } else {
                // Play the note
                synth.triggerAttackRelease(currentNote.pitch, '8n', time);
            }

            iterations++;

            // Check if we've played the scale twice
            if (iterations >= notes.length * 2) {
                loopCount++;
                if (loopCount >= 2) {
                    loop.stop();
                    if (shouldRefreshPage) {
                        // Trigger page refresh only if shouldRefreshPage is true
                        setTimeout(() => {
                            window.location.reload(); // Refresh the page after the duration of a whole note
                        }, 1000 * (60 / tempo) * 4); // Calculate the duration of a whole note and wait for that time before refreshing
                    }
                }
            }
        }, '8n');

        if (!continuousPlay && shouldStart) {
            // Schedule the loop to start after two measures of rest for "Play Cont"
            Tone.Transport.scheduleOnce(() => {
                loop.start('2:0'); // Start the loop at the beginning of the third measure
            }, '1.75m'); // Start the loop after two measures of rest
        } else if (continuousPlay && shouldStart) {
            // Start the loop immediately for "Play Scale"
            loop.start();
        }

        // Start the Transport if it's not already started
        if (!Tone.Transport.state === 'started') {
            Tone.Transport.start();
        }
    };
    useEffect(() => {
        if (shouldStart && !musicStarted) {
            handleMusicStart();
        }
    }, [shouldStart, musicStarted]);

    return null; // No need to render anything in this component
};

export default BbM_MusicPlay;