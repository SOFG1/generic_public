import { createReducer } from '@reduxjs/toolkit'
import { HintType, IAlert, IAppState, INotification } from "./types";
import { appAddNotifications, appCloseAlert, appShowAlert, appClearNotification, appSetHint } from "./actions";
import { userLogout } from '../user';



const initialState: IAppState = {
    alert: null,
    isModalOpened: false,
    notifications: [],
    hint: null
}

const app = createReducer(initialState, {
    [appCloseAlert.type]: (state) => {
        return {
            ...state,
            alert: null
        }
    },
    [appShowAlert.type]: (state, action: { payload: { isSuccess: boolean, text: string } }) => {
        return {
            ...state,
            alert: { ...action.payload, isShow: true },
        }
    },
    [appAddNotifications.type]: (state, action: { payload: INotification[] }) => {
        return {
            ...state,
            notifications: action.payload
        }
    },
    [appClearNotification.type]: (state, action: { payload: number }) => {
        const filtered = state.notifications.filter(n => n.id !== action.payload)
        return {
            ...state,
            notifications: filtered
        }
    },
    [appSetHint.type]: (state, action: { payload: HintType }) => {
        return {
            ...state,
            hint: action.payload
        }
    },
    //Clear state after logout
    [userLogout.type]: (state) => {
        return {
            ...initialState,
        };
    },
})


export default app;