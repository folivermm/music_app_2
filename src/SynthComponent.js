import React, { useState } from 'react';
import { Synth } from 'tone';

const SynthComponent = () => {
    const [isFirstNotePlayed, setIsFirstNotePlayed] = useState(false);

    const playNote = (note) => {
        const synth = new Synth().toDestination();

        // Trigger the attack of the first note
        synth.triggerAttack(note);

        // Calculate the duration of the first note based on its time value
        const duration = '1n'; // '1n' represents a whole note duration

        // Set a timeout to trigger the attack and release of the second note after the duration of the first note
        setTimeout(() => {
            synth.triggerRelease(); // Release the first note
            synth.triggerAttackRelease('F4', duration); // '1n' represents a whole note duration for the second note
            setIsFirstNotePlayed(true);
        }, synth.toSeconds(duration) * 1000); // Convert duration to milliseconds
    };

    const handleSecondButtonClick = () => {
        // Additional logic for the second button, if needed
    };

    return (
        <div>
            <button onClick={() => playNote('C4')} disabled={isFirstNotePlayed}>
                First
            </button>
            <button onClick={handleSecondButtonClick} disabled={!isFirstNotePlayed}>
                Second
            </button>
        </div>
    );
};

export default SynthComponent;
