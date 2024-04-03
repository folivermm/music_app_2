// ```
// self-click
// ├─ .gitignore
// ├─ package-lock.json
// ├─ package.json
// ├─ public
// │  └─ index.html
// ├─ README.md
// └─ src
//    ├─ App.js
//    ├─ App.test.js
//    ├─ CM_C_NavPlay.js
//    ├─ CM_IntMusicScore.js
//    ├─ CM_MusicPlay.js
//    ├─ index.js
//    ├─ LayOut.js
//    ├─ Metronome.js
//    ├─ MusicControlProvider.js
//    └─ SynthComponent.js

// ```

// import React, { useState, useEffect } from 'react';
// import \* as Tone from 'tone';

// const CM_MusicPlay = ({ tempo, shouldStart, continuousPlay, onStop }) => {
// const [musicStarted, setMusicStarted] = useState(false);
// const [playbackEnded, setPlaybackEnded] = useState(false); // New state to track if playback has ended

//     const handleMusicStart = async () => {
//         // Start the Tone context if not already started
//         await Tone.start();
//         // Set up Tone.js synth and loop
//         const synth = new Tone.Synth().toDestination();
//         Tone.Transport.bpm.value = tempo;
//         const notes = [
//             { pitch: 'C4', timing: '0:0' },
//             { pitch: 'D4', timing: '0:1' },
//             { pitch: 'E4', timing: '0:2' },
//             { pitch: 'F4', timing: '0:3' },
//             { pitch: 'G4', timing: '0:4' },
//             { pitch: 'A4', timing: '0:5' },
//             { pitch: 'B4', timing: '0:6' },
//             { pitch: 'C5', timing: '0:7' },
//             { pitch: 'D5', timing: '0:8' },
//             { pitch: 'C5', timing: '0:9' },
//             { pitch: 'B4', timing: '0:10' },
//             { pitch: 'A4', timing: '0:11' },
//             { pitch: 'G4', timing: '0:12' },
//             { pitch: 'F4', timing: '0:13' },
//             { pitch: 'E4', timing: '0:14' },
//             { pitch: 'D4', timing: '0:15' },
//         ];
//         let iterations = 0;
//         let loopCount = 0; // Track how many times the loop has played the scale
//         const loop = new Tone.Loop((time) => {
//             const currentNote = notes[iterations % notes.length];
//             if (currentNote.pitch === 'rest') {
//                 // Do nothing for rests
//             } else {
//                 // Play the note
//                 synth.triggerAttackRelease(currentNote.pitch, '8n', time);
//             }
//             iterations++;
//             // Check if we've played the scale twice
//             if (iterations >= notes.length * 2) {
//                 loopCount++;
//                 if (loopCount >= 2) {
//                     // Play the extra whole note 'C4' after looping the scale twice
//                     synth.triggerAttack('C4', time); // Trigger the attack of the note

//                     // Schedule the release of the note after 4 beats
//                     setTimeout(() => {
//                         synth.triggerRelease(); // Trigger the release of the note
//                         setPlaybackEnded(true); // Update playbackEnded when playback ends
//                     }, Tone.Time('0:3:1.75').toMilliseconds()); // Wait for the duration of the extra note (4 beats)
//                 }
//             }

//         }, '8n');
//         if (!continuousPlay && shouldStart) {
//             // Schedule the loop to start after two measures of rest for "Play Cont"
//             Tone.Transport.scheduleOnce(() => {
//                 loop.start('2:0'); // Start the loop at the beginning of the third measure
//             }, '1.75m'); // Start the loop after two measures of rest
//         } else if (continuousPlay && shouldStart) {
//             // Start the loop immediately for "Play Scale"
//             loop.start();
//         }
//         // Start the Transport if it's not already started
//         if (!Tone.Transport.state === 'started') {
//             Tone.Transport.start();
//         }
//         setMusicStarted(true); // Update musicStarted
//     };

//     const handleMusicStop = () => {
//         // Stop Tone.Transport and cancel any scheduled events
//         Tone.Transport.stop();
//         Tone.Transport.cancel();

//         // Set musicStarted to false
//         setMusicStarted(false);
//         console.log("Music stopped");
//     };

//     useEffect(() => {
//         // Start or stop music based on shouldStart
//         if (shouldStart) {
//             if (!musicStarted) {
//                 // If music is not started yet, start it
//                 handleMusicStart();
//             } else {
//                 // If music is already started, reset and start from the beginning
//                 handleMusicStop();
//                 handleMusicStart();
//             }
//         } else if (!shouldStart && musicStarted) {
//             // If shouldStart is false but music is started, stop it
//             handleMusicStop();
//         }
//     }, [shouldStart, continuousPlay]);


//     useEffect(() => {
//         if (playbackEnded) {
//             onStop(); // Call onStop when playback ends
//             setPlaybackEnded(false); // Reset playbackEnded when starting the playback again
//         }
//     }, [playbackEnded]);

//     return null; // No need to render anything in this component

// };

// export default CM_MusicPlay;

// import React, { useState, useEffect } from 'react';
// import Metronome from './Metronome';
// import CM_IntMusicScore from './CM_IntMusicScore';
// import CM_MusicPlay from './CM_MusicPlay';
// // import { useMusicControl } from './MusicControlProvider';

// const CM_C_NavPlay = () => {
// const [tempo, setTempo] = useState(() => {
// const storedTempo = localStorage.getItem('tempo');
// return storedTempo ? parseInt(storedTempo, 10) : 60;
// });

//     const [isPlaying, setIsPlaying] = useState(false);
//     const [continuousPlay, setContinuousPlay] = useState(false);
//     const [displayRest, setDisplayRest] = useState(true);
//     const [delay, setDelay] = useState(true);
//     const [stopAfterMeasures, setStopAfterMeasures] = useState(null);

//     const handleTempoChange = (newTempo) => {
//         setTempo(newTempo);
//     };

//     const handlePlayCont = () => {
//         setIsPlaying(true);
//         setContinuousPlay(false);
//         setDisplayRest(true);
//         setDelay(true);
//         // setStopAfterMeasures(7);
//     };

//     const handlePlayScale = () => {
//         setIsPlaying(true);
//         setContinuousPlay(true);
//         setDisplayRest(false);
//         setDelay(false);
//         setStopAfterMeasures(5);
//     };

//     const handlePlayKey = () => {
//         setIsPlaying(true);
//         setContinuousPlay(false);
//         setDisplayRest(true);
//         setDelay(true);
//         // setStopAfterMeasures(8);
//     };

//     const handleStop = () => {
//         setIsPlaying(false);
//         setContinuousPlay(false);
//     };

//     useEffect(() => {
//         setIsPlaying(false);
//         setContinuousPlay(false);
//         // setStopAfterMeasures(null);
//     }, []);


//     return (
//         <div className="nav-play-container">
//             <div className="nav-play">
//                 <div className="controls-container">
//                     <Metronome tempo={tempo} isPlaying={isPlaying} onTempoChange={handleTempoChange} stopAfterMeasures={stopAfterMeasures} />
//                     <button onClick={handlePlayCont} disabled={isPlaying}>Play Cont</button>
//                     <button onClick={handlePlayScale} disabled={isPlaying}>Play Scale</button>
//                     <button onClick={handleStop} disabled={!isPlaying && !continuousPlay}>Stop</button>
//                     <button onClick={handlePlayKey} disabled={isPlaying || continuousPlay}>
//                         Play Key
//                     </button>
//                     <CM_MusicPlay tempo={tempo} shouldStart={isPlaying || continuousPlay} continuousPlay={continuousPlay} onStop={handleStop} stopAfterMeasures={stopAfterMeasures} />
//                 </div>
//                 <div className="music-container">
//                     <CM_IntMusicScore displayRest={displayRest} tempo={tempo} shouldStart={isPlaying || continuousPlay} delay={delay} />
//                 </div>
//             </div>
//         </div>
//     );

// };

// export default CM_C_NavPlay;

// import React, { useState, useEffect, useRef } from 'react';
// import CM_C_NavPlay from './CM_C_NavPlay';
// import FM_F_NavPlay from './FM_F_NavPlay';
// import BbM_Bb_NavPlay from './BbM_Bb_NavPlay';
// import NavSortBar from './NavSortBar';

// function LayOut() {
// const startingPointRef = useRef(null);
// const endingPointRef = useRef(null);

//     const keyComponents = {
//         fourths: {
//             "L": <CM_C_NavPlay />,
//             "M": <FM_F_NavPlay />,
//             "N": <BbM_Bb_NavPlay />,
//             //     "O": <EbM_Eb_NavPlay />,
//             //     "P": <AbM_Ab_NavPlay />,
//             //     "Q": <DbM_Db_NavPlay />,
//             //     "R": <GbM_Gb_NavPlay />,
//             //     "S": <BM_B_NavPlay />,
//             //     "T": <EM_E_NavPlay />,
//             //     "U": <AM_A_NavPlay />,
//             //     "V": <DM_D_NavPlay />,
//             //     "W": <GM_G_NavPlay />
//             // }
//         }
//     };

//     const [sortedKeys, setSortedKeys] = useState([]);
//     const [sortingOption, setSortingOption] = useState('fourths');

//     const handleSortingOptionChange = (sortingOption) => {
//         console.log('Selected sorting option:', sortingOption);
//         setSortingOption(sortingOption);
//     };

//     const handleSortButtonClick = () => {
//         handleSortFor(keyComponents[sortingOption]);
//     }

//     const handleSortFor = (keyComponents) => {
//         const startingPoint = startingPointRef.current.value;
//         const endingPoint = endingPointRef.current.value;

//         const circleOrder = Object.keys(keyComponents);
//         const startIndex = circleOrder.indexOf(startingPoint);
//         const endIndex = circleOrder.indexOf(endingPoint);

//         const keysInRange = [];
//         if (startIndex !== -1 && endIndex !== -1) {
//             if (startIndex <= endIndex) {
//                 for (let i = startIndex; i <= endIndex; i++) {
//                     keysInRange.push({ note: circleOrder[i], component: keyComponents[circleOrder[i]] });
//                 }
//             } else {
//                 for (let i = startIndex; i < circleOrder.length; i++) {
//                     keysInRange.push({ note: circleOrder[i], component: keyComponents[circleOrder[i]] });
//                 }
//                 for (let i = 0; i <= endIndex; i++) {
//                     keysInRange.push({ note: circleOrder[i], component: keyComponents[circleOrder[i]] });
//                 }
//             }
//         }

//         setSortedKeys(keysInRange.map(({ component }) => component));
//     };

//     useEffect(() => {
//         handleSortButtonClick();
//     }, [sortingOption]);

//     return (
//         <div className="MajorIntLayout">
//             <NavSortBar
//                 startingPointRef={startingPointRef}
//                 endingPointRef={endingPointRef}
//                 onSortingOptionChange={handleSortingOptionChange}
//                 onSortButtonClick={handleSortButtonClick}
//             />
//             <div className="sorted-keys">
//                 {sortedKeys.map((key, index) => (
//                     <div key={index}>{key}</div>
//                 ))}
//             </div>
//         </div>
//     );

// }

// export default LayOut;

// // },
// // fifths: {
// // "L": <CM_C_NavPlay />,
// // "W": <GM_G_NavPlay />,
// // "V": <DM_D_NavPlay />,
// // "U": <AM_A_NavPlay />,
// // "T": <EM_E_NavPlay />,
// // "S": <BM_B_NavPlay />,
// // "R": <GbM_Gb_NavPlay />,
// // "Q": <DbM_Db_NavPlay />,
// // "P": <AbM_Ab_NavPlay />,
// // "O": <EbM_Eb_NavPlay />,
// // "N": <BbM_Bb_NavPlay />,
// // "M": <FM_F_NavPlay />,
// // },
// // sevenths: {
// // "L": <CM_C_NavPlay />,
// // "S": <BM_B_NavPlay />,
// // "N": <BbM_Bb_NavPlay />,
// // "U": <AM_A_NavPlay />,
// // "P": <AbM_Ab_NavPlay />,
// // "W": <GM_G_NavPlay />,
// // "R": <GbM_Gb_NavPlay />,
// // "M": <FM_F_NavPlay />,
// // "T": <EM_E_NavPlay />,
// // "O": <EbM_Eb_NavPlay />,
// // "Q": <DbM_Db_NavPlay />,
// // "V": <DM_D_NavPlay />,
// // },
// // chromatic: {
// // "L": <CM_C_NavPlay />,
// // "Q": <DbM_Db_NavPlay />,
// // "V": <DM_D_NavPlay />,
// // "O": <EbM_Eb_NavPlay />,
// // "T": <EM_E_NavPlay />,
// // "M": <FM_F_NavPlay />,
// // "R": <GbM_Gb_NavPlay />,
// // "W": <GM_G_NavPlay />,
// // "P": <AbM_Ab_NavPlay />,
// // "U": <AM_A_NavPlay />,
// // "N": <BbM_Bb_NavPlay />,
// // "S": <BM_B_NavPlay />,
// // }
// const keyComponents = {
// fourths: {
// "L": <CM_C_NavPlay
// tempo={tempo}
// isPlaying={isPlaying}
// continuousPlay={continuousPlay}
// displayRest={displayRest}
// delay={delay}
// onTempoChange={setTempo}
// onPlayCont={() => {
// setIsPlaying(true);
// setContinuousPlay(false);
// setDisplayRest(true);
// setDelay(true);
// }}
// onPlayScale={() => {
// setIsPlaying(true);
// setContinuousPlay(true);
// setDisplayRest(false);
// setDelay(false);
// }}
// onPlayKey={() => {
// setIsPlaying(true);
// setContinuousPlay(false);
// setDisplayRest(true);
// setDelay(true);
// }}
// onStop={() => {
// setIsPlaying(false);
// setContinuousPlay(false);
// }}
// />,

// import React, { useState, useEffect, useRef } from 'react';
// import FM_F_NavPlay from './FM_F_NavPlay';
// import BbM_Bb_NavPlay from './BbM_Bb_NavPlay';
// import NavSortBar from './NavSortBar';
// import Metronome from './Metronome';
// import CM_IntMusicScore from './CM_IntMusicScore';
// import CM_MusicPlay from './CM_MusicPlay';

// function LayOut() {
// const startingPointRef = useRef(null);
// const endingPointRef = useRef(null);

//     const [tempo, setTempo] = useState(() => {
//         const storedTempo = localStorage.getItem('tempo');
//         return storedTempo ? parseInt(storedTempo, 10) : 60;
//     });

//     const [isPlaying, setIsPlaying] = useState(false);
//     const [continuousPlay, setContinuousPlay] = useState(false);
//     const [displayRest, setDisplayRest] = useState(true);
//     const [delay, setDelay] = useState(true);

//     const handleTempoChange = (newTempo) => {
//         setTempo(newTempo);
//     };

//     const handlePlayCont = () => {
//         console.log('Play Cont clicked');
//         console.log('Current state - isPlaying:', isPlaying, 'continuousPlay:', continuousPlay);
//         setIsPlaying(true);
//         setContinuousPlay(false);
//         setDisplayRest(true);
//         setDelay(true);
//     };

//     const handlePlayScale = () => {
//         setIsPlaying(true);
//         setContinuousPlay(true);
//         setDisplayRest(false);
//         setDelay(false);
//     };

//     const handlePlayKey = () => {
//         setIsPlaying(true);
//         setContinuousPlay(false);
//         setDisplayRest(true);
//         setDelay(true);
//     };

//     const handleStop = () => {
//         setIsPlaying(false);
//         setContinuousPlay(false);
//     };

//     useEffect(() => {
//         console.log('isPlaying:', isPlaying, 'continuousPlay:', continuousPlay);
//         setIsPlaying(false);
//         setContinuousPlay(false);
//     }, []);

//     const keyComponents = {
//         fourths: {
//             "L": (
//                 <div className="nav-play-container">
//                     <div className="nav-play">
//                         <div className="controls-container">
//                             <Metronome tempo={tempo} isPlaying={isPlaying} onTempoChange={handleTempoChange} />
//                             <button onClick={handlePlayCont} disabled={isPlaying}>Play Cont</button>
//                             <button onClick={handlePlayScale} disabled={isPlaying}>Play Scale</button>
//                             <button onClick={handleStop} disabled={!isPlaying && !continuousPlay}>Stop</button>
//                             <button onClick={handlePlayKey} disabled={isPlaying || continuousPlay}>
//                                 Play Key
//                             </button>
//                             <CM_MusicPlay tempo={tempo} shouldStart={isPlaying || continuousPlay} continuousPlay={continuousPlay} onStop={handleStop} />
//                         </div>
//                         <div className="music-container">
//                             <CM_IntMusicScore displayRest={displayRest} tempo={tempo} shouldStart={isPlaying || continuousPlay} delay={delay} />
//                         </div>
//                     </div>
//                 </div>
//             ),
//             "M": <FM_F_NavPlay />,
//             "N": <BbM_Bb_NavPlay />,
//             //     "O": <EbM_Eb_NavPlay />,
//             //     "P": <AbM_Ab_NavPlay />,
//             //     "Q": <DbM_Db_NavPlay />,
//             //     "R": <GbM_Gb_NavPlay />,
//             //     "S": <BM_B_NavPlay />,
//             //     "T": <EM_E_NavPlay />,
//             //     "U": <AM_A_NavPlay />,
//             //     "V": <DM_D_NavPlay />,
//             //     "W": <GM_G_NavPlay />
//             // }
//         }
//     };

//     const [sortedKeys, setSortedKeys] = useState([]);
//     const [sortingOption, setSortingOption] = useState('fourths');

//     const handleSortingOptionChange = (sortingOption) => {
//         console.log('Selected sorting option:', sortingOption);
//         setSortingOption(sortingOption);
//     };

//     const handleSortButtonClick = () => {
//         handleSortFor(keyComponents[sortingOption]);
//     }

//     const handleSortFor = (keyComponents) => {
//         const startingPoint = startingPointRef.current.value;
//         const endingPoint = endingPointRef.current.value;

//         const circleOrder = Object.keys(keyComponents);
//         const startIndex = circleOrder.indexOf(startingPoint);
//         const endIndex = circleOrder.indexOf(endingPoint);

//         const keysInRange = [];
//         if (startIndex !== -1 && endIndex !== -1) {
//             if (startIndex <= endIndex) {
//                 for (let i = startIndex; i <= endIndex; i++) {
//                     keysInRange.push({ note: circleOrder[i], component: keyComponents[circleOrder[i]] });
//                 }
//             } else {
//                 for (let i = startIndex; i < circleOrder.length; i++) {
//                     keysInRange.push({ note: circleOrder[i], component: keyComponents[circleOrder[i]] });
//                 }
//                 for (let i = 0; i <= endIndex; i++) {
//                     keysInRange.push({ note: circleOrder[i], component: keyComponents[circleOrder[i]] });
//                 }
//             }
//         }

//         setSortedKeys(keysInRange.map(({ component }) => component));
//     };

//     useEffect(() => {
//         handleSortButtonClick();
//     }, [sortingOption]);

//     return (
//         <div className="MajorIntLayout">
//             <NavSortBar
//                 startingPointRef={startingPointRef}
//                 endingPointRef={endingPointRef}
//                 onSortingOptionChange={handleSortingOptionChange}
//                 onSortButtonClick={handleSortButtonClick}
//             />
//             <div className="sorted-keys">
//                 {sortedKeys.map((component, index) => (
//                     <React.Fragment key={index}>{component}</React.Fragment>
//                 ))}
//             </div>
//         </div>

//     );

// }

// export default LayOut;

























































































// const CM_C_NavPlay = () => {
//     const [tempo, setTempo] = useState(() => {
//         const storedTempo = localStorage.getItem('tempo');
//         return storedTempo ? parseInt(storedTempo, 10) : 60;
//     });

//     const [isPlaying, setIsPlaying] = useState(false);
//     const [continuousPlay, setContinuousPlay] = useState(false);
//     const [displayRest, setDisplayRest] = useState(true);
//     const [delay, setDelay] = useState(true);

//     const handleTempoChange = (newTempo) => {
//         setTempo(newTempo);
//     };

//     const handlePlayCont = () => {
//         setIsPlaying(true);
//         setContinuousPlay(false);
//         setDisplayRest(true);
//         setDelay(true);
//     };

//     const handlePlayScale = () => {
//         setIsPlaying(true);
//         setContinuousPlay(true);
//         setDisplayRest(false);
//         setDelay(false);
//     };

//     const handlePlayKey = () => {
//         setIsPlaying(true);
//         setContinuousPlay(false);
//         setDisplayRest(true);
//         setDelay(true);
//     };

//     const handleStop = () => {
//         setIsPlaying(false);
//         setContinuousPlay(false);
//     };

//     useEffect(() => {
//         setIsPlaying(false);
//         setContinuousPlay(false);
//     }, []);


//     return (
//         <div className="nav-play-container">
//             <div className="nav-play">
//                 <div className="controls-container">
//                     <Metronome tempo={tempo} isPlaying={isPlaying} onTempoChange={handleTempoChange} />
//                     <button onClick={handlePlayCont} disabled={isPlaying}>Play Cont</button>
//                     <button onClick={handlePlayScale} disabled={isPlaying}>Play Scale</button>
//                     <button onClick={handleStop} disabled={!isPlaying && !continuousPlay}>Stop</button>
//                     <button onClick={handlePlayKey} disabled={isPlaying || continuousPlay}>
//                         Play Key
//                     </button>
//                     <CM_MusicPlay tempo={tempo} shouldStart={isPlaying || continuousPlay} continuousPlay={continuousPlay} onStop={handleStop} />
//                 </div>
//                 <div className="music-container">
//                     <CM_IntMusicScore displayRest={displayRest} tempo={tempo} shouldStart={isPlaying || continuousPlay} delay={delay} />
//                 </div>
//             </div>
//         </div>
//     );
// };

// const FM_F_NavPlay = () => {
//     const [tempo, setTempo] = useState(() => {
//         const storedTempo = localStorage.getItem('tempo');
//         return storedTempo ? parseInt(storedTempo, 10) : 60;
//     });

//     const [isPlaying, setIsPlaying] = useState(false);
//     const [continuousPlay, setContinuousPlay] = useState(false);
//     const [displayRest, setDisplayRest] = useState(true);
//     const [delay, setDelay] = useState(true);

//     const handleTempoChange = (newTempo) => {
//         setTempo(newTempo);
//     };

//     const handlePlayCont = () => {
//         setIsPlaying(true);
//         setContinuousPlay(false);
//         setDisplayRest(true);
//         setDelay(true);
//     };

//     const handlePlayScale = () => {
//         setIsPlaying(true);
//         setContinuousPlay(true);
//         setDisplayRest(false);
//         setDelay(false);
//     };

//     const handlePlayKey = () => {
//         setIsPlaying(true);
//         setContinuousPlay(false);
//         setDisplayRest(true);
//         setDelay(true);
//     };

//     const handleStop = () => {
//         setIsPlaying(false);
//         setContinuousPlay(false);
//     };

//     useEffect(() => {
//         setIsPlaying(false);
//         setContinuousPlay(false);
//     }, []);


//     return (
//         <div className="nav-play-container">
//             <div className="nav-play">
//                 <div className="controls-container">
//                     <Metronome tempo={tempo} isPlaying={isPlaying} onTempoChange={handleTempoChange} />
//                     <button onClick={handlePlayCont} disabled={isPlaying}>Play Cont</button>
//                     <button onClick={handlePlayScale} disabled={isPlaying}>Play Scale</button>
//                     <button onClick={handleStop} disabled={!isPlaying && !continuousPlay}>Stop</button>
//                     <button onClick={handlePlayKey} disabled={isPlaying || continuousPlay}>
//                         Play Key
//                     </button>
//                     <FM_MusicPlay tempo={tempo} shouldStart={isPlaying || continuousPlay} continuousPlay={continuousPlay} onStop={handleStop} />
//                 </div>
//                 <div className="music-container">
//                     <FM_IntMusicScore displayRest={displayRest} tempo={tempo} shouldStart={isPlaying || continuousPlay} delay={delay} />
//                 </div>
//             </div>
//         </div>
//     );
// };














































// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import Metronome from './Metronome';
// import FM_IntMusicScore from './FM_IntMusicScore';
// import FM_MusicPlay from './FM_MusicPlay';
// import { handlePlayCont, handlePlayScale, handleStop } from './redux/playbackSlice'; // Update import

// const FM_FNavPlay = () => {
//     const dispatch = useDispatch();
//     const playback = useSelector(state => state.playback);

//     const [tempo, setTempo] = useState(() => {
//         const storedTempo = localStorage.getItem('tempo');
//         return storedTempo ? parseInt(storedTempo, 10) : 60;
//     });

//     const isPlaying = playback.fourths.F.isPlaying;
//     const continuousPlay = playback.fourths.F.continuousPlay;

//     const handleTempoChange = (newTempo) => {
//         setTempo(newTempo);
//     };

//     return (
//         <div className="nav-play-container">
//             <div className="nav-play">
//                 <div className="controls-container">
//                     <Metronome tempo={tempo} isPlaying={isPlaying} onTempoChange={handleTempoChange} />
//                     <button onClick={() => dispatch(handlePlayCont({ scale: 'F' }))} disabled={isPlaying}>Play Cont</button>
//                     <button onClick={() => dispatch(handlePlayScale({ scale: 'F' }))} disabled={isPlaying}>Play Scale</button>
//                     <button onClick={() => dispatch(handleStop({ scale: 'F' }))} disabled={!isPlaying && !continuousPlay}>Stop</button>
//                     <FM_MusicPlay tempo={tempo} shouldStart={isPlaying || continuousPlay} continuousPlay={continuousPlay} onStop={() => dispatch(handleStop({ scale: 'F' }))} />
//                 </div>
//                 <div className="music-container">
//                     <FM_IntMusicScore displayRest={playback.fourths.F.displayRest} tempo={tempo} shouldStart={isPlaying || continuousPlay} delay={playback.fourths.F.delay} />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default FM_FNavPlay;
