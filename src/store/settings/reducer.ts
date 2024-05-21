import { createReducer } from "@reduxjs/toolkit";
import {
  IColumns,
  IDefaultPage,
  IDistributionUser,
  IInstitution,
  IQuestionnaire,
  ISMTP,
  ISettingsState,
  IStatus,
  IVoterUser,
} from "./types";
import {
  settingsAddInstitution,
  settingsSetQuestionaries,
  settingsSetAudiences,
  settingsSetSelectedQuestion,
  settingsAppendField,
  settingsSetDefaultPages,
  settingsSetQuestionnaireId,
  settingsAppendQuestionnaire,
  settingsRemoveQuestionnaire,
  settingsUpdateQuestionnaire,
  settingsSetQuestionsEditing,
  settingsSetIsCreatingField,
  settingsSetVoterUsers,
  settingsSetStatuses,
  settingsSetVoterQuests,
  settingsSetColumns,
  settingsSetSMTP,
  settingsSetDistributionUsers,
  settingsSetPostTypes,
  settingsSetPostTypesFetching,
  settingsRemoveVoterUsers, settingsSetSentimentPrompt, settingsSetFetchingSentimentPrompts,
} from "./actions";
import { userLogout } from "../user";

const initialState: ISettingsState = {
  status_colors: [],
  columns: [],
  isCreatingField: false,
  all_statuses: [],
  defaultPages: [],
  smtp: null,
  institutions: [],
  questionaries: [],
  voterQuests: [],
  selectedQuestionnaireId: 0,
  selectedQuestionId: 0,
  isEditingQuestions: false,
  audiences: [],
  voterUsers: [],
  distributionUsers: [],
  post_types: [],
  sentimentPrompt:{
    positive:"",
    negative:"",
    topic:""
  },

  isFetchingPostTypes: false,
  isFetchingSentimentPrompt:false,
};

const settings = createReducer(initialState, {
  [settingsSetColumns.type]: (state, action: { payload: IColumns[] }) => {
    return {
      ...state,
      columns: action.payload,
    };
  },
  [settingsSetSMTP.type]: (
    state,
    action: { payload: { connection: ISMTP; name: string } }
  ) => {
    return {
      ...state,
      smtp: action.payload,
    };
  },
  [settingsSetStatuses.type]: (state, action: { payload: IStatus[] }) => {
    return {
      ...state,
      all_statuses: action.payload,
    };
  },

  [settingsAddInstitution.type]: (
    state,
    action: { payload: IInstitution[] }
  ) => {
    return {
      ...state,
      institutions: action.payload,
    };
  },
  [settingsSetQuestionaries.type]: (state, action: { payload: any[] }) => {
    return {
      ...state,
      questionaries: action.payload,
    };
  },
  [settingsSetAudiences.type]: (state, action: { payload: any[] }) => {
    return {
      ...state,
      audiences: action.payload,
    };
  },
  [settingsSetDefaultPages.type]: (
    state,
    action: { payload: IDefaultPage[] }
  ) => {
    return {
      ...state,
      defaultPages: action.payload,
    };
  },
  [settingsSetQuestionnaireId.type]: (state, action: { payload: number }) => {
    return {
      ...state,
      selectedQuestionnaireId: action.payload,
    };
  },
  [settingsUpdateQuestionnaire.type]: (
    state,
    action: { payload: { questionaire: IQuestionnaire; is_voter: boolean } }
  ) => {
    if (action.payload.is_voter) {
      const filtered = state.voterQuests.filter(
        (q) => q.id !== action.payload.questionaire.id
      );
      return {
        ...state,
        voterQuests: [action.payload.questionaire, ...filtered],
      };
    }
    const filtered = state.questionaries.filter(
      (q) => q.id !== action.payload.questionaire.id
    );

    return {
      ...state,
      questionaries: [action.payload.questionaire, ...filtered],
    };
  },
  [settingsAppendQuestionnaire.type]: (
    state,
    action: { payload: { questionaire: IQuestionnaire; is_voter: boolean } }
  ) => {
    if (action.payload.is_voter) {
      return {
        ...state,
        voterQuests: [...state.voterQuests, action.payload.questionaire],
      };
    }
    return {
      ...state,
      questionaries: [...state.questionaries, action.payload.questionaire],
    };
  },
  [settingsRemoveQuestionnaire.type]: (
    state,
    action: { payload: { id: number; is_voter: boolean } }
  ) => {
    if (!action.payload.is_voter) {
      const filtered = state.questionaries.filter(
        (q) => q.id !== action.payload.id
      );
      return {
        ...state,
        questionaries: filtered,
      };
    }
    const filtered = state.voterQuests.filter(
      (q) => q.id !== action.payload.id
    );
    return {
      ...state,
      voterQuests: filtered,
    };
  },
  [settingsSetSelectedQuestion.type]: (state, action: { payload: number }) => {
    return {
      ...state,
      selectedQuestionId: action.payload,
    };
  },
  [settingsSetQuestionsEditing.type]: (state, action: { payload: boolean }) => {
    return {
      ...state,
      isEditingQuestions: action.payload,
    };
  },
  [settingsAppendField.type]: (state, action: { payload: IColumns }) => {
    return {
      ...state,
      columns: [...state.columns, action.payload],
    };
  },
  [settingsSetIsCreatingField.type]: (state, action: { payload: boolean }) => {
    return {
      ...state,
      isCreatingField: action.payload,
    };
  },
  [settingsSetVoterUsers.type]: (state, action: { payload: IVoterUser[] }) => {
    return {
      ...state,
      voterUsers: action.payload,
    };
  },
  [settingsSetDistributionUsers.type]: (state, action: { payload: IDistributionUser[] }) => {
    return {
      ...state,
      distributionUsers: action.payload,
    };
  },
  [settingsSetVoterQuests.type]: (
    state,
    action: { payload: IQuestionnaire[] }
  ) => {
    return {
      ...state,
      voterQuests: action.payload,
    };
  },
  [settingsSetPostTypes.type]: (
    state,
    action: { payload: string[] }
  ) => {
    return {
      ...state,
      post_types: action.payload,
    };
  },
  [settingsSetPostTypesFetching.type]: (
    state,
    action: { payload: boolean }
  ) => {
    return {
      ...state,
      isFetchingPostTypes: action.payload,
    };
  },
  [settingsRemoveVoterUsers.type]: (
    state,
    action: { payload: number[] }
  ) => {
    return {
      ...state,
      voterUsers: state.voterUsers.filter(u => !action.payload.includes(u.id)),
    };
  },
  //Clear state after logout
  [userLogout.type]: (state) => {
    return {
      ...initialState,
    };
  },

  [settingsSetSentimentPrompt.type]:(state, action:{payload:{positive:string, negative:string, topic:string}})=>{
    return {
      ...state,
      sentimentPrompt:{
        positive: action.payload.positive,
        negative:action.payload.negative,
        topic:action.payload.topic,
      }
    }
  },
  [settingsSetFetchingSentimentPrompts.type]:(state, action:{payload:boolean})=>{
    return {
      ...state,
      isFetchingSentimentPrompt:action.payload,
    }
  }
});

export default settings;
