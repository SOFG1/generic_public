import {createAction} from "@reduxjs/toolkit";
import { HintType, INotification } from "./types";

export const appShowAlert = createAction<{ isSuccess: boolean, text: string }>('app/showAlert')
export const appCloseAlert = createAction<void>('app/closeAlert')

export const appGetNotifications = createAction('app/getNotifications')
export const appAddNotifications = createAction<INotification[]>('app/addNotifications')

export const appClearNotification = createAction<number>('app/clearNotification')
export const appDeleteNotification = createAction<number>('app/deleteNotification')

export const appSetHint = createAction<HintType>('app/setHint')


