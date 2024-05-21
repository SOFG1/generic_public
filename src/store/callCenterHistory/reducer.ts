import { createReducer } from "@reduxjs/toolkit";
import {
  ICallCenterHistoryState,
  ICallCenterHistoryFilters,
  IInterviewer,
  IActivityFilters,
} from "./types";
import {
  callCenterHistoryAddFilters,
  callCenterHistorySetOutgoingSms,
  callCenterHistorySetIncomingSms,
  callCenterHistorySetEmails,
  callCenterHistorySetInterviewers,
  callCenterHistorySetQuestionaries,
  callCenterHistorySetQuestionariesPage,
  callCenterHistorySetOutgoingPage,
  callCenterHistorySetIncomingPage,
  callCenterHistorySetEmailsPage,
  callCenterHistorySetOutgoingFetching,
  callCenterHistorySetIncomingFetching,
  callCenterHistorySetEmailsFetching,
  callCenterHistorySetQuestionariesFetching,
  callCenterHistorySetOutgoingSorting,
  callCenterHistorySetIncomingSorting,
  callCenterHistorySetEmailsSorting,
  callCenterHistorySetQuestionariesSorting,
  callCenterHistorySetActivityFilters,
  callCenterHistorySetActivityPage,
  callCenterHistorySetActivityFetching,
  callCenterHistorySetActivitySorting,
  callCenterHistorySetActivities,
  reportsSetVoterQuests,
  reportsSetVoterQuestsPage,
  reportsSetVoterQuestsFetching,
  reportsSetVoterQuestsSorting,
} from "./actions";
import { userLogout } from "../user";

const initialState: ICallCenterHistoryState = {
  filters: null,
  smsIncoming: {
    table: [],
    count: 0,
    currentPage: 0,
    sorting: "count DESC", //default sorting
    isFetching: false,
  },
  smsOutgoing: {
    table: [],
    count: 0,
    currentPage: 0,
    sorting: "date DESC", //default sorting
    isFetching: false,
  },
  emails: {
    table: [],
    count: 0,
    currentPage: 0,
    sorting: "date DESC", //default sorting
    isFetching: false,
  },
  questionaries: {
    table: [],
    count: 0,
    currentPage: 0,
    sorting: "questionarie_name DESC", //default sorting
    isFetching: false,
  },
  voterQuests: {
    table: [],
    count: 0,
    currentPage: 0,
    sorting: "questionarie_name DESC", //default sorting
    isFetching: false,
  },
  activities: {
    table: [],
    count: 0,
    currentPage: 0,
    sorting: "page DESC", //default sorting
    isFetching: false,
  },
  interviewers: [],
  activityFilters: {
    action: "",
    page: "",
    selectedUsers: "",
    dateFilter: [null, null],
  },
};

export const outgoingSmsCountPerPage = 20;
export const incomingSmsCountPerPage = 20;
export const emailsCountPerPage = 20;
export const questionariesCountPerPage = 20;
export const activitiesCountPerPage = 20;

const callCenterHistory = createReducer(initialState, {
  [callCenterHistoryAddFilters.type]: (
    state,
    action: { payload: ICallCenterHistoryFilters }
  ) => {
    return {
      ...state,
      filters: { ...action.payload },
    };
  },
  [callCenterHistorySetOutgoingSms.type]: (
    state,
    action: { payload: { table: any[]; count: number } }
  ) => {
    return {
      ...state,
      smsOutgoing: { ...state.smsOutgoing, ...action.payload },
    };
  },
  [callCenterHistorySetOutgoingPage.type]: (
    state,
    action: { payload: number }
  ) => {
    return {
      ...state,
      smsOutgoing: { ...state.smsOutgoing, currentPage: action.payload },
    };
  },
  [callCenterHistorySetOutgoingSorting.type]: (
    state,
    action: { payload: string }
  ) => {
    return {
      ...state,
      smsOutgoing: {
        ...state.smsOutgoing,
        currentPage: 0,
        sorting: action.payload,
      },
    };
  },
  [callCenterHistorySetOutgoingFetching.type]: (
    state,
    action: { payload: boolean }
  ) => {
    return {
      ...state,
      smsOutgoing: { ...state.smsOutgoing, isFetching: action.payload },
    };
  },
  [callCenterHistorySetIncomingSms.type]: (
    state,
    action: { payload: { table: any[]; count: number } }
  ) => {
    return {
      ...state,
      smsIncoming: { ...state.smsIncoming, ...action.payload },
    };
  },
  [callCenterHistorySetIncomingPage.type]: (
    state,
    action: { payload: number }
  ) => {
    return {
      ...state,
      smsIncoming: { ...state.smsIncoming, currentPage: action.payload },
    };
  },
  [callCenterHistorySetIncomingSorting.type]: (
    state,
    action: { payload: string }
  ) => {
    return {
      ...state,
      smsIncoming: {
        ...state.smsIncoming,
        currentPage: 0,
        sorting: action.payload,
      },
    };
  },
  [callCenterHistorySetIncomingFetching.type]: (
    state,
    action: { payload: boolean }
  ) => {
    return {
      ...state,
      smsIncoming: { ...state.smsIncoming, isFetching: action.payload },
    };
  },
  [callCenterHistorySetEmails.type]: (
    state,
    action: { payload: { table: any[]; count: number } }
  ) => {
    return {
      ...state,
      emails: { ...state.emails, ...action.payload },
    };
  },
  [callCenterHistorySetEmailsPage.type]: (
    state,
    action: { payload: number }
  ) => {
    return {
      ...state,
      emails: { ...state.emails, currentPage: action.payload },
    };
  },
  [callCenterHistorySetEmailsSorting.type]: (
    state,
    action: { payload: string }
  ) => {
    return {
      ...state,
      emails: { ...state.emails, currentPage: 0, sorting: action.payload },
    };
  },
  [callCenterHistorySetEmailsFetching.type]: (
    state,
    action: { payload: boolean }
  ) => {
    return {
      ...state,
      emails: { ...state.emails, isFetching: action.payload },
    };
  },
  [callCenterHistorySetQuestionaries.type]: (
    state,
    action: { payload: { table: any[]; count: number } }
  ) => {
    return {
      ...state,
      questionaries: { ...state.questionaries, ...action.payload },
    };
  },
  [callCenterHistorySetQuestionariesPage.type]: (
    state,
    action: { payload: number }
  ) => {
    return {
      ...state,
      questionaries: { ...state.questionaries, currentPage: action.payload },
    };
  },
  [callCenterHistorySetQuestionariesSorting.type]: (
    state,
    action: { payload: string }
  ) => {
    return {
      ...state,
      questionaries: {
        ...state.questionaries,
        currentPage: 0,
        sorting: action.payload,
      },
    };
  },
  [callCenterHistorySetQuestionariesFetching.type]: (
    state,
    action: { payload: boolean }
  ) => {
    return {
      ...state,
      questionaries: { ...state.questionaries, isFetching: action.payload },
    };
  },
  [callCenterHistorySetActivityFilters.type]: (
    state,
    action: { payload: IActivityFilters }
  ) => {
    return {
      ...state,
      activityFilters: action.payload,
    };
  },
  [callCenterHistorySetActivities.type]: (
    state,
    action: { payload: { table: any[]; count: number } }
  ) => {
    return {
      ...state,
      activities: { ...state.activities, ...action.payload },
    };
  },
  [callCenterHistorySetActivityPage.type]: (
    state,
    action: { payload: number }
  ) => {
    return {
      ...state,
      activities: { ...state.activities, currentPage: action.payload },
    };
  },
  [callCenterHistorySetActivityFetching.type]: (
    state,
    action: { payload: boolean }
  ) => {
    return {
      ...state,
      activities: { ...state.activities, isFetching: action.payload },
    };
  },
  [callCenterHistorySetActivitySorting.type]: (
    state,
    action: { payload: string }
  ) => {
    return {
      ...state,
      activities: {
        ...state.activities,
        currentPage: 0,
        sorting: action.payload,
      },
    };
  },

  [callCenterHistorySetInterviewers.type]: (
    state,
    action: { payload: IInterviewer[] }
  ) => {
    return {
      ...state,
      interviewers: action.payload,
    };
  },

  [reportsSetVoterQuests.type]: (
    state,
    action: { payload: { table: any[]; count: number } }
  ) => {
    return {
      ...state,
      voterQuests: { ...state.voterQuests, ...action.payload },
    };
  },
  [reportsSetVoterQuestsPage.type]: (
    state,
    action: { payload: number }
  ) => {
    return {
      ...state,
      voterQuests: { ...state.voterQuests, currentPage: action.payload },
    };
  },
  [reportsSetVoterQuestsPage.type]: (
    state,
    action: { payload: number }
  ) => {
    return {
      ...state,
      voterQuests: { ...state.voterQuests, currentPage: action.payload },
    };
  },
  [reportsSetVoterQuestsFetching.type]: (
    state,
    action: { payload: boolean }
  ) => {
    return {
      ...state,
      voterQuests: { ...state.voterQuests, isFetching: action.payload },
    };
  },
  [reportsSetVoterQuestsSorting.type]: (
    state,
    action: { payload: string }
  ) => {
    return {
      ...state,
      voterQuests: {
        ...state.voterQuests,
        currentPage: 0,
        sorting: action.payload,
      },
    };
  },
  //Clear state after logout
  [userLogout.type]: (state) => {
    return {
      ...initialState,
    };
  },
});

export default callCenterHistory;
