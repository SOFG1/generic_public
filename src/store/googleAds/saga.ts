import { call, put, select, takeLatest, takeLeading } from "redux-saga/effects";
import { handle } from "../../api";
import { GoogleAds } from "../../api/googleAds";
import { userSelector } from "../user";
import { googleAdsGetCampaigns, googleAdsGetCustomers, googleAdsReloadData, googleAdsSelectCustomer, googleAdsSetCampaigns, googleAdsSetCustomers } from "./actions";
import { googleAdsSelector } from "./hooks";

export function* googleAdsWatcher() {
    yield takeLatest(googleAdsGetCustomers, getCustomers)
    yield takeLatest([googleAdsSelectCustomer,googleAdsGetCampaigns], getCampaigns)    
    yield takeLeading(googleAdsReloadData, reloadData)    
    
}

function* getCustomers(): any {
    const {token} = yield select(userSelector)
    if (token) {
        const [dataRes, dataErr] = yield call(handle, GoogleAds.getCustomers(token))
        if (dataRes) {
            yield put(googleAdsSetCustomers(dataRes))
        }
        if (dataErr) {
            console.log(dataErr)
        }
    }
}

function* getCampaigns(): any {
    const {token} = yield select(userSelector)
    const {selectedCustomerId} = yield select(googleAdsSelector)
    if (token && selectedCustomerId) {
        const [dataRes, dataErr] = yield call(handle, GoogleAds.getCampaigns(token, selectedCustomerId))
        if (dataRes) {
            yield put(googleAdsSetCampaigns(dataRes))
        }
        if (dataErr) {
            console.log(dataErr)
        }
    }
}

function* reloadData():any {
    const {token} = yield select(userSelector)
    if (token) {
        const [dataRes, dataErr] = yield call(handle, GoogleAds.reloadData(token))
        if (!dataErr) {
            yield put(googleAdsGetCustomers())
            yield put(googleAdsGetCampaigns())
        }
        if (dataErr) {
            console.log(dataErr)
        }
    }

}