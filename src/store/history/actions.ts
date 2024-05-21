import {createAction} from "@reduxjs/toolkit";
import {IHistoryAction} from "./types";

export const historyApplyFilters = createAction<any>('history/applyFilters');
export const historySetActions = createAction<IHistoryAction[]>('history/setActions');
export const historySetPage = createAction<number>('history/setPage');
export const historySetNumberOfActions = createAction<number>('history/setNumberOfActions');
export const historyDownloadActions = createAction('history/downloadActions');
export const historySetSorting = createAction<string>('history/setSorting')