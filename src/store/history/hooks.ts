import {rootReducerType} from "../index";
import {IHistoryState} from "./types";
import {useDispatch, useSelector} from "react-redux";
import { historyDownloadActions, historySetSorting, historyApplyFilters, historySetPage } from "./actions";

export const historySelector = (state:rootReducerType) => state.history

export function useHistoryState(): IHistoryState {
    return useSelector(historySelector)
}

export function useHistoryActions() {
    const dispatch = useDispatch()

    const onApplyFilters = (filters: any) => {
        dispatch(historyApplyFilters(filters))
    }

    const onSetCurrentPage = (page: number) => {
        dispatch(historySetPage(page))
    }

    const onSetSorting = (sorting: string) => {
        dispatch(historySetSorting(sorting))
    }

    const onDownloadActions = () => {
        dispatch(historyDownloadActions())
    }

    return {
        onApplyFilters,
        onSetCurrentPage,
        onDownloadActions,
        onSetSorting,
    }
}








