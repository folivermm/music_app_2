import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Metronome from './Metronome';
import FM_IntMusicScore from './FM_IntMusicScore';
import FM_MusicPlay from './FM_MusicPlay';
import { setPlaybackSettings, stopPlayback } from './redux/playbackSlice'; // Update import

const FM_F_NavPlay = () => {
    const dispatch = useDispatch();
    const playback = useSelector(state => state.playback);
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
        dispatch(setPlaybackSettings({ scale: 'F', playbackSettings: { isPlaying: true, continuousPlay: false, displayRest: true, delay: true } }));
    };

    const handlePlayScale = () => {
        dispatch(setPlaybackSettings({ scale: 'F', playbackSettings: { isPlaying: true, continuousPlay: true, displayRest: false, delay: false } }));
    };

    const handleStop = () => {
        dispatch(stopPlayback());
    };

    useEffect(() => {
        if (!isPlaying && continuousPlay) {
            const scaleKeys = Object.keys(playback.fourths);
            const currentIndex = scaleKeys.findIndex((key) => key === 'F');
            const nextIndex = (currentIndex + 1) % scaleKeys.length;
            const nextScale = scaleKeys[nextIndex];
            if (nextScale) {
                dispatch(setPlaybackSettings({ scale: nextScale, playbackSettings: { isPlaying: true, continuousPlay: false, displayRest: true, delay: true } }));
            }
        }
    }, [isPlaying, continuousPlay, dispatch, playback.fourths]);

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
                    <FM_MusicPlay tempo={tempo} shouldStart={isPlaying || continuousPlay} continuousPlay={continuousPlay} onStop={handleStop} />
                </div>
                <div className="music-container">
                    <FM_IntMusicScore displayRest={playback.fourths.F.displayRest} tempo={tempo} shouldStart={isPlaying || continuousPlay} delay={playback.fourths.F.delay} />
                </div>
            </div>
        </div>
    );
};

export default FM_F_NavPlay;
