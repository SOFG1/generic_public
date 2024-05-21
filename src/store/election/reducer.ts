import { createReducer } from "@reduxjs/toolkit";
import {
  electionSetFilters,
  electionSetKpi,
  electionSetVotingRate,
  electionSetCityValue,
  electionSetTableSort,
  electionSetTable,
  setIsFetchingTable,
  setIsFetchingKPI,
  setIsFetchingRate,
  electionSetTablePage,
  electionSetPagesCount,
  electionSetMap,
  electionSetGenderStat,
  electionResetTableSort
} from "./actions";
import { IElectionState, IFilters, IKPI, IMapPoint, ITableCity, IVotingRate } from "./types";
import { userLogout } from "../user";



export const electionTableItemsPerPage = 50

const initialState: IElectionState = {
  filterCity: "",
  tableSortBy: { sortedTitle: "", direction: null },
  table: [],
  currentPage: 0,
  pagesCount: 0,
  mapPoints: [],
  kpi: {
    voters: 0,
    voted_for: 0,
    voters_per: 0,
    expected: 0,
  },
  stats: {
    gender_stat: []
  },
  filters: {
    city: [],
  },
  votingRate: {
    all_bingo: 0,
    voting_rate: 0,
  },
  isFetchingTable: false,
  isFetchingKPI: false,
  isFetchingRate: false
};

const electionReducer = createReducer(initialState, {
  [electionSetCityValue.type]: (state, action: { payload: string }) => {
    return {
      ...state,
      filterCity: action.payload,
    };
  },
  [electionSetFilters.type]: (state, action: { payload: IFilters }) => {
    return {
      ...state,
      filters: action.payload,
    };
  },
  [electionSetKpi.type]: (state, action: { payload: IKPI }) => {
    return {
      ...state,
      kpi: action.payload,
    };
  },
  [electionSetGenderStat.type]: (state, action: { payload: any[] }) => {
    return {
      ...state,
      stats: { ...state.stats, gender_stat: action.payload }
    };
  },
  [electionSetVotingRate.type]: (state, action: { payload: IVotingRate }) => {
    return {
      ...state,
      votingRate: action.payload,
    };
  },
  [electionSetTableSort.type]: (state, action: { payload: string }) => {
    const isDefaultDirection = (action.payload !== state.tableSortBy.sortedTitle || state.tableSortBy.direction === "DESC")
    return {
      ...state,
      tableSortBy: { sortedTitle: action.payload, direction: isDefaultDirection ? "ASC" : "DESC" }
    };
  },
  [electionResetTableSort.type]: (state) => {
    return {
      ...state,
      tableSortBy: { sortedTitle: "", direction: null }
    };
  },
  [electionSetTable.type]: (state, action: { payload: ITableCity[] }) => {
    return {
      ...state,
      table: action.payload,
    };
  },
  [setIsFetchingTable.type]: (state, action: { payload: boolean }) => {
    return {
      ...state,
      isFetchingTable: action.payload,
    };
  },
  [setIsFetchingKPI.type]: (state, action: { payload: boolean }) => {
    return {
      ...state,
      isFetchingKPI: action.payload,
    };
  },
  [setIsFetchingRate.type]: (state, action: { payload: boolean }) => {
    return {
      ...state,
      isFetchingRate: action.payload,
    };
  },
  [electionSetTablePage.type]: (state, action: { payload: number }) => {
    return {
      ...state,
      currentPage: action.payload,
    };
  },
  [electionSetPagesCount.type]: (state, action: { payload: number }) => {
    return {
      ...state,
      pagesCount: action.payload,
    };
  },
  [electionSetMap.type]: (state, action: { payload: IMapPoint[] }) => {
    return {
      ...state,
      mapPoints: action.payload,
    };
  },
  //Clear state after logout
  [userLogout.type]: (state) => {
    return {
      ...initialState,
    };
  },
});

export default electionReducer;
