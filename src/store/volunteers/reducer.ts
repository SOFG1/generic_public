import { createReducer } from "@reduxjs/toolkit";
import {
  volunteersApplyFilters,
  volunteersRemoveRow,
  volunteersSetIsFetching,
  volunteersSetStaticData,
  volunteersSetTable,
  volunteersSetTablePage,
} from "./actions";
import { IVolunteersState, TableItemType } from "./types";
import { userLogout } from "../user";

export const ItemsCountPerPage = 20

const initialState: IVolunteersState = {
  appliedFilters: {},
  staticData: {
    activity: [],
    topics: [],
  },
  tableData: [],
  tableTotalCount: 0,
  tableCurrentPage: 0,
  isFetching: false,
};

const volunteers = createReducer(initialState, {
  [volunteersSetStaticData.type]: (state, action: { payload: any }) => {
    return {
      ...state,
      staticData: action.payload,
    };
  },
  [volunteersSetIsFetching.type]: (state, action: { payload: boolean }) => {
    return {
      ...state,
      isFetching: action.payload,
    };
  },
  [volunteersApplyFilters.type]: (
    state,
    action: { payload: { [key: string]: string } }
  ) => {
    return {
      ...state,
      appliedFilters: action.payload,
      //Set current page to 0 beacause fitlers changed
      tableCurrentPage: 0
    };
  },
  [volunteersSetTable.type]: (
    state,
    action: { payload: { totalCount: number; tableData: TableItemType[] } }
  ) => {
    return {
      ...state,
      tableData: action.payload.tableData,
      tableTotalCount: action.payload.totalCount
    };
  },
  [volunteersSetTablePage.type]: (
    state,
    action: { payload: number }
  ) => {
    return {
      ...state,
      tableCurrentPage: action.payload,
    };
  },
  [volunteersRemoveRow.type]: (
    state,
    action: { payload: number }
  ) => {
    const withoutDeleted = state.tableData.filter(item => item.id !== action.payload)
    return {
      ...state,
      tableData: withoutDeleted
    };
  },
  //Clear store after logout
  [userLogout.type]: (state) => {
    return {
      ...initialState,
    };
  },

});

export default volunteers;
