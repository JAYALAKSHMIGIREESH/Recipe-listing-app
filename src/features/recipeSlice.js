import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://dummyjson.com/recipes'; // Replace with the actual API URL

export const fetchRecipes = createAsyncThunk(
  'recipes/fetchRecipes',
  async (params) => {
    const { page, cuisine } = params;
    const response = await axios.get(`${API_URL}?page=${page}&cuisine=${cuisine}`);
    return response.data;
  }
);

export const fetchRecipeById = createAsyncThunk(
  'recipes/fetchRecipeById',
  async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  }
);

const recipeSlice = createSlice({
  name: 'recipes',
  initialState: {
    items: [],
    recipeDetails: null,
    status: 'idle',
    error: null,
    totalPages: 1,
    currentPage: 1,
    cuisine: '',
  },
  reducers: {
    setCuisine: (state, action) => {
      state.cuisine = action.payload;
    },
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.recipes;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchRecipeById.fulfilled, (state, action) => {
        state.recipeDetails = action.payload;
      });
  },
});

export const { setCuisine, setPage } = recipeSlice.actions;
export default recipeSlice.reducer;
