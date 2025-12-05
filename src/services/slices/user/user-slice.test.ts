import userSlice, { setAuthChecked } from './userSlice';
import { TUserState } from './type';
import { TUser } from '@utils-types';

import {
  fetchUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUser
} from '@thunks';

describe('userSlice', () => {
  const initialState: TUserState = {
    isAuthChecked: false,
    data: null,
    registerUserErorr: null,
    registerUserRequest: false,
    loginUserErorr: null,
    loginUserRequest: false,
    updateUserErorr: null,
    updateUserRequest: false,
    getUserErorr: null,
    getUserRequest: false
  };

  const userRegData = {
    email: 'test@test.ru',
    name: 'Polina',
    password: 'testTest1'
  };

  const userTestData: TUser = {
    email: 'test@test.ru',
    name: 'Polina'
  };

  it('isAuthChecked должен устанавливаться на true', () => {
    const expectedState: TUserState = { ...initialState, isAuthChecked: true };
    const actualState = userSlice.reducer(initialState, setAuthChecked(true));
    expect(actualState).toEqual(expectedState);
  });

  it('data должна устанавливаться null при dispatch logoutUser.fulfilled', () => {
    const modifiedState: TUserState = { ...initialState, data: userTestData };

    const actualState = userSlice.reducer(
      modifiedState,
      logoutUser.fulfilled(true, '', undefined)
    );

    expect(actualState.data).toBeNull();
    expect(actualState.isAuthChecked).toBe(true);
  });

  it('registerUserRequest = true и registerUserErorr = null при registerUser.pending', () => {
    const actualState = userSlice.reducer(
      initialState,
      registerUser.pending('', userRegData)
    );

    expect(actualState.registerUserRequest).toBe(true);
    expect(actualState.registerUserErorr).toBeNull();
  });

  it('обновляется ошибка и registerUserRequest = false при registerUser.rejected', () => {
    const testError = new Error('Ошибка регистрации');

    const actualState = userSlice.reducer(
      initialState,
      registerUser.rejected(testError, '', userRegData)
    );

    expect(actualState.registerUserErorr).toBe('Ошибка регистрации');
    expect(actualState.registerUserRequest).toBe(false);
  });

  it('обновляется data и registerUserRequest = false при registerUser.fulfilled', () => {
    const actualState = userSlice.reducer(
      initialState,
      registerUser.fulfilled(userTestData, '', userRegData)
    );

    expect(actualState.data).toEqual(userTestData);
    expect(actualState.registerUserRequest).toBe(false);
  });

  it('loginUserRequest = true и loginUserErorr = null при loginUser.pending', () => {
    const actualState = userSlice.reducer(
      initialState,
      loginUser.pending('', userRegData)
    );

    expect(actualState.loginUserRequest).toBe(true);
    expect(actualState.loginUserErorr).toBeNull();
  });

  it('обновляется состояние с user и loginUserRequest = false при loginUser.fulfilled', () => {
    const actualState = userSlice.reducer(
      initialState,
      loginUser.fulfilled(userTestData, '', userRegData)
    );

    expect(actualState.data).toEqual(userTestData);
    expect(actualState.loginUserRequest).toBe(false);
  });

  it('обновляется ошибка и loginUserRequest = false при loginUser.rejected', () => {
    const testError = new Error('Ошибка авторизации');

    const actualState = userSlice.reducer(
      initialState,
      loginUser.rejected(testError, '', userRegData)
    );

    expect(actualState.loginUserErorr).toBe('Ошибка авторизации');
    expect(actualState.loginUserRequest).toBe(false);
  });

  it('getUserRequest = true и getUserErorr = null при fetchUser.pending', () => {
    const actualState = userSlice.reducer(
      initialState,
      fetchUser.pending('', undefined)
    );

    expect(actualState.getUserRequest).toBe(true);
    expect(actualState.getUserErorr).toBeNull();
  });

  it('обновляется data и getUserRequest = false при fetchUser.fulfilled', () => {
    const actualState = userSlice.reducer(
      initialState,
      fetchUser.fulfilled(userTestData, '', undefined)
    );

    expect(actualState.data).toEqual(userTestData);
    expect(actualState.getUserRequest).toBe(false);
    expect(actualState.isAuthChecked).toBe(true);
  });

  it('обновляется ошибка и getUserRequest = false при fetchUser.rejected', () => {
    const testError = new Error('Ошибка получения пользователя');

    const actualState = userSlice.reducer(
      initialState,
      fetchUser.rejected(testError, '', undefined)
    );

    expect(actualState.getUserErorr).toBe('Ошибка получения пользователя');
    expect(actualState.getUserRequest).toBe(false);
    expect(actualState.isAuthChecked).toBe(true);
  });

  it('updateUserRequest = true и updateUserErorr = null при updateUser.pending', () => {
    const actualState = userSlice.reducer(
      initialState,
      updateUser.pending('', userTestData)
    );

    expect(actualState.updateUserRequest).toBe(true);
    expect(actualState.updateUserErorr).toBeNull();
  });

  it('обновляется data и updateUserRequest = false при updateUser.fulfilled', () => {
    const actualState = userSlice.reducer(
      initialState,
      updateUser.fulfilled(userTestData, '', userTestData)
    );

    expect(actualState.data).toEqual(userTestData);
    expect(actualState.updateUserRequest).toBe(false);
  });

  it('обновляется ошибка и updateUserRequest = false при updateUser.rejected', () => {
    const testError = new Error('Ошибка обновления данных');

    const actualState = userSlice.reducer(
      initialState,
      updateUser.rejected(testError, '', userTestData)
    );

    expect(actualState.updateUserErorr).toBe('Ошибка обновления данных');
    expect(actualState.updateUserRequest).toBe(false);
  });
});
