import { call, put, select, takeLatest } from "redux-saga/effects";
import { handle } from "../../api";
import { Election } from "../../api/election";
import { userSelector } from "../user";
import {
  electionGetKpi,
  electionGetFilters,
  electionSetFilters,
  electionGetVotingRate,
  electionSetKpi,
  electionSetVotingRate,
  electionGetTable,
  electionSetTable,
  setIsFetchingKPI,
  setIsFetchingRate,
  setIsFetchingTable,
  electionSetPagesCount,
  electionGetMap,
  electionSetMap,
  electionGetGenderStat,
  electionSetGenderStat,
  electionSetTableSort,
  electionResetTableSort
} from "./actions";
import { electionSelector } from "./hooks";
import { IFilters, IKPI, ITableCity, IVotingRate } from "./types";
import { demoElectionKPI, demoElectionMapPoints, demoElectionTable, demoElectionVotingRate, demoUsers, electionDemoGender } from "../../config/demoUsers";
import { electionTableItemsPerPage } from "./reducer";

export function* electionWatcher() {
  yield takeLatest(electionGetFilters, getFilters);
  yield takeLatest(electionGetKpi, getKpi);
  yield takeLatest(electionGetGenderStat, getAgeStat);
  yield takeLatest(electionGetVotingRate, getVotingRate);
  yield takeLatest([electionGetTable, electionSetTableSort, electionResetTableSort], getTable);
  yield takeLatest(electionGetMap, getMap);
}

function* getFilters(): any {
  const { token } = yield select(userSelector);
  if (token) {
    const [dataRes, dataErr]: [IFilters, any] = yield call(
      handle,
      Election.getFilters(token)
    );
    if (dataRes) {
      yield put(electionSetFilters(dataRes));
    }
    if (dataErr) {
      console.log(dataErr);
    }
  }
}

function* getKpi(): any {
  const { token, userInfo } = yield select(userSelector);
  const { filterCity } = yield select(electionSelector);
  if(demoUsers.includes(userInfo.login)) {
    yield put(electionSetKpi(demoElectionKPI));
    return
  }
  if (token) {
    yield put(setIsFetchingKPI(true))
    const [dataRes, dataErr]: [IKPI, any] = yield call(
      handle,
      Election.getKpi(token, filterCity)
    );
    yield put(setIsFetchingKPI(false))
    if (dataRes) {
      yield put(electionSetKpi(dataRes));
    }
    if (dataErr) {
      console.log(dataErr);
    }
  }
} 

function* getVotingRate(): any {
  const { token, userInfo } = yield select(userSelector);
  const { filterCity } = yield select(electionSelector);
  if(demoUsers.includes(userInfo.login)) {
    yield put(electionSetVotingRate(demoElectionVotingRate));
    return
  }
  if (token) {
    yield put(setIsFetchingRate(true))
    const [dataRes, dataErr]: [IVotingRate, any] = yield call(
      handle,
      Election.getVotingRate(token, filterCity)
    );
    yield put(setIsFetchingRate(false))
    if (dataRes) {
      yield put(electionSetVotingRate(dataRes));
    }
    if (dataErr) {
      console.log(dataErr);
    }
  }
}

function* getTable(): any {
  const { token, userInfo } = yield select(userSelector);
  if(demoUsers.includes(userInfo.login)) {
    yield put(electionSetPagesCount(demoElectionTable.count))
    yield put(electionSetTable(demoElectionTable.table))
    return
  }
  const { tableSortBy, currentPage } = yield select(electionSelector);
  const params: { offset: number, city?: string; order_by?: string } = { offset: currentPage * electionTableItemsPerPage };
  if (tableSortBy.sortedTitle && tableSortBy.direction) params.order_by = `"${tableSortBy.sortedTitle}" ${tableSortBy.direction}`
  // if (filterCity) params.city = filterCity;
  if (token) {
    yield put(setIsFetchingTable(true))
    const [dataRes, dataErr]: [{ table: ITableCity[], count: number }, any] = yield call(
      handle,
      Election.getTable(token, params)
    );
    yield put(setIsFetchingTable(false))
    if (dataRes) {
      yield put(electionSetPagesCount(dataRes.count))
      yield put(electionSetTable(dataRes.table))
    }
    if (dataErr) {
      console.log(dataErr);
    }
  }
}


function* getMap() {
  const { token, userInfo } = yield select(userSelector)
  if (demoUsers.includes(userInfo.login)) { 
    yield put(electionSetMap(demoElectionMapPoints))
    return
  }
  if (token) {
    const [dataRes, dataErr]: [any, any] = yield call(
      handle,
      Election.getMap(token)
    );
    if (dataRes) {
      console.log(dataRes)
      yield put(electionSetMap(dataRes))
    }
    if (dataErr) {
      console.log(dataErr);
    }
  }
}


function* getAgeStat() {
  const { token, userInfo } = yield select(userSelector);
  const { filterCity } = yield select(electionSelector);
  if(demoUsers.includes(userInfo.login)) {
    yield put(electionSetGenderStat(electionDemoGender));
    return
  }
  if (token) {
    yield put(setIsFetchingKPI(true))
    const [dataRes, dataErr]: [any[], any] = yield call(
      handle,
      Election.getGenderStat(token, filterCity)
    );
    yield put(setIsFetchingKPI(false))
    if (dataRes) {
      yield put(electionSetGenderStat(dataRes))
    }
    if (dataErr) {
      console.log(dataErr);
    }
  }
}