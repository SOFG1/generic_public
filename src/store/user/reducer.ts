import { createReducer } from "@reduxjs/toolkit";
import { IStatusColors, IUserInfo, IUserState } from "./types";
import {
  userAddStatusColors,
  userAddUserInfo,
  userClearError,
  userLogin,
  userLogout,
  userSetCountries,
  userSetErrorMessage,
  userSetRegistrationStep,
} from "./actions";
import { ERegistrationSteps } from "../../types";

const initialState: IUserState = {
  isLogin: false,
  token: null,
  errorMessage: null,
  step: 0,
  userInfo: null,
  statusCoors: [],
  countries: []
};

const user = createReducer(initialState, {
  [userLogin.type]: (state, payload: { payload: string }) => {
    return {
      ...state,
      isLogin: true,
      token: payload.payload,
    };
  },
  //Clear store after logout
  [userLogout.type]: (state) => {
    return {
      ...initialState,
    };
  },
  [userClearError.type]: (state) => {
    return {
      ...state,
      errorMessage: null,
    };
  },
  [userSetErrorMessage.type]: (state, action: { payload: string }) => {
    return {
      ...state,
      errorMessage: action.payload,
    };
  },
  [userSetRegistrationStep.type]: (
    state,
    action: { payload: ERegistrationSteps }
  ) => {
    return {
      ...state,
      step: action.payload,
    };
  },
  [userAddUserInfo.type]: (state, action: { payload: IUserInfo }) => {
    return {
      ...state,
      userInfo: action.payload,
    };
  },
  [userAddStatusColors.type]: (state, action: { payload: IStatusColors }) => {
    return {
      ...state,
      statusCoors: action.payload,
    };
  },
  [userSetCountries.type]: (
    state,
    action: { payload: { name: string; id: number }[] }
  ) => {
    return {
      ...state,
      countries: action.payload,
    };
  },
});

export default user;
