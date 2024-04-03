import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Metronome from './Metronome';
import FM_IntMusicScore from './FM_IntMusicScore';
import FM_MusicPlay from './FM_MusicPlay';
import { stopPlayback, playContinuous, playScale } from './redux/playbackSlice';

const FM_F_NavPlay = () => {
    const dispatch = useDispatch();
    const playback = useSelector(state => state.playback);
    const [shouldStart, setShouldStart] = useState(false); // Initialize shouldStart state

    const [tempo, setTempo] = useState(() => {
        const storedTempo = localStorage.getItem('tempo');
        return storedTempo ? parseInt(storedTempo, 10) : 60;
    });

    const isPlaying = playback.fourths.F.isPlaying;
    const continuousPlay = playback.fourths.F.continuousPlay;

    const handleTempoChange = (newTempo) => {
        setTempo(newTempo);
    };

    const handlePlayCont = () => {
        dispatch(playContinuous({ scale: 'F' }));
        setShouldStart(true); // Set shouldStart to true when 'Play Cont' is clicked
    };

    const handlePlayScale = () => {
        dispatch(playScale({ scale: 'F' }));
        setShouldStart(true); // Set shouldStart to true when 'Play Scale' is clicked
    };

    const handleStop = () => {
        dispatch(stopPlayback({ scale: 'F' }));
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
                    <FM_MusicPlay tempo={tempo} shouldStart={shouldStart} continuousPlay={continuousPlay} onStop={handleStop} />
                </div>
                <div className="music-container">
                    <FM_IntMusicScore displayRest={playback.fourths.F.displayRest} tempo={tempo} shouldStart={shouldStart} delay={playback.fourths.F.delay} />
                </div>
            </div>
        </div>
    );
};

export default FM_F_NavPlay;
