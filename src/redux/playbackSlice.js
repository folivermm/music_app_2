import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fourths: {
    C: {
      isPlaying: false,
      continuousPlay: false,
      displayRest: true,
      delay: true,
    },
    F: {
      isPlaying: false,
      continuousPlay: false,
      displayRest: true,
      delay: true,
    },
  },
  sortedKeys: [],
  sortingOption: 'fourths', // Default sorting option
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
      state.fourths = {
        C: {
          isPlaying: false,
          continuousPlay: false,
          displayRest: true,
          delay: true,
        },
        F: {
          isPlaying: false,
          continuousPlay: false,
          displayRest: true,
          delay: true,
        },
      };
    },
    setSortedKeys: (state, action) => {
      state.sortedKeys = action.payload;
    },
    setPlaybackSettings: (state, action) => {
      const { scale, playbackSettings } = action.payload;
      state.fourths[scale] = playbackSettings;
    },
    setSortingOption: (state, action) => {
      state.sortingOption = action.payload;
    },
  },
});

export const { startPlayback, stopPlayback, setSortedKeys, setPlaybackSettings, setSortingOption } = playbackSlice.actions;

export default playbackSlice.reducer;
