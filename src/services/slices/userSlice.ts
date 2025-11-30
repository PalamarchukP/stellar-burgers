import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import {
  getUserApi,
  loginUserApi,
  registerUserApi,
  updateUserApi,
  logoutApi,
  TLoginData,
  TRegisterData
} from '@api';
import { setCookie, deleteCookie } from '../../utils/cookie';

enum RequestStatus {
  Idle = 'Idle',
  Loading = 'Loading',
  Success = 'Success',
  Failed = 'Failed'
}

export interface UserState {
  user: TUser | null;
  userCheck: boolean;
  requestStatus: RequestStatus;
}

const initialState: UserState = {
  user: null,
  userCheck: false,
  requestStatus: RequestStatus.Idle
};

export const loginUser = createAsyncThunk(
  'user/login',
  async (data: TLoginData, thunkAPI) => {
    try {
      const res = await loginUserApi(data);
      setCookie('accessToken', res.accessToken);
      localStorage.setItem('refreshToken', res.refreshToken);

      return res.user;
    } catch (err) {
      return thunkAPI.rejectWithValue(err);
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
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
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
      return thunkAPI.rejectWithValue(err);
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
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
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
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUserCheck(state, action: PayloadAction<boolean>) {
      state.userCheck = action.payload;
    }
  },
  selectors: {
    userSelect: (sliceState: UserState) => sliceState.user,
    isAuthCheckedSelect: (sliceState: UserState) => sliceState.userCheck,
    userIsLoadingSelect: (sliceState: UserState) =>
      sliceState.requestStatus === RequestStatus.Loading
  },
  extraReducers: (builder) => {
    builder
      // fetchUser
      .addCase(fetchUser.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.user = action.payload;
        state.userCheck = true;
        state.requestStatus = RequestStatus.Success;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.userCheck = true;
        state.requestStatus = RequestStatus.Failed;
      })
      // loginUser
      .addCase(loginUser.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.user = action.payload;
        state.userCheck = true;
        state.requestStatus = RequestStatus.Success;
      })
      .addCase(loginUser.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      })
      // registerUser
      .addCase(registerUser.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(
        registerUser.fulfilled,
        (state, action: PayloadAction<TUser>) => {
          state.user = action.payload;
          state.requestStatus = RequestStatus.Success;
        }
      )
      .addCase(registerUser.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      })
      // updateUser
      .addCase(updateUser.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.user = action.payload;
        state.requestStatus = RequestStatus.Success;
      })
      .addCase(updateUser.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      })
      // logoutUser
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.userCheck = true;
        state.requestStatus = RequestStatus.Idle;
      });
  }
});

export const { setUserCheck } = userSlice.actions;

export const { userSelect, isAuthCheckedSelect, userIsLoadingSelect } =
  userSlice.selectors;

export default userSlice;
