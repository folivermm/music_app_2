import React, { useState, useEffect } from 'react';
import * as Tone from 'tone';

const FM_MusicPlay = ({ tempo, shouldStart, continuousPlay, onStop }) => {
    const [musicStarted, setMusicStarted] = useState(false);
    const [playbackEnded, setPlaybackEnded] = useState(false); // New state to track if playback has ended

    const handleMusicStart = async () => {
        // Start the Tone context if not already started
        await Tone.start();
        // Set up Tone.js synth and loop
        const synth = new Tone.Synth().toDestination();
        Tone.Transport.bpm.value = tempo;
        const notes = [
            { pitch: 'F4', timing: '0:0' },
            { pitch: 'G4', timing: '0:1' },
            { pitch: 'A4', timing: '0:2' },
            { pitch: 'Bb4', timing: '0:3' },
            { pitch: 'C5', timing: '0:4' },
            { pitch: 'D5', timing: '0:5' },
            { pitch: 'E5', timing: '0:6' },
            { pitch: 'F5', timing: '0:7' },
            { pitch: 'G5', timing: '0:8' },
            { pitch: 'F5', timing: '0:9' },
            { pitch: 'E5', timing: '0:10' },
            { pitch: 'D5', timing: '0:11' },
            { pitch: 'C5', timing: '0:12' },
            { pitch: 'Bb4', timing: '0:13' },
            { pitch: 'A4', timing: '0:14' },
            { pitch: 'G4', timing: '0:15' },
        ];

        let iterations = 0;
        let loopCount = 0; // Track how many times the loop has played the scale
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
                    // Play the extra whole note 'C4' after looping the scale twice
                    synth.triggerAttack('F4', time); // Trigger the attack of the note

                    // Schedule the release of the note after 4 beats
                    setTimeout(() => {
                        synth.triggerRelease(); // Trigger the release of the note
                        setPlaybackEnded(true); // Update playbackEnded when playback ends
                    }, Tone.Time('0:3.8').toMilliseconds()); // Wait for the duration of the extra note (4 beats)
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
        setMusicStarted(true); // Update musicStarted
    };

    const handleMusicStop = () => {
        // Stop Tone.Transport and cancel any scheduled events
        Tone.Transport.stop();
        Tone.Transport.cancel();

        // Set musicStarted to false
        setMusicStarted(false);
        console.log("Music stopped");
    };

    useEffect(() => {
        // Start or stop music based on shouldStart
        if (shouldStart) {
            if (!musicStarted) {
                // If music is not started yet, start it
                handleMusicStart();
            } else {
                // If music is already started, reset and start from the beginning
                handleMusicStop();
                handleMusicStart();
            }
        } else if (!shouldStart && musicStarted) {
            // If shouldStart is false but music is started, stop it
            handleMusicStop();
        }
    }, [shouldStart, continuousPlay]);


    useEffect(() => {
        if (playbackEnded) {
            onStop(); // Call onStop when playback ends
            setPlaybackEnded(false); // Reset playbackEnded when starting the playback again
        }
    }, [playbackEnded]);

    return null; // No need to render anything in this component
};

export default FM_MusicPlay;