import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { getUserJwtFromLocalStorage } from '../utils/localStorageForUser';
import { api_base_url } from '../utils/api_url';

export const createCourse = createAsyncThunk('/courses/new', async (coursesData, { rejectWithValue }) =>
  // Return a Promise that resolves to the data
  axios.post(`${api_base_url}/courses`, coursesData, {
    headers: {
      Authorization: `bearer ${getUserJwtFromLocalStorage()}`,
    },
  })
    .then((response) => response.data)
    .catch((error) => {
      const errorMessages = error.response.data.errors.map((err, index) => ({
        id: index,
        message: err,
      }));
      return rejectWithValue(errorMessages);
    }));

export const getCourses = createAsyncThunk('courses', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${api_base_url}/courses`, {
      headers: {
        Authorization: `bearer ${getUserJwtFromLocalStorage()}`,
      },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const getCourseById = createAsyncThunk('courses/id', async (courseId, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${api_base_url}/courses/${courseId}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.statusText);
  }
});

export const deleteCourse = createAsyncThunk('courses/delete', async (courseId, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`${api_base_url}/courses/${courseId}`, {
      headers: {
        Authorization: `bearer ${getUserJwtFromLocalStorage()}`,
      },
    });
    return {
      id: courseId,
      message: response.data.message,
    };
  } catch (error) {
    return rejectWithValue(error.response.statusText);
  }
});

const courseSlice = createSlice({
  name: 'courses',
  initialState: {
    courses: [],
    loading: false,
    error: null,
  },
  extraReducers(builder) {
    builder.addCase(createCourse.pending, async (state) => ({
      ...state,
      loading: true,
      error: null,
    }))
      .addCase(createCourse.fulfilled, async (state, action) => ({
        loading: false,
        error: null,
        courses: [...state.courses, action.payload],
      }))
      .addCase(createCourse.rejected, async (state, action) => ({
        ...state,
        loading: false,
        error: action.payload,
      }))
      .addCase(getCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.courses = action.payload;
      })
      .addCase(getCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteCourse.pending, (state) => ({
        ...state,
        loading: true,
        error: null,
      }))
      .addCase(deleteCourse.fulfilled, (state, action) => ({
        ...state,
        loading: false,
        error: null,
        course: state.courses.filter((course) => course.id !== action.payload.id),
      }))
      .addCase(deleteCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default courseSlice.reducer;
