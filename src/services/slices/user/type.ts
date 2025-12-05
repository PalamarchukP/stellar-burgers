import { TUser } from '@utils-types';

export enum RequestStatus {
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

export interface TUserState {
  isAuthChecked: boolean;
  data: TUser | null;
  registerUserErorr: null | string;
  registerUserRequest: boolean;
  loginUserErorr: null | string;
  loginUserRequest: boolean;
  updateUserErorr: null | string;
  updateUserRequest: boolean;
  getUserErorr: null | string;
  getUserRequest: boolean;
}
