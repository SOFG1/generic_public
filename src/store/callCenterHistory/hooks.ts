import { useCallback } from "react";
import {
  callCenterHistoryGetFilters,
  callCenterHistoryGetOutgoingSms,
  callCenterHistoryGetIncomingSms,
  callCenterHistoryGetEmails,
  callCenterHistoryDownloadIncomingSms,
  callCenterHistoryDownloadOutgoingSms,
  callCenterHistoryDownloadEmails,
  callCenterHistoryGetQuestionaries,
  callCenterHistorySetQuestionariesPage,
  callCenterHistoryDownloadQuestionaries,
  callCenterHistorySetOutgoingPage,
  callCenterHistorySetIncomingPage,
  callCenterHistorySetEmailsPage,
  callCenterHistorySetOutgoingSorting,
  callCenterHistorySetIncomingSorting,
  callCenterHistorySetEmailsSorting,
  callCenterHistorySetQuestionariesSorting,
  callCenterHistorySetActivityFilters,
  callCenterHistorySetActivityPage,
  callCenterHistorySetActivityFetching,
  callCenterHistorySetActivitySorting,
  callCenterHistoryDownloadActivities,
  reportsGetVoterQuests,
  callCenterHistoryDownloadVoter,
  reportsSetVoterQuestsSorting,
  reportsSetVoterQuestsPage,
} from "./actions";
import { rootReducerType } from "../index";
import { useDispatch, useSelector } from "react-redux";
import {
  ICallCenterHistoryState,
  ICallCenterHistoryFilter,
  IQuestionarieFilter,
  IActivityFilters,
} from "./types";

export const callCenterHistorySelector = (state: rootReducerType) =>
  state.callCenterHistory;

export function useCallCenterHistoryState(): ICallCenterHistoryState {
  return useSelector(callCenterHistorySelector);
}

export function useCallCenterHistoryActions() {
  const dispatch = useDispatch();

  const onGetFilters = useCallback(() => {
    dispatch(callCenterHistoryGetFilters());
  }, [dispatch]);

  const onGetOutgoingSms = useCallback(
    (filterParams: ICallCenterHistoryFilter) => {
      dispatch(callCenterHistoryGetOutgoingSms(filterParams));
    },
    [dispatch]
  );

  const onSetOutgoingPage = useCallback(
    (page: number) => {
      dispatch(callCenterHistorySetOutgoingPage(page));
    },
    [dispatch]
  );

  const onSetOutgoingSorting = useCallback(
    (sorting: string) => {
      dispatch(callCenterHistorySetOutgoingSorting(sorting));
    },
    [dispatch]
  );

  const onGetIncomingSms = useCallback(
    (filterParams: ICallCenterHistoryFilter) => {
      dispatch(callCenterHistoryGetIncomingSms(filterParams));
    },
    [dispatch]
  );

  const onSetIncomingPage = useCallback(
    (page: number) => {
      dispatch(callCenterHistorySetIncomingPage(page));
    },
    [dispatch]
  );

  const onSetIncomingSorting = useCallback(
    (sorting: string) => {
      dispatch(callCenterHistorySetIncomingSorting(sorting));
    },
    [dispatch]
  );

  const onGetEmails = useCallback(
    (filterParams: any) => {
      dispatch(callCenterHistoryGetEmails(filterParams));
    },
    [dispatch]
  );

  const onSetEmailsPage = useCallback(
    (page: number) => {
      dispatch(callCenterHistorySetEmailsPage(page));
    },
    [dispatch]
  );

  const onSetEmailsSorting = useCallback(
    (sorting: string) => {
      dispatch(callCenterHistorySetEmailsSorting(sorting));
    },
    [dispatch]
  );

  const onGetQuestionaries = useCallback(
    (filterParams: IQuestionarieFilter) => {
      dispatch(callCenterHistoryGetQuestionaries(filterParams));
    },
    [dispatch]
  );

  const onSetQuestionariesPage = (page: number) => {
    dispatch(callCenterHistorySetQuestionariesPage(page));
  };

  const onSetQuestionariesSorting = (sorting: string) => {
    dispatch(callCenterHistorySetQuestionariesSorting(sorting));
  };

  const onDownloadIncomingSms = useCallback(
    (filterParams: ICallCenterHistoryFilter) => {
      dispatch(callCenterHistoryDownloadIncomingSms(filterParams));
    },
    [dispatch]
  );

  const onDownloadOutgoingSms = useCallback(
    (filterParams: ICallCenterHistoryFilter) => {
      dispatch(callCenterHistoryDownloadOutgoingSms(filterParams));
    },
    [dispatch]
  );

  const onDownloadEmails = useCallback(
    (filterParams: any) => {
      dispatch(callCenterHistoryDownloadEmails(filterParams));
    },
    [dispatch]
  );

  const onDownloadQuestionaries = (filterData: IQuestionarieFilter) => {
    dispatch(callCenterHistoryDownloadQuestionaries(filterData));
  };

  const onSetActivityFilters = (filters: IActivityFilters) => {
    dispatch(callCenterHistorySetActivityFilters(filters))
  }

  const onSetActivityPage = (page: number) => {
    dispatch(callCenterHistorySetActivityPage(page))
  }

  const onSetActivityFetching = (isFetching: boolean) => {
    dispatch(callCenterHistorySetActivityFetching(isFetching))
  }


  const onSetActivitySorting = (sorting: string) => {
    dispatch(callCenterHistorySetActivitySorting(sorting))
  }

  const onDownloadActivities = () => {
    dispatch(callCenterHistoryDownloadActivities())
  }


  const onGetQuestsReports = (filterParams: IQuestionarieFilter) => {
    dispatch(reportsGetVoterQuests(filterParams))
  }

  const onDownloadVoterQuests = (filterParams: IQuestionarieFilter) => {
    dispatch(callCenterHistoryDownloadVoter(filterParams))
  }


  const onSetVoterSorting = (sorting: string) => {
    dispatch(reportsSetVoterQuestsSorting(sorting))
  }

  const onChangeVoterPage = (page: number) => {
    dispatch(reportsSetVoterQuestsPage(page))
  }



  return {
    onGetFilters,
    onGetOutgoingSms,
    onSetOutgoingPage,
    onSetOutgoingSorting,
    onGetIncomingSms,
    onSetIncomingPage,
    onSetIncomingSorting,
    onGetEmails,
    onSetEmailsPage,
    onSetEmailsSorting,
    onGetQuestionaries,
    onSetQuestionariesSorting,
    onDownloadOutgoingSms,
    onDownloadIncomingSms,
    onDownloadEmails,
    onDownloadQuestionaries,
    onSetQuestionariesPage,
    onSetActivityFilters,
    onSetActivityPage,
    onSetActivityFetching,
    onSetActivitySorting,
    onDownloadActivities,
    onGetQuestsReports,
    onDownloadVoterQuests,
    onSetVoterSorting,
    onChangeVoterPage
  };
}
