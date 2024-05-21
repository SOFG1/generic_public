import {
  call,
  debounce,
  put,
  select,
  takeLatest,
  takeLeading,
} from "redux-saga/effects";
import { handle } from "../../api";
import { Relations } from "../../api/relations";
import { appShowAlert } from "../app";
import {
  relationsAppendKeyword,
  relationsCreateKeyword,
  relationsDeleteKeyword,
  relationsGetKeywords,
  relationsRemoveKeyword,
  relationsSetDateFilter,
  relationsSetIsFetching,
  relationsSetIsFetchingKeywords,
  relationsSetKeywords,
  relationsSetPersons,
  relationsSetPosts,
  relationsSetRelations,
  relationsSetSelectedPost,
  relationsSetSelectedPostPersons,
  relationsSetSelectedPostRelations,
  relationsSetKeywordFilter,
  relationsGetTags,
  relationsSetTags,
} from "./actions";
import {
  relationsDateFilterSelector,
  relationsKeywordFilterSelector,
} from "./selectors";
import { IRelationPost } from "./types";
import { userSelector } from "../user";

export function* relationsWatcher() {
  yield debounce(
    300,
    [relationsSetKeywordFilter, relationsSetDateFilter],
    getData
  );
  yield takeLeading(relationsGetTags, getTags);
  yield takeLatest(relationsSetSelectedPost, getPostData);
  yield takeLeading(relationsGetKeywords, getKeywords);
  yield takeLeading(relationsCreateKeyword, createKeyword);
  yield takeLeading(relationsDeleteKeyword, deleteKeyword);
}

function* getTags(): any {
  yield put(relationsSetIsFetching(true));
  const [dataRes, dataErr] = yield call(handle, Relations.getTags());
  yield put(relationsSetIsFetching(false));
  if (dataRes) {
    yield put(relationsSetTags(dataRes));
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

function* getData(): any {
  const keywordFilter = yield select(relationsKeywordFilterSelector);
  const dateFilter = yield select(relationsDateFilterSelector);
  if (keywordFilter) {
    yield put(relationsSetIsFetching(true));
    const [dataRes, dataErr] = yield call(
      handle,
      Relations.getGraphData({ keyword: keywordFilter, date: dateFilter })
    );
    yield put(relationsSetIsFetching(false));
    if (dataRes) {
      yield put(relationsSetPosts(dataRes.posts));
      yield put(relationsSetPersons(dataRes.persons));
      yield put(relationsSetRelations(dataRes.relations));
      yield put(relationsSetSelectedPostRelations([]));
      yield put(relationsSetSelectedPostPersons([]));
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

function* getPostData({ payload }: { payload: IRelationPost | null }): any {
  if (payload) {
    yield put(relationsSetIsFetching(true));
    const [dataRes, dataErr] = yield call(
      handle,
      Relations.getPostData(payload.elementId)
    );
    yield put(relationsSetIsFetching(false));
    if (dataRes) {
      yield put(relationsSetSelectedPostRelations(dataRes.relations));
      yield put(relationsSetSelectedPostPersons(dataRes.persons));
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

function* getKeywords(): any {
  const { token } = yield select(userSelector);
  if (token) {
    yield put(relationsSetIsFetchingKeywords(true));
    const [dataRes, dataErr] = yield call(handle, Relations.getKeywords(token));
    if (dataRes) {
      yield put(relationsSetKeywords(dataRes));
      yield call(getData);
    }
    if (dataErr) {
      console.log(dataErr);
    }
    yield put(relationsSetIsFetchingKeywords(false));
  }
}

function* createKeyword({ payload }: { payload: string }): any {
  const { token } = yield select(userSelector);
  if (token) {
    yield put(relationsSetIsFetchingKeywords(true));
    const [dataRes, dataErr] = yield call(
      handle,
      Relations.createKeyword(token, payload)
    );
    if (dataRes) {
      yield put(relationsAppendKeyword(dataRes));
      yield put(appShowAlert({ isSuccess: true, text: "Successfully edited" }));
    }
    if (dataErr) {
      console.log(dataErr);
      yield put(appShowAlert({ isSuccess: false, text: dataErr.error }));
    }
    yield put(relationsSetIsFetchingKeywords(false));
  }
}

function* deleteKeyword({ payload }: { payload: number }): any {
  const { token } = yield select(userSelector);
  if (token) {
    yield put(relationsSetIsFetchingKeywords(true));
    const [dataRes, dataErr] = yield call(
      handle,
      Relations.deleteKeyword(token, payload)
    );
    if (!dataErr) {
      yield put(relationsRemoveKeyword(payload));
      yield put(appShowAlert({ isSuccess: true, text: "Successfully edited" }));
    }
    if (dataErr) {
      yield put(appShowAlert({ isSuccess: false, text: dataErr.error }));
      console.log(dataErr);
    }
    yield put(relationsSetIsFetchingKeywords(false));
  }
}
