import { rootReducerType } from "../index";
import { HintType, IAppState } from "./types";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useMemo } from "react";
import { userLogout } from "../user";
import { appCloseAlert, appDeleteNotification, appGetNotifications, appSetHint, appShowAlert } from "./actions";
import { clearLocalStorage } from "../../utils/clearLocalStorage";

export const appSelector = (state: rootReducerType) => state.app

export function useAppState(): IAppState {
    return useSelector(appSelector)
}

export function useAppActions() {
    const dispatch = useDispatch()

    const onShowAlert = useCallback((isSuccess: boolean, text: string) => {
        dispatch(appShowAlert({ isSuccess, text }))
    }, [dispatch])

    const onCloseAlert = useCallback(() => {
        dispatch(appCloseAlert())
    }, [dispatch])

    const onLogout = useCallback(() => {
        dispatch(userLogout());
        clearLocalStorage()
    }, [dispatch]);

    
    const onGetNotifications = () => {
        dispatch(appGetNotifications())
    }

    const onDeleteNotification = (id: number) => {
        dispatch(appDeleteNotification(id))
    }

    const onSetHint = (hint: HintType) => {
        dispatch(appSetHint(hint))
    }

    return {
        onShowAlert,
        onCloseAlert,
        onLogout,
        onGetNotifications,
        onDeleteNotification,
        onSetHint
    }
}