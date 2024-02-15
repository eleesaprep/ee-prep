import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { getUserJwtFromLocalStorage } from '../utils/localStorageForUser';
import { api_base_url } from '../utils/api_url';

export const createInstructor = createAsyncThunk('instructors/new', async (instructorData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${api_base_url}/instructors`, instructorData, {
      headers: {
        Authorization: `bearer ${getUserJwtFromLocalStorage()}`,
      },
    });
    return response.data;
  } catch (error) {
    const errorMessages = error.response.data.errors.map((err, index) => ({
      id: index,
      message: error,
    }));
    return rejectWithValue(errorMessages);
  }
});

export const getInstructors = createAsyncThunk('instructors', async (_, { rejectWithValue, dispatch }) => {
  try {
    const response = await axios.get(`${api_base_url}/instructors`, {
      headers: {
        Authorization: `bearer ${getUserJwtFromLocalStorage()}`,
      },
    });
    const response_data = await response.data;
    return response_data;
  } catch (error) {
    return rejectWithValue(error.response.statusText);
  }
});

export const getInstructorById = createAsyncThunk('instructors/id', async (instructorId, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${api_base_url}/instructors/${instructorId}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.statusText);
  }
});

export const deleteInstructor = createAsyncThunk('instructors/delete', async (instructorId, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`${api_base_url}/instructors/${instructorId}`, {
      headers: {
        Authorization: `bearer ${getUserJwtFromLocalStorage()}`,
      },
    });
    return {
      id: instructorId,
      message: response.data.message,
    };
  } catch (error) {
    return rejectWithValue(error.response.statusText);
  }
});

const instructorSlice = createSlice({
  name: 'instructors',
  initialState: {
    instructors: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(createInstructor.pending, async (state) => {
      state.loading = true;
      state.error = null;
    })
      .addCase(createInstructor.fulfilled, async (state, action) => {
        state.loading = false;
        state.error = null;
        state.instructors.push(action.payload);
      })
      .addCase(createInstructor.rejected, async (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getInstructors.pending, (state) => ({
        ...state,
        instructors: {
          ...state.instructors,
          loading: true,
        },
      }))
      .addCase(getInstructors.fulfilled, (state, action) => ({
        ...state,
        instructors: {
          ...state.instructors,
          instructors: action.payload,
        },
        error: null,
        loading: false,
      }))
      .addCase(getInstructors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteInstructor.pending, async (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteInstructor.fulfilled, async (state, action) => {
        state.loading = false;
        state.error = null;
        state.instructors = state.instructors.filter((instructor) => instructor.id !== action.payload.id);
      })
      .addCase(deleteInstructor.rejected, async (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default instructorSlice.reducer;
