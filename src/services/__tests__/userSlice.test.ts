import { RequestStatus, TUser } from '@utils-types';
import {
  TInitialState,
  checkAuthUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUser,
  userActions,
  userReducer
} from '../slices/user';
import { TAuthResponse, TLoginData, TRegisterData, TUserResponse } from '@api';

const mockUser: TUser = {
  name: 'test',
  email: 'test@test.ru'
};

const mockLogin: TLoginData = {
  email: 'test',
  password: 'test'
};

const mockRegisterData: TRegisterData = {
  email: 'test@test.ru',
  password: 'test',
  name: 'test'
};

const mockUserResponse: TUserResponse = {
  success: true,
  user: mockUser
};

const mockAuthResponse: TAuthResponse = {
  success: true,
  refreshToken: 'refreshTestToken',
  accessToken: 'accessTestToken',
  user: mockUser
};

describe('Reducers of the slice [user]:', () => {
  const initialState: TInitialState = {
    data: null,
    isAuthChecked: false,
    requestStatus: RequestStatus.IDLE
  };

  test('[authChecked]: should set user checked', () => {
    const { authChecked } = userActions;
    const newState = userReducer(initialState, authChecked());
    expect(newState).toEqual({ ...initialState, isAuthChecked: true });
  });

  test('[checkAuthUser] should get user data', () => {
    const actualState = userReducer(
      { ...initialState, requestStatus: RequestStatus.LOADING },
      checkAuthUser.fulfilled(mockUserResponse, '')
    );

    expect(actualState).toEqual({
      ...initialState,
      data: mockUserResponse.user,
      isAuthChecked: true,
      requestStatus: RequestStatus.SUCCESS
    });
  });

  test('[registerUser]: should send mock data and set new user data', () => {
    const actualState = userReducer(
      { ...initialState },
      registerUser.fulfilled(mockAuthResponse, '', mockRegisterData)
    );

    expect(actualState).toEqual({
      ...initialState,
      data: mockAuthResponse.user,
      requestStatus: RequestStatus.SUCCESS
    });
  });

  test('[loginUser]: should save log-in data with tokens', () => {
    const actualState = userReducer(
      { ...initialState },
      loginUser.fulfilled(mockAuthResponse, '', mockLogin)
    );

    expect(actualState).toEqual({
      ...initialState,
      data: mockAuthResponse.user,
      requestStatus: RequestStatus.SUCCESS
    });
  });

  test('[logoutUser]: should clear all data with tokens', () => {
    const actualState = userReducer(
      {
        ...initialState,
        data: mockUser,
        isAuthChecked: true
      },
      logoutUser.fulfilled(mockAuthResponse, '')
    );

    expect(actualState).toEqual({
      ...initialState,
      requestStatus: RequestStatus.SUCCESS,
      data: null,
      isAuthChecked: false
    });
  });

  test('[updateUser]: should update initial data', () => {
    const actualState = userReducer(
      { ...initialState, requestStatus: RequestStatus.LOADING },
      updateUser.fulfilled(mockUserResponse, '', mockRegisterData)
    );
    expect(actualState).toEqual({
      ...initialState,
      data: mockUserResponse.user,
      requestStatus: RequestStatus.SUCCESS
    });
  });
});
