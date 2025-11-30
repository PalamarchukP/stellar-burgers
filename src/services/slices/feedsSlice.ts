import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getFeedsApi, getOrdersApi } from '@api';
import { TOrdersData, TOrder } from '@utils-types';
// import { RequestStatus } from './userSlice';

export type FeedsState = {
  feed: TOrdersData | null;
  ordersAuth: TOrder[];
  loading: boolean;
  // requestStatus: RequestStatus;
};

const initialState: FeedsState = {
  feed: null,
  ordersAuth: [],
  loading: false
  //   requestStatus: idle
};

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

export const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  selectors: {
    feedSelect: (state: FeedsState) => state.feed,
    feedOrdersSelect: (state: FeedsState) => state.ordersAuth,
    feedIsLoadingSelect: (state: FeedsState) => state.loading === true
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFeed.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchFeed.fulfilled, (state, action) => {
      state.feed = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchFeed.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(fetchProfileOrders.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProfileOrders.fulfilled, (state, action) => {
      state.ordersAuth = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchProfileOrders.rejected, (state) => {
      state.loading = false;
    });
  }
});

export const feedsSelectors = {};

export const { feedSelect, feedOrdersSelect, feedIsLoadingSelect } =
  feedsSlice.selectors;

export default feedsSlice;
