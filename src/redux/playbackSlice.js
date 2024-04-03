// playbackSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fourths: {
    C: {
      isPlaying: false,
      continuousPlay: false,
      displayRest: false,
      delay: false,
    },
    F: {
      isPlaying: false,
      continuousPlay: false,
      displayRest: true,
      delay: true,
    },
  },
  sortedKeys: [],
};

export const playbackSlice = createSlice({
  name: "playback",
  initialState,
  reducers: {
    startPlayback: (state, action) => {
      const { scale, playbackSettings } = action.payload;
      state.fourths[scale] = playbackSettings;
    },
    stopPlayback: (state) => {
      // Reset the isPlaying state only
      state.fourths = {
        ...state.fourths,
        C: { ...state.fourths.C, isPlaying: false },
        F: { ...state.fourths.F, isPlaying: false },
      };
    },

    playContinuous: (state, action) => {
      const { scale } = action.payload;
      state.fourths[scale] = { isPlaying: true, continuousPlay: false, displayRest: true, delay: true };
    },
    playScale: (state, action) => {
      const { scale } = action.payload;
      state.fourths[scale] = { isPlaying: true, continuousPlay: true, displayRest: false, delay: false };
    },
  },
});

export const { startPlayback, stopPlayback, playContinuous, playScale } = playbackSlice.actions;

export default playbackSlice.reducer;