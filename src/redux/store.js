import { configureStore } from '@reduxjs/toolkit';
import playbackReducer from './playbackSlice';

const store = configureStore({
    reducer: {
        playback: playbackReducer,
        // Add other reducers here if any
    },
    // Other store configurations if any
});

export default store;
