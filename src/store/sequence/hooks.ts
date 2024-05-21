import {useDispatch} from "react-redux";
import {useCallback} from "react";
import {sequenceGetAudience, sequenceGetCampaigns} from "./actions";

export const useSequenceActions = ()=>{
    const dispatch = useDispatch();
    const onGetCampaigns = useCallback(()=>{
        dispatch(sequenceGetCampaigns())
    },[dispatch]);
    const onGetAudience = useCallback(()=>{
        dispatch(sequenceGetAudience());
    },[dispatch])

    return {
        onGetCampaigns,
        onGetAudience
    }
}


