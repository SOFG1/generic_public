import { rootReducerType } from "../index";
import { useDispatch, useSelector } from "react-redux";
import { IUsersState } from "./types";
import { usersGetDefaultPerms, usersGetUsers } from "./actions";

export const usersSelector = (state: rootReducerType) => state.users

export function useUsersState(): IUsersState {
    return useSelector(usersSelector)
}

export function useUsersActions() {
    const dispatch = useDispatch()

    const onGetUsers = () => {
        dispatch(usersGetUsers())
    }

    const onGetDefaultPerms = () => {
        dispatch(usersGetDefaultPerms())
    }

    return {
        onGetUsers,
        onGetDefaultPerms
    }
}