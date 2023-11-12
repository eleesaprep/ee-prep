import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { getUserJwtFromLocalStorage } from '../utils/localStorageForUser';

const api_base_url = 'http://localhost:3000/api/v1';

export const createQuestion = createAsyncThunk('questions/new', async (questionData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${api_base_url}/questions`, questionData, {
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

export const getQuestions = createAsyncThunk('questions', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${api_base_url}/questions`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.statusText);
  }
});

export const getQuestionById = createAsyncThunk('questions/id', async (questionId, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${api_base_url}/questions/${questionId}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.statusText);
  }
});

export const deleteQuestion = createAsyncThunk('questions/delete', async (questionId, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`${api_base_url}/questions/${questionId}`, {
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
    builder.addCase(createQuestion.pending, async(state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(createQuestion.fulfilled, async(state, action) => {
      state.loading = false;
      state.error = null;
      state.questions.push(action.payload);
    })
    .addCase(createQuestion.rejected, async(state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(getQuestions.pending, async(state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getQuestions.fulfilled, async(state, action) => {
      state.loading = false;
      state.error = null;
      state.questions = action.payload;
    })
    .addCase(getQuestions.rejected, async(state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(deleteQuestion.pending, async(state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(deleteQuestion.fulfilled, async(state, action) => {
      state.loading = false;
      state.error = null;
      state.questions = state.questions.filter((question) => question.id !== action.payload.id);
    })
    .addCase(deleteQuestion.rejected, async(state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default questionSlice.reducer;