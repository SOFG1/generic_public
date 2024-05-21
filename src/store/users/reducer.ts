import { createReducer } from '@reduxjs/toolkit'
import {
    usersAddDefaultPerms,
    usersSetIsFetchingUsers,
    usersAddUsers
} from "./actions";
import { IUsersState } from "./types";
import { IPageAccess, IUserInfo } from "../user/types";
import { userLogout } from '../user/actions';

const initialState: IUsersState = {
    users: [],
    isFetchingUsers: false,
    defaultPermissions: {}
}

const users = createReducer(initialState, {
    [usersAddUsers.type]: (state, action: { payload: IUserInfo[] }) => {
        return {
            ...state,
            users: action.payload
        }
    },
    [usersAddDefaultPerms.type]: (state, action: { payload: { [page: string]: IPageAccess, } }) => {
        return {
            ...state,
            defaultPermissions: action.payload
        }
    },
    [usersSetIsFetchingUsers.type]: (state, action: { payload: boolean }) => {
        return {
            ...state,
            isFetchingUsers: action.payload
        }
    },
    //Clear store after logout
    [userLogout.type]: (state) => {
        return {
            ...initialState,
        };
    },
})

export default users;