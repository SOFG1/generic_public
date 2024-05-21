import { createAction } from "@reduxjs/toolkit";
import { StaticDataType, TableItemType } from "./types";

export const volunteersSetIsFetching = createAction<boolean>('volunteers/setIsFetching')

export const volunteersGetStaticData = createAction('volunteers/getStaticData')
export const volunteersSetStaticData = createAction<StaticDataType>('volunteers/setStaticData')

export const volunteersCreateActivity = createAction<{[key: string]: string}>('volunteers/CreateActivity')

export const volunteersAssignActivity = createAction<{activity_id: number, assignees: string[]}>('volunteers/assignActivity')

export const volunteersApplyFilters = createAction<{[key: string]: string}>('volunteers/applyFilters')

export const volunteersGetTable = createAction('volunteers/getTable')
export const volunteersSetTable = createAction<{totalCount: number, tableData: TableItemType[]}>('volunteers/setTable')
export const volunteersSetTablePage = createAction<number>('volunteers/setTablePage')

export const volunteersDeleteRow = createAction<number>('volunteer/deleteRow')
export const volunteersRemoveRow = createAction<number>('volunteer/removeRow')


export const volunteersDownloadTable = createAction('volunteers/downloadTable')

