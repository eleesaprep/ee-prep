import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { getUserJwtFromLocalStorage } from '../utils/localStorageForUser';

const api_base_url = 'http://localhost:3000/api/v1';

export const createOption = createAsyncThunk('options/new', async ({ questionId, optionData }, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${api_base_url}/questions/${questionId}/options`, optionData, {
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

export const getOptions = createAsyncThunk('options', async (questionId, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${api_base_url}/questions/${questionId}/options`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.statusText);
  }
});

export const getOptionById = createAsyncThunk('options/id', async ({ questionId, optionId }, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${api_base_url}/questions/${questionId}/options/${optionId}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.statusText);
  }
});

export const deleteOption = createAsyncThunk('options/delete', async ({questionId, optionId}, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`${api_base_url}/questions/${questionId}/options/${optionId}`, {
      headers: {
        Authorization: `bearer ${getUserJwtFromLocalStorage()}`,
      },
    });
    return {
      id: optionId,
      message: response.data.message,
    };
  } catch (error) {
    return rejectWithValue(error.response.statusText);
  }
});

const optionSlice = createSlice({
  name: 'options',
  initialState: {
    options: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(createOption.pending, async(state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(createOption.fulfilled, async(state, action) => {
      state.loading = false;
      state.error = null;
      state.options.push(action.payload);
    })
    .addCase(createOption.rejected, async(state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(getOptions.pending, async(state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getOptions.fulfilled, async(state, action) => {
      state.loading = false;
      state.error = null;
      state.options = action.payload;
    })
    .addCase(getOptions.rejected, async(state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(deleteOption.pending, async(state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(deleteOption.fulfilled, async(state, action) => {
      state.loading = false;
      state.error = null;
      state.options = state.options.filter((option) => option.id !== action.payload.id);
    })
    .addCase(deleteOption.rejected, async(state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default optionSlice.reducer;