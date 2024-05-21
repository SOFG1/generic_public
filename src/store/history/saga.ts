import { call, put, select, takeLatest } from "redux-saga/effects";
import { handle } from "../../api";
import { History } from "../../api/history";
import { appShowAlert } from "../app";
import { userSelector } from "../user";
import {
  historyApplyFilters,
  historySetActions,
  historySetNumberOfActions,
  historyDownloadActions,
  historySetSorting,
  historySetPage,
} from "./actions";
import { historySelector } from "./hooks";
import { itemsPerPageHistory } from "./reducer";

export function* historyWatcher() {
  yield takeLatest([historyApplyFilters, historySetSorting, historySetPage], getActions);
  yield takeLatest(historyDownloadActions, downloadActions);
}

function* getActions(): any {
  const { token } = yield select(userSelector);
  const { sorting, filters, currentPage } = yield select(historySelector);
  const params = {... filters}
  if(sorting) params.order_by = sorting
  params.offset = itemsPerPageHistory * currentPage
  if (token) {
    const [dataRes, dataErr]: [data: any | undefined, error: any | undefined] =
      yield call(handle, History.getActions(token, params));
    if (dataRes) {
      yield put(historySetActions(dataRes.table));
      yield put(historySetNumberOfActions(dataRes.count));
    }
    if (dataErr) {
      console.log(dataErr);
    }
  }
}

function* downloadActions() {
  const { token } = yield select(userSelector);
  const { filters } = yield select(historySelector);
  if (token) {
    const [dataRes, dataErr]: [data: any | undefined, error: any | undefined] =
      yield call(handle, History.downoladActions(token, filters));
    if (!dataErr) {
      yield put(
        appShowAlert({
          isSuccess: true,
          text: "We've received your request. You'll receive a notification when your file is ready. Thank you.",
        })
      );
    }
    if (dataErr) {
      console.log(dataErr);
    }
  }
}
