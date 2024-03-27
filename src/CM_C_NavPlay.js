// import React, { useState, useEffect } from 'react';
// import Metronome from './Metronome';
// import CM_IntMusicScore from './CM_IntMusicScore';
// import CM_MusicPlay from './CM_MusicPlay';
// // import { useMusicControl } from './MusicControlProvider';

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

// export default CM_C_NavPlay;