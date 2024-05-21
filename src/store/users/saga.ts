import { call, put, select, takeLeading } from "redux-saga/effects";
import {
    usersAddDefaultPerms,
    usersAddUsers,
    usersSetIsFetchingUsers,
    usersGetUsers,
    usersGetDefaultPerms
} from "./actions";
import { handle } from "../../api";
import { userSelector } from "../user";
import { User } from "../../api/user";
import { IPageAccess, IUserInfo } from "../user/types";

export function* usersWatcher() {
    yield takeLeading(usersGetUsers, getUsers)
    yield takeLeading(usersGetDefaultPerms, getDefaultPerms)
}

function* getUsers() {
    const { token } = yield select(userSelector)
    try {
        if (token) {
            yield put(usersSetIsFetchingUsers(true))
            const [dataRes, dataErr]: [data: IUserInfo[] | undefined, error: any | undefined] = yield call(handle, User.getUsers(token))
            yield put(usersSetIsFetchingUsers(false))
            if (dataRes !== undefined) {
                yield put(usersAddUsers(dataRes))
            }
            if (dataErr) {
                console.log(dataErr)
            }
        }
    } catch (e: any) {
        console.log(e)
    }
}


function* getDefaultPerms() {
    const { token } = yield select(userSelector)
    try {
        if (token) {
            const [dataRes, dataErr]: [data: any | undefined, error: any | undefined] = yield call(handle, User.getAllPermissions(token))
            if (dataRes) {
                const perms: { [page: string]: IPageAccess, } = {}
                for (const item of dataRes) {
                    const { name, page_permissions } = item
                    const objPerm: { [key: string]: boolean } = {}
                    for (const pagePermission of page_permissions) {
                        objPerm[pagePermission.name] = false
                    }
                    perms[name] = {
                        access: false,
                        actions: objPerm,
                        viewName: item.view_name
                    }
                }
                yield put(usersAddDefaultPerms(perms))
            }
        }
    } catch (e: any) {
        console.log(e)
    }
}