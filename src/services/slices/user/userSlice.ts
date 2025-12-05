import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import {
  fetchUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUser
} from '@thunks';
import { TUserState } from './type';

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

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthChecked(state, action: PayloadAction<boolean>) {
      state.isAuthChecked = action.payload;
    }
  },
  selectors: {
    userSelect: (userState) => userState.data,
    isAuthCheckedSelect: (userState) => userState.isAuthChecked,
    isGetUserLoading: (userState) => userState.getUserRequest,
    isLoginLoading: (userState) => userState.loginUserRequest,
    isRegisterLoading: (userState) => userState.registerUserRequest,
    isUpdateLoading: (userState) => userState.updateUserRequest
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.getUserRequest = true;
        state.getUserErorr = null;
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.data = action.payload;
        state.isAuthChecked = true;
        state.getUserRequest = false;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.getUserErorr =
          action.error?.message || 'Ошибка получения пользователя';
        state.isAuthChecked = true;
        state.getUserRequest = false;
      });

    builder
      .addCase(loginUser.pending, (state) => {
        state.loginUserRequest = true;
        state.loginUserErorr = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.data = action.payload;
        state.isAuthChecked = true;
        state.loginUserRequest = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginUserErorr = action.error?.message || 'Ошибка авторизации';
        state.loginUserRequest = false;
      });

    builder
      .addCase(registerUser.pending, (state) => {
        state.registerUserRequest = true;
        state.registerUserErorr = null;
      })
      .addCase(
        registerUser.fulfilled,
        (state, action: PayloadAction<TUser>) => {
          state.data = action.payload;
          state.registerUserRequest = false;
        }
      )
      .addCase(registerUser.rejected, (state, action) => {
        state.registerUserErorr = action.error?.message || 'Ошибка регистрации';
        state.registerUserRequest = false;
      });

    builder
      .addCase(updateUser.pending, (state) => {
        state.updateUserRequest = true;
        state.updateUserErorr = null;
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.data = action.payload;
        state.updateUserRequest = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.updateUserErorr =
          action.error?.message || 'Ошибка обновления данных';
        state.updateUserRequest = false;
      });

    builder.addCase(logoutUser.fulfilled, (state) => {
      state.data = null;
      state.isAuthChecked = true;
    });
  }
});

export const { setAuthChecked } = userSlice.actions;

export const {
  userSelect,
  isAuthCheckedSelect,
  isGetUserLoading,
  isLoginLoading,
  isRegisterLoading,
  isUpdateLoading
} = userSlice.selectors;

export default userSlice;
