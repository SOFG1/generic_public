import { createAction } from "@reduxjs/toolkit";
import {
  IActivityFilters,
  ICallCenterHistoryFilter,
  IInterviewer,
  IQuestionarieFilter,
} from "./types";

export const callCenterHistoryGetFilters = createAction<void>(
  "callCenterHistory/getFilters"
);
export const callCenterHistoryAddFilters = createAction<any>(
  "callCenterHistory/addFilters"
);

//Outgoing
export const callCenterHistoryGetOutgoingSms =
  createAction<ICallCenterHistoryFilter>("callCenterHistory/getOutgoingSms");
export const callCenterHistorySetOutgoingPage = createAction<number>(
  "callCenterHistory/setOutgoingPage"
);
export const callCenterHistorySetOutgoingSms = createAction<{
  table: any[];
  count: number;
}>("callCenterHistory/setOutgoingSms");
export const callCenterHistorySetOutgoingFetching = createAction<boolean>(
  "callCenterHistory/setOutgoingFetching"
);
export const callCenterHistorySetOutgoingSorting = createAction<string>(
  "callCenterHistory/setOutgoingSorting"
);

//Incoming
export const callCenterHistoryGetIncomingSms =
  createAction<ICallCenterHistoryFilter>("callCenterHistory/getIncomingSms");
export const callCenterHistorySetIncomingPage = createAction<number>(
  "callCenterHistory/setIncomingPage"
);
export const callCenterHistorySetIncomingSms = createAction<{
  table: any[];
  count: number;
}>("callCenterHistory/setIncomingSms");
export const callCenterHistorySetIncomingFetching = createAction<boolean>(
  "callCenterHistory/setIncomingFetching"
);
export const callCenterHistorySetIncomingSorting = createAction<string>(
  "callCenterHistory/setIncomingSorting"
);

//Emails
export const callCenterHistoryGetEmails = createAction<any>(
  "callCenterHistory/getEmails"
);
export const callCenterHistorySetEmailsPage = createAction<number>(
  "callCenterHistory/setEmailsPage"
);
export const callCenterHistorySetEmails = createAction<{
  table: any[];
  count: number;
}>("callCenterHistory/setEmails");
export const callCenterHistorySetEmailsFetching = createAction<boolean>(
  "callCenterHistory/setEmailsFetching"
);
export const callCenterHistorySetEmailsSorting = createAction<string>(
  "callCenterHistory/setEmailsSorting"
);

//Questionaries
export const callCenterHistoryGetQuestionaries =
  createAction<IQuestionarieFilter>("callCenterHistory/getQuestionaries");
export const callCenterHistorySetQuestionaries = createAction<{
  table: any[];
  count: number;
}>("callCenterHistory/setQuestionaries");
export const callCenterHistorySetQuestionariesPage = createAction<number>(
  "callCenterHistory/setQuestionariesPage"
);
export const callCenterHistorySetQuestionariesFetching = createAction<boolean>(
  "callCenterHistory/setQuestionariesFetching"
);
export const callCenterHistorySetQuestionariesSorting = createAction<string>(
  "callCenterHistory/setQuestioinariesSorting"
);

//Activity
export const callCenterHistorySetActivityFilters =
  createAction<IActivityFilters>("callCenterHistory/setActivityFilters");

export const callCenterHistorySetActivities = createAction<{
  table: any[];
  count: number;
}>("callCenterHistory/setActivities");

export const callCenterHistorySetActivityPage = createAction<number>(
  "callCenterHistory/setActivityPage"
);

export const callCenterHistorySetActivityFetching = createAction<boolean>(
  "callCenterHistory/setActivityFetching"
);

export const callCenterHistorySetActivitySorting = createAction<string>(
  "callCenterHistory/setActivitySorting"
);


//Downloads
export const callCenterHistoryDownloadIncomingSms =
  createAction<ICallCenterHistoryFilter>(
    "callCenterHistory/downloadIncomingSms"
  );
export const callCenterHistoryDownloadOutgoingSms =
  createAction<ICallCenterHistoryFilter>(
    "callCenterHistory/downloadOutgoingSms"
  );
export const callCenterHistoryDownloadEmails = createAction<any>(
  "callCenterHistory/downloadEmails"
);
export const callCenterHistoryDownloadQuestionaries =
  createAction<IQuestionarieFilter>("callCenterHistory/downloadQuestionaries");

export const callCenterHistoryDownloadActivities = createAction(
  "callCenterHistory/downloadActivities"
);

export const callCenterHistoryDownloadVoter = createAction<IQuestionarieFilter>(
  "callCenterHistory/downloadVoter"
);


//Interviewers
export const callCenterHistorySetInterviewers = createAction<IInterviewer[]>(
  "callCenterHistory/setInterviewers"
);



//Voter questionnaires
export const reportsGetVoterQuests = createAction<IQuestionarieFilter>("reports/getVoterQuests")
export const reportsSetVoterQuests = createAction<{
  table: any[];
  count: number;
}>("reports/setVoterQuests");

export const reportsSetVoterQuestsPage = createAction<number>(
  "callCenterHistory/setVoterQuestsPage"
);

export const reportsSetVoterQuestsFetching = createAction<boolean>(
  "callCenterHistory/setVoterQuestsFetching"
);


export const reportsSetVoterQuestsSorting = createAction<string>(
  "callCenterHistory/setQuestionariesSorting"
);