import { STORAGE_SENTIMENTOR_FILTERS_KEY } from "../config/409LocalStorageFiltersKey"



//This function clears local storage except monitoring filters for kalman
export const clearLocalStorage = () => {
    [...Array(localStorage.length)].forEach((o, i) => {
        const key = localStorage.key(i) as string
        //Remove all keys except these persisted filters
        if(!key?.includes(STORAGE_SENTIMENTOR_FILTERS_KEY)) {
            localStorage.removeItem(key)
        }
    })
}