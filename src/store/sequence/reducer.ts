import {SequenceInitialState} from "./types";
import {createReducer} from "@reduxjs/toolkit";
import {sequenceSetAudience, sequenceSetCampaigns, sequenceSetIsFetching} from "./actions";

const initialState:SequenceInitialState = {
    isFetching:false,
    campaigns:[],
    audience:[],
}

const sequence = createReducer(initialState, {
    [sequenceSetIsFetching.type]:(state, action:{payload:boolean})=>{
        return {
            ...state,
            isFetching:action.payload,
        }
    },
    [sequenceSetCampaigns.type]:(state, action:{payload:string[]})=>{
        return {
            ...state,
            campaigns:action.payload
        }
    },
    [sequenceSetAudience.type]:(state, action:{payload:string[]})=>{
        return{
            ...state,
            audience:action.payload,
        }
    }
})

export default sequence
