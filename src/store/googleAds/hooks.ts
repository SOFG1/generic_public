import { useDispatch, useSelector } from "react-redux";
import { rootReducerType } from "..";
import { googleAdsGetCampaigns, googleAdsGetCustomers, googleAdsReloadData, googleAdsSelectCustomer } from "./actions";

export const googleAdsSelector = (state: rootReducerType) => state.googleAds

export const useGoogleAdsState = () => useSelector(googleAdsSelector)

export const useGoogleAdsActions = () => {
  const dispatch = useDispatch()

  const onGetCustomers = () => {
    dispatch(googleAdsGetCustomers())
  }

 const onSelectCustomer = (customerId: number) => {
    dispatch(googleAdsSelectCustomer(customerId))
  }

  const onGetCampaigns = () => {
    dispatch(googleAdsGetCampaigns())
  }

  const onRefreshData = () => {
    dispatch(googleAdsReloadData())
  }


  return {
    onGetCustomers,
    onGetCampaigns,
onSelectCustomer,
onRefreshData
  }
}