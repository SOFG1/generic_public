import {
  all,
  call,
  put,
  select,
  takeEvery,
  takeLatest,
  takeLeading,
} from "redux-saga/effects";
import { handle } from "../../api";
import { IAIPostParams, Sentimentor } from "../../api/sentimentor";
import { appShowAlert } from "../app";
import { userSelector } from "../user";
import {
  sentimentorAddKeyword,
  sentimentorAddPublications,
  sentimentorDeleteKeyword,
  sentimentorDeleteTag,
  sentimentorEditAIPostText,
  sentimentorCreateAIPost,
  sentimentorGetAnalysis,
  sentimentorGetGooglePublications,
  sentimentorGetKeywords,
  sentimentorGetOtherPublications,
  sentimentorGetPublicationsFilters,
  sentimentorGetTagsCloud,
  sentimentorRemoveTag,
  sentimentorSetAnalysis,
  sentimentorSetFetchingAnalysis,
  sentimentorSetIsFetchingAI,
  sentimentorSetKeywords,
  sentimentorSetPublicationsFetching,
  sentimentorSetPublicationsFilter,
  sentimentorSetPublicationsFilters,
  sentimentorSetTagsCloud,
  sentimentorUpdateAIPostText,
  sentimentorGetAllAIPosts,
  sentimentorSetAllAIPosts,
  sentimentorUpdateAIPost,
  sentimentorRefreshAIPost,
  sentimentorAddAIPost,
  sentimentorSetSelectedAI,
  sentimentorGetPdfReportData,
  sentimentorGetDefamatory,
  sentimentorSetDefamatoryFetching,
  sentimentorGetFiltersData,
  sentimentorSetFiltersData,
  sentimentorRegenerateAIPost,
  sentimentorDeleteAIPost,
  sentimentorRemoveAIPost,
  sentimentorApplyFilters,
  sentimentorSetIsFetchingCloudTags,
  sentimentorSetAiModels,
  sentimentorGetAiModels,
  editSentimentorKeyword,
} from "./actions";
import { giladSources, googleSources } from "./reducer";
import {
  sentimentorAppliedFiltersSelector,
  sentimentorSelectedTagSelector,
} from "./selectors";
import {IModel, ISentimentorFilters, PublicationSourceType} from "./types";
import { settingsGetInstitutions } from "../settings";
import { composeAIPostPromptTemplate } from "../../utils/composeAIPostPromptTemplate";
import { t } from "i18next";

export function* sentimentorWatcher() {
  yield takeLatest([sentimentorGetAnalysis, sentimentorApplyFilters], getAnalysis);
  yield takeLeading(sentimentorGetKeywords, getKeywords);
  yield takeLeading(sentimentorAddKeyword, addKeyword);
  yield takeLeading(sentimentorDeleteKeyword, deleteKeyword);
  yield takeLatest([sentimentorGetTagsCloud, sentimentorApplyFilters], getTags);
  yield takeLeading(sentimentorGetFiltersData, getFilters);
  yield takeEvery(sentimentorGetPublicationsFilters, getPublicationsFilters);
  yield takeLatest(
    [sentimentorGetOtherPublications, sentimentorApplyFilters, sentimentorSetPublicationsFilter],
    getOtherPublications
  );
  yield takeLatest(
    [sentimentorGetGooglePublications, sentimentorApplyFilters, sentimentorSetPublicationsFilter],
    getGooglePublications
  );
  yield takeLeading(sentimentorDeleteTag, deleteTag);
  yield takeLeading(sentimentorGetAllAIPosts, getAllAIPosts);
  yield takeLeading(sentimentorCreateAIPost, createAIPost);
  yield takeLeading(sentimentorDeleteAIPost, deleteAIPost);

  yield takeLatest(sentimentorUpdateAIPost, updateAIPost);
  yield takeLatest(sentimentorEditAIPostText, editAIPostText);
  yield takeLeading(sentimentorRegenerateAIPost, regenerateAIPostText);
  yield takeLatest(
    sentimentorGetPdfReportData,
    getPdfReportData
  );
  yield takeLeading(sentimentorGetDefamatory, downloadDefamatory);
  yield takeLeading(sentimentorGetAiModels, getAiModels);
  yield takeLeading(editSentimentorKeyword, editKeywordParsingStyle);
}

function* getAnalysis(): any {
  const { token } = yield select(userSelector);
  const filters = yield select(sentimentorAppliedFiltersSelector)
  if (token) {
    yield put(sentimentorSetFetchingAnalysis(true));
    const [dataRes, dataErr] = yield call(
      handle,
      Sentimentor.getAnalysis(token, filters)
    );
    yield put(sentimentorSetFetchingAnalysis(false));
    if (dataRes) {
      yield put(sentimentorSetAnalysis(dataRes));
    }
    if (dataErr) {
      console.log(dataErr);
    }
  }
}

function* getKeywords(): any {
  const { token } = yield select(userSelector);
  if (token) {
    const [dataRes, dataErr] = yield call(
      handle,
      Sentimentor.getKeywords(token)
    );
    if (dataRes) {
      yield put(sentimentorSetKeywords(dataRes));
    }
    if (dataErr) {
      console.log(dataErr);
    }
  }
}

function* addKeyword({ payload }: { payload: {keyword:string, parsing_style:string} }): any {
  const { token } = yield select(userSelector);
  if (token && payload) {
    const [dataRes, dataErr] = yield call(
      handle,
      Sentimentor.addKeyword(token, payload.keyword, payload.parsing_style)
    );
    if (!dataErr) {
      yield call(getKeywords);
      yield put(appShowAlert({ isSuccess: true, text: "Successfully edited" }));
    }
    if (dataErr) {
      yield put(appShowAlert({ isSuccess: false, text: dataErr.error }));
      console.log(dataErr);
    }
  }
}

function* deleteKeyword({ payload }: { payload: number }): any {
  const { token, userInfo } = yield select(userSelector);
  const hasPermission = userInfo?.permissions?.Ranking?.actions?.delete_keyword;
  if (!hasPermission) {
    appShowAlert({
      isSuccess: false,
      text: "You don't have permission to perform this action",
    });
  }
  if (token) {
    const [dataRes, dataErr] = yield call(
      handle,
      Sentimentor.deleteKeyword(token, payload)
    );
    if (!dataErr) {
      yield put(settingsGetInstitutions());
      yield call(getKeywords);
      yield put(appShowAlert({ isSuccess: true, text: "Successfully edited" }));
    }
    if (dataErr) {
      appShowAlert({ isSuccess: false, text: dataErr.error });
    }
  }
}



function* getFilters(): any {
  const { token } = yield select(userSelector);
  if (token) {
    const [dataRes, dataErr] = yield call(
      handle,
      Sentimentor.getFilters(token)
    );
    if (dataRes) {
      yield put(sentimentorSetFiltersData(dataRes))
    }
    if (dataErr) {
      console.log(dataErr);
    }
  }
}


function* getTags(): any {
  const { token } = yield select(userSelector);
  const filters = yield select(sentimentorAppliedFiltersSelector)
  if (token) {
    yield put(sentimentorSetIsFetchingCloudTags(true))
    const [dataRes, dataErr] = yield call(
      handle,
      Sentimentor.getTags(token, filters)
    );
    yield put(sentimentorSetIsFetchingCloudTags(false))
    if (dataRes) {
      yield put(sentimentorSetTagsCloud(dataRes));
    }
    if (dataErr) {
      console.log(dataErr);
    }
  }
}

function* deleteTag(): any {
  const { token } = yield select(userSelector);
  const selectedTag = yield select(sentimentorSelectedTagSelector);
  if (token) {
    const [dataRes, dataErr] = yield call(
      handle,
      Sentimentor.deleteTag(token, selectedTag.text)
    );
    if (!dataErr) {
      yield put(sentimentorRemoveTag(selectedTag.text));
      yield put(
        appShowAlert({ isSuccess: true, text: "Successfully deleted" })
      );
    }
    if (dataErr) {
      yield put(appShowAlert({ isSuccess: false, text: dataErr.error }));
    }
  }
}

function* getPublicationsFilters(): any {
  const { token } = yield select(userSelector);
  if (token) {
    const [dataRes, dataErr] = yield call(
      handle,
      Sentimentor.getPublicationsFilters(token)
    );
    if (dataRes) {
      yield put(sentimentorSetPublicationsFilters(dataRes.tag));
    }
    if (dataErr) {
      console.log(dataErr);
    }
  }
}

//Other publications (the rest)
function* getOtherPublications({ payload }: any): any {
  const { userInfo } = yield select(userSelector);
  const hasGiladPostsPermission =
    userInfo.permissions.Ranking.actions.gilad_like;
  if (hasGiladPostsPermission && payload?.category !== "googlePubs") {
    yield put(
      sentimentorSetPublicationsFetching({
        category: "otherPubs",
        isFetching: true,
      })
    );
    yield all(
      giladSources.map((source) => {
        return call(getPublications, source, payload?.filter);
      })
    );
    yield put(
      sentimentorSetPublicationsFetching({
        category: "otherPubs",
        isFetching: false,
      })
    );
  }
}

//Only publications from google_news and news_with_login source
function* getGooglePublications({ payload }: any): any {
  const { userInfo } = yield select(userSelector);
  const hasGooglePostsPermission =
    userInfo.permissions.Ranking.actions.google_news;
  if (hasGooglePostsPermission && payload?.category !== "otherPubs") {
    yield put(
      sentimentorSetPublicationsFetching({
        category: "googlePubs",
        isFetching: true,
      })
    );
    yield all(
      googleSources.map((source) => {
        return call(getPublications, source, payload?.filter);
      })
    );
    yield put(
      sentimentorSetPublicationsFetching({
        category: "googlePubs",
        isFetching: false,
      })
    );
  }
}

function* getPublications(
  source: PublicationSourceType,
  tagFilter?: string
): any {
  const { token } = yield select(userSelector);
  const filters = yield select(sentimentorAppliedFiltersSelector)
  if (token) {
    const [dataRes, dataErr] = yield call(
      handle,
      Sentimentor.getPublications(token, source, filters)
    );
    if (dataRes) {
      const withSender = dataRes.map((publication: any) => ({
        ...publication,
        _sender: source,
      }));
      yield put(sentimentorAddPublications(withSender));
    }
    if (dataErr) {
      console.log(dataErr);
    }
  }
}

function* getAllAIPosts(): any {
  const { token } = yield select(userSelector);
  if (token) {
    yield put(sentimentorSetIsFetchingAI(true));
    const [dataRes, dataErr] = yield call(
      handle,
      Sentimentor.getAIPostsList(token)
    );
    yield put(sentimentorSetIsFetchingAI(false));
    if (dataRes) {
      yield put(sentimentorSetAllAIPosts(dataRes));
    }
    if (dataErr) {
      yield put(appShowAlert({ isSuccess: true, text: dataErr.error }));
    }
  }
}

function* createAIPost({ payload }: { payload: IAIPostParams }): any {
  const { token } = yield select(userSelector);
  if (token) {
    yield put(sentimentorSetIsFetchingAI(true)); //Fetching
    const [createRes, createErr] = yield call(handle, Sentimentor.createAIPost(token)) //Create post
    if (createRes) {
      yield put(sentimentorAddAIPost(createRes)); //Add post to store
      yield put(sentimentorSetSelectedAI(createRes.id as number)); //Set added post as selected
    }
    if (createErr) {
      yield put(appShowAlert({ isSuccess: false, text: createErr.error })); //Show error
      return //Cancel operation if no post created
    }
    const prompt = composeAIPostPromptTemplate(payload)
    const [dataRes, dataErr] = yield call(
      handle,
      Sentimentor.generateAIPostText(token, createRes.id, prompt) //Generate
    );
    yield put(sentimentorSetIsFetchingAI(false)); //Fetching
    if (dataRes) {
      yield put(sentimentorRefreshAIPost(dataRes)) //Update existing AI post
    }
    if (dataErr) {
      yield put(appShowAlert({ isSuccess: false, text: dataErr.error }));
    }
  }
}

function* updateAIPost({ payload }: { payload: number }): any {
  const { token } = yield select(userSelector);
  if (token) {
    const [dataRes, dataErr] = yield call(
      handle,
      Sentimentor.getAIPost(token, payload)
    );
    if (dataRes[0]) {
      yield put(sentimentorRefreshAIPost(dataRes[0]));
    }
    if (dataErr) {
      yield put(appShowAlert({ isSuccess: true, text: dataErr.error }));
    }
  }
}

function* editAIPostText({
  payload,
}: {
  payload: { id: number; text: string };
}): any {
  const { token } = yield select(userSelector);
  if (token) {
    yield put(sentimentorSetIsFetchingAI(true)); //Fetching
    const [dataRes, dataErr] = yield call(
      handle,
      Sentimentor.editAIPostText(token, payload.id, payload.text)
    );
    yield put(sentimentorSetIsFetchingAI(false)); //Fetching
    if (dataRes) {
      yield put(
        sentimentorUpdateAIPostText({
          id: payload.id,
          text: dataRes?.text || "",
        })
      );
    }
    if (dataErr) {
      yield put(appShowAlert({ isSuccess: false, text: dataErr.error }))
    }
  }
}


function* deleteAIPost({
  payload,
}: {
  payload: number;
}): any {
  const { token } = yield select(userSelector);
  if (token) {
    yield put(sentimentorSetIsFetchingAI(true)); //Fetching
    const [dataRes, dataErr] = yield call(
      handle,
      Sentimentor.deleteAIPost(token, payload)
    );
    yield put(sentimentorSetIsFetchingAI(false)); //Fetching
    if (!dataErr) {
      yield put(sentimentorRemoveAIPost(payload))
      yield put(appShowAlert({ isSuccess: true, text: t("ranking_ai-del_success") }))

    }
    if (dataErr) {
      yield put(appShowAlert({ isSuccess: false, text: dataErr.error }))
    }
  }
}



function* regenerateAIPostText({
  payload,
}: {
  payload: { id: number; prompt: string };
}): any {
  const { token } = yield select(userSelector);
  if (token) {
    yield put(sentimentorSetIsFetchingAI(true)); //Fetching
    const [dataRes, dataErr] = yield call(
      handle,
      Sentimentor.generateAIPostText(token, payload.id, payload.prompt)
    );
    yield put(sentimentorSetIsFetchingAI(false)); //Fetching
    if (dataRes) {
      yield put(sentimentorRefreshAIPost(dataRes))
    }
    if (dataErr) {
      yield put(appShowAlert({ isSuccess: false, text: dataErr.error }))
    }
  }
}

function* getPdfReportData({ payload }: { payload: ISentimentorFilters }): any {
  const { token } = yield select(userSelector);
  if (token) {
    const [dataRes, dataErr] = yield call(
      handle,
      Sentimentor.getPdfReportData(token, payload)
    );
    if (!dataErr) {
      yield put(appShowAlert({isSuccess: true, text: t("ranking_pdf-notification")}))
      //yield put(sentimentorSetPdfReportData(dataRes));
    }
    if (dataErr) {
      console.log(dataErr);
    }
  }
}

function* downloadDefamatory({ payload }: { payload: ISentimentorFilters }): any {
  const { token } = yield select(userSelector);
  if (token) {
    yield put(sentimentorSetDefamatoryFetching(true));
    const [dataRes, dataErr] = yield call(
      handle,
      Sentimentor.getDefamatoryReport(token, payload)
    );
    yield put(sentimentorSetDefamatoryFetching(false));
    if (!dataErr) {
      yield put(
        appShowAlert({
          isSuccess: true,
          text: "We've received your request, you'll get report in notifications",
        })
      );
    }
    if (dataErr) {
      yield put(appShowAlert({ isSuccess: false, text: dataErr.error }));
    }
  }
}


function * getAiModels():any{
  const { token } = yield select(userSelector);
  if(!token) return;
  const [res, err] = yield call(handle,Sentimentor.getAiModels(token))
  if (err) {
    yield put(appShowAlert({ isSuccess: false, text: err.error }));
  }
  if(res){
    yield put(sentimentorSetAiModels(res as IModel[]));
  }
}

function * editKeywordParsingStyle({ payload }: { payload: {keywordId:number, parsing_style:string} }):any{
  const { token } = yield select(userSelector);
  const [res, dataErr] = yield call(handle, Sentimentor.editKeywordParsingStyle(token, [payload.keywordId], payload.parsing_style))
  if (!dataErr) {
    yield call(getKeywords);
    yield put(appShowAlert({ isSuccess: true, text: "Successfully edited" }));
  }
  if (dataErr) {
    yield put(appShowAlert({ isSuccess: false, text: dataErr.error }));
    console.log(dataErr);
  }
}
