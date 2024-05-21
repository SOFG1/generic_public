import { rootReducerType } from "../index";
import { useDispatch, useSelector } from "react-redux";
import {
  ICallCenterState,
  SendAnswerAction,
  CreateSetAction,
  SendEmailAction,
  SendSmsAction,
  CreateCampaingAction,
  CreateAudienceAction,
  CreateAdAction,
  DeleteNodeAction,
} from "./types";
import { useCallback } from "react";
import {
  callCenterCreateSet,
  callCenterGetQuestionariesInterviewees,
  callCenterSelectQuestionarie,
  callCenterSendAnswers,
  callCenterSendEmail,
  callCenterSendSms,
  callCenterSelectFBAccount,
  callCenterCreateCampaing,
  callCenterCreateCreative,
  callCenterCreateAd,
  callCenterDelete,
  callCenterUpdateField,
  callCenterSelectPhone,
  callCenterGetCampaigns,
  callCenterGetApplayFilter,
  callCenterGetSMS,
  callCenterGetEmail,
  callCenterGetQuestionariesList,
  callCenterGetFBAccountList,
  callCenterSelectAudience,
} from "./actions";
import { InputValueType } from "../../types";

export const callCenterSelector = (state: rootReducerType) => state.callCenter;

export function useCallCenterState(): ICallCenterState {
  return useSelector(callCenterSelector);
}

export function useCallCenterActions() {
  const dispatch = useDispatch();

  const onGetApplayFilter = useCallback(() => {
    dispatch(callCenterGetApplayFilter())
  }, [dispatch])


  const onGetSMS = useCallback(() => {
    dispatch(callCenterGetSMS())
  }, [dispatch])

  const onGetEmail = useCallback(() => {
    dispatch(callCenterGetEmail())
  }, [dispatch])

  const onGetQuestionariesList = useCallback(() => {
    dispatch(callCenterGetQuestionariesList())
  }, [dispatch])

  const onGetFBAccountList = useCallback(() => {
    dispatch(callCenterGetFBAccountList())
  }, [dispatch])


  const onGetQuestionariesInterviewees = useCallback(
    (unansweredId?: string) => {
      dispatch(callCenterGetQuestionariesInterviewees(unansweredId));
    },
    [dispatch]
  );

  const onSelectIntervieweePhone = useCallback(
    (phone: string | null) => {
      console.log(phone);
      dispatch(callCenterSelectPhone(phone));
    },
    [dispatch]
  );

  const onSelectQuestionarie = useCallback(
    (id: number) => {
      dispatch(callCenterSelectQuestionarie(id));
    },
    [dispatch]
  );

  const onSendEmail = useCallback(
    (data: SendEmailAction) => {
      dispatch(callCenterSendEmail(data));
    },
    [dispatch]
  );

  const onUpdateField = useCallback(
    (data: { [slug: string]: InputValueType }) => {
      dispatch(callCenterUpdateField(data));
    },
    [dispatch]
  );

  const onSendSms = useCallback(
    (data: SendSmsAction) => {
      dispatch(callCenterSendSms(data));
    },
    [dispatch]
  );

  const onSendAnswers = useCallback(
    (data: SendAnswerAction) => {
      dispatch(callCenterSendAnswers(data));
    },
    [dispatch]
  );

  const onSelectFBAccount = useCallback(
    (acc_id: number) => {
      dispatch(callCenterSelectFBAccount(acc_id));
    },
    [dispatch]
  );

  const onCreateCampaing = useCallback(
    (data: CreateCampaingAction) => {
      dispatch(callCenterCreateCampaing(data));
    },
    [dispatch]
  );

  const onCreateSet = useCallback(
    (data: CreateSetAction) => {
      dispatch(callCenterCreateSet(data));
    },
    [dispatch]
  );

  const onCreateCreative = useCallback(
    (data: any) => {
      dispatch(callCenterCreateCreative(data));
    },
    [dispatch]
  );


  const onCreateAd = useCallback(
    (data: CreateAdAction) => {
      dispatch(callCenterCreateAd(data));
    },
    [dispatch]
  );

  const onDeleteNode = useCallback(
    (data: DeleteNodeAction) => {
      dispatch(callCenterDelete(data));
    },
    [dispatch]
  );

  const onGetCampaigns = useCallback(() => {
    dispatch(callCenterGetCampaigns());
  }, [dispatch]);


  const onSelectAudience = (id: number | null) => {
    dispatch(callCenterSelectAudience(id))
  }

  return {
    onGetApplayFilter,
    onGetSMS,
    onGetEmail,
    onGetQuestionariesList,
    onGetFBAccountList,
    onCreateSet,
    onGetQuestionariesInterviewees,
    onSelectIntervieweePhone,
    onSelectQuestionarie,
    onSendEmail,
    onSendSms,
    onCreateCreative,
    onSendAnswers,
    onCreateAd,
    onSelectFBAccount,
    onCreateCampaing,
    onDeleteNode,
    onUpdateField,
    onGetCampaigns,
    onSelectAudience
  };
}
