// import { TUser } from '@utils-types';
import { isAuthCheckedSelect } from './userSlice';
// import { loginUser, registerUser, updateUser } from '@thunks';
// import { useReducer } from 'react';
// // import { TUserState } from './type';
// // import {
// //   authCheked,
// //   getUser,
// //   loginUser,
// //   registerUser,
// //   updateUser,
// //   userLogout,
// //   userReducer
// // } from '.';

// describe('userSlice', () => {
//   const initialState: TUserState = {
//     isAuthCheckedSelect: false,
//     data: null,
//     registerUserError: null,
//     registerUserRequest: false,
//     loginUserError: null,
//     loginUserRequest: false,
//     updateUserError: null,
//     updateUserRequest: false
//   };

//   const userRegData = {
//     email: 'test@mail.com',
//     name: 'name',
//     password: 'password'
//   };

//   const userTestData = {
//     email: 'test@test.ru',
//     name: 'Polina'
//   };

//   it('че-то там user 1', () => {
//     const expectedState: TUserState = {
//       ...initialState,
//       isAuthCheckedSelect: true
//     };
//     const actualState = useReducer(initialState, authChecked());
//     expect(actualState).toEqual(expectedState);
//   });

//   it('че-то там user 2', () => {
//     const actualState = useReducer(
//       {
//         ...initialState,
//         data: userTestData
//       },
//       userLogout()
//     );

//     expect(actualState).toEqual(initialState);
//   });
// });

// describe('authCh', () => {
//   test('authhh', () => {
//     const result = isAuthCheckedSelect;
//     expect(result).toBe(false);
//   });
// });
