import { call, put, select, takeEvery, takeLatest, takeLeading } from "redux-saga/effects";
import {
  userAddStatusColors,
  userAddUserInfo,
  userGetCountries,
  userGetUserInfo,
  userLogin,
  userLoginRequest,
  userLogout,
  userRegistration,
  userSendActivity,
  userSetCountries,
  userSetErrorMessage,
  userSetRegistrationStep,
  userUpdateStatus,
} from "./actions";
import {
  ILoginData,
  IRegistrationData,
  IStatusColors,
  IUserInfo,
} from "./types";
import { handle } from "../../api";
import { User, UserActivityType } from "../../api/user";
import { ERegistrationSteps } from "../../types";
import { Settings } from "../../api/settings";
import { userSelector } from "./hooks";

export function* userWatcher() {
  yield takeLatest(userRegistration, registration);
  yield takeLeading(userLoginRequest, login);
  yield takeLatest(userGetUserInfo, requestUserInfo);
  yield takeLatest(userUpdateStatus, updateStatusColors);
  yield takeLatest(userGetCountries, getCountries);
  yield takeLatest(userSendActivity, sendActivity);
}

function* getUserInfo({ payload: { token } }: { payload: { token: string } }) {
  if (token) {
    const [dataRes, dataErr]: [
      data: IUserInfo | undefined,
      error: any | undefined
    ] = yield call(handle, User.userInfo(token));
    if (dataRes) {
      yield put(userAddUserInfo(dataRes));
    }
    if (dataErr) {
      yield put(userLogout())
      console.log(dataErr);
    }
    const [statusRes, statusErr]: [
      data: any | undefined,
      error: any | undefined
    ] = yield call(handle, Settings.getStatus(token));
    if (statusRes) {
      yield put(userAddStatusColors(statusRes));
    }
    if (statusErr) {
      console.log(dataErr);
    }
  }
}
function* updateStatusColors() {
  const { token } = yield select(userSelector);
  if (token) {
    const [dataRes, dataErr]: [data: any | undefined, error: any | undefined] =
      yield call(handle, Settings.getStatus(token));
    if (dataRes) {
      yield put(userAddStatusColors(dataRes));
    }
    if (dataErr) {
      console.log(dataErr);
    }
  }
}
function* getUserInfoById({
  payload: { token, id },
}: {
  payload: { token: string; id?: number | undefined };
}) {
  if (token && id) {
    const [dataRes, dataErr]: [
      data: { token: string } | undefined,
      error: any | undefined
    ] = yield call(handle, User.userInfoById(token, id));
    if (dataRes) {
      console.log(dataRes);
    }
    if (dataErr) {
      console.log(dataErr);
    }
  }
}
function* requestUserInfo({
  payload: { token, id },
}: {
  payload: { token: string; id?: number | undefined };
}) {
  if (id) {
    yield call(getUserInfoById, { payload: { token, id } });
  } else {
    yield call(getUserInfo, { payload: { token } });
  }
}
function* login({ payload }: { payload: ILoginData }) {
    if (payload) {
      const [dataRes, dataErr]: [
        data: { token: string } | undefined,
        error: any | undefined
      ] = yield call(handle, User.login(payload));
      if (dataRes) {
        const { token } = dataRes;
        yield put(userLogin(token));
      }
      if (dataErr) {
        const errMessage = Object.values(dataErr)
          .map((error: any) => {
            if (typeof error === "object") {
              return Object.values(error)
                .map((val) => {
                  if (Array.isArray(val)) {
                    val.join("\n");
                  } else {
                    return val;
                  }
                })
                .join("\n");
            } else {
              return error;
            }
          })
          .join("\n");
        if (errMessage !== "") yield put(userSetErrorMessage(errMessage));
      }
    }
}
function* registration({ payload }: { payload: IRegistrationData }) {
    if (payload) {
      const [dataRes, dataErr]: [
        data: any | undefined,
        error: any | undefined
      ] = yield call(handle, User.registration(payload));
      console.log("dataRes", dataRes);
      if (dataRes !== undefined) {
        yield put(
          userLoginRequest({
            username: payload.login,
            password: payload.password,
          })
        );
        yield put(userSetRegistrationStep(ERegistrationSteps.StepTwo));
      }
      if (dataErr) {
        const errMessage = Object.values(dataErr)
          .map((error: any) => {
            if (typeof error === "object") {
              return Object.values(error)
                .map((val) => {
                  if (Array.isArray(val)) {
                    val.join("\n");
                  } else {
                    return val;
                  }
                })
                .join("\n");
            } else {
              return error;
            }
          })
          .join("\n");
        if (errMessage !== "") yield put(userSetErrorMessage(errMessage));
      }
    }
}


function* getCountries(): any {
  const [dataRes, dataErr] = yield call(handle, User.getCountries())
  if(dataRes) {
    yield put(userSetCountries(dataRes))
  }
}

function* sendActivity({payload}: {payload: UserActivityType}): any {
  const {token} = yield select(userSelector)
  yield call(User.sendActivity, token,payload)
}

