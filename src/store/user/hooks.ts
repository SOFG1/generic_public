import {rootReducerType} from "../index";
import {ILoginData, IRegistrationData, IUserInfo, IUserState} from "./types";
import {useDispatch, useSelector} from "react-redux";
import {userAddUserInfo, userClearError, userGetCountries, userGetUserInfo, userLoginRequest, userLogout, userRegistration, userSendActivity, userSetRegistrationStep, userUpdateStatus} from "./actions";
import {ERegistrationSteps} from "../../types";
import {useMemo} from "react";
import { UserActivityType } from "../../api/user";

export const userSelector = (state:rootReducerType) => state.user

export function useUserState(): IUserState {
    return useSelector(userSelector)
}

export function useUserActions() {
    const dispatch = useDispatch()

    const onRegistration = (data: IRegistrationData) => {
        dispatch(userRegistration(data))
    }
    const getUserInfoAction = (token: string, id?: number) => {
        dispatch(userGetUserInfo({token, id}))
    }

    const addUserInfoAction = (data: IUserInfo) => {
        dispatch(userAddUserInfo(data))
    }

    const onLogin = (data: ILoginData) => {
        dispatch(userLoginRequest(data))
    }

    const onLogout = () => {
        dispatch(userLogout())
    }

    const onClearError = () => {
        dispatch(userClearError())
    }

    const onSetRegistrationStep = (step: ERegistrationSteps) => {
        dispatch(userSetRegistrationStep(step))
    }

    const onUpdateUserStatus = () => {
        dispatch(userUpdateStatus())
    }

    const onGetCountries = () => {
        dispatch(userGetCountries())
    }

    //Use this hook where we have e.stopPropagation() and listener is not working
    const onSendActivity = (activity: UserActivityType) => {
        dispatch(userSendActivity(activity))
    }

    return {
        onRegistration,
        getUserInfoAction,
        addUserInfoAction,
        onLogin,
        onLogout,
        onClearError,
        onSetRegistrationStep,
        onUpdateUserStatus,
        onGetCountries,
        onSendActivity
    }
}

export function usePermissions(page: string) {
    const {userInfo} = useUserState()
    const permissions:  {[p: string]: boolean} = useMemo(() => {
        return userInfo?.permissions[page].actions || {}
    }, [userInfo, page])
    return permissions
}