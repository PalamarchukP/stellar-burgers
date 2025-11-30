import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

import { TIngredient, TConstructorIngredient } from '@utils-types';
import { getIngredientsApi } from '@api';

export interface ProductState {
  ingredients: TIngredient[];
  loading: boolean;
  error: string | null;

  //заказ
  orderRequest: boolean;
  orderModalData: any | null;
}

const initialState: ProductState = {
  ingredients: [],
  loading: false,
  error: null,

  orderRequest: false,
  orderModalData: null
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
      state.ingredients.push(action.payload);
    },
    removeIngredient(state, action: PayloadAction<TIngredient>) {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient._id !== action.payload._id
      );
    },

    //заказ
    setOrderRequest(state, action: PayloadAction<boolean>) {
      state.orderRequest = action.payload;
    },
    setOrderModalData(state, action: PayloadAction<any | null>) {
      state.orderModalData = action.payload;
    }
  },
  selectors: {
    getIngredients: (sliceState: ProductState) => sliceState.ingredients,
    productsIsLoading: (sliceState: ProductState) => sliceState.loading,

    getOrderRequest: (sliceState: ProductState) => sliceState.orderRequest,
    getOrderModalData: (sliceState: ProductState) => sliceState.orderModalData
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
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

export const {
  addIngredient,
  removeIngredient,
  setOrderRequest,
  setOrderModalData
} = productSlice.actions;

export const {
  getIngredients,
  productsIsLoading,
  getOrderRequest,
  getOrderModalData
} = productSlice.selectors;

export default productSlice;
