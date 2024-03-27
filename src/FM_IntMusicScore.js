import React, { useEffect, useState, useRef } from 'react';
import abcjs from 'abcjs';
import * as Tone from 'tone';
// import './FM_IntMusicScore.css';

const FM_IntMusicScore = ({ displayRest, tempo, shouldStart, delay }) => {
    const [highlightedNoteIndex, setHighlightedNoteIndex] = useState(-1);
    const [isPlaying, setIsPlaying] = useState(false);
    const [notationWidth, setNotationWidth] = useState(0);
    const svgRef = useRef(null);
    const totalNotes = 16;
    const [tempHighlightedNoteIndex, setTempHighlightedNoteIndex] = useState(-1);
    const [loopCount, setLoopCount] = useState(0);

    useEffect(() => {
        setIsPlaying(shouldStart);
        setHighlightedNoteIndex(-1);
        setLoopCount(0);
    }, [shouldStart]);

    useEffect(() => {
        if (isPlaying) {
            let index = 0;
            let loopCount = 0;

            const loop = new Tone.Loop((time) => {
                setTempHighlightedNoteIndex(index);
                index++;

                if (index === totalNotes) {
                    setLoopCount(prevCount => {
                        const newCount = prevCount + 1;

                        if (newCount >= 2) { // Repeat the scale twice
                            setIsPlaying(false);
                            setHighlightedNoteIndex(totalNotes - 0); // Highlight the whole note
                        } else {
                            index = 0; // Reset index to replay the scale
                        }

                        return newCount;
                    });
                }
            }, '8n');

            // Set the tempo of the loop
            Tone.Transport.bpm.value = tempo;

            // Apply delay if the delay prop is true
            if (delay) {
                // Schedule the loop to start after two measures of rest
                Tone.Transport.scheduleOnce(() => {
                    loop.start('2:0'); // Start the loop at the beginning of the third measure
                }, '1.75m'); // Start the loop after two measures of rest
            } else {
                // Start the loop immediately
                loop.start(0);
            }

            // Start the Transport
            Tone.Transport.start();
        }
    }, [isPlaying, tempo, delay]);



    useEffect(() => {
        const svg = svgRef.current;
        if (!svg) return;

        const notes = svg.querySelectorAll('.abcjs-note');
        notes.forEach((note, index) => {
            if (index === tempHighlightedNoteIndex || index === highlightedNoteIndex) {
                note.style.fill = 'red';
            } else {
                note.style.fill = 'black';
            }
        });
        setNotationWidth(svg.getBoundingClientRect().width);
    }, [tempHighlightedNoteIndex, highlightedNoteIndex, isPlaying]);

    useEffect(() => {
        renderMusicScore();
    }, [displayRest, tempo, notationWidth]);

    const renderMusicScore = () => {
        let abcNotation = `X:1\nT:Untitled 1\nM:4/4\nL:1/4\nQ:1/4=${tempo}\nK:F\n`;

        if (displayRest) {
            abcNotation += 'z4 | z4 |: ';
        }

        // Repeat the scale twice
        abcNotation += 'F/G/A/B/ c/d/e/f/ | g/f/e/d/ c/B/A/G/ :|';

        // End on a whole note
        abcNotation += 'F4 ||';

        const element = document.getElementById('paper-FM-Int');
        abcjs.renderAbc(element, abcNotation, {
            add_classes: true,
        });
    };

    return (
        <div>
            <div id="paper-FM-Int" ref={svgRef} style={{ width: notationWidth }}></div>
        </div>
    );
}
export default FM_IntMusicScore;