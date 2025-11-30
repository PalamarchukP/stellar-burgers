import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
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

export type RequestStatus = 'idle' | 'loading' | 'success' | 'failed';

export interface UserState {
  user: TUser | null;
  userCheck: boolean;
  requestStatus: RequestStatus;
}

const initialState: UserState = {
  user: null,
  userCheck: false,
  requestStatus: 'idle'
};

// ====================== Thunks ======================

// Получение текущего пользователя
export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUserApi();
      return response.user;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to fetch user');
    }
  }
);

// Авторизация
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (data: TLoginData, { rejectWithValue }) => {
    try {
      const response = await loginUserApi(data);
      return response.user;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Login failed');
    }
  }
);

// Регистрация
export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (data: TRegisterData, { rejectWithValue }) => {
    try {
      const response = await registerUserApi(data);
      return response.user;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Registration failed');
    }
  }
);

// Обновление данных пользователя
export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (user: Partial<TRegisterData>, { rejectWithValue }) => {
    try {
      const response = await updateUserApi(user);
      return response.user;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Update failed');
    }
  }
);

// Выход
export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi();
      return true;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Logout failed');
    }
  }
);

// ====================== Slice ======================

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUserCheck(state, action: PayloadAction<boolean>) {
      state.userCheck = action.payload;
    },
    userLogout(state, action: PayloadAction<void>) {
      state.user = null;
      state.userCheck = false;
      state.requestStatus = 'idle';
    }
  },
  selectors: {
    userSelect: (sliceState: UserState) => sliceState.user,
    isAuthCheckedSelect: (sliceState: UserState) => sliceState.userCheck,
    userIsLoadingSelect: (sliceState: UserState) =>
      sliceState.requestStatus === 'loading'
  },
  extraReducers: (builder) => {
    builder
      // fetchUser
      .addCase(fetchUser.pending, (state) => {
        state.requestStatus = 'loading';
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.user = action.payload;
        state.userCheck = true;
        state.requestStatus = 'success';
      })
      .addCase(fetchUser.rejected, (state) => {
        state.userCheck = true;
        state.requestStatus = 'failed';
      })
      // loginUser
      .addCase(loginUser.pending, (state) => {
        state.requestStatus = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.user = action.payload;
        state.requestStatus = 'success';
      })
      .addCase(loginUser.rejected, (state) => {
        state.requestStatus = 'failed';
      })
      // registerUser
      .addCase(registerUser.pending, (state) => {
        state.requestStatus = 'loading';
      })
      .addCase(
        registerUser.fulfilled,
        (state, action: PayloadAction<TUser>) => {
          state.user = action.payload;
          state.requestStatus = 'success';
        }
      )
      .addCase(registerUser.rejected, (state) => {
        state.requestStatus = 'failed';
      })
      // updateUser
      .addCase(updateUser.pending, (state) => {
        state.requestStatus = 'loading';
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.user = action.payload;
        state.requestStatus = 'success';
      })
      .addCase(updateUser.rejected, (state) => {
        state.requestStatus = 'failed';
      })
      // logoutUser
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.userCheck = false;
        state.requestStatus = 'idle';
      });
  }
});

export const { setUserCheck, userLogout } = userSlice.actions;

export const { userSelect, isAuthCheckedSelect, userIsLoadingSelect } =
  userSlice.selectors;

export default userSlice;
