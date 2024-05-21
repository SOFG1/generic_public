import {
  call,
  put,
  select,
  takeEvery,
  takeLatest,
  takeLeading,
} from "redux-saga/effects";
import {
  smStatsAddPages,
  smStatsAddPreviewPost,
  smStatsGetPages,
  smStatsGetPreviewPost,
  smStatsToggleStatsFetching,
  smStatsSetDaysFilter,
  smStatsSetPageFilter,
  smStatsGetPostViews,
  smStatsSetPostViews,
  smStatsGetSmStats,
  smStatsSetSmStats,
  smStatsGetPostList,
  smStatsSetPostList,
  smStatsGetMapPoints,
  smStatsSetMapPoints,
  smStatsGetMapLevel,
  smStatsSetMapLevel,
  smStatsSetGroupsFilter,
  smStatsGetOfflineScore,
  smStatsSetOfflineScore,
} from "./actions";
import { handle } from "../../api";
import { userSelector } from "../user";
import { SmStats } from "../../api/smStats";
import { smStatsSelector } from "./hooks";
import { replacePagesNames } from "../../utils/replacePagesNames";
import { replaceChartNames } from "../../utils/replaceChartNames";
import { appShowAlert } from "../app";
import { demoHighlightsData, demoMapLevelStats, demoMapPointsStats, getDemoStatsChartData, demoPostPreview1, demoUsers } from "../../config/demoUsers";

export function* smStatsWatcher() {
  yield takeLeading([smStatsGetPages, smStatsSetGroupsFilter], getPages);
  yield takeEvery(smStatsGetPreviewPost, getPreviewPost);
  yield takeEvery(
    [smStatsGetSmStats, smStatsSetPageFilter, smStatsSetDaysFilter, smStatsSetGroupsFilter],
    getSmStats
  );
  yield takeEvery(
    [smStatsGetPostList, smStatsSetPageFilter],
    getPostList
  );
  yield takeEvery(
    [smStatsGetMapPoints, smStatsSetPageFilter, smStatsSetDaysFilter, smStatsSetGroupsFilter],
    getMapPoints
  );
  yield takeEvery(
    [smStatsGetMapLevel, smStatsSetPageFilter, smStatsSetDaysFilter, smStatsSetGroupsFilter],
    getMapLevel
  );
  yield takeEvery(
    [smStatsGetPostViews, smStatsSetPageFilter, smStatsSetDaysFilter, smStatsSetGroupsFilter],
    getPostViews
  );
  yield takeEvery(
    [smStatsGetOfflineScore, smStatsSetPageFilter, smStatsSetDaysFilter, smStatsSetGroupsFilter],
    getOfflineScore
  );

}

function* getSmStats(): any {
  const { token, userInfo } = yield select(userSelector);
  const { daysFilter, pageFilter, groupsFilter } = yield select(smStatsSelector);
  const filterData: { [key: string]: number | string } = {};
  if (pageFilter) filterData["pages"] = pageFilter;
  if (daysFilter) filterData["days"] = daysFilter;
  if (groupsFilter) filterData["group_ids"] = daysFilter;
  if(demoUsers.includes(userInfo.login)) {
    yield put(smStatsSetSmStats(demoHighlightsData));
    return
  }
  if (token) {
    yield put(smStatsToggleStatsFetching(true));
    const [dataRes, dataErr] = yield call(
      handle,
      SmStats.smStats(token, filterData)
    );
    yield put(smStatsToggleStatsFetching(false));
    if (dataRes) {
      yield put(smStatsSetSmStats(dataRes));
    }
    if (dataErr) {
      yield put(appShowAlert({ isSuccess: false, text: dataErr.error }));
    }
  }
}

function* getPostList(): any {
  const { token } = yield select(userSelector);
  const { pageFilter, groupsFilter } = yield select(smStatsSelector);
  if (token) {
    const filters: any = {}
    if(pageFilter) filters.pages = pageFilter
    if(groupsFilter) filters.group_ids = pageFilter
    yield put(smStatsToggleStatsFetching(true));
    const [dataRes, dataErr] = yield call(
      handle,
      SmStats.postList(token, filters)
    );
    yield put(smStatsToggleStatsFetching(false));
    if (dataRes) {
      yield put(smStatsSetPostList(dataRes))
    }
    if (dataErr) {
      yield put(appShowAlert({ isSuccess: false, text: dataErr.error }));
    }
  }
}


function* getMapPoints(): any {
  const { token, userInfo } = yield select(userSelector);
  const { daysFilter, pageFilter, groupsFilter } = yield select(smStatsSelector);
  const filterData: { [key: string]: number | string } = {};
  if (pageFilter) filterData["pages"] = pageFilter;
  if (daysFilter) filterData["days"] = daysFilter;
  if (groupsFilter) filterData["group_ids"] = daysFilter;
  //hardcode static data for demo users
  if(demoUsers.includes(userInfo.login)) {
    yield put(smStatsSetMapPoints(demoMapPointsStats))
    return
  }
  if (token) {
    yield put(smStatsToggleStatsFetching(true));
    const [dataRes, dataErr] = yield call(
      handle,
      SmStats.mapPoints(token, filterData)
    );
    yield put(smStatsToggleStatsFetching(false));
    if (dataRes) {
      yield put(smStatsSetMapPoints(dataRes))
    }
    if (dataErr) {
      yield put(appShowAlert({ isSuccess: false, text: dataErr.error }));
    }
  }
}

function* getMapLevel(): any {
  const { token, userInfo } = yield select(userSelector);
  const { daysFilter, pageFilter, groupsFilter } = yield select(smStatsSelector);
  const filterData: { [key: string]: number | string } = {};
  if (pageFilter) filterData["pages"] = pageFilter;
  if (daysFilter) filterData["days"] = daysFilter;
  if (groupsFilter) filterData["group_ids"] = daysFilter;
  if (token) {
    if(demoUsers.includes(userInfo.login)) {
      yield put(smStatsSetMapLevel(demoMapLevelStats))
      return
    }
    yield put(smStatsToggleStatsFetching(true));
    const [dataRes, dataErr] = yield call(
      handle,
      SmStats.mapLevel(token, filterData)
    );
    yield put(smStatsToggleStatsFetching(false));
    if (dataRes) {
      yield put(smStatsSetMapLevel(dataRes))
    }
    if (dataErr) {
      yield put(appShowAlert({ isSuccess: false, text: dataErr.error }));
    }
  }
}

function* getPages() {
  const { token, userInfo } = yield select(userSelector);
  const { groupsFilter } = yield select(smStatsSelector);
  if (token && userInfo.login) {
    const [dataRes, dataErr]: [data: any | undefined, error: any | undefined] =
      yield call(handle, SmStats.pages(token, groupsFilter));
    if (dataRes) {
      const modified = replacePagesNames(userInfo?.login || "", dataRes);
      yield put(smStatsAddPages(modified));
    }
    if (dataErr) {
      console.log(dataErr);
    }
  }
}

function* getPreviewPost({ payload }: { payload: string }) {
  const { token } = yield select(userSelector);
  try {
    if (token && payload !== "") {
      const [dataRes, dataErr]: [
        data: any | undefined,
        error: any | undefined
      ] = yield call(handle, SmStats.postPreview(payload, token));
      if (dataRes !== undefined) {
        yield put(smStatsAddPreviewPost(dataRes[0] || null));
      }
      if (dataErr) {
        console.log(dataErr);
      }
    }
  } catch (e: any) {
    console.log(e);
  }
}

function* getPostViews(): any {
  const { token, userInfo } = yield select(userSelector);
  const { daysFilter, pageFilter, groupsFilter } = yield select(smStatsSelector);
  if(demoUsers.includes(userInfo.login)) {
    const statsDemoChartData = getDemoStatsChartData()
    yield put(smStatsSetPostViews(statsDemoChartData));
    yield put(smStatsAddPreviewPost(demoPostPreview1)); // Also add demo post preview
    return
  }
  if (token) {
    const filterData: { [key: string]: number | string } = {};
    if (pageFilter) filterData.pages = pageFilter;
    if (daysFilter) filterData.days = daysFilter;
    if (groupsFilter) filterData.group_ids = daysFilter;
    yield put(smStatsToggleStatsFetching(true));
    const [dataRes, dataErr] = yield call(
      handle,
      SmStats.postViews(token, filterData)
    );
    if (dataRes) {
      const modified = replaceChartNames(userInfo.login, dataRes);
      yield put(smStatsSetPostViews(modified));
    }
    if (dataErr) {
      console.log(dataErr);
    }
  }
}



function* getOfflineScore(): any {
  const { token, userInfo } = yield select(userSelector);
  const { daysFilter, pageFilter, groupsFilter } = yield select(smStatsSelector);
  if (token) {
    const filterData: { [key: string]: number | string } = {};
    if (pageFilter) filterData.pages = pageFilter;
    if (daysFilter) filterData.days = daysFilter;
    if (groupsFilter) filterData.group_ids = daysFilter;
    yield put(smStatsToggleStatsFetching(true));
    const [dataRes, dataErr] = yield call(
      handle,
      SmStats.getOfflineScore(token, filterData)
    );
    if (dataRes) {
      yield put(smStatsSetOfflineScore(dataRes.offline_score || 0))
    }
    if (dataErr) {
      console.log(dataErr);
    }
  }
}
