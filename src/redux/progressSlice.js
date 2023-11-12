import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { getUserFromLocalStorage, getUserJwtFromLocalStorage } from '../utils/localStorageForUser';

const api_base_url = 'http://localhost:3000/api/v1';

const user = getUserFromLocalStorage();

export const createProgress = createAsyncThunk('progress/new', async (progressData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${api_base_url}/users/${user.id}/progresses`, progressData, {
      headers: {
        Authorization: `bearer ${getUserJwtFromLocalStorage}`,
      },
    });
    return response.data;
  } catch (error) {
    const errorMessages = error.response.data.errors.map((err, index) => ({
      id: index,
      message: err,
    }));
    return rejectWithValue(errorMessages);
  };
});

export const getProgresses = createAsyncThunk('progresses', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${api_base_url}/users/${user.id}}/progresses`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.statusText);
  }
});

export const getProgressById = createAsyncThunk('progresses/id', async (progressId, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${api_base_url}/users/${user.id}}/progresses/${progressId}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.statusText);
  }
});

export const deleteProgress = createAsyncThunk('progresses/delete', async (progressId, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`${api_base_url}/users/${user.id}/progresses/${progressId}`, {
      headers: {
        Authorization: `bearer ${getUserJwtFromLocalStorage()}`,
      },
    });
    return {
      id: progressId,
      message: response.data.message,
    };
  } catch (error) {
    return rejectWithValue(error.response.statusText);
  }
});

const progressSlice = createSlice({
  name: 'progresses',
  initialState: {
    progresses: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(createProgress.pending, async(state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(createProgress.fulfilled, async(state, action) => {
      state.loading = false;
      state.error = null;
      state.progresses.push(action.payload);
    })
    .addCase(createProgress.rejected, async(state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(getProgresses.pending, async(state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getProgresses.fulfilled, async(state, action) => {
      state.loading = false;
      state.error = null;
      state.progresses = action.payload;
    })
    .addCase(getProgresses.rejected, async(state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(deleteProgress.pending, async(state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(deleteProgress.fulfilled, async(state, action) => {
      state.loading = false;
      state.error = null;
      state.progresses = state.progresses.filter((progress) => progress.id !== action.payload.id);
    })
    .addCase(deleteProgress.rejected, async(state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default progressSlice.reducer