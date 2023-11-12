import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { getUserJwtFromLocalStorage } from '../utils/localStorageForUser';

const api_base_url = 'http://localhost:3000/api/v1';

export const createResponse = createAsyncThunk('/responses/new', async (responsesData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${api_base_url}/responses`, responsesData, {
      headers: {
        Authorization: `bearer ${getUserJwtFromLocalStorage()}`,
      },
    });
    return response.data;
  } catch (error) {
    const errorMessages = error.response.data.errors.map((err, index) => ({
      id: index,
      message: err,
    }));
    return rejectWithValue(errorMessages);
  }
});

export const getResponses = createAsyncThunk('responses', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${api_base_url}/responses`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.statusText);
  }
});

export const getResponseById = createAsyncThunk('responses/id', async (responseId, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${api_base_url}/responses/${responseId}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.statusText);
  }
});

export const deleteResponse = createAsyncThunk('responses/delete', async (responseId, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`${api_base_url}/responses/${responseId}`, {
      headers: {
        Authorization: `bearer ${getUserJwtFromLocalStorage()}`,
      },
    });
    return {
      id: responseId,
      message: response.data.message,
    };
  } catch (error) {
    return rejectWithValue(error.response.statusText);
  }
});

const responseSlice = createSlice({
  name: 'responses',
  initialState: {
    responses: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(createResponse.pending, async(state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(createResponse.fulfilled, async(state, action) => {
      state.loading = false;
      state.error = null;
      state.responses.push(action.payload);
    })
    .addCase(createResponse.rejected, async(state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(getResponses.pending, async(state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getResponses.fulfilled, async(state, action) => {
      state.loading = false;
      state.error = null;
      state.responses = action.payload;
    })
    .addCase(getResponses.rejected, async(state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(deleteResponse.pending, async(state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(deleteResponse.fulfilled, async(state, action) => {
      state.loading = false;
      state.error = null;
      state.responses = state.courses.filter((course) => course.id !== action.payload.id);
    })
    .addCase(deleteResponse.rejected, async(state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default responseSlice.reducer