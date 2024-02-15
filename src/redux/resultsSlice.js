import { createSlice } from '@reduxjs/toolkit';

const resultsSlice = createSlice({
  name: 'results',
  initialState: {
    resultsData: {},
  },
  reducers: {
    resultsDetails: (state, action) => {
      state.resultsData = action.payload;
    },
  },
});

export const { resultsDetails } = resultsSlice.actions;
export default resultsSlice.reducer;
