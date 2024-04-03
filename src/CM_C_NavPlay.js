import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Metronome from './Metronome';
import CM_IntMusicScore from './CM_IntMusicScore';
import CM_MusicPlay from './CM_MusicPlay';
import { stopPlayback, playContinuous, playScale } from './redux/playbackSlice';

const CM_C_NavPlay = () => {
    const dispatch = useDispatch();
    const playback = useSelector(state => state.playback);
    const [shouldStart, setShouldStart] = useState(false); // Initialize shouldStart state

    const [tempo, setTempo] = useState(() => {
        const storedTempo = localStorage.getItem('tempo');
        return storedTempo ? parseInt(storedTempo, 10) : 60;
    });

    const isPlaying = playback.fourths.C.isPlaying;
    const continuousPlay = playback.fourths.C.continuousPlay;

    const handleTempoChange = (newTempo) => {
        setTempo(newTempo);
    };

    const handlePlayCont = () => {
        dispatch(playContinuous({ scale: 'C' }));
        setShouldStart(true); // Set shouldStart to true when 'Play Cont' is clicked
    };

    const handlePlayScale = () => {
        dispatch(playScale({ scale: 'C' }));
        setShouldStart(true); // Set shouldStart to true when 'Play Scale' is clicked
    };

    const handleStop = () => {
        dispatch(stopPlayback({ scale: 'C' }));
        setShouldStart(false); // Set shouldStart to false when 'Stop' is clicked
    };


    useEffect(() => {
        return () => {
            dispatch(stopPlayback());
        };
    }, [dispatch]);

    return (
        <div className="nav-play-container">
            <div className="nav-play">
                <div className="controls-container">
                    <Metronome tempo={tempo} isPlaying={isPlaying} onTempoChange={handleTempoChange} />
                    <button onClick={handlePlayCont} disabled={isPlaying}>Play Cont</button>
                    <button onClick={handlePlayScale} disabled={isPlaying}>Play Scale</button>
                    <button onClick={handleStop} disabled={!isPlaying && !continuousPlay}>Stop</button>
                    <CM_MusicPlay tempo={tempo} shouldStart={shouldStart} continuousPlay={continuousPlay} onStop={handleStop} />
                </div>
                <div className="music-container">
                    <CM_IntMusicScore displayRest={playback.fourths.C.displayRest} tempo={tempo} shouldStart={shouldStart} delay={playback.fourths.C.delay} />
                </div>
            </div>
        </div>
    );
};

export default CM_C_NavPlay;
