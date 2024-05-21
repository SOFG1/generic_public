import { createAction } from "@reduxjs/toolkit";

export const googleAdsGetCustomers = createAction('googleAds/getCustomers')
export const googleAdsSetCustomers = createAction<any[]>('googleAds/setCustomers')

export const googleAdsSelectCustomer = createAction<number>('googleAds/selectCustomer')

export const googleAdsGetCampaigns = createAction('googleAds/getCampaigns')
export const googleAdsSetCampaigns = createAction<any[]>('googleAds/setCampaigns')

export const googleAdsReloadData = createAction('googleAds/reloadhData')
