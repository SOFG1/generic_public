import {
  all,
  call,
  put,
  select,
  takeLatest,
  takeLeading,
} from "redux-saga/effects";
import {
  callCenterCreateCampaing,
  callCenterAddInterviewees,
  callCenterCreateSet,
  callCenterCreateCreative,
  callCenterGetQuestionariesInterviewees,
  callCenterSendAnswers,
  callCenterCreateAd,
  callCenterSendEmail,
  callCenterDelete,
  callCenterSendSms,
  callCenterSelectFBAccount,
  callCenterGetCampaings,
  callCenterGetSets,
  callCenterGetCreatives,
  callCenterSetFetching,
  callCenterGetAudiences,
  callCenterGetAds,
  callCenterUpdateField,
  callCenterGetCampaigns,
  callCenterSetCampaigns,
  callCenterGetApplayFilter,
  callCenterSetApplayFilter,
  callCenterGetSMS,
  callCenterSetSMS,
  callCenterGetEmail,
  callCenterSetEmail,
  callCenterGetQuestionariesList,
  callCenterSetQuestionariesList,
  callCenterGetFBAccountList,
  callCenterSetFBAccountList,
  callCenterSetCampaings,
  callCenterSetSets,
  callCenterSetCreatives,
  callCenterSetAudiences,
  callCenterSetAds,
} from "./actions";
import { userSelector } from "../user";
import { handle } from "../../api";
import { rawDataApplyFilters, rawDataSelector } from "../rawData";
import { CallCenter, IDistributionAnswerParams } from "../../api/callCenter";
import {
  IInterviewees,
  SendAnswerAction,
  SendEmailAction,
  DeleteNodeAction,
  SendSmsAction,
  CreateCampaingAction,
  CreateSetAction,
  CreateAdAction,
  CreateAudienceAction,
} from "./types";
import { callCenterSelector } from "./hooks";
import { appShowAlert } from "../app";
import { InputValueType } from "../../types";

export function* callCenterWatcher() {
  yield takeLatest([callCenterGetApplayFilter, rawDataApplyFilters], getApplayFilter);
  yield takeLatest(callCenterGetSMS, getSMS);
  yield takeLatest(callCenterGetEmail, getEmail);
  yield takeLatest(callCenterGetQuestionariesList, getQuestionariesList);
  yield takeLatest(callCenterGetFBAccountList, getFBAccountList);
  yield takeLatest(
    [callCenterGetQuestionariesInterviewees, rawDataApplyFilters],
    getQuestionariesInterviewees
  );
  yield takeLatest(callCenterSendEmail, sendEmail);
  yield takeLatest(callCenterSendSms, sendSms);
  yield takeLatest(callCenterSendAnswers, sendAnswers);
  yield takeLatest(callCenterUpdateField, updateFields);
  yield takeLatest(callCenterCreateCampaing, CreateCampaing);
  yield takeLatest(callCenterCreateSet, CreateSet);
  yield takeLatest(callCenterCreateCreative, CreateCreative);
  yield takeLatest(callCenterCreateAd, CreateAd);
  yield takeLatest(callCenterDelete, DeleteNode);
  yield takeLatest(
    [callCenterGetCampaings, callCenterSelectFBAccount],
    GetCampaings
  );
  yield takeLatest([callCenterGetSets, callCenterSelectFBAccount], GetSets);
  yield takeLatest(
    [callCenterGetCreatives, callCenterSelectFBAccount],
    GetCreatives
  );
  yield takeLatest(
    [callCenterGetAudiences, callCenterSelectFBAccount],
    GetCustomAudiences
  );
  yield takeLatest([callCenterGetAds, callCenterSelectFBAccount], GetAds);
  yield takeLeading(callCenterGetCampaigns, getCampaigns);
}


function* getApplayFilter(): any {
  const { token } = yield select(userSelector);
  const { appliedFilters } = yield select(rawDataSelector);
  if (token) {
    let [dataRes, dataErr] = yield call(handle, CallCenter.getApply(token, appliedFilters))
    if (dataRes) {
      yield put(callCenterSetApplayFilter(dataRes))
      console.log(dataRes);
    }
    if (dataErr) {
      console.log(dataErr);
      yield put(
        appShowAlert({
          isSuccess: false,
          text: dataErr?.error?.message ||
            dataErr?.error ||
            "Something went wrong! Try again later!",
        })
      );
    }
  }
}

function* getSMS(): any {
  const { token } = yield select(userSelector);
  if (token) {
    let [dataRes, dataErr] = yield call(handle, CallCenter.getSms(token))
    if (dataRes) {
      yield put(callCenterSetSMS(dataRes))
    }
    if (dataErr) {
      console.log(dataErr);
      yield put(
        appShowAlert({
          isSuccess: false,
          text:
            dataErr.error.message ||
            dataErr.error ||
            "Something went wrong! Try again later!",
        })
      );
    }
  }
}

function* getEmail(): any {
  const { token } = yield select(userSelector);
  if (token) {
    let [dataRes, dataErr] = yield call(handle, CallCenter.getEmail(token))
    if (dataRes) {
      yield put(callCenterSetEmail(dataRes))
    }
    if (dataErr) {
      console.log(dataErr);
      yield put(
        appShowAlert({
          isSuccess: false,
          text:
            dataErr.error.message ||
            dataErr.error ||
            "Something went wrong! Try again later!",
        })
      );
    }
  }
}


function* getQuestionariesList(): any {
  const { token } = yield select(userSelector);
  if (token) {
    let [dataRes, dataErr] = yield call(handle, CallCenter.getQuestionariesList(token))
    if (dataRes) {
      yield put(callCenterSetQuestionariesList(dataRes))
    }
    if (dataErr) {
      console.log(dataErr);
      yield put(
        appShowAlert({
          isSuccess: false,
          text:
            dataErr.error.message ||
            dataErr.error ||
            "Something went wrong! Try again later!",
        })
      );
    }
  }
}

function* getFBAccountList(): any {
  const { token } = yield select(userSelector);
  if (token) {
    let [dataRes, dataErr] = yield call(handle, CallCenter.getFBAccountList(token))
    if (dataRes) {
      yield put(callCenterSetFBAccountList(dataRes))
    }
    if (dataErr) {
      const errText = dataErr?.error?.error?.error_user_msg || dataErr?.error?.error?.message || dataErr.error
      yield put(appShowAlert({ isSuccess: false, text: errText }))
      console.log(dataErr)
    }
  }
}

function* getQuestionariesInterviewees({ payload }: { payload: any }) {
  const { token } = yield select(userSelector);
  const { appliedFilters } = yield select(rawDataSelector);
  const { selectedQuestionarieId } = yield select(
    callCenterSelector
  );
  const params = { ...appliedFilters };
  if (typeof payload === "string") params.unanswered = payload;
  if (token && selectedQuestionarieId !== 0) {
    const [getRes, getErr]: [
      data: IInterviewees | undefined,
      error: any | undefined
    ] = yield call(
      handle,
      CallCenter.getQuestionariesInterviewees(
        token,
        params,
        selectedQuestionarieId
      )
    );
    if (getRes) {
      yield put(callCenterAddInterviewees(getRes));
    }
    if (getErr) {
      console.log(getErr);
      yield put(
        appShowAlert({
          isSuccess: false,
          text: getErr.error || "Something went wrong! Try again later!",
        })
      );
    }
  }
}

function* sendEmail({ payload }: { payload: SendEmailAction }) {
  const { token } = yield select(userSelector);
  if (token) {
    const [getRes, getErr]: [data: string | undefined, error: any | undefined] =
      yield call(handle, CallCenter.postEmail(token, payload));
    if (getRes) {
      yield put(appShowAlert({ isSuccess: true, text: getRes }));
      yield call(getEmail)
    }
    if (getErr) {
      console.log(getErr);
      yield put(
        appShowAlert({
          isSuccess: false,
          text: getErr.error || "Something went wrong! Try again later!",
        })
      );
    }
  }
}

function* sendAnswers({ payload }: { payload: SendAnswerAction }) {
  const { token } = yield select(userSelector);
  const { interviewees, selectedQuestionarieId, selectedIntervieweeNumber, selectedAudienceId } =
    yield select(callCenterSelector);
  if (token && interviewees !== null) {
    const params: IDistributionAnswerParams = {
      interviewee: interviewees.id,
      answer: payload,
      questionarie: selectedQuestionarieId,
      audience: selectedAudienceId,
      phone: selectedIntervieweeNumber
    }
    const [getRes, getErr]: [data: string | undefined, error: any | undefined] =
      yield call(
        handle,
        CallCenter.postAnswers(
          token,
          params
        )
      );
    if (getRes) {
      yield put(appShowAlert({ isSuccess: true, text: getRes }));
    }
    if (!getErr) {
      yield call(getQuestionariesInterviewees, { payload: null });
    }
    if (getErr) {
      console.log(getErr);
      yield put(
        appShowAlert({
          isSuccess: false,
          text: getErr.error || "Something went wrong! Try again later!",
        })
      );
    }
  }
}

function* updateFields({
  payload,
}: {
  payload: { [slug: string]: InputValueType };
}): any {
  const { token } = yield select(userSelector);
  const { interviewees } = yield select(callCenterSelector);
  if (token && interviewees !== null) {
    const [dataRes, dataErr]: [any, any] = yield call(
      handle,
      CallCenter.updateField(token, interviewees.id, payload)
    );
    if (!dataErr) {
      yield put(appShowAlert({ isSuccess: true, text: dataRes }));
      yield call(getQuestionariesInterviewees, { payload: null });
    }
    if (dataErr) {
      console.log(dataErr);
      yield put(
        appShowAlert({
          isSuccess: false,
          text: dataErr.error || "Something went wrong! Try again later!",
        })
      );
    }
  }
}

function* sendSms({ payload }: { payload: SendSmsAction }) {
  const { token } = yield select(userSelector);
  if (token) {
    yield put(callCenterSetFetching("sms"));
    const [getRes, getErr]: [
      data: { success: string } | undefined,
      error: any | undefined
    ] = yield call(handle, CallCenter.postSms(token, payload));
    yield put(callCenterSetFetching(null));
    if (getRes) {
      yield put(appShowAlert({ isSuccess: true, text: "SMS has been sent." }));
      yield call(getSMS);
    }
    if (getErr) {
      console.log(getErr);
      yield put(
        appShowAlert({
          isSuccess: false,
          text:
            getErr.error ||
            "Please note we could not get a sent confirmation for your message please contact your SMS provider.",
        })
      );
    }
  }
}

function* GetCampaings({ payload }: { payload: number }) {
  const { token } = yield select(userSelector);
  if (token) {
    let [getRes, getErr]: [data: any | undefined, error: any | undefined] =
      yield call(handle, CallCenter.getFBCampaings(token, payload));
    if (getRes) {
      yield put(callCenterSetCampaings(getRes))
    }
    if (getErr) {
      console.log(getErr);
      const errText = getErr?.error?.error_user_msg || getErr.error || "Something went wrong! Try again later!"
      yield put(
        appShowAlert({
          isSuccess: false,
          text: errText
        })
      );
    }
  }
}

function* CreateCampaing({ payload }: { payload: CreateCampaingAction }) {
  const { token } = yield select(userSelector);
  if (token) {
    yield put(callCenterSetFetching("campaings"));
    let [getRes, getErr]: [data: any | undefined, error: any | undefined] =
      yield call(handle, CallCenter.postCampaings(token, payload));
    yield put(callCenterSetFetching(null));
    if (getRes) {
      yield put(appShowAlert({ isSuccess: true, text: "Success" }));
      yield put(callCenterGetCampaings(payload.acc_id));
    }
    if (getErr) {
      const errText = getErr?.error?.error_user_msg || getErr.error || "Something went wrong! Try again later!"
      yield put(
        appShowAlert({
          isSuccess: false,
          text: errText
        })
      );
    }
  }
}

function* GetSets({ payload }: { payload: number }) {
  const { token } = yield select(userSelector);
  if (token) {
    let [getRes, getErr]: [data: any | undefined, error: any | undefined] =
      yield call(handle, CallCenter.getFBSets(token, payload));
    if (getRes) {
      yield put(callCenterSetSets(getRes))
    }
    if (getErr) {
      const errText = getErr?.error?.error_user_msg || getErr.error || "Something went wrong! Try again later!"
      yield put(
        appShowAlert({
          isSuccess: false,
          text: errText
        })
      );
    }
  }
}

function* CreateSet({ payload }: { payload: CreateSetAction }) {
  const { token } = yield select(userSelector);
  if (token) {
    yield put(callCenterSetFetching("sets"));
    let [getRes, getErr]: [data: any | undefined, error: any | undefined] =
      yield call(handle, CallCenter.postSets(token, payload));
    yield put(callCenterSetFetching(null));
    if (getRes) {
      console.log(getRes);
      yield put(appShowAlert({ isSuccess: true, text: "Success" }));
      yield put(callCenterGetSets(payload.acc_id));
    }
    if (getErr) {
      const errText = getErr?.error?.error_user_msg || getErr.error || "Something went wrong! Try again later!"
      yield put(
        appShowAlert({
          isSuccess: false,
          text: errText
        })
      );
    }
  }
}

function* GetCreatives({ payload }: { payload: number }) {
  const { token } = yield select(userSelector);
  if (token) {
    let [getRes, getErr]: [data: any | undefined, error: any | undefined] =
      yield call(handle, CallCenter.getFBCreatives(token, payload));
    if (getRes) {
      yield put(callCenterSetCreatives(getRes))
    }
    if (getErr) {
      const errText = getErr?.error?.error_user_msg || getErr.error || "Something went wrong! Try again later!"
      yield put(
        appShowAlert({
          isSuccess: false,
          text: errText
        })
      );
    }
  }
}

function* CreateCreative({ payload }: { payload: any }) {
  const { token } = yield select(userSelector);
  if (token) {
    yield put(callCenterSetFetching("creatives"));
    let [getRes, getErr]: [data: any | undefined, error: any | undefined] =
      yield call(handle, CallCenter.postCreatives(token, payload));
    yield put(callCenterSetFetching(null));
    if (getRes) {
      yield put(appShowAlert({ isSuccess: true, text: "Success" }));
      yield put(callCenterGetCreatives(payload.get("acc_id")));
    }
    if (getErr) {
      const errText = getErr?.error?.error_user_msg || getErr.error || "Something went wrong! Try again later!"
      yield put(
        appShowAlert({
          isSuccess: false,
          text: errText
        })
      );
    }
  }
}

function* GetCustomAudiences({ payload }: { payload: number }) {
  const { token } = yield select(userSelector);
  if (token) {
    let [getRes, getErr]: [data: any | undefined, error: any | undefined] =
      yield call(handle, CallCenter.getFBAudiences(token, payload));
    if (getRes) {
      yield put(callCenterSetAudiences(getRes))
    }
    if (getErr) {
      const errText = getErr?.error?.error_user_msg || getErr.error || "Something went wrong! Try again later!"
      yield put(
        appShowAlert({
          isSuccess: false,
          text: errText
        })
      );
    }
  }
}










function* GetAds({ payload }: { payload: number }) {
  const { token } = yield select(userSelector);
  if (token) {
    let [getRes, getErr]: [data: any | undefined, error: any | undefined] =
      yield call(handle, CallCenter.getDBAds(token, payload));
    if (getRes) {
      yield put(callCenterSetAds(getRes))
    }
    if (getErr) {
      const errText = getErr?.error?.error_user_msg || getErr.error || "Something went wrong! Try again later!"
      console.log(getErr);
      yield put(
        appShowAlert({
          isSuccess: false,
          text: errText
        })
      );
    }
  }
}

function* CreateAd({ payload }: { payload: CreateAdAction }) {
  const { token } = yield select(userSelector);
  if (token) {
    let [getRes, getErr]: [data: any | undefined, error: any | undefined] =
      yield call(handle, CallCenter.postAd(token, payload));
    if (!getErr) {
      yield put(appShowAlert({ isSuccess: true, text: "Success" }));
      yield put(callCenterGetAds(payload.acc_id));
    }
    if (getErr) {
      console.log(getErr);
      const errText = getErr?.error?.error_user_msg || getErr.error || "Something went wrong! Try again later!"
      yield put(
        appShowAlert({
          isSuccess: false,
          text: errText
        })
      );
    }
  }
}

function* DeleteNode({ payload }: { payload: DeleteNodeAction }) {
  const { token } = yield select(userSelector);
  if (token) {
    yield put(callCenterSetFetching(payload.node));
    let [getRes, getErr]: [data: any | undefined, error: any | undefined] =
      yield call(handle, CallCenter.deleteFbNode(token, payload));
    yield put(callCenterSetFetching(null));
    if (getErr) {
      console.log(getErr);
      const errText = getErr?.error?.error_user_msg || getErr.error || "Something went wrong! Try again later!"
      yield put(
        appShowAlert({
          isSuccess: false,
          text: errText
        })
      );
    } else {
      yield put(appShowAlert({ isSuccess: true, text: getRes }));
    }
  }
}

function* getCampaigns(): any {
  const { token } = yield select(userSelector);
  if (token) {
    let [getRes, getErr] = yield call(
      handle,
      CallCenter.getSmsCampaigns(token)
    );
    if (getRes) {
      yield put(callCenterSetCampaigns(getRes));
    }
    if (getErr) {
      console.log(getErr);
    }
  }
}
