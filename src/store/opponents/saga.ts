import { all, call, put, select, takeEvery, takeLatest, takeLeading } from "redux-saga/effects";
import { handle } from "../../api";
import { Opponents } from "../../api/opponents";
import { appShowAlert } from "../app";
import { userSelector } from "../user";
import {
  opponentsGetGTrends,
  opponentsSetCountryFilter,
  opponentsSetData,
  opponentsSetDataFetching,
  opponentsSetDaysFilter,
  opponentsSetGTrends,
  opponentsSetGTrendsFetching,
  opponentsSetSelectedOpponents,
} from "./actions";
import { opponentsSelector } from "./hooks";
import { demoUsers, opponentsDemoGTrends } from "../../config/demoUsers";
import { IGTrends } from "./types";

export function* opponentsWatcher() {
  yield takeLatest([opponentsSetDaysFilter, opponentsSetCountryFilter, opponentsGetGTrends], getGTrends);
  yield takeEvery(opponentsSetSelectedOpponents, getOpponentData);
  yield takeEvery([opponentsSetDaysFilter, opponentsSetCountryFilter], updateAllOpponentsData);

}

function* getGTrends(): any {
  const { token, userInfo } = yield select(userSelector);
  const {daysFilter, countryFilter, searchKeywords} = yield select(opponentsSelector)
  const keywords = Object.values(searchKeywords).filter(k => k).join(',')

  if(demoUsers.includes(userInfo.login)) {
    console.log(searchKeywords)
    const gtrends: IGTrends = {}
    Object.values(searchKeywords).forEach((k: any) => {
      if(opponentsDemoGTrends.hasOwnProperty(k)) gtrends[k] = opponentsDemoGTrends[k]
    })
    yield put(opponentsSetGTrends(gtrends));
    return 
  }

  if (token && keywords) {
    yield put(opponentsSetGTrendsFetching(true))
    const [dataRes, dataErr] = yield call(
      handle,
      Opponents.getOpponentsGTrends(token, keywords, daysFilter, countryFilter)
    );
    yield put(opponentsSetGTrendsFetching(false))
    if (dataRes) {
      yield put(opponentsSetGTrends(dataRes));
    }
    if (dataErr) {
      yield put(appShowAlert({isSuccess: false, text: dataErr.error}))
      console.log(dataErr);
    }
  }
}

function* getOpponentData({payload}: {payload: any}): any { 
  const { token } = yield select(userSelector);
  const {daysFilter, countryFilter} = yield select(opponentsSelector)
  if (token && payload?.opponent?.page_id) { // Don't fetch data if no page_id it could be opponent with demo data
    yield put(opponentsSetDataFetching(true))
    const [dataRes, dataErr] = yield call(
      handle,
      Opponents.getOpponentData(token, payload.opponent.page_id, daysFilter, countryFilter)
    );
    yield put(opponentsSetDataFetching(false))
    if (dataRes) {
      yield put(opponentsSetData({data: dataRes, order: payload.order}));
    }
    if (dataErr) {
      yield put(appShowAlert({isSuccess: false, text: dataErr.error}))
      console.log(dataErr);
    }
  }
}


function* updateAllOpponentsData(): any {
  const {selectedOpponents} = yield select(opponentsSelector)
  const opponents = Object.keys(selectedOpponents)
  //Update data for every selected opponent
  yield all(opponents.map(opponentOrder => {
    const payload = {
      order: opponentOrder,
      opponent: selectedOpponents[opponentOrder]
    }
    return call(getOpponentData, {payload})
  }))
}