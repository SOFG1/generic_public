import { createReducer } from '@reduxjs/toolkit'
import { googleAdsSelectCustomer, googleAdsSetCampaigns, googleAdsSetCustomers } from './actions'
import { IGoogleAdsState } from './types'
import { userLogout } from '../user'

const initialState: IGoogleAdsState = {
    selectedCustomerId: null,
    customers: [],
    campaigns: [],
}

const googleAds = createReducer(initialState, {
    [googleAdsSetCustomers.type]: (state, action: { payload: any[] }) => {
        return {
            ...state,
            customers: action.payload
        }
    },
    [googleAdsSelectCustomer.type]: (state, action: { payload: number }) => {
        return {
            ...state,
            selectedCustomerId: action.payload
        }
    },
    [googleAdsSetCampaigns.type]: (state, action: { payload: any[] }) => {
        return {
            ...state,
            campaigns: action.payload
        }
    },
    //Clear state after logout
    [userLogout.type]: (state) => {
        return {
            ...initialState,
        };
    },
})

export default googleAds;