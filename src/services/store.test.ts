import store from './store';
import {
  ingredientsSlice,
  constructorSlice,
  orderSlice,
  userSlice,
  feedsSlice
} from '@slices';
import { combineReducers } from '@reduxjs/toolkit';

describe('root store', () => {
  const rootReducer = combineReducers({
    ingredients: ingredientsSlice.reducer,
    constructorSlice: constructorSlice.reducer,
    order: orderSlice.reducer,
    user: userSlice.reducer,
    feeds: feedsSlice.reducer
  });

  it('rootReducer возвращает начальное состояние', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(state.ingredients).toEqual({
      ingredients: [],
      loading: false,
      error: null
    });

    expect(state.constructorSlice).toEqual({
      bun: null,
      constructorIngredients: []
    });

    expect(state.order).toEqual({
      newOrder: null,
      newOrderRequest: false,
      newOrderError: null,
      currentOrder: null,
      currentOrderRequest: false,
      currentOrderError: null
    });

    expect(state.user).toEqual({
      data: null,
      isAuthChecked: false,
      registerUserErorr: null,
      registerUserRequest: false,
      loginUserErorr: null,
      loginUserRequest: false,
      updateUserErorr: null,
      updateUserRequest: false,
      getUserErorr: null,
      getUserRequest: false
    });

    expect(state.feeds).toEqual({
      feed: null,
      ordersAuth: [],
      feedRequest: false,
      feedError: null,
      profileOrdersRequest: false,
      profileOrdersError: null
    });
  });

  it('store.getState() совпадает с initialState', () => {
    const expectedState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    const state = store.getState();

    expect(state).toEqual(expectedState);
  });
});
