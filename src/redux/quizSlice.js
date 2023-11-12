import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { getUserJwtFromLocalStorage } from '../utils/localStorageForUser';

const api_base_url = 'http://localhost:3000/api/v1';

export const createQuiz = createAsyncThunk('quizzes/new', async (quizData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${api_base_url}/quizzes`, quizData, {
      headers: {
        Authorization: `bearer ${getUserJwtFromLocalStorage}`,
      },
    });
    return response.data;
  } catch (error) {
    const errorMessages = error.response.data.errors.map((err, index) => ({
      id: index,
      message: error,
    }));
    return rejectWithValue(errorMessages);
  };
});

export const getQuizzes = createAsyncThunk('quizzes', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${api_base_url}/quizzes`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.statusText);
  }
});

export const getQuizById = createAsyncThunk('quizzes/id', async (quizId, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${api_base_url}/quizzes/${quizId}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.statusText);
  }
});

export const deleteQuiz = createAsyncThunk('quizzes/delete', async (quizId, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`${api_base_url}/quizzes/${quizId}`, {
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
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(createQuiz.pending, async(state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(createQuiz.fulfilled, async(state, action) => {
      state.loading = false;
      state.error = null;
      state.quizzes.push(action.payload);
    })
    .addCase(createQuiz.rejected, async(state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(getQuizzes.pending, async(state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getQuizzes.fulfilled, async(state, action) => {
      state.loading = false;
      state.error = null;
      state.quizzes = action.payload;
    })
    .addCase(getQuizzes.rejected, async(state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(deleteQuiz.pending, async(state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(deleteQuiz.fulfilled, async(state, action) => {
      state.loading = false;
      state.error = null;
      state.quizzes = state.quizzes.filter((quiz) => quiz.id !== action.payload.id);
    })
    .addCase(deleteQuiz.rejected, async(state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default quizSlice.reducer;