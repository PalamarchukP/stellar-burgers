import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import {
  fetchUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUser
} from '@thunks';

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
