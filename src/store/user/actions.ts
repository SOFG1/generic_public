import {createAction} from "@reduxjs/toolkit";
import {ILoginData, IRegistrationData, IStatusColors, IUserInfo} from "./types";
import {ERegistrationSteps} from "../../types";
import { UserActivityType } from "../../api/user";

export const userLogin = createAction<string>('user/login')
export const userLoginRequest = createAction<ILoginData>('user/loginRequest')

export const userGetUserInfo = createAction<{token: string, id?: number | undefined}>('user/getUserInfo')
export const userAddUserInfo = createAction<IUserInfo>('user/addUserInfo')

export const userAddStatusColors = createAction<IStatusColors>('user/addStatusColors')

export const userRegistration = createAction<IRegistrationData>('user/registration')

export const userSetErrorMessage = createAction<string>('user/setErrorMessage')
export const userClearError = createAction('user/clearError')

export const userSetRegistrationStep = createAction<ERegistrationSteps>('user/setRegistrationStep')

export const userLogout = createAction('user/logout')

export const userUpdateStatus = createAction('user/updateStatus')

export const userGetCountries = createAction('user/getCountries')
export const userSetCountries = createAction<{name: string, id: number}[]>('user/setCountries')

export const userSendActivity = createAction<UserActivityType>('user/sendActivity')