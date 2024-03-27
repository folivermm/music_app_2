import React, { useState, useEffect, useRef } from 'react';
// import FM_F_NavPlay from './FM_F_NavPlay';
import BbM_Bb_NavPlay from './BbM_Bb_NavPlay';
import NavSortBar from './NavSortBar';
import Metronome from './Metronome';
import CM_IntMusicScore from './CM_IntMusicScore';
import CM_MusicPlay from './CM_MusicPlay';
import FM_IntMusicScore from './FM_IntMusicScore';
import FM_MusicPlay from './FM_MusicPlay';

function LayOut() {
    const CM_C_NavPlay = () => {
        const [tempo, setTempo] = useState(() => {
            const storedTempo = localStorage.getItem('tempo');
            return storedTempo ? parseInt(storedTempo, 10) : 60;
        });

        const [isPlaying, setIsPlaying] = useState(false);
        const [continuousPlay, setContinuousPlay] = useState(false);
        const [displayRest, setDisplayRest] = useState(true);
        const [delay, setDelay] = useState(true);

        const handleTempoChange = (newTempo) => {
            setTempo(newTempo);
        };

        const handlePlayCont = () => {
            setIsPlaying(true);
            setContinuousPlay(false);
            setDisplayRest(true);
            setDelay(true);
        };

        const handlePlayScale = () => {
            setIsPlaying(true);
            setContinuousPlay(true);
            setDisplayRest(false);
            setDelay(false);
        };

        const handlePlayKey = () => {
            setIsPlaying(true);
            setContinuousPlay(false);
            setDisplayRest(true);
            setDelay(true);
        };

        const handleStop = () => {
            setIsPlaying(false);
            setContinuousPlay(false);
        };

        useEffect(() => {
            setIsPlaying(false);
            setContinuousPlay(false);
        }, []);


        return (
            <div className="nav-play-container">
                <div className="nav-play">
                    <div className="controls-container">
                        <Metronome tempo={tempo} isPlaying={isPlaying} onTempoChange={handleTempoChange} />
                        <button onClick={handlePlayCont} disabled={isPlaying}>Play Cont</button>
                        <button onClick={handlePlayScale} disabled={isPlaying}>Play Scale</button>
                        <button onClick={handleStop} disabled={!isPlaying && !continuousPlay}>Stop</button>
                        <button onClick={handlePlayKey} disabled={isPlaying || continuousPlay}>
                            Play Key
                        </button>
                        <CM_MusicPlay tempo={tempo} shouldStart={isPlaying || continuousPlay} continuousPlay={continuousPlay} onStop={handleStop} />
                    </div>
                    <div className="music-container">
                        <CM_IntMusicScore displayRest={displayRest} tempo={tempo} shouldStart={isPlaying || continuousPlay} delay={delay} />
                    </div>
                </div>
            </div>
        );
    };

    const FM_F_NavPlay = () => {
        const [tempo, setTempo] = useState(() => {
            const storedTempo = localStorage.getItem('tempo');
            return storedTempo ? parseInt(storedTempo, 10) : 60;
        });

        const [isPlaying, setIsPlaying] = useState(false);
        const [continuousPlay, setContinuousPlay] = useState(false);
        const [displayRest, setDisplayRest] = useState(true);
        const [delay, setDelay] = useState(true);

        const handleTempoChange = (newTempo) => {
            setTempo(newTempo);
        };

        const handlePlayCont = () => {
            setIsPlaying(true);
            setContinuousPlay(false);
            setDisplayRest(true);
            setDelay(true);
        };

        const handlePlayScale = () => {
            setIsPlaying(true);
            setContinuousPlay(true);
            setDisplayRest(false);
            setDelay(false);
        };

        const handlePlayKey = () => {
            setIsPlaying(true);
            setContinuousPlay(false);
            setDisplayRest(true);
            setDelay(true);
        };

        const handleStop = () => {
            setIsPlaying(false);
            setContinuousPlay(false);
        };

        useEffect(() => {
            setIsPlaying(false);
            setContinuousPlay(false);
        }, []);


        return (
            <div className="nav-play-container">
                <div className="nav-play">
                    <div className="controls-container">
                        <Metronome tempo={tempo} isPlaying={isPlaying} onTempoChange={handleTempoChange} />
                        <button onClick={handlePlayCont} disabled={isPlaying}>Play Cont</button>
                        <button onClick={handlePlayScale} disabled={isPlaying}>Play Scale</button>
                        <button onClick={handleStop} disabled={!isPlaying && !continuousPlay}>Stop</button>
                        <button onClick={handlePlayKey} disabled={isPlaying || continuousPlay}>
                            Play Key
                        </button>
                        <FM_MusicPlay tempo={tempo} shouldStart={isPlaying || continuousPlay} continuousPlay={continuousPlay} onStop={handleStop} />
                    </div>
                    <div className="music-container">
                        <FM_IntMusicScore displayRest={displayRest} tempo={tempo} shouldStart={isPlaying || continuousPlay} delay={delay} />
                    </div>
                </div>
            </div>
        );
    };

    const keyComponents = {
        fourths: {
            "L": <CM_C_NavPlay />,
            "M": <FM_F_NavPlay />,
            "N": <BbM_Bb_NavPlay />,
            //     "O": <EbM_Eb_NavPlay />,
            //     "P": <AbM_Ab_NavPlay />,
            //     "Q": <DbM_Db_NavPlay />,
            //     "R": <GbM_Gb_NavPlay />,
            //     "S": <BM_B_NavPlay />,
            //     "T": <EM_E_NavPlay />,
            //     "U": <AM_A_NavPlay />,
            //     "V": <DM_D_NavPlay />,
            //     "W": <GM_G_NavPlay />
            // }
        }
    };

    const [sortedKeys, setSortedKeys] = useState([]);
    const [sortingOption, setSortingOption] = useState('fourths');
    const startingPointRef = useRef(null);
    const endingPointRef = useRef(null);
    const handleSortingOptionChange = (sortingOption) => {
        console.log('Selected sorting option:', sortingOption);
        setSortingOption(sortingOption);
    };

    const handleSortButtonClick = () => {
        handleSortFor(keyComponents[sortingOption]);
    }

    const handleSortFor = (keyComponents) => {
        const startingPoint = startingPointRef.current.value;
        const endingPoint = endingPointRef.current.value;

        const circleOrder = Object.keys(keyComponents);
        const startIndex = circleOrder.indexOf(startingPoint);
        const endIndex = circleOrder.indexOf(endingPoint);

        const keysInRange = [];
        if (startIndex !== -1 && endIndex !== -1) {
            if (startIndex <= endIndex) {
                for (let i = startIndex; i <= endIndex; i++) {
                    keysInRange.push({ note: circleOrder[i], component: keyComponents[circleOrder[i]] });
                }
            } else {
                for (let i = startIndex; i < circleOrder.length; i++) {
                    keysInRange.push({ note: circleOrder[i], component: keyComponents[circleOrder[i]] });
                }
                for (let i = 0; i <= endIndex; i++) {
                    keysInRange.push({ note: circleOrder[i], component: keyComponents[circleOrder[i]] });
                }
            }
        }

        setSortedKeys(keysInRange.map(({ component }) => component));
    };

    useEffect(() => {
        handleSortButtonClick();
    }, [sortingOption]);

    return (
        <div className="MajorIntLayout">
            <NavSortBar
                startingPointRef={startingPointRef}
                endingPointRef={endingPointRef}
                onSortingOptionChange={handleSortingOptionChange}
                onSortButtonClick={handleSortButtonClick}
            />
            <div className="sorted-keys">
                {sortedKeys.map((key, index) => (
                    <div key={index}>{key}</div>
                ))}
            </div>
        </div>
    );
}

export default LayOut;
