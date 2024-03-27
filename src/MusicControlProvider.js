import React, { createContext, useState, useContext, useEffect } from 'react';
import * as Tone from 'tone';

const MusicControlContext = createContext();

export const useMusicControl = (scale) => {
    const context = useContext(MusicControlContext);
    if (!context) {
        throw new Error('useMusicControl must be used within a MusicControlProvider');
    }

    return { ...context[scale], playbackEnded: context[scale].playbackEnded };
};


export const MusicControlProvider = ({ children }) => {
    const [scalesState, setScalesState] = useState({
        C: {
            isPlaying: false,
            continuousPlay: false,
            playButtonDisabled: false,
            displayRest: true,
            delay: true,
            stopAfterMeasures: null,
            playbackEnded: false
        },
        F: {
            isPlaying: false,
            continuousPlay: false,
            playButtonDisabled: false,
            displayRest: true,
            delay: true,
            stopAfterMeasures: null,
            playbackEnded: false
        },
        Bb: {
            isPlaying: false,
            continuousPlay: false,
            playButtonDisabled: false,
            displayRest: true,
            delay: true,
            stopAfterMeasures: null,
            playbackEnded: false
        }
    });



    const handlePlayCont = (scale) => {
        setScalesState(prevState => ({
            ...prevState,
            [scale]: {
                ...prevState[scale],
                isPlaying: true,
                continuousPlay: false,
                playButtonDisabled: true,
                displayRest: true,
                delay: true,
                stopAfterMeasures: 7
            }
        }));
    };

    const handlePlayScale = (scale) => {
        setScalesState(prevState => ({
            ...prevState,
            [scale]: {
                ...prevState[scale],
                isPlaying: true,
                continuousPlay: true,
                playButtonDisabled: true,
                displayRest: false,
                delay: false,
                stopAfterMeasures: 5
            }
        }));
    };

    const handlePlayKey = (scale) => {
        setScalesState(prevState => ({
            ...prevState,
            [scale]: {
                ...prevState[scale],
                isPlaying: !prevState[scale].isPlaying,
                continuousPlay: false,
                displayRest: true,
                delay: true,
                stopAfterMeasures: 7,
                playButtonDisabled: true
            }
        }));
    };

    const handleStop = (scale) => {
        setScalesState(prevState => ({
            ...prevState,
            [scale]: {
                ...prevState[scale],
                isPlaying: false,
                continuousPlay: false,
                playButtonDisabled: false,
                playbackEnded: true
            }
        }));
    };

    useEffect(() => {
        setScalesState(prevState => ({
            ...prevState,
            C: {
                ...prevState.C,
                isPlaying: false,
                continuousPlay: false,
                stopAfterMeasures: null,
                playButtonDisabled: false,
                playbackEnded: false
            },
            F: {
                ...prevState.F,
                isPlaying: false,
                continuousPlay: false,
                stopAfterMeasures: null,
                playButtonDisabled: false,
                playbackEnded: false
            },
            Bb: {
                ...prevState.F,
                isPlaying: false,
                continuousPlay: false,
                stopAfterMeasures: null,
                playButtonDisabled: false,
                playbackEnded: false
            },
        }));
    }, []);

    const contextValue = {
        C: {
            ...scalesState.C,
            handlePlayCont: () => handlePlayCont('C'),
            handlePlayScale: () => handlePlayScale('C'),
            handleStop: () => handleStop('C'),
            handlePlayKey: () => handlePlayKey('C'),
        },
        F: {
            ...scalesState.F,
            handlePlayCont: () => handlePlayCont('F'),
            handlePlayScale: () => handlePlayScale('F'),
            handleStop: () => handleStop('F'),
            handlePlayKey: () => handlePlayKey('F'),
        },
        Bb: {
            ...scalesState.Bb,
            handlePlayCont: () => handlePlayCont('Bb'),
            handlePlayScale: () => handlePlayScale('Bb'),
            handleStop: () => handleStop('Bb'),
            handlePlayKey: () => handlePlayKey('Bb'),
        },
    };

    return (
        <MusicControlContext.Provider value={contextValue}>
            {children}
        </MusicControlContext.Provider>
    );
};