import {createAction} from "@reduxjs/toolkit";

export const sequenceSetIsFetching = createAction("sequence/setIsFetching");
export const sequenceGetCampaigns = createAction("sequence/getCampaigns");
export const sequenceGetAudience = createAction("sequence/getAudience");
export const sequenceSetCampaigns = createAction<any[]>("sequence/setCampaigns");
export const sequenceSetAudience = createAction<any[]>("sequence/setAudience");
