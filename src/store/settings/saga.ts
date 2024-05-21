import {call, put, select, takeEvery, takeLeading,} from "redux-saga/effects";
import {
  settingsAddInstitution,
  settingsAppendField,
  settingsAppendQuestionnaire,
  settingsChangeColumnOrder,
  settingsCloneQuestionnaire,
  settingsCreateAnswer,
  settingsCreateField,
  settingsCreateQuestion,
  settingsCreateQuestionnaire,
  settingsDeleteAnswer,
  settingsDeleteAudience,
  settingsDeleteQuestion,
  settingsDeleteQuestionnaire,
  settingsDeleteVoterUsers,
  settingsEditAnswer,
  settingsEditDefaultPages,
  settingsEditQuestion,
  settingsEditQuestionOrder,
  settingsFetchSentimentPrompt,
  settingsGetAudiences,
  settingsGetColumns,
  settingsGetDefaultPages,
  settingsGetDistributionUsers,
  settingsGetInstitutions,
  settingsGetPostTypes,
  settingsGetQuestionaries,
  settingsGetSMTP,
  settingsGetStatuses,
  settingsGetVoterQuests,
  settingsGetVoterUsers,
  settingsRemoveQuestionnaire,
  settingsRemoveVoterUsers,
  settingsRenameQuestionnaire,
  settingsSetAudiences,
  settingsSetColumns,
  settingsSetDefaultPages,
  settingsSetDistributionUsers, settingsSetFetchingSentimentPrompts,
  settingsSetIsCreatingField,
  settingsSetPostTypes,
  settingsSetPostTypesFetching,
  settingsSetQuestionaries,
  settingsSetQuestionsEditing,
  settingsSetSentimentPrompt,
  settingsSetSMTP,
  settingsSetStatuses,
  settingsSetVoterQuests,
  settingsSetVoterUsers,
  settingsUpdateQuestionnaire,
} from "./actions";
import {userSelector} from "../user";
import {handle} from "../../api";
import {Settings} from "../../api/settings";
import {ICreateAnswerPayload, ICreateField, IDefaultPage, IEditAnswerPayload, IInstitution,} from "./types";
import {appShowAlert} from "../app";
import {t} from "i18next";
import {settingsSelector} from "./hooks";

export function* settingsWatcher() {
  yield takeLeading(settingsGetColumns, getColumns);
  yield takeLeading(settingsGetSMTP, getSMTP);
  yield takeLeading(settingsGetStatuses, getStatuses);
  yield takeLeading(settingsGetQuestionaries, getQuestionaries);
  yield takeLeading(settingsGetInstitutions, getInstitutionsData);
  yield takeLeading(settingsGetAudiences, getAudiences);
  yield takeLeading(settingsCreateField, createField);
  yield takeLeading(settingsGetDefaultPages, getDefaultPages);
  yield takeLeading(settingsEditDefaultPages, editDefaultPages);
  yield takeLeading(settingsCreateQuestionnaire, createQuestionnaire);
  yield takeLeading(settingsDeleteQuestionnaire, deleteQuestionnaire);
  yield takeLeading(settingsRenameQuestionnaire, renameQuestionnaire);
  yield takeLeading(settingsDeleteQuestion, deleteQuestion);
  yield takeLeading(settingsCreateQuestion, createQuestion);
  yield takeLeading(settingsEditQuestion, editQuestion);
  yield takeEvery(settingsEditQuestionOrder, editQuestionOrder);
  yield takeLeading(settingsCreateAnswer, createAnswer);
  yield takeLeading(settingsEditAnswer, editAnswer);
  yield takeLeading(settingsDeleteAnswer, deleteAnswer);
  yield takeLeading(settingsGetVoterUsers, getVoterUsers);
  yield takeLeading(settingsGetVoterQuests, getVoterQuests);
  yield takeLeading(settingsDeleteAudience, deleteAudience);
  yield takeLeading(settingsCloneQuestionnaire, cloneQuestionarie);
  yield takeLeading(settingsGetDistributionUsers, getDistributionUsers);
  yield takeLeading(settingsGetPostTypes, getPostTypes);
  yield takeEvery(settingsChangeColumnOrder, changeColumnOrder)
  yield takeLeading(settingsDeleteVoterUsers, deleteVoterUsers);
  yield takeLeading(settingsFetchSentimentPrompt, fetchSentimentPrompt);


}

function* getColumns(): any {
  const { token } = yield select(userSelector);
  if (token) {
    const [dataRes, dataErr] = yield call(handle, Settings.getColumns(token));
    if (dataRes) {
      yield put(settingsSetColumns(dataRes?.columns || []));
    }
    if (dataErr) {
      console.log(dataErr);
    }
  }
}

function* getSMTP(): any {
  const { token } = yield select(userSelector);
  if (token) {
    const [dataRes, dataErr] = yield call(handle, Settings.getSMTP(token));
    if (dataRes) {
      yield put(settingsSetSMTP(dataRes));
    }
    if (dataErr) {
      console.log(dataErr);
    }
  }
}

function* getInstitutionsData(): any {
  const { token } = yield select(userSelector);
  if (token) {
    const [resData, resErr] = yield call(
      handle,
      Settings.getInstitution(token)
    );
    if (resData) {
      //Sort alphabetical to avoid, replacements on update
      const sorted: IInstitution[] = resData.sort((a: IInstitution, b: IInstitution) => {
        let textA = a.inst_name.toUpperCase();
        let textB = b.inst_name.toUpperCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      });
      yield put(settingsAddInstitution(sorted));
    }
    if (resErr) console.log(resErr);
  }
}

function* getStatuses(): any {
  const { token } = yield select(userSelector);
  if (token) {
    const [dataRes, dataErr] = yield call(handle, Settings.getStatus(token));
    if (dataRes) {
      yield put(settingsSetStatuses(dataRes));
    }
    if (dataErr) {
      console.log(dataErr);
    }
  }
}

function* getQuestionaries() {
  const { token } = yield select(userSelector);
  if (token) {
    const [dataRes, dataErr]: [any[] | undefined, any] = yield call(
      handle,
      Settings.getQuestionaries(token, false)
    );
    if (dataRes) {
      yield put(settingsSetQuestionaries(dataRes));
      yield put(settingsSetQuestionsEditing(false));
    }
    if (dataErr) {
      console.log(dataErr);
    }
  }
}

function* getAudiences() {
  const { token } = yield select(userSelector);
  if (token) {
    const [dataRes, dataErr]: [any[] | undefined, any] = yield call(
      handle,
      Settings.getAudiences(token)
    );
    if (dataRes) {
      yield put(settingsSetAudiences(dataRes));
    }
    if (dataErr) {
      console.log(dataErr);
    }
  }
}

function* createField({ payload }: { payload: ICreateField }): any {
  const { token } = yield select(userSelector);
  const { columns } = yield select(settingsSelector)
  if (token) {
    yield put(settingsSetIsCreatingField(true));
    const [dataRes, dataErr] = yield call(
      handle,
      Settings.createField({ ...payload, order: columns.length + 1 }, token)
    );
    yield put(settingsSetIsCreatingField(false));
    if (dataRes) {
      yield put(settingsAppendField(dataRes));
      yield put(
        appShowAlert({
          isSuccess: true,
          text: t("settings_fields-create_success"),
        })
      );
    }
    if (dataErr) {
      yield put(appShowAlert({ isSuccess: false, text: dataErr.error }));
    }
  }
}

function* getDefaultPages(): any {
  const { token } = yield select(userSelector);
  if (token) {
    const [dataRes, dataErr] = yield call(
      handle,
      Settings.getDefaultPages(token)
    );
    if (dataRes) {
      yield put(settingsSetDefaultPages(dataRes));
    }
    if (dataErr) {
    }
  }
}

function* editDefaultPages({ payload }: { payload: IDefaultPage[] }): any {
  const { token } = yield select(userSelector);
  if (token) {
    const [dataRes, dataErr] = yield call(
      handle,
      Settings.editDefaultPages(token, payload)
    );
    if (dataRes) {
      yield put(settingsSetDefaultPages(dataRes));
      yield put(
        appShowAlert({ isSuccess: true, text: "Saved successfully !" })
      );
    }
    if (dataErr) {
      yield put(appShowAlert({ isSuccess: false, text: dataErr.error }));
    }
  }
}

function* createQuestionnaire({
  payload,
}: {
  payload: { name: string; is_voter: boolean };
}): any {
  const { token } = yield select(userSelector);
  if (token) {
    const [dataRes, dataErr] = yield call(
      handle,
      Settings.createQuestionarie(token, payload.name, payload.is_voter)
    );
    if (dataRes) {
      yield put(
        settingsAppendQuestionnaire({
          questionaire: dataRes,
          is_voter: payload.is_voter,
        })
      );
      yield put(
        appShowAlert({ isSuccess: true, text: "Added successfully !" })
      );
    }
    if (dataErr) {
      yield put(appShowAlert({ isSuccess: false, text: dataErr.error }));
    }
  }
}

function* deleteQuestionnaire({
  payload,
}: {
  payload: { id: number; is_voter: boolean };
}): any {
  const { token } = yield select(userSelector);
  if (token) {
    const [dataRes, dataErr] = yield call(
      handle,
      Settings.deleteQuestionarie(token, payload.id, payload.is_voter)
    );
    if (!dataErr) {
      yield put(
        appShowAlert({ isSuccess: true, text: "Successfully deleted !" })
      );
      yield put(settingsRemoveQuestionnaire(payload));
    }
    if (dataErr) {
      yield put(appShowAlert({ isSuccess: false, text: dataErr.error }));
    }
  }
}

function* renameQuestionnaire({
  payload,
}: {
  payload: { name: string; is_voter: boolean };
}): any {
  const { token } = yield select(userSelector);
  const { selectedQuestionnaireId } = yield select(settingsSelector);
  if (token) {
    const [dataRes, dataErr] = yield call(
      handle,
      Settings.editQuestionarieName(
        token,
        selectedQuestionnaireId,
        payload.name,
        payload.is_voter
      )
    );
    if (dataRes) {
      yield put(
        appShowAlert({ isSuccess: true, text: "Successfully changed !" })
      );
      yield put(
        settingsUpdateQuestionnaire({
          questionaire: dataRes,
          is_voter: payload.is_voter,
        })
      );
    }
    if (dataErr) {
      yield put(appShowAlert({ isSuccess: false, text: dataErr.error }));
    }
  }
}

function* deleteQuestion({
  payload,
}: {
  payload: { id: number; is_voter: boolean };
}): any {
  const { token } = yield select(userSelector);
  if (token) {
    yield put(settingsSetQuestionsEditing(true));
    const [dataRes, dataErr] = yield call(
      handle,
      Settings.deleteQuestionarieQuestion(token, payload.id, payload.is_voter)
    );
    yield put(settingsSetQuestionsEditing(false));
    if (!dataErr) {
      yield put(
        appShowAlert({ isSuccess: true, text: "Deleted successfully !" })
      );
      if (!payload.is_voter) yield call(getQuestionaries);
      if (payload.is_voter) yield call(getVoterQuests);
    }
    if (dataErr) {
      yield put(appShowAlert({ isSuccess: false, text: dataErr.error }));
    }
  }
}

function* createQuestion({
  payload,
}: {
  payload: { text: string; field: string; is_voter: boolean };
}): any {
  const { token } = yield select(userSelector);
  const { selectedQuestionnaireId } = yield select(settingsSelector);
  if (token) {
    yield put(settingsSetQuestionsEditing(true));
    const [dataRes, dataErr] = yield call(
      handle,
      Settings.createQuestionarieQuestion(
        token,
        selectedQuestionnaireId,
        payload.text,
        payload.field,
        payload.is_voter
      )
    );
    yield put(settingsSetQuestionsEditing(false));
    if (!dataErr) {
      yield put(
        appShowAlert({ isSuccess: true, text: "Created successfully !" })
      );
      if (payload.is_voter) yield call(getVoterQuests);
      if (!payload.is_voter) yield call(getQuestionaries);
    }
    if (dataErr) {
      yield put(appShowAlert({ isSuccess: false, text: dataErr.error }));
    }
  }
}

function* editQuestionOrder({
  payload,
}: {
  payload: { id: number; order: number; is_voter: boolean };
}): any {
  const { token } = yield select(userSelector);
  const { selectedQuestionnaireId } = yield select(settingsSelector);
  if (token) {
    yield put(settingsSetQuestionsEditing(true));
    const [dataRes, dataErr] = yield call(
      handle,
      Settings.editQuestionarieQuestionOrder(
        token,
        selectedQuestionnaireId,
        payload.id,
        payload.order,
        payload.is_voter
      )
    );
    yield put(settingsSetQuestionsEditing(false));
    if (!dataErr) {
      if (!payload.is_voter) yield call(getQuestionaries);
      if (payload.is_voter) yield call(getVoterQuests);
      yield put(
        appShowAlert({ isSuccess: true, text: "Changed successfully !" })
      );
    }
    if (dataErr) {
      yield call(editQuestionOrder, { payload });
      yield put(appShowAlert({ isSuccess: false, text: dataErr.error }));
    }
  }
}

function* editQuestion({
  payload,
}: {
  payload: { text: string; field: string; is_voter: boolean };
}): any {
  const { token } = yield select(userSelector);
  const { selectedQuestionnaireId, selectedQuestionId } = yield select(
    settingsSelector
  );
  if (token) {
    yield put(settingsSetQuestionsEditing(true));
    const [dataRes, dataErr] = yield call(
      handle,
      Settings.editQuestionarieQuestion(
        token,
        selectedQuestionnaireId,
        selectedQuestionId,
        payload.text,
        payload.field,
        payload.is_voter
      )
    );
    yield put(settingsSetQuestionsEditing(false));
    if (!dataErr) {
      yield put(
        appShowAlert({ isSuccess: true, text: "Edited successfully !" })
      );
      if (payload.is_voter) yield call(getVoterQuests);
      if (!payload.is_voter) yield call(getQuestionaries);
    }
    if (dataErr) {
      yield put(appShowAlert({ isSuccess: false, text: dataErr.error }));
    }
  }
}

function* createAnswer({ payload }: { payload: ICreateAnswerPayload }): any {
  const { token } = yield select(userSelector);
  const { selectedQuestionId } = yield select(settingsSelector);
  if (token) {
    const [dataRes, dataErr] = yield call(
      handle,
      Settings.createQuestionarieAnswer(
        token,
        selectedQuestionId,
        payload.answer_words,
        payload.value_to_set,
        payload.related_question_id,
        payload.is_update_referal,
        payload.is_voter
      )
    );
    if (!dataErr) {
      yield put(
        appShowAlert({ isSuccess: true, text: "Created successfully !" })
      );
      if (!payload.is_voter) yield call(getQuestionaries);
      if (payload.is_voter) yield call(getVoterQuests);
    }
    if (dataErr) {
      yield put(appShowAlert({ isSuccess: false, text: dataErr.error }));
    }
  }
}

function* editAnswer({ payload }: { payload: IEditAnswerPayload }): any {
  const { token } = yield select(userSelector);
  const { selectedQuestionId } = yield select(settingsSelector);
  if (token) {
    const [dataRes, dataErr] = yield call(
      handle,
      Settings.editQuestionarieAnswer(
        token,
        selectedQuestionId,
        payload.id,
        payload.answer_words,
        payload.value_to_set as string,
        payload.related_question_id,
        payload.is_update_referal,
        payload.is_voter
      )
    );
    if (!dataErr) {
      yield put(
        appShowAlert({ isSuccess: true, text: "Edited successfully !" })
      );
      if (!payload.is_voter) yield call(getQuestionaries);
      if (payload.is_voter) yield call(getVoterQuests);
    }
    if (dataErr) {
      yield put(appShowAlert({ isSuccess: false, text: dataErr.error }));
    }
  }
}

function* deleteAnswer({
  payload,
}: {
  payload: { id: number; is_voter: boolean };
}): any {
  const { token } = yield select(userSelector);
  if (token) {
    const [dataRes, dataErr] = yield call(
      handle,
      Settings.deleteQuestionarieAnswer(token, payload.id, payload.is_voter)
    );
    if (!dataErr) {
      yield put(
        appShowAlert({ isSuccess: true, text: "Delete successfully !" })
      );
      if (!payload.is_voter) yield call(getQuestionaries);
      if (payload.is_voter) yield call(getVoterQuests);
    }
    if (dataErr) {
      yield put(appShowAlert({ isSuccess: false, text: dataErr.error }));
    }
  }
}

function* getVoterUsers(): any {
  const { token } = yield select(userSelector);
  if (token) {
    const [dataRes, dataErr] = yield call(
      handle,
      Settings.getVoterUsers(token)
    );
    if (dataRes) {
      yield put(settingsSetVoterUsers(dataRes));
    }
    if (dataErr) {
      yield put(appShowAlert({ isSuccess: false, text: dataErr.error }));
    }
  }
}

function* getVoterQuests(): any {
  const { token } = yield select(userSelector);
  if (token) {
    const [dataRes, dataErr] = yield call(
      handle,
      Settings.getQuestionaries(token, true)
    );
    if (dataRes) {
      yield put(settingsSetVoterQuests(dataRes));
    }
    if (dataErr) {
      console.log(dataErr);
    }
  }
}

function* deleteAudience({ payload }: { payload: number }): any {
  const { token } = yield select(userSelector);
  if (token) {
    const [dataRes, dataErr] = yield call(
      handle,
      Settings.deleteAudience(token, payload)
    );
    if (!dataErr) {
      yield call(getAudiences)
    }
    if (dataErr) {
      console.log(dataErr);
    }
  }
}



function* cloneQuestionarie({ payload }: { payload: { is_voter: boolean } }): any {
  const { token } = yield select(userSelector);
  const { selectedQuestionnaireId } = yield select(settingsSelector);
  if (token && selectedQuestionnaireId) {
    const [dataRes, dataErr] = yield call(
      handle,
      Settings.cloneQuestionarie(token, selectedQuestionnaireId)
    );
    if (!dataErr) {
      yield put(appShowAlert({ isSuccess: true, text: t("settings_questionnaires-clone_success") }))
    }
    if (!dataErr && payload.is_voter) {
      yield call(getVoterQuests)
    }
    if (!dataErr && !payload.is_voter) {
      yield call(getQuestionaries)
    }
    if (dataErr) {
      console.log(dataErr);
    }
  }
}



function* getDistributionUsers(): any {
  const { token } = yield select(userSelector);
  if (token) {
    const [dataRes, dataErr] = yield call(handle, Settings.getDistributionUsers(token));
    if (dataRes) {
      yield put(settingsSetDistributionUsers(dataRes))
    }
    if (dataErr) {
      console.log(dataErr);
    }
  }
}


function* getPostTypes(): any {
  const { token } = yield select(userSelector);
  if (token) {
    yield put(settingsSetPostTypesFetching(true))
    const [dataRes, dataErr] = yield call(handle, Settings.getPostTypes(token));
    yield put(settingsSetPostTypesFetching(false))
    if (dataRes) {
      yield put(settingsSetPostTypes(dataRes))
    }
    if (dataErr) {
      console.log(dataErr);
    }
  }
}


function* changeColumnOrder({ payload }: { payload: { id: number, order: number } }): any {
  const { token } = yield select(userSelector);
  if (token) {
    const [dataRes, dataErr] = yield call(handle, Settings.changeColumnOrder(token, payload.id, payload.order));
    if (dataRes) {
      yield put(settingsSetColumns(dataRes))
    }
    if (dataErr) {
      yield put(appShowAlert({isSuccess: false, text: dataErr.error}))
    }
  }
}



function* deleteVoterUsers({ payload }: { payload: { list: number[], permanently: boolean } }): any {
  const { token } = yield select(userSelector);
  if (token) {
    const [dataRes, dataErr] = yield call(handle, Settings.deleteVoterUsers(token, payload.list, payload.permanently));
    if (!dataErr) {
      yield put(settingsRemoveVoterUsers(payload.list))
      yield put(appShowAlert({isSuccess: true, text: t("settings_app-delete_success")}))
    }
    if (dataErr) {
      yield put(appShowAlert({isSuccess: false, text: dataErr.error}))
    }
  }
}


function *fetchSentimentPrompt():any{
  const {token} = yield select(userSelector);
  if(!token) throw new Error("Fetch sentiment prompt error: No auth token");
  yield put(settingsSetFetchingSentimentPrompts(true));
  const [res, error] = yield call(handle, Settings.getActivePrompt(token));
  yield put(settingsSetFetchingSentimentPrompts(false));
  if(error)  yield put(appShowAlert({isSuccess: false, text: error}));
  if(res) yield put(settingsSetSentimentPrompt({positive:res.positive, negative:res.negative, topic:res.topic}));
}
