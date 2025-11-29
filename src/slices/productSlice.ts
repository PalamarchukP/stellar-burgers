import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { TIngredient } from '@utils-types';
import { getIngredientsApi } from '@api';

export interface IngredientListState {
  ingredients: TIngredient[];
  loading: boolean;
  error: string | null;
}

const initialState: IngredientListState = {
  ingredients: [],
  loading: false,
  error: null
};

export const fetchIngredients = createAsyncThunk('/ingredients', async () => {
  const ingredients = await getIngredientsApi();
  return ingredients;
});

const productSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    addIngredient(state, action: PayloadAction<TIngredient>) {
      const { _id } = action.payload;

      //   const ingredientToAdd = state.ingredients.find(
      //     (ingredient) => ingredient._id === _id
      //   );
      state.ingredients.push(action.payload);
    },
    removeIngredient(state, action: PayloadAction<TIngredient>) {
      const { _id } = action.payload;
      //   const ingredientToRemove = state.ingredients.find(
      //     (ingredient) => ingredient._id === _id
      //   );
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient._id !== action.payload._id
      );
    }
  },
  selectors: {
    getIngredients: (sliceState) => sliceState.ingredients,
    productsIsLoading: (sliceState) => sliceState.loading
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
      });
  }
});

export const { addIngredient, removeIngredient } = productSlice.actions;
export const { getIngredients, productsIsLoading } = productSlice.selectors;
export default productSlice.reducer;
