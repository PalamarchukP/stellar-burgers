import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { fetchIngredientsThunk } from '@thunks';
import { IngredientState } from './type';

const initialState: IngredientState = {
  ingredients: [],
  loading: false,
  error: null
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getIngredients: (ingredientsState: IngredientState) =>
      ingredientsState.ingredients,
    ingredientsIsLoading: (ingredientsState: IngredientState) =>
      ingredientsState.loading,
    ingredientsError: (ingredientsState: IngredientState) =>
      ingredientsState.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredientsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchIngredientsThunk.fulfilled,
        (state, action: PayloadAction<TIngredient[]>) => {
          state.loading = false;
          state.ingredients = action.payload;
        }
      )
      .addCase(fetchIngredientsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Ошибка загрузки ингредиентов';
      });
  }
});

export const { getIngredients, ingredientsIsLoading, ingredientsError } =
  ingredientsSlice.selectors;

export default ingredientsSlice;
