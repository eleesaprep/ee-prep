import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { getUserJwtFromLocalStorage } from '../utils/localStorageForUser';

const api_base_url = 'http://localhost:3000/api/v1';

export const createMaterial = createAsyncThunk('materials/new', async ({ courseId, materialData }, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${api_base_url}/courses/${courseId}/materials`, materialData, {
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

export const getMaterials = createAsyncThunk('materials', async (courseId, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${api_base_url}/courses/${courseId}/materials`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.statusText);
  }
});

export const getMaterialById = createAsyncThunk('materials/id', async ({ courseId, materialId }, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${api_base_url}/courses/${courseId}/materials/${materialId}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.statusText);
  }
});

export const deleteMaterial = createAsyncThunk('materials/delete', async ({courseId, materialId}, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`${api_base_url}/courses/${courseId}/materials/${materialId}`, {
      headers: {
        Authorization: `bearer ${getUserJwtFromLocalStorage()}`,
      },
    });
    return {
      id: materialId,
      message: response.data.message,
    };
  } catch (error) {
    return rejectWithValue(error.response.statusText);
  }
});

const materialSlice = createSlice({
  name: 'materials',
  initialState: {
    materials: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(createMaterial.pending, async(state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(createMaterial.fulfilled, async(state, action) => {
      state.loading = false;
      state.error = null;
      state.materials.push(action.payload);
    })
    .addCase(createMaterial.rejected, async(state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(getMaterials.pending, async(state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getMaterials.fulfilled, async(state, action) => {
      state.loading = false;
      state.error = null;
      state.materials = action.payload;
    })
    .addCase(getMaterials.rejected, async(state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(deleteMaterial.pending, async(state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(deleteMaterial.fulfilled, async(state, action) => {
      state.loading = false;
      state.error = null;
      state.materials = state.materials.filter((material) => material.id !== action.payload.id);
    })
    .addCase(deleteMaterial.rejected, async(state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default materialSlice.reducer