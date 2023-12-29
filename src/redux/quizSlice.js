import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { getUserJwtFromLocalStorage } from '../utils/localStorageForUser';
import { api_base_url } from '../utils/api_url';

export const createQuiz = createAsyncThunk('quizzes/new', async ({ courseId, quizData }, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${api_base_url}/courses/${courseId}/quizzes`, quizData, {
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

export const getQuizzes = createAsyncThunk('quizzes', async (courseId, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${api_base_url}/courses/${courseId}/quizzes`, {
      headers: {
        Authorization: `bearer ${getUserJwtFromLocalStorage()}`,
      },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.statusText);
  }
});

export const getQuizById = createAsyncThunk('quizzes/id', async ({ quizId, courseId }, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${api_base_url}/courses/${courseId}/quizzes/${quizId}`, {
      headers: {
        Authorization: `bearer ${getUserJwtFromLocalStorage()}`,
      },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.statusText);
  }
});

export const deleteQuiz = createAsyncThunk('quizzes/delete', async ({ quizId, courseId }, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`${api_base_url}/courses/${courseId}/quizzes/${quizId}`, {
      headers: {
        Authorization: `bearer ${getUserJwtFromLocalStorage()}`,
      },
    });
    return {
      id: quizId,
      message: response.data.message,
    };
  } catch (error) {
    return rejectWithValue(error.response.statusText);
  }
});

const quizSlice = createSlice({
  name: 'quizzes',
  initialState: {
    quizzes: [],
    quiz_loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(createQuiz.pending, (state) => {
      state.quiz_loading = true;
      state.error = null;
    })
      .addCase(createQuiz.fulfilled, (state, action) => {
        state.quiz_loading = false;
        state.error = null;
        state.quizzes.push(action.payload);
      })
      .addCase(createQuiz.rejected, (state, action) => {
        state.quiz_loading = false;
        state.error = action.payload;
      })
      .addCase(getQuizzes.pending, (state) => {
        state.quiz_loading = true;
        state.error = null;
      })
      .addCase(getQuizzes.fulfilled, (state, action) => {
        state.quiz_loading = false;
        state.error = null;
        state.quizzes = action.payload;
      })
      .addCase(getQuizzes.rejected, (state, action) => {
        state.quiz_loading = false;
        state.error = action.payload;
      })
      .addCase(deleteQuiz.pending, (state) => {
        state.quiz_loading = true;
        state.error = null;
      })
      .addCase(deleteQuiz.fulfilled, (state, action) => {
        state.quiz_loading = false;
        state.error = null;
        state.quizzes = state.quizzes.filter((quiz) => quiz.id !== action.payload.id);
      })
      .addCase(deleteQuiz.rejected, (state, action) => {
        state.quiz_loading = false;
        state.error = action.payload;
      });
  },
});

export default quizSlice.reducer;
