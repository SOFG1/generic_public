import { createAction } from "@reduxjs/toolkit";
import {
  IColumns,
  ICreateAnswerPayload,
  ICreateField,
  IDefaultPage,
  IDistributionUser,
  IEditAnswerPayload,
  IInstitution,
  IQuestionnaire,
  ISMTP,
  IStatus,
  IVoterUser,
} from "./types";


export const settingsGetColumns = createAction("settings/getColumns")
export const settingsSetColumns = createAction<IColumns[]>("settings/setColumns")

export const settingsGetSMTP = createAction("settings/getSMTP")
export const settingsSetSMTP = createAction<{ connection: ISMTP, name: string }>("settings/setSMTP")




export const settingsGetStatuses = createAction("settings/getStatuses")
export const settingsSetStatuses = createAction<IStatus[]>("settings/getStatuses")


export const settingsGetInstitutions = createAction("settings/getInstitution");
export const settingsAddInstitution = createAction<IInstitution[]>(
  "settings/addInstitution"
);

export const settingsGetQuestionaries = createAction(
  "settings/getQuestionaries"
);
export const settingsSetQuestionaries = createAction<any[]>(
  "settings/setQuestionaries"
);

export const settingsGetAudiences = createAction("settings/getAudiences");
export const settingsSetAudiences = createAction<any[]>(
  "settings/setAudiences"
);

//Questionnaires
export const settingsSetQuestionnaireId = createAction<number>(
  "settings/setQuestionnaireId"
);
export const settingsCreateQuestionnaire = createAction<{ name: string, is_voter: boolean }>(
  "settings/createQuestionnaire"
);
export const settingsAppendQuestionnaire = createAction<{ questionaire: IQuestionnaire, is_voter: boolean }>(
  "settings/appendQuestionnaire"
);
export const settingsSetSelectedQuestion = createAction<number>(
  "settings/setSelectedQuestion"
);
export const settingsDeleteQuestionnaire = createAction<{ id: number, is_voter: boolean }>(
  "settings/deleteQuestionnaire"
); //delete in DB
export const settingsRemoveQuestionnaire = createAction<{ id: number, is_voter: boolean }>(
  "settings/removeQuestionnaire"
); //remove from state
export const settingsRenameQuestionnaire = createAction<{ name: string, is_voter: boolean }>(
  "settings/renameQuestionnaire"
); //Rename in DB
export const settingsUpdateQuestionnaire = createAction<{ questionaire: IQuestionnaire, is_voter: boolean }>(
  "settings/updateQuestionnaire"
); //Rename in redux state
export const settingsDeleteQuestion = createAction<{ id: number, is_voter: boolean }>(
  "settings/deleteQuestion"
);
export const settingsCreateQuestion = createAction<{
  text: string;
  field: string;
  is_voter: boolean
}>("settings/createQuestion");
export const settingsEditQuestion = createAction<{
  text: string;
  field: string;
  is_voter: boolean
}>("settings/editQuestion");
export const settingsEditQuestionOrder = createAction<{
  id: number;
  order: number;
  is_voter: boolean
}>("settings/editQuestionOrder");
export const settingsCreateAnswer = createAction<ICreateAnswerPayload>(
  "settings/createAnswer"
);
export const settingsEditAnswer = createAction<IEditAnswerPayload>(
  "settings/editAnswer"
);
export const settingsDeleteAnswer = createAction<{ id: number, is_voter: boolean }>(
  "settings/deleteAnswer"
);
export const settingsSetQuestionsEditing = createAction<boolean>(
  "settings/setEditingQuestions"
);
// ./Questionnaires

export const settingsCreateField = createAction<ICreateField>(
  "settings/createField"
);
export const settingsAppendField = createAction<IColumns>(
  "settings/appendField"
);
export const settingsSetIsCreatingField = createAction<boolean>('settings/setIsCreatingField')

export const settingsGetDefaultPages = createAction("settings/getDefaultPages");
export const settingsSetDefaultPages = createAction<IDefaultPage[]>(
  "settings/setDefaultPages"
);
export const settingsEditDefaultPages = createAction<IDefaultPage[]>(
  "settings/editDefaultPages"
);


export const settingsGetVoterUsers = createAction('settings/getAppUsers')
export const settingsSetVoterUsers = createAction<IVoterUser[]>('settings/setAppUsers')

export const settingsGetVoterQuests = createAction('settings/getVoterQuests')
export const settingsSetVoterQuests = createAction<IQuestionnaire[]>('settings/setVoterQuests')


export const settingsDeleteAudience = createAction<number>("settings/deleteAudience")


export const settingsCloneQuestionnaire = createAction<{ is_voter: boolean }>("settings/cloneQuestionnaire")


export const settingsGetDistributionUsers = createAction("settings/getDistributionUsers")
export const settingsSetDistributionUsers = createAction<IDistributionUser[]>("settings/setDistributionUsers")

export const settingsGetPostTypes = createAction("settings/getPostTypes")
export const settingsSetPostTypes = createAction<string[]>("settings/setPostTypes")
export const settingsSetPostTypesFetching = createAction<boolean>("settings/setPostTypesFetching")


export const settingsChangeColumnOrder = createAction<{id: number, order: number}>("settings/changeColumnOrder")


export const settingsDeleteVoterUsers = createAction<{list: number[], permanently: boolean}>("settings/deleteVoterUsers")
export const settingsRemoveVoterUsers = createAction<number[]>("settings/removeVoterUsers")


export const settingsFetchSentimentPrompt = createAction("settings/fetchSentimentPrompt");
export const settingsSetSentimentPrompt = createAction<{negative:string, positive:string, topic:string}>("settings/SetSentimentPrompt");
export const settingsSetFetchingSentimentPrompts = createAction<boolean>("settings/setFetchingSentimentPrompt");

