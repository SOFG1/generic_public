import {
  call,
  put,
  select,
  takeEvery,
  takeLatest,
  takeLeading,
} from "redux-saga/effects";
import { handle } from "../../api";
import {
  rawDataAddFields,
  rawDataAddFilters,
  rawDataApplyFilters,
  rawDataAddStats,
  rawDataAddTable,
  rawDataAddTableColumns,
  rawDataDownloadPivot,
  rawDataGetFields,
  rawDataGetFilters,
  rawDataGetStat,
  rawDataGetTable,
  rawDataGetTableColumns,
  rawDataResetSort,
  rawDataSelectSort,
  rawDataToggleStatsFetching,
  rawDataToggleTableFetching,
  rawDataUpdateStat,
  rawDataSummarizationReport,
  rawDataGetStatuses,
  rawDataSetStatuses,
} from "./actions";
import { RawData } from "../../api/rawData";
import { userSelector } from "../user";
import { IFields, IFilters, IRawDataStats } from "./types";
import { rawDataSelector } from "./hooks";
import { appShowAlert } from "../app";
import { demoUsers } from "../../config/demoUsers";
import { t } from "i18next";

export function* rawDataWatcher() {
  yield takeLatest(rawDataGetFilters, getFilters);
  yield takeLatest(rawDataGetFields, getFields);
  yield takeLatest([rawDataGetStat, rawDataApplyFilters], getStat);
  yield takeEvery(rawDataUpdateStat, updateStat);
  yield takeLeading(rawDataGetStatuses, getStatuses);
  yield takeLatest(rawDataGetTableColumns, getTableColumns);
  yield takeLatest(
    [
      rawDataGetTable,
      rawDataSelectSort,
      rawDataResetSort,
    ],
    getTable
  );
  yield takeLatest(rawDataDownloadPivot, downloadPivot);
  yield takeLeading(rawDataSummarizationReport, getSummarizationReport);
}

function* getFilters() {
  const { token } = yield select(userSelector);
  if (token) {
    const [dataRes, dataErr]: [
      data: IFilters[] | undefined,
      error: any | undefined
    ] = yield call(handle, RawData.getFilters(token));
    if (dataRes) {
      yield put(rawDataAddFilters(dataRes));
    }
    if (dataErr) {
      console.log(dataErr);
    }
  }
}

function* getFields() {
  const { token } = yield select(userSelector);
  if (token) {
    const [dataRes, dataErr]: [
      data: IFields[] | undefined,
      error: any | undefined
    ] = yield call(handle, RawData.getFields(token));
    if (dataRes) {
      yield put(rawDataAddFields(dataRes));
    }
    if (dataErr) {
      console.log(dataErr);
    }
  }
}

// This saga updates stats data according to fitlers
function* updateStat(): any {
  const { token } = yield select(userSelector);
  const { appliedFilters } = yield select(rawDataSelector);
  const filtersCopy = { ...appliedFilters };
  //We don't need keywords when update stats
  delete filtersCopy.keywords;
  if (token) {
    yield put(rawDataToggleStatsFetching(true));
    const [dataRes, dataErr] = yield call(
      handle,
      RawData.updateStat(token, filtersCopy)
    );
    yield put(rawDataToggleStatsFetching(false));
    if (dataRes) {
      yield put(rawDataAddStats(dataRes));
    }
    if (dataErr) {
      console.log(dataErr);
    }
  }
}

//this saga fetches cached stats data for empty filters
function* getStat() {
  const { token } = yield select(userSelector);
  const { appliedFilters } = yield select(rawDataSelector);
  //Convert not null fields
  if (token) {
    yield put(rawDataToggleStatsFetching(true));
    const [dataRes, dataErr]: [
      data: IRawDataStats | undefined,
      error: any | undefined
    ] = yield call(handle, RawData.getStat(token, appliedFilters));
    yield put(rawDataToggleStatsFetching(false));
    if (dataRes) {
      yield put(rawDataAddStats(dataRes));
    }
    if (dataErr) {
      console.log(dataErr);
    }
  }
}

function* getTableColumns(): any {
  const { token } = yield select(userSelector);
  if (token) {
    const [dataRes, dataErr] = yield call(handle, RawData.getTableColumns(token));
    if (dataRes) {
      const status = dataRes?.find((c: any) => c?.slug === "status")
      const filtered = dataRes.filter((c: any) => c?.slug !== "status")
      //Place status in 2nd place
      if(status) {
        filtered.unshift(status)
      //  filtered.splice(1, 0, status)
      }
      console.log(filtered.length)
      console.log(dataRes.length)

      yield put(rawDataAddTableColumns(filtered));
    }
    if (dataErr) {
      console.log(dataErr);
    }
  }
}

function* getStatuses(): any {
  const { token } = yield select(userSelector);
  if (token) {
    const [dataRes, dataErr] = yield call(handle, RawData.getStatuses(token));
    if (dataRes) {
      yield put(rawDataSetStatuses(dataRes))
    }
    if (dataErr) {
      console.log(dataErr);
    }
  }
}

function* getTable(): any {
  const { token, userInfo } = yield select(userSelector);
  const { currentPage, limit, sortBy, appliedFilters } = yield select(
    rawDataSelector
  );
  //Convert not null fields
  const params = {
    ...appliedFilters,
    limit: limit,
    offset: currentPage * limit,
  };
  if (params.not_null) params.not_null = params.not_null.join(",");
  if (token) {
    yield put(rawDataToggleTableFetching(true));
    if (sortBy.slug && sortBy.direction) {
      params.order_by = `${sortBy.slug} ${sortBy.direction}`;
    }
    const [dataRes, dataErr] = yield call(
      handle,
      RawData.getTable(token, params)
    );
    yield put(rawDataToggleTableFetching(false));
    if (dataRes) {
      let { table, count } = dataRes;
      if(demoUsers.includes(userInfo.login)) count = 255546
      yield put(rawDataAddTable({ columns: table, count }));
    }
    if (dataErr) {
      console.log(dataErr);
    }
  }
}





function* downloadPivot(): any {
  const { token } = yield select(userSelector);
  const { appliedFilters } = yield select(rawDataSelector);
  //Convert not null fields
  const params = {
    ...appliedFilters,
  };
  if (params.not_null) params.not_null = params.not_null.join(",");
  if (token) {
    const [dataRes, dataErr] = yield call(
      handle,
      RawData.downloadPivot(token, params)
    );
    if (!dataErr) {
      const text =
        "We've received your request. You'll receive a notification when your file is ready. Thank you.";
      yield put(
        appShowAlert({
          isSuccess: true,
          text,
        })
      );
    }
    if (dataErr) {
      const text = dataErr.error || "Error occured"
      yield put(appShowAlert({isSuccess: false, text}))
    }
  }
}



function* getSummarizationReport(): any {
  const { token } = yield select(userSelector);
  if (token) {
    const [dataRes, dataErr] = yield call(handle, RawData.getSummarizationReport(token));
    if (!dataErr) {
      yield put(appShowAlert({isSuccess: true, text: t("raw-data_summarization-success")}))
    }
    if (dataErr) {
      yield put(appShowAlert({isSuccess: false, text: dataErr.error}))
    }
  }
}
