import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  updateUserApi
} from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { deleteCookie, setCookie } from '../../utils/cookie';

export const loginUser = createAsyncThunk(
  'user/login',
  async (data: TLoginData, thunkAPI) => {
    try {
      const res = await loginUserApi(data);
      setCookie('accessToken', res.accessToken);
      localStorage.setItem('refreshToken', res.refreshToken);

      return res.user;
    } catch (err) {
      return thunkAPI.rejectWithValue((err as { message: string }).message);
    }
  }
);

export const registerUser = createAsyncThunk(
  'user/register',
  async (data: { email: string; password: string; name: string }, thunkAPI) => {
    try {
      const res = await registerUserApi(data);

      setCookie('accessToken', res.accessToken);
      localStorage.setItem('refreshToken', res.refreshToken);

      return res.user;
    } catch (err) {
      return thunkAPI.rejectWithValue((err as { message: string }).message);
    }
  }
);

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (_, thunkAPI) => {
    try {
      const res = await getUserApi();
      return res.user;
    } catch (err) {
      return thunkAPI.rejectWithValue((err as { message: string }).message);
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (
    data: { name?: string; email?: string; password?: string },
    thunkAPI
  ) => {
    try {
      const res = await updateUserApi(data);
      return res.user;
    } catch (err) {
      return thunkAPI.rejectWithValue((err as { message: string }).message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'user/logout',
  async (_, thunkAPI) => {
    try {
      await logoutApi();

      deleteCookie('accessToken');
      localStorage.removeItem('refreshToken');

      return true;
    } catch (err) {
      return thunkAPI.rejectWithValue((err as { message: string }).message);
    }
  }
);
