import feedsSlice from './feedsSlice';

import { TOrder, TOrdersData } from '@utils-types';

import { fetchFeed, fetchProfileOrders } from '@thunks';
import { FeedsState } from './type';

describe('feedsSlice', () => {
  const initialState: FeedsState = {
    feed: null,
    ordersAuth: [],

    feedRequest: false,
    feedError: null,

    profileOrdersRequest: false,
    profileOrdersError: null
  };

  const testOrder: TOrder = {
    _id: '1',
    status: 'done',
    name: 'Test order',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    number: 1234,
    ingredients: ['id1', 'id2']
  };

  const feedData: TOrdersData = {
    orders: [testOrder],
    total: 1,
    totalToday: 1
  };

  const ordersAuthData: TOrder[] = [testOrder];

  it('feedRequest = true и feedError = null при fetchFeed.pending', () => {
    const state = feedsSlice.reducer(
      initialState,
      fetchFeed.pending('', undefined)
    );

    expect(state.feedRequest).toBe(true);
    expect(state.feedError).toBeNull();
  });

  it('feed обновляется и feedRequest = false при fetchFeed.fulfilled', () => {
    const state = feedsSlice.reducer(
      initialState,
      fetchFeed.fulfilled({ ...feedData, success: true }, '', undefined)
    );

    expect(state.feed).toEqual({ ...feedData, success: true });
    expect(state.feedRequest).toBe(false);
  });

  it('feedRequest = false и feedError обновляется при fetchFeed.rejected', () => {
    const testError = new Error('Ошибка загрузки ленты');

    const state = feedsSlice.reducer(
      initialState,
      fetchFeed.rejected(testError, '', undefined)
    );

    expect(state.feedRequest).toBe(false);
    expect(state.feedError).toBe('Ошибка загрузки ленты');
  });

  it('profileOrdersRequest = true и profileOrdersError = null при fetchProfileOrders.pending', () => {
    const state = feedsSlice.reducer(
      initialState,
      fetchProfileOrders.pending('', undefined)
    );

    expect(state.profileOrdersRequest).toBe(true);
    expect(state.profileOrdersError).toBeNull();
  });

  it('ordersAuth обновляется и profileOrdersRequest = false при fetchProfileOrders.fulfilled', () => {
    const state = feedsSlice.reducer(
      initialState,
      fetchProfileOrders.fulfilled(ordersAuthData, '', undefined)
    );

    expect(state.ordersAuth).toEqual(ordersAuthData);
    expect(state.profileOrdersRequest).toBe(false);
  });

  it('profileOrdersRequest = false и profileOrdersError обновляется при fetchProfileOrders.rejected', () => {
    const testError = new Error('Ошибка загрузки заказов');

    const state = feedsSlice.reducer(
      initialState,
      fetchProfileOrders.rejected(testError, '', undefined)
    );

    expect(state.profileOrdersRequest).toBe(false);
    expect(state.profileOrdersError).toBe('Ошибка загрузки заказов');
  });
});
