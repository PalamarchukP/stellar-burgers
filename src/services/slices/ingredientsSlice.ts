import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

import { TIngredient, TConstructorIngredient } from '@utils-types';
import { getIngredientsApi } from '@api';

export interface IngredientState {
  ingredients: TIngredient[];
  loading: boolean;
  error: string | null;
}

const initialState: IngredientState = {
  ingredients: [],
  loading: false,
  error: null
};

export const fetchIngredientsThunk = createAsyncThunk(
  '/ingredients',
  async () => {
    const ingredients = await getIngredientsApi();
    return ingredients;
  }
);

const productSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getIngredients: (sliceState: IngredientState) => sliceState.ingredients,
    productsIsLoading: (sliceState: IngredientState) => sliceState.loading
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredientsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIngredientsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      })
      .addCase(fetchIngredientsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
      });
  }
});

export const { getIngredients, productsIsLoading } = productSlice.selectors;

export default productSlice;
