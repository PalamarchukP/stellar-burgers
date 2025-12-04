import { getFeedsApi, getOrdersApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchFeed = createAsyncThunk(
  'feeds/fetchFeed',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getFeedsApi();
      return data.orders ? data : rejectWithValue('No feed');
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const fetchProfileOrders = createAsyncThunk(
  'feeds/fetchProfileOrders',
  async (_, { rejectWithValue }) => {
    try {
      const orders = await getOrdersApi();
      return orders;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
