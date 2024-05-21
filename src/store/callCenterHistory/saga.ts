import {
  all,
  call,
  put,
  select,
  takeEvery,
  takeLatest,
  takeLeading,
} from "redux-saga/effects";
import {
  callCenterHistoryAddFilters,
  callCenterHistoryGetFilters,
  callCenterHistoryGetOutgoingSms,
  callCenterHistorySetOutgoingSms,
  callCenterHistoryGetIncomingSms,
  callCenterHistorySetIncomingSms,
  callCenterHistoryGetEmails,
  callCenterHistorySetEmails,
  callCenterHistoryDownloadIncomingSms,
  callCenterHistoryDownloadOutgoingSms,
  callCenterHistoryDownloadEmails,
  callCenterHistorySetInterviewers,
  callCenterHistoryGetQuestionaries,
  callCenterHistoryDownloadQuestionaries,
  callCenterHistorySetQuestionaries,
  callCenterHistorySetOutgoingFetching,
  callCenterHistorySetIncomingFetching,
  callCenterHistorySetEmailsFetching,
  callCenterHistorySetQuestionariesFetching,
  callCenterHistorySetActivityFilters,
  callCenterHistorySetActivities,
  callCenterHistorySetActivityFetching,
  callCenterHistoryDownloadActivities,
  callCenterHistorySetActivityPage,
  callCenterHistorySetActivitySorting,
  reportsGetVoterQuests,
  reportsSetVoterQuests,
  reportsSetVoterQuestsFetching,
  callCenterHistoryDownloadVoter,
} from "./actions";
import { userSelector } from "../user";
import {
  IActivityFilters,
  ICallCenterHistoryFilter,
  ICallCenterHistoryFilters,
  IQuestionarieFilter,
} from "./types";
import { handle } from "../../api";
import { CallCenterHistory } from "../../api/callCenterHistory";
import { callCenterHistorySelector } from "./hooks";
import { appShowAlert } from "../app";
import {
  activitiesCountPerPage,
  emailsCountPerPage,
  incomingSmsCountPerPage,
  outgoingSmsCountPerPage,
  questionariesCountPerPage,
} from "./reducer";

export function* callCenterHistoryWatcher() {
  yield takeEvery(callCenterHistoryGetFilters, getFilters);
  yield takeEvery(callCenterHistoryGetFilters, getQuestionarieFilters);
  yield takeLatest(callCenterHistoryGetOutgoingSms, getOutgoingSms);
  yield takeLatest(callCenterHistoryGetIncomingSms, getIncomingSms);
  yield takeLatest(callCenterHistoryGetEmails, getEmails);
  yield takeLatest(callCenterHistoryDownloadIncomingSms, downloadIncomingSms);
  yield takeLatest(callCenterHistoryDownloadOutgoingSms, downloadOutgoingSms);
  yield takeLatest(callCenterHistoryDownloadEmails, downloadEmails);
  yield takeLatest(
    callCenterHistoryDownloadQuestionaries,
    downloadQuestionaries
  );
  yield takeLeading(callCenterHistoryGetQuestionaries, getQuestionaries);
  yield takeLeading(reportsGetVoterQuests, getVoterQuests);
  yield takeLeading(callCenterHistoryDownloadVoter, downloadVoter);

  
  yield takeEvery(
    [
      callCenterHistorySetActivityFilters,
      callCenterHistorySetActivityPage,
      callCenterHistorySetActivitySorting,
    ],
    getActivity
  );
  yield takeLatest(callCenterHistoryDownloadActivities, downloadActivity);
}

function* getFilters() {
  const { token } = yield select(userSelector);
  if (token) {
    const [getRes, getErr]: [
      data: ICallCenterHistoryFilters | undefined,
      error: any | undefined
    ] = yield call(handle, CallCenterHistory.getFilters(token));
    if (getRes) {
      yield put(callCenterHistoryAddFilters(getRes));
    }
    if (getErr) {
      yield put(
        appShowAlert({
          isSuccess: false,
          text: getErr.error || "Error occured",
        })
      );
      console.log(getErr);
    }
  }
}

function* getQuestionarieFilters() {
  const { token } = yield select(userSelector);
  if (token) {
    const [dataRes, dataErr]: [any, any] = yield call(
      handle,
      CallCenterHistory.getQuestionarieFilters(token, false)
    );
    if (dataRes) {
      yield put(callCenterHistorySetInterviewers(dataRes.interviewier));
    }
    if (dataErr) {
      yield put(
        appShowAlert({
          isSuccess: false,
          text: dataErr.error || "Error occured",
        })
      );
    }
  }
}

function* getOutgoingSms(action: {
  type: string;
  payload: ICallCenterHistoryFilter;
}): any {
  const { token } = yield select(userSelector);
  const { smsOutgoing } = yield select(callCenterHistorySelector);
  const offset = smsOutgoing.currentPage * outgoingSmsCountPerPage;
  const order_by = smsOutgoing.sorting;
  if (token) {
    yield put(callCenterHistorySetOutgoingFetching(true));
    const [getRes, getErr] = yield call(
      handle,
      CallCenterHistory.getOutgoingSms(token, {
        ...action.payload,
        offset,
        order_by,
      })
    );
    yield put(callCenterHistorySetOutgoingFetching(false));
    if (getRes) {
      yield put(callCenterHistorySetOutgoingSms(getRes));
    }
    if (getErr) {
      yield put(
        appShowAlert({
          isSuccess: false,
          text: getErr.error || "Error occured",
        })
      );
      console.log(getErr);
    }
  }
}

function* getIncomingSms(action: {
  type: string;
  payload: ICallCenterHistoryFilter;
}) {
  const { token } = yield select(userSelector);
  const { smsIncoming } = yield select(callCenterHistorySelector);
  const offset = smsIncoming.currentPage * incomingSmsCountPerPage;
  const order_by = smsIncoming.sorting;
  if (token) {
    yield put(callCenterHistorySetIncomingFetching(true));
    const [getRes, getErr]: [data: any | undefined, error: any | undefined] =
      yield call(
        handle,
        CallCenterHistory.getIncomingSms(token, {
          ...action.payload,
          offset,
          order_by,
        })
      );
    yield put(callCenterHistorySetIncomingFetching(false));
    if (getRes) {
      yield put(callCenterHistorySetIncomingSms(getRes));
    }
    if (getErr) {
      console.log(getErr);
      yield put(
        appShowAlert({
          isSuccess: false,
          text: getErr.error || "Error occured",
        })
      );
    }
  }
}

function* getEmails(action: { type: string; payload: any }) {
  const { token } = yield select(userSelector);
  const { emails } = yield select(callCenterHistorySelector);
  const offset = emails.currentPage * emailsCountPerPage;
  const order_by = emails.sorting;
  if (token) {
    yield put(callCenterHistorySetEmailsFetching(true));
    const [getRes, getErr]: [data: any | undefined, error: any | undefined] =
      yield call(
        handle,
        CallCenterHistory.getEmails(token, {
          ...action.payload,
          offset,
          order_by,
        })
      );
    yield put(callCenterHistorySetEmailsFetching(false));
    if (getRes) {
      yield put(callCenterHistorySetEmails(getRes));
    }
    if (getErr) {
      console.log(getErr);
      yield put(
        appShowAlert({
          isSuccess: false,
          text: getErr.error || "Error occured",
        })
      );
    }
  }
}

function* downloadIncomingSms(action: {
  type: string;
  payload: ICallCenterHistoryFilter;
}) {
  const { token } = yield select(userSelector);
  if (token) {
    yield put(callCenterHistorySetIncomingFetching(true));
    const [getRes, getErr]: [data: any | undefined, error: any | undefined] =
      yield call(
        handle,
        CallCenterHistory.downloadIncomingSms(token, action.payload)
      );
    yield put(callCenterHistorySetIncomingFetching(false));
    if (!getErr) {
      const text =
        "We've received your request. You'll receive a notification when your file is ready. Thank you.";
      yield put(appShowAlert({ isSuccess: true, text }));
    }
    if (getErr) {
      console.log(getErr);
    }
  }
}

function* downloadOutgoingSms(action: {
  type: string;
  payload: ICallCenterHistoryFilter;
}) {
  const { token } = yield select(userSelector);
  if (token) {
    yield put(callCenterHistorySetOutgoingFetching(true));
    const [getRes, getErr]: [data: any | undefined, error: any | undefined] =
      yield call(
        handle,
        CallCenterHistory.downloadOutgoingSms(token, action.payload)
      );
    yield put(callCenterHistorySetOutgoingFetching(false));
    if (!getErr) {
      const text =
        "We've received your request. You'll receive a notification when your file is ready. Thank you.";
      yield put(appShowAlert({ isSuccess: true, text }));
    }
    if (getErr) {
      console.log(getErr);
    }
  }
}

function* downloadEmails(action: { type: string; payload: any }) {
  const { token } = yield select(userSelector);
  if (token) {
    yield put(callCenterHistorySetEmailsFetching(true));
    const [getRes, getErr]: [data: any | undefined, error: any | undefined] =
      yield call(
        handle,
        CallCenterHistory.downloadEmails(token, action.payload)
      );
    yield put(callCenterHistorySetEmailsFetching(false));
    if (!getErr) {
      const text =
        "We've received your request. You'll receive a notification when your file is ready. Thank you.";
      yield put(appShowAlert({ isSuccess: true, text }));
    }
    if (getErr) {
      console.log(getErr);
    }
  }
}

function* downloadQuestionaries({
  payload,
}: {
  payload: IQuestionarieFilter;
}): any {
  const { token } = yield select(userSelector);
  if (token) {
    yield put(callCenterHistorySetQuestionariesFetching(true));
    const [getRes, getErr]: [data: any | undefined, error: any | undefined] =
      yield call(
        handle,
        CallCenterHistory.downloadQuestionaries(token, payload, false)
      );
    yield put(callCenterHistorySetQuestionariesFetching(false));
    if (!getErr) {
      const text =
        "We've received your request. You'll receive a notification when your file is ready. Thank you.";
      yield put(appShowAlert({ isSuccess: true, text }));
    }
    if (getErr) {
      console.log(getErr);
    }
  }
}

function* getQuestionaries({ payload }: { payload: IQuestionarieFilter }): any {
  const { token } = yield select(userSelector);
  const { questionaries } = yield select(callCenterHistorySelector);
  const offset = questionaries.currentPage * questionariesCountPerPage;
  const order_by = questionaries.sorting;
  if (token) {
    yield put(callCenterHistorySetQuestionariesFetching(true));
    const [dataRes, dataErr] = yield call(
      handle,
      CallCenterHistory.getQuestionariesHistory(token, {
        ...payload,
        offset,
        order_by,
      }, false)
    );
    yield put(callCenterHistorySetQuestionariesFetching(false));
    if (dataRes) {
      yield put(
        callCenterHistorySetQuestionaries({
          table: dataRes.data,
          count: dataRes.count,
        })
      );
    }
    if (dataErr) {
      console.log(dataErr);
    }
  }
}



function* getVoterQuests({ payload }: { payload: IQuestionarieFilter }): any {
  const { token } = yield select(userSelector);
  const { voterQuests } = yield select(callCenterHistorySelector);
  const offset = voterQuests.currentPage * questionariesCountPerPage;
  const order_by = voterQuests.sorting;
  if (token) {
    yield put(reportsSetVoterQuestsFetching(true));
    const [dataRes, dataErr] = yield call(
      handle,
      CallCenterHistory.getQuestionariesHistory(token, {
        ...payload,
        offset,
        order_by,
      }, true)
    );
    yield put(reportsSetVoterQuestsFetching(false));
    if (dataRes) {
      yield put(
        reportsSetVoterQuests({
          table: dataRes.data,
          count: dataRes.count,
        })
      );
    }
    if (dataErr) {
      console.log(dataErr);
    }
  }
}


function* downloadVoter({
  payload,
}: {
  payload: IQuestionarieFilter;
}): any {
  const { token } = yield select(userSelector);
  if (token) {
    yield put(reportsSetVoterQuestsFetching(true));
    const [getRes, getErr]: [data: any | undefined, error: any | undefined] =
      yield call(
        handle,
        CallCenterHistory.downloadQuestionaries(token, payload, true)
      );
    yield put(reportsSetVoterQuestsFetching(false));
    if (!getErr) {
      const text =
        "We've received your request. You'll receive a notification when your file is ready. Thank you.";
      yield put(appShowAlert({ isSuccess: true, text }));
    }
    if (getErr) {
      console.log(getErr);
    }
  }
}

function* getActivity(): any {
  const { token } = yield select(userSelector);
  const { activityFilters, activities } = yield select(
    callCenterHistorySelector
  );
  const offset = activities.currentPage * activitiesCountPerPage;
  const order_by = activities.sorting;
  if (token) {
    yield put(callCenterHistorySetActivityFetching(true));
    const [dataRes, dataErr] = yield call(
      handle,
      CallCenterHistory.getActivityHistory(
        token,
        offset,
        order_by,
        activityFilters
      )
    );
    yield put(callCenterHistorySetActivityFetching(false));
    if (dataRes) {
      yield put(
        callCenterHistorySetActivities({
          count: dataRes.count,
          table: dataRes.data,
        })
      );
    }
    if (dataErr) {
      console.log(dataErr);
    }
  }
  console.log("saga");
}

function* downloadActivity(): any {
  const { token } = yield select(userSelector);
  const { activityFilters, activities } = yield select(
    callCenterHistorySelector
  );
  const offset = activities.currentPage * activitiesCountPerPage;
  const order_by = activities.sorting;
  if (token) {
    yield put(callCenterHistorySetActivityFetching(true));
    const [dataRes, dataErr] = yield call(
      handle,
      CallCenterHistory.downloadActivityHistory(
        token,
        offset,
        order_by,
        activityFilters
      )
    );
    yield put(callCenterHistorySetActivityFetching(false));
    if (!dataErr) {
      const text =
        "We've received your request. You'll receive a notification when your file is ready. Thank you.";
      yield put(appShowAlert({ isSuccess: true, text }));
    }
    if (dataErr) {
      console.log(dataErr);
    }
  }
}
