import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { getUserFromLocalStorage, getUserJwtFromLocalStorage } from '../utils/localStorageForUser';
import { api_base_url } from '../utils/api_url';

export const createEnrollment = createAsyncThunk('enrollment/new', async (enrollmentData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${api_base_url}/users/${getUserFromLocalStorage().id}/enrollments`, enrollmentData, {
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

export const getEnrollments = createAsyncThunk('enrollments', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${api_base_url}/users/${getUserFromLocalStorage().id}/enrollments`, {
      headers: {
        Authorization: `bearer ${getUserJwtFromLocalStorage()}`,
      },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.statusText);
  }
});

export const getEnrollmentById = createAsyncThunk('enrollments/id', async ({ enrollmentId }, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${api_base_url}/users/${getUserFromLocalStorage().id}/enrollments/${enrollmentId}`, {
      headers: {
        Authorization: `bearer ${getUserJwtFromLocalStorage()}`,
      },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.statusText);
  }
});

export const deleteEnrollment = createAsyncThunk('enrollments/delete', async (enrollmentId, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`${api_base_url}/users/${getUserFromLocalStorage().id}/enrollments/${enrollmentId}`, {
      headers: {
        Authorization: `bearer ${getUserJwtFromLocalStorage()}`,
      },
    });
    return {
      id: enrollmentId,
      message: response.data.message,
    };
  } catch (error) {
    return rejectWithValue(error.response.statusText);
  }
});

const enrollmentSlice = createSlice({
  name: 'enrollments',
  initialState: {
    enrollments: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(createEnrollment.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
      .addCase(createEnrollment.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.enrollments.push(action.payload);
      })
      .addCase(createEnrollment.rejected, (state) => {
        state.loading = false;
        state.error = 'Enrollment already exists 😮';
      })
      .addCase(getEnrollments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEnrollments.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.enrollments = action.payload;
      })
      .addCase(getEnrollments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteEnrollment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEnrollment.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.enrollments = state.enrollments.filter((material) => material.id !== action.payload.id);
      })
      .addCase(deleteEnrollment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default enrollmentSlice.reducer;
