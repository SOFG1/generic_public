import { createReducer } from "@reduxjs/toolkit";
import { historyApplyFilters, historySetActions, historySetNumberOfActions, historySetPage, historySetSorting } from "./actions";
import { IHistoryState, IHistoryAction } from "./types";
import { userLogout } from "../user";

const initialState: IHistoryState = {
    actions: [],
    numberOfActions: 0,
    sorting: '',
    filters: {},
    currentPage: 0
}

export const itemsPerPageHistory = 20

const history = createReducer(initialState, {
    [historySetActions.type]: (state, action: { payload: IHistoryAction[] }) => {
        return {
            ...state,
            actions: action.payload
        }
    },
    [historyApplyFilters.type]: (state, action: { payload: any }) => {
        return {
            ...state,
            currentPage: 0,
            filters: action.payload
        }
    },
    [historySetPage.type]: (state, action: { payload: number }) => {
        return {
            ...state,
            currentPage: action.payload
        }
    },
    [historySetNumberOfActions.type]: (state, action: { payload: number }) => {
        return {
            ...state,
            numberOfActions: action.payload
        }
    },
    [historySetSorting.type]: (state, action: { payload: string }) => {
        return {
            ...state,
            currentPage: 0,
            sorting: action.payload
        }
    },
    //Clear state after logout
    [userLogout.type]: (state) => {
        return {
            ...initialState,
        };
    },
})


export default history;
