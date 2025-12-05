import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrdersData, TOrder } from '@utils-types';
import { fetchProfileOrders, fetchFeed } from '@thunks';
import { FeedsState } from './type';

const initialState: FeedsState = {
  feed: null,
  ordersAuth: [],

  feedRequest: false,
  feedError: null,

  profileOrdersRequest: false,
  profileOrdersError: null
};

export const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  selectors: {
    feedSelect: (feedsState) => feedsState.feed,
    feedOrdersSelect: (feedsState) => feedsState.ordersAuth,

    feedIsLoadingSelect: (feedsState) => feedsState.feedRequest,
    profileOrdersIsLoadingSelect: (feedsState) =>
      feedsState.profileOrdersRequest,

    feedErrorSelect: (feedsState) => feedsState.feedError,
    ordersErrorSelect: (feedsState) => feedsState.profileOrdersError
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.pending, (state) => {
        state.feedRequest = true;
        state.feedError = null;
      })
      .addCase(
        fetchFeed.fulfilled,
        (state, action: PayloadAction<TOrdersData>) => {
          state.feedRequest = false;
          state.feed = action.payload;
        }
      )
      .addCase(fetchFeed.rejected, (state, action) => {
        state.feedRequest = false;
        state.feedError = action.error.message || 'Ошибка загрузки ленты';
      });

    builder
      .addCase(fetchProfileOrders.pending, (state) => {
        state.profileOrdersRequest = true;
        state.profileOrdersError = null;
      })
      .addCase(
        fetchProfileOrders.fulfilled,
        (state, action: PayloadAction<TOrder[]>) => {
          state.ordersAuth = action.payload;
          state.profileOrdersRequest = false;
        }
      )
      .addCase(fetchProfileOrders.rejected, (state, action) => {
        state.profileOrdersRequest = false;
        state.profileOrdersError =
          action.error.message || 'Ошибка загрузки заказов профиля';
      });
  }
});

export const {
  feedSelect,
  feedOrdersSelect,
  feedIsLoadingSelect,
  profileOrdersIsLoadingSelect,
  feedErrorSelect,
  ordersErrorSelect
} = feedsSlice.selectors;

export default feedsSlice;
