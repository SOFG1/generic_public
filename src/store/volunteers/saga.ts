import { call, put, select, takeLatest } from "redux-saga/effects";
import { saveAs } from "file-saver";
import { handle } from "../../api";
import { Volunteers } from "../../api/volunteers";
import { appShowAlert } from "../app";
import { userSelector } from "../user";
import {
  volunteersApplyFilters,
  volunteersAssignActivity,
  volunteersCreateActivity,
  volunteersDeleteRow,
  volunteersDownloadTable,
  volunteersGetStaticData,
  volunteersGetTable,
  volunteersRemoveRow,
  volunteersSetIsFetching,
  volunteersSetStaticData,
  volunteersSetTable,
  volunteersSetTablePage,
} from "./actions";
import { volunteersSelector } from "./hooks";
import { ItemsCountPerPage } from "./reducer";
import { TableItemType } from "./types";

export function* volunteersWatcher() {
  yield takeLatest(volunteersGetStaticData, getStaticData);
  yield takeLatest(volunteersCreateActivity, createActivity);
  yield takeLatest(volunteersAssignActivity, assignActivity);
  //Fetch table when applied fitlers or table page changed
  yield takeLatest([volunteersGetTable, volunteersApplyFilters ,volunteersSetTablePage], getTable);
  yield takeLatest(volunteersDeleteRow, deleteRow);
  yield takeLatest(volunteersDownloadTable, downloadTable);
  
}

function* getStaticData(): any {
  const { token } = yield select(userSelector);
  if (token) {
    yield put(volunteersSetIsFetching(true));
    const [dataRes, dataErr] = yield call(
      handle,
      Volunteers.getStaticData(token)
    );
    yield put(volunteersSetIsFetching(false));
    if (dataRes) {
      yield put(volunteersSetStaticData(dataRes));
    }
    if (dataErr) {
      console.log(dataErr);
    }
  }
}

function* createActivity({
  payload,
}: {
  payload: { [key: string]: string };
}): any {
  const { token } = yield select(userSelector);
  if (token) {
    yield put(volunteersSetIsFetching(true));
    const [dataRes, dataErr] = yield call(
      handle,
      Volunteers.createActivity(token, payload)
    );
    yield put(volunteersSetIsFetching(false));
    if (dataRes) {
      yield call(getStaticData)
      yield put(appShowAlert({ isSuccess: true, text: "Success" }));
    }
    if (dataErr) {
      console.log(dataErr);
      yield put(appShowAlert({ isSuccess: false, text: dataErr.error }));
    }
  }
}

function* assignActivity({
  payload,
}: {
  payload: { activity_id: number; assignees: string[] };
}): any {
  const { token } = yield select(userSelector);
  if (token) {
    yield put(volunteersSetIsFetching(true));
    const [dataRes, dataErr] = yield call(
      handle,
      Volunteers.assignActivity(token, payload.activity_id, payload.assignees)
    );
    yield put(volunteersSetIsFetching(false));
    if (!dataErr) {
      yield call(getTable)
      yield put(appShowAlert({ isSuccess: true, text: "Success" }));
    }
    if (dataErr) {
      console.log(dataErr);
      yield put(appShowAlert({ isSuccess: false, text: dataErr.error }));
    }
  }
}


function* getTable(): any {
  const {token} = yield select(userSelector)
  const {appliedFilters, tableCurrentPage} = yield select(volunteersSelector)
  if (token) {
    const offset = tableCurrentPage * ItemsCountPerPage
    yield put(volunteersSetIsFetching(true));
    const [dataRes, dataErr]: [{count: number, table: TableItemType[]} | undefined, any] = yield call(handle,Volunteers.getTable(token, appliedFilters, offset))
    yield put(volunteersSetIsFetching(false));
    if (dataRes) {
      yield put(volunteersSetTable({totalCount: dataRes.count, tableData: dataRes.table}))
    }
    if (dataErr) {
      console.log(dataErr)
    }
  }
}


function* deleteRow({payload}: {payload: number}): any {
  const {token} = yield select(userSelector)
  if (token) {
    yield put(volunteersSetIsFetching(true));
    const [dataRes, dataErr]: [{count: number, table: TableItemType[]} | undefined, any] = yield call(handle,Volunteers.deleteRow(token, payload))
    yield put(volunteersSetIsFetching(false));
    if (!dataErr) {
      yield put(appShowAlert({isSuccess: true, text: "Success!"}))
      yield put(volunteersRemoveRow(payload))
    }
    if (dataErr) {
      yield put(appShowAlert({isSuccess: false, text: dataErr.error}))
    }
  }
}


function* downloadTable(): any {
  const {token} = yield select(userSelector)
  const {appliedFilters} = yield select(volunteersSelector)
  if (token) {
    yield put(volunteersSetIsFetching(true));
    const [dataRes, dataErr] = yield call(handle,Volunteers.downloadTable(token, appliedFilters))
    yield put(volunteersSetIsFetching(false));
    if (dataRes) {
      yield put(appShowAlert({isSuccess: true, text: "We've received your request. You'll receive a notification when your file is ready. Thank you."}))
    }
    if (dataErr) {
      yield put(appShowAlert({isSuccess: false, text: dataErr.error}))
    }
  }
}