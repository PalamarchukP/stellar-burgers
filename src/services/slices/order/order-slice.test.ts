import orderSlice from './orderSlice';
import { TOrder } from '@utils-types';

import { sendOrderThunk, fetchOrderByNumber } from '@thunks';
import { OrderState } from './type';

describe('orderSlice', () => {
  const initialState: OrderState = {
    newOrder: null,
    newOrderRequest: false,
    newOrderError: null,

    currentOrder: null,
    currentOrderRequest: false,
    currentOrderError: null
  };

  const testOrder: TOrder = {
    _id: '123',
    status: 'done',
    name: 'Test order',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    number: 1010,
    ingredients: ['i1', 'i2']
  };

  it('newOrderRequest = true и newOrderError = null при sendOrderThunk.pending', () => {
    const state = orderSlice.reducer(
      initialState,
      sendOrderThunk.pending('', testOrder.ingredients)
    );

    expect(state.newOrderRequest).toBe(true);
    expect(state.newOrderError).toBeNull();
  });

  it('newOrder обновляется и newOrderRequest = false при sendOrderThunk.fulfilled', () => {
    const payload = { order: testOrder, success: true, name: 'test name' };

    const state = orderSlice.reducer(
      initialState,
      sendOrderThunk.fulfilled(payload, '', testOrder.ingredients)
    );

    expect(state.newOrder).toEqual(testOrder);
    expect(state.newOrderRequest).toBe(false);
  });

  it('newOrderRequest = false и newOrderError заполняется при sendOrderThunk.rejected', () => {
    const testError = new Error('Ошибка создания заказа');

    const state = orderSlice.reducer(
      initialState,
      sendOrderThunk.rejected(testError, '', testOrder.ingredients)
    );

    expect(state.newOrderRequest).toBe(false);
    expect(state.newOrderError).toBe('Ошибка создания заказа');
  });

  it('currentOrderRequest = true и currentOrderError = null при fetchOrderByNumber.pending', () => {
    const state = orderSlice.reducer(
      initialState,
      fetchOrderByNumber.pending('', 1010)
    );

    expect(state.currentOrderRequest).toBe(true);
    expect(state.currentOrderError).toBeNull();
  });

  it('currentOrder обновляется и currentOrderRequest = false при fetchOrderByNumber.fulfilled', () => {
    const state = orderSlice.reducer(
      initialState,
      fetchOrderByNumber.fulfilled(testOrder, '', 1010)
    );

    expect(state.currentOrder).toEqual(testOrder);
    expect(state.currentOrderRequest).toBe(false);
  });

  it('currentOrderRequest = false и currentOrderError заполняется при fetchOrderByNumber.rejected', () => {
    const testError = new Error('Ошибка загрузки заказа');

    const state = orderSlice.reducer(
      initialState,
      fetchOrderByNumber.rejected(testError, '', 1010)
    );

    expect(state.currentOrderRequest).toBe(false);
    expect(state.currentOrderError).toBe('Ошибка загрузки заказа');
  });
});
