import { getOrderByNumberApi, orderBurgerApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { clearConstructor } from '@slices';

export const sendOrderThunk = createAsyncThunk(
  '/order/create',
  async (ingredients: string[], { rejectWithValue, dispatch }) => {
    try {
      const response = await orderBurgerApi(ingredients);
      if (response.success) {
        dispatch(clearConstructor());
      }
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const fetchOrderByNumber = createAsyncThunk(
  '/order/fetchByNumber',
  async (number: number, { rejectWithValue }) => {
    try {
      const response = await getOrderByNumberApi(number);
      return response.orders[0];
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
