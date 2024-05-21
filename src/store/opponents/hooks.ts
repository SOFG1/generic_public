import { useDispatch, useSelector } from "react-redux";
import { rootReducerType } from "..";
import { opponentsResetOnSearch, opponentsGetGTrends, opponentsSetAlreadySearched, opponentsSetCountryFilter, opponentsSetDaysFilter, opponentsSetSearchKeyword, opponentsSetSelectedOpponents, opponentsResetAll, opponentsResetSelected, opponentsSetData } from "./actions";
import { IOpponentsState, OpponentOrderType } from "./types";

export const opponentsSelector = (state:rootReducerType) => state.opponents

export const useOpponentsState = (): IOpponentsState => useSelector(opponentsSelector)

export const useOpponentsActions = () => {
    const dispatch = useDispatch()

    const onSetDaysFilter = (period: number) => {
        dispatch(opponentsSetDaysFilter(period))
    }

    const onSetCountryFilter = (id: number) => {
        dispatch(opponentsSetCountryFilter(id))
    }

    const onSetSearchKeyword = (word: string, order: OpponentOrderType) => {
        dispatch(opponentsSetSearchKeyword({word, order}))  
    }


    const onSelectOpponent = (opponent: any, order: OpponentOrderType) => {
        dispatch(opponentsSetSelectedOpponents({opponent,order}))
    }


    //This function resets all data except serch query 
    const resetOnSearch = (order: OpponentOrderType) => {
        dispatch(opponentsResetOnSearch(order))
    }

    //This function resets all data in opponents except current search query and countries dropdown
    const onResetAll = () => {
        dispatch(opponentsResetAll())
    }

    //This function resets data only for current order
    const onResetSelected = (order: OpponentOrderType) => {
        dispatch(opponentsResetSelected(order))
    }


    const onGetGtrends = () => {
        dispatch(opponentsGetGTrends())
    }

    const onSetAlreadySearched = (searched: boolean) => {
        dispatch(opponentsSetAlreadySearched(searched))
    }


    const onSetOpponentsData = (order: OpponentOrderType, data: any) => {
        dispatch(opponentsSetData({data, order}))
    }

    return {
        onSetDaysFilter,
        onSetCountryFilter,
        onSelectOpponent,
        resetOnSearch,
        onGetGtrends,
        onSetSearchKeyword,
        onSetAlreadySearched,
        onResetAll,
        onResetSelected,
        onSetOpponentsData
    }
}
