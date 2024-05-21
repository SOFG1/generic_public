import {createAction} from "@reduxjs/toolkit";
import {IPageAccess, IUserInfo} from "../user/types";

export const usersGetUsers = createAction('users/getUsers')
export const usersAddUsers = createAction<IUserInfo[]>('users/addUsers')
export const usersSetIsFetchingUsers = createAction<boolean>('users/setIsFetchingUsers')


export const usersGetDefaultPerms = createAction("users/getDefaultPerms")
export const usersAddDefaultPerms = createAction<{ [page: string]: IPageAccess }>('users/addDefaultPerms')


