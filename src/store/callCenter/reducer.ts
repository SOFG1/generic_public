import { createReducer } from "@reduxjs/toolkit";
import {
  ICallCenterState,
  IInterviewees,
  DeleteNodeAction,
  FbNodeType,
  ApplayFilterType,
  CallCenterSMSType,
  CallCenterEmailType,
  IQuestionaries,
  IFbAccount,
  IFbCampaings,
  IFbSet,
  IFbAudience,
  IFbAd,
} from "./types";
import {
  callCenterAddInterviewees,
  callCenterSelectQuestionarie,
  callCenterSetFetching,
  callCenterSelectFBAccount,
  callCenterDelete,
  callCenterSelectPhone,
  callCenterSetCampaigns,
  callCenterSetApplayFilter,
  callCenterSetSMS,
  callCenterSetEmail,
  callCenterSetQuestionariesList,
  callCenterSetFBAccountList,
  callCenterSetCampaings,
  callCenterSetSets,
  callCenterSetCreatives,
  callCenterSetAudiences,
  callCenterSetAds,
  callCenterSelectAudience,
} from "./actions";
import { userLogout } from "../user";

const initialState: ICallCenterState = {
  applayFilter: {
    phone_count: 0,
    email_count: 0,
  },
  email: {
    from: [],
    quota: 0,
  },
  sms: {
    from: [],
    permanent_recipients: [],
  },
  selectedQuestionarieId: 0,
  selectedAudienceId: null,
  selectedIntervieweeNumber: null,
  questionariesList: [],
  interviewees: null,
  selectedFBAccount: 0,
  FBAccountList: [],
  FBCampaings: [],
  FBSets: [],
  FBAudiences: [],
  FBCreatives: [],
  FBAds: [],
  campaigns: [],
  isFetching: null,
};

const callCenter = createReducer(initialState, {
  [callCenterSetApplayFilter.type]: (
    state,
    action: { payload: ApplayFilterType }
  ) => {
    return {
      ...state,
      applayFilter: action.payload,
    };
  },
  [callCenterSetSMS.type]: (state, action: { payload: CallCenterSMSType }) => {
    return {
      ...state,
      sms: action.payload,
    };
  },
  [callCenterSetEmail.type]: (
    state,
    action: { payload: CallCenterEmailType }
  ) => {
    return {
      ...state,
      email: action.payload,
    };
  },
  [callCenterSetQuestionariesList.type]: (
    state,
    action: { payload: IQuestionaries[] }
  ) => {
    return {
      ...state,
      questionariesList: action.payload,
    };
  },
  [callCenterSetFBAccountList.type]: (
    state,
    action: { payload: IFbAccount[] }
  ) => {
    return {
      ...state,
      FBAccountList: action.payload,
    };
  },
  [callCenterSetCampaings.type]: (
    state,
    action: { payload: IFbCampaings[] }
  ) => {
    return {
      ...state,
      FBCampaings: action.payload,
    };
  },
  [callCenterSetSets.type]: (state, action: { payload: IFbSet[] }) => {
    return {
      ...state,
      FBSets: action.payload,
    };
  },
  [callCenterSetCreatives.type]: (state, action: { payload: IFbSet[] }) => {
    return {
      ...state,
      FBCreatives: action.payload,
    };
  },
  [callCenterSetAudiences.type]: (state, action: { payload: IFbAudience[] }) => {
    return {
      ...state,
      FBAudiences: action.payload,
    };
  },
  [callCenterSetAds.type]: (state, action: { payload: IFbAd[] }) => {
    return {
      ...state,
      FBAds: action.payload,
    };
  },
  [callCenterAddInterviewees.type]: (
    state,
    action: { payload: IInterviewees }
  ) => {
    return {
      ...state,
      interviewees: { ...action.payload } || null,
    };
  },
  [callCenterSelectQuestionarie.type]: (state, action: { payload: number }) => {
    return {
      ...state,
      selectedQuestionarieId: action.payload,
    };
  },
  [callCenterSelectPhone.type]: (state, action: { payload: string | null }) => {
    return {
      ...state,
      selectedIntervieweeNumber: action.payload,
    };
  },
  [callCenterSelectFBAccount.type]: (state, action: { payload: number }) => {
    return {
      ...state,
      selectedFBAccount: action.payload,
    };
  },
  [callCenterDelete.type]: (state, action: { payload: DeleteNodeAction }) => {
    return {
      ...state,
      FBCampaings: state.FBCampaings.filter(
        (item) => item.id != action.payload.id
      ),
      FBSets: state.FBSets.filter((item) => item.id != action.payload.id),
      FBAudiences: state.FBAudiences.filter(
        (item) => item.id != action.payload.id
      ),
      FBCreatives: state.FBCreatives.filter(
        (item) => item.id != action.payload.id
      ),
      FBAds: state.FBAds.filter((item) => item.id != action.payload.id),
    };
  },
  [callCenterSetFetching.type]: (state, action: { payload: FbNodeType }) => {
    return {
      ...state,
      isFetching: action.payload,
    };
  },
  [callCenterSetCampaigns.type]: (state, action: { payload: any[] }) => {
    return {
      ...state,
      campaigns: action.payload,
    };
  },
  [callCenterSelectAudience.type]: (state, action: { payload: number | null }) => {
    return {
      ...state,
      selectedAudienceId: action.payload,
    };
  },
  //Clear state after logout
  [userLogout.type]: (state) => {
    return {
      ...initialState,
    };
  },
});

export default callCenter;
