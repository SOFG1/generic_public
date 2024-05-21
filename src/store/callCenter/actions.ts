import {createAction} from "@reduxjs/toolkit";
import { InputValueType } from "../../types";
import {ICallCenterState, IInterviewees, CreateSetAction,
    SendAnswerAction, SendEmailAction, CreateAdAction, DeleteNodeAction,
    SendSmsAction, CreateCampaingAction, CreateAudienceAction, FbNodeType, ApplayFilterType, CallCenterSMSType, IQuestionaries, IFbAccount, IFbCampaings, IFbCreative, IFbAudience, IFbAd} from "./types";


    
export const callCenterGetApplayFilter = createAction('callCenter/getApplayFilter')
export const callCenterSetApplayFilter = createAction<ApplayFilterType>('callCenter/setApplayFilter')

export const callCenterGetSMS = createAction('callCenter/getSMS')
export const callCenterSetSMS = createAction<CallCenterSMSType>('callCenter/setSMS')

export const callCenterGetEmail = createAction('callCenter/getEmail')
export const callCenterSetEmail = createAction<CallCenterSMSType>('callCenter/setEmail')

export const callCenterGetQuestionariesList = createAction('callCenter/getQuestionariesList')
export const callCenterSetQuestionariesList = createAction<IQuestionaries[]>('callCenter/setQuestionariesList')

export const callCenterGetFBAccountList = createAction('callCenter/getFBAccountList')
export const callCenterSetFBAccountList = createAction<IFbAccount[]>('callCenter/setFBAccountList')



export const callCenterGetQuestionariesInterviewees = createAction<string | undefined>('callCenter/getQuestionariesInterviewees')
export const callCenterAddInterviewees = createAction<IInterviewees | null>('callCenter/addInterviewees')
export const callCenterSelectPhone = createAction<string | null>('callCenter/selectInterviewePhone')
export const callCenterSelectQuestionarie = createAction<number>('callCenter/selectQuestionarie')
export const callCenterSendEmail = createAction<SendEmailAction>('callCenter/sendEmail')
export const callCenterSendSms = createAction<SendSmsAction>('callCenter/sendSms')
export const callCenterSendAnswers = createAction<SendAnswerAction>('callCenter/sendAnswers')
export const callCenterSelectFBAccount = createAction<number>('callCenter/selectFBAccount')

export const callCenterGetCampaings = createAction<number>('callCenter/getCampaing')
export const callCenterSetCampaings = createAction<IFbCampaings[]>('callCenter/setCampaing')


export const callCenterGetSets = createAction<number>('callCenter/getSets')
export const callCenterSetSets = createAction<number>('callCenter/setSets')



export const callCenterGetCreatives = createAction<number>('callCenter/getCreatives')
export const callCenterSetCreatives = createAction<IFbCreative[]>('callCenter/setCreatives')


export const callCenterGetAudiences = createAction<number>('callCenter/getAudiences')
export const callCenterSetAudiences = createAction<IFbAudience[]>('callCenter/setAudiences')



export const callCenterGetAds = createAction<number>('callCenter/getAds')
export const callCenterSetAds = createAction<IFbAd[]>('callCenter/setAds')



export const callCenterCreateCampaing = createAction<CreateCampaingAction>('callCenter/createCampaing')
export const callCenterCreateSet = createAction<CreateSetAction>('callCenter/createSet')
export const callCenterCreateCreative = createAction<any>('callCenter/createCreative')
export const callCenterCreateAd = createAction<CreateAdAction>('callCenter/CreateAd')
export const callCenterDelete = createAction<DeleteNodeAction>('callCenter/delete')
export const callCenterSetFetching = createAction<FbNodeType>('callCenter/fetchingAudience')
export const callCenterUpdateField = createAction<{[slug: string]: InputValueType}>('callCenter/updateField')
export const callCenterGetCampaigns = createAction('callCenter/getCampaigns')
export const callCenterSetCampaigns = createAction<any[]>('callCenter/setCampaigns')
export const callCenterSelectAudience = createAction<number | null>('callCenter/selectAudience')




