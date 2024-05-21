import {rootReducerType} from "../index";

export const sequenceSelectIsFetching = (state:rootReducerType)=>state.sequence.isFetching;
export const sequenceSelectCampaigns = (state:rootReducerType)=>state.sequence.campaigns;
export const sequenceSelectAudience = (state:rootReducerType)=>state.sequence.audience
