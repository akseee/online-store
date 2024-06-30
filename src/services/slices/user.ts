import {
  TServerResponse,
  TUserResponse,
  TAuthResponse,
  TRegisterData,
  TLoginData
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as burgerApi from '@api';
import { RequestStatus, TUser, TUserReset } from '@utils-types';
import { deleteCookie, setCookie } from '../../utils/cookie';

const sliceName = 'user';

export const checkAuthUser = createAsyncThunk<
  TUserResponse,
  void,
  { extra: typeof burgerApi }
>(
  `${sliceName}/checkUserAuth`,
  async (_, { extra: api }) => await api.getUserApi()
);

export const registerUser = createAsyncThunk<
  TAuthResponse,
  TRegisterData,
  { extra: typeof burgerApi }
>(`${sliceName}/registerUser`, async (data, { extra: api }) => {
  try {
    const result = await api.registerUserApi(data);
    setCookie('accessToken', result.accessToken);
    localStorage.setItem('refreshToken', result.refreshToken);
    return result;
  } catch (error) {
    return Promise.reject(error);
  }
});

export const loginUser = createAsyncThunk<
  TAuthResponse,
  TLoginData,
  { extra: typeof burgerApi }
>(`${sliceName}/loginUser`, async (data, { extra: api }) => {
  try {
    const result = await api.loginUserApi(data);
    setCookie('accessToken', result.accessToken);
    localStorage.setItem('refreshToken', result.refreshToken);
    return result;
  } catch (error) {
    return Promise.reject(error);
  }
});

export const logoutUser = createAsyncThunk<
  TServerResponse<{}>,
  void,
  { extra: typeof burgerApi }
>(`${sliceName}/logoutUser`, async (_, { extra: api }) => {
  try {
    const result = await api.logoutApi();
    deleteCookie('accessToken');
    localStorage.removeItem('refreshToken');
    return result;
  } catch (error) {
    return Promise.reject(error);
  }
});

export const updateUser = createAsyncThunk<
  TUserResponse,
  Partial<TRegisterData>,
  { extra: typeof burgerApi }
>(
  `${sliceName}/updateUser`,
  async (data, { extra: api }) => await api.updateUserApi(data)
);

export const forgotPassword = createAsyncThunk<
  TServerResponse<{}>,
  Pick<TLoginData, 'email'>,
  { extra: typeof burgerApi }
>(
  `${sliceName}/forgotPassword`,
  async (email, { extra: api }) => await api.forgotPasswordApi(email)
);

export const resetPassword = createAsyncThunk<
  TServerResponse<{}>,
  TUserReset,
  { extra: typeof burgerApi }
>(`${sliceName}/resetPassword`, async (data, { extra: api }) =>
  api.resetPasswordApi(data)
);

export type TInitialState = {
  data: TUser | null;
  isAuthChecked: boolean;
  requestStatus: RequestStatus;
};

const initialState: TInitialState = {
  data: null,
  isAuthChecked: false,
  requestStatus: RequestStatus.IDLE
};

export const userSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    authChecked: (state) => {
      state.isAuthChecked = true;
    }
  },
  selectors: {
    getAuthSelector: (state) => state.isAuthChecked,
    getUserDataSelector: (state) => state.data,
    getUserStatusSelector: (state) => state.requestStatus
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthUser.fulfilled, (state, action) => {
        state.requestStatus = RequestStatus.SUCCESS;
        state.data = action.payload.user;
        state.isAuthChecked = true;
      })
      .addCase(checkAuthUser.rejected, (state) => {
        state.requestStatus = RequestStatus.FAILED;
        state.isAuthChecked = true;
      })

      .addCase(registerUser.fulfilled, (state, action) => {
        state.requestStatus = RequestStatus.SUCCESS;
        state.data = action.payload.user;
      })
      .addCase(registerUser.rejected, (state) => {
        state.requestStatus = RequestStatus.FAILED;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.requestStatus = RequestStatus.SUCCESS;
        state.data = action.payload.user;
      })
      .addCase(loginUser.rejected, (state) => {
        state.requestStatus = RequestStatus.FAILED;
      })

      .addCase(logoutUser.fulfilled, (state) => {
        state.requestStatus = RequestStatus.SUCCESS;
        state.data = null;
        state.isAuthChecked = false;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.requestStatus = RequestStatus.FAILED;
      })

      .addCase(updateUser.fulfilled, (state, action) => {
        state.requestStatus = RequestStatus.SUCCESS;
        state.data = action.payload.user;
      })
      .addCase(updateUser.rejected, (state) => {
        state.requestStatus = RequestStatus.FAILED;
      });
  }
});

export const userReducer = userSlice.reducer;
export const userSelectors = userSlice.selectors;
export const userActions = userSlice.actions;
