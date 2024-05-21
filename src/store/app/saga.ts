import { call, put, select, takeEvery } from "redux-saga/effects"
import { handle } from "../../api"
import { User } from "../../api/user"
import { userSelector } from "../user"
import { appAddNotifications, appClearNotification, appDeleteNotification, appGetNotifications } from "./actions"

export function* appWatcher() {
    yield takeEvery(appGetNotifications, getNotifications)
    yield takeEvery(appDeleteNotification, deleteNotification)
    
}

function* getNotifications(): any {
    const {token} = yield select(userSelector)
    if (token) {
        const [dataRes, dataErr] = yield call(handle, User.getNotifications(token))
        if (dataRes) {
            yield put(appAddNotifications(dataRes))
        }
        if (dataErr) {
            console.log(dataErr)
        }
    }
}


function* deleteNotification({payload}:{payload: number}): any {
    const {token} = yield select(userSelector)
    if (token) {
        yield put(appClearNotification(payload))
        const [dataRes, dataErr] = yield call(handle, User.deleteNotification(token, payload))
        if (dataErr) {
            console.log(dataErr)
        }
    }
}