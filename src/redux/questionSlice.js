import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { getUserJwtFromLocalStorage } from '../utils/localStorageForUser';
import { api_base_url } from '../utils/api_url';

export const createQuestion = createAsyncThunk('questions/new', async ({ courseId, quizId, questionData }, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${api_base_url}/courses/${courseId}/quizzes/${quizId}/questions`, questionData, {
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

export const getQuestions = createAsyncThunk('questions', async ({ courseId, quizId }, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${api_base_url}/courses/${courseId}/quizzes/${quizId}/questions`, {
      headers: {
        Authorization: `bearer ${getUserJwtFromLocalStorage()}`,
      },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.statusText);
  }
});

export const getQuestionById = createAsyncThunk('questions/id', async ({ courseId, quizId, questionId }, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${api_base_url}/courses/${courseId}/quizzes/${quizId}/questions/${questionId}`, {
      headers: {
        Authorization: `bearer ${getUserJwtFromLocalStorage()}`,
      },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.statusText);
  }
});

export const deleteQuestion = createAsyncThunk('questions/delete', async ({ courseId, quizId, questionId }, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`${api_base_url}/courses/${courseId}/quizzes/${quizId}/questions/${questionId}`, {
      headers: {
        Authorization: `bearer ${getUserJwtFromLocalStorage()}`,
      },
    });
    return {
      id: questionId,
      message: response.data.message,
    };
  } catch (error) {
    return rejectWithValue(error.response.statusText);
  }
});

const questionSlice = createSlice({
  name: 'questions',
  initialState: {
    questions: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(createQuestion.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
      .addCase(createQuestion.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.questions.push(action.payload);
      })
      .addCase(createQuestion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getQuestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.questions = action.payload;
      })
      .addCase(getQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteQuestion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteQuestion.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.questions = state.questions.filter((question) => question.id !== action.payload.id);
      })
      .addCase(deleteQuestion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default questionSlice.reducer;
