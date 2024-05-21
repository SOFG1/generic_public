import { createReducer } from "@reduxjs/toolkit";
import {
  IFields,
  IFilters,
  IModellingData,
  IRawDataState,
  IRawDataStats,
  ITableColumn,
} from "./types";
import {
  rawDataAddFields,
  rawDataAddFilters,
  rawDataApplyFilters,
  rawDataAddStats,
  rawDataAddTable,
  rawDataAddTableColumns,
  rawDataChangeModellingData,
  rawDataDeleteRow,
  rawDataResetSort,
  rawDataSelectPage,
  rawDataSelectSort,
  rawDataToggleStatsFetching,
  rawDataToggleTableFetching,
  rawDataUpdateRowStatus,
  rawDataChangeFilters,
  rawDataSetStatuses,
} from "./actions";
import { convertFiltersData } from "../../utils/convertFiltersData";
import { userLogout } from "../user";
import { IStatus } from "../settings";

const initialModellingData = {
  filterId: 0,
  proValues: [],
  antiValues: [],
  selectedTextual: [],
  selectedNumeric: []
}

const initialState: IRawDataState = {
  filters: [],
  tableColumns: [],
  fields: [],
  appliedFilters: {},
  filtersValues: {},
  sortBy: { slug: "", direction: null },
  currentPage: 0,
  limit: 20,
  count: 0,
  table: [],
  isFetchingStats: false,
  isFetchingTable: false,
  stats: {
    gender_stat: [],
    city_stat: [],
    age_stat: [],
    status_stat: [],
    status_prediction_stat: []
  },
  modellingData: initialModellingData,
  statuses: []
};

const rawData = createReducer(initialState, {
  [rawDataAddFilters.type]: (state, action: { payload: IFilters[] }) => {
    return {
      ...state,
      filters: [...action.payload],
    };
  },
  [rawDataAddTableColumns.type]: (
    state,
    action: { payload: { name: string; slug: string }[] }
  ) => {
    return {
      ...state,
      tableColumns: [...action.payload],
    };
  },
  [rawDataAddFields.type]: (state, action: { payload: IFields[] }) => {
    return {
      ...state,
      fields: [...action.payload],
    };
  },
  [rawDataSelectSort.type]: (state, action: { payload: string }) => {
    const isDefaultDirection =
      action.payload !== state.sortBy.slug || state.sortBy.direction === "DESC";
    return {
      ...state,
      currentPage: 0, //Reset current page when sorting has been changed
      sortBy: {
        slug: action.payload,
        direction: isDefaultDirection ? "ASC" : "DESC",
      },
    };
  },
  [rawDataResetSort.type]: (state) => {
    return {
      ...state,
      currentPage: 0, //Reset current page when sorting has been changed
      sortBy: { slug: "", direction: null },
    };
  },
  [rawDataSelectPage.type]: (state, action: { payload: number }) => {
    return {
      ...state,
      currentPage: action.payload,
    };
  },
  [rawDataAddTable.type]: (
    state,
    action: { payload: { columns: ITableColumn[]; count: number } }
  ) => {
    return {
      ...state,
      table: action.payload.columns,
      count: action.payload.count,
    };
  },
  [rawDataApplyFilters.type]: (
    state) => {

    const copy = { ...state.filtersValues }
    if (typeof copy.keywords === "string" && copy.keywords.length < 3) {
      delete copy.keywords
    }
    return {
      ...state,
      currentPage: 0, //Reset current page when filters has been applied
      appliedFilters: convertFiltersData(state.filtersValues as Object),
    };
  },
  [rawDataChangeFilters.type]: (state, action: { payload: { [key: string]: any } }) => {
    return {
      ...state,
      filtersValues: action.payload,
    };
  },
  [rawDataAddStats.type]: (state, action: { payload: IRawDataStats }) => {
    return {
      ...state,
      stats: { ...action.payload },
    };
  },
  [rawDataDeleteRow.type]: (state, action: { payload: string }) => {
    return {
      ...state,
      table: [
        ...state.table.filter((row: ITableColumn) => row.id !== action.payload),
      ],
    };
  },
  [rawDataToggleStatsFetching.type]: (state, action: { payload: boolean }) => {
    return {
      ...state,
      isFetchingStats: action.payload,
    };
  },
  [rawDataToggleTableFetching.type]: (state, action: { payload: boolean }) => {
    return {
      ...state,
      isFetchingTable: action.payload,
    };
  },
  [rawDataUpdateRowStatus.type]: (state, action: { payload: { id: string, status: string } }) => {
    const index = state.table.findIndex(r => r.id === action.payload.id)
    const copy = [...state.table]
    copy[index] = {
      ...copy[index],
      status: action.payload.status
    }
    return {
      ...state,
      table: copy
    };
  },
  [rawDataChangeModellingData.type]: (state, action: { payload: { key: keyof IModellingData, value: number | string[] } }) => {
    return {
      ...state,
      modellingData: {
        ...state.modellingData,
        [action.payload.key]: action.payload.value
      }
    };
  },
  [rawDataSetStatuses.type]: (state, action: { payload: IStatus[] }) => {
    return {
      ...state,
      statuses: action.payload,
    };
  },
  //Clear state after logout
  [userLogout.type]: (state) => {
    return {
      ...initialState,
    };
  },
});

export default rawData;
