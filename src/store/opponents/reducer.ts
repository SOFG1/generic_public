import { createReducer } from "@reduxjs/toolkit";
import {
  opponentsResetOnSearch,
  opponentsSetData,
  opponentsSetDaysFilter,
  opponentsSetGTrends,
  opponentsSetSelectedOpponents,
  opponentsSetGTrendsFetching,
  opponentsSetDataFetching,
  opponentsSetCountryFilter,
  opponentsSetSearchKeyword,
  opponentsSetAlreadySearched,
  opponentsResetAll,
  opponentsResetSelected,
} from "./actions";
import {
  IOpponentData,
  IOpponentsState,
  OpponentOrderType,
  SelectOpponentPayloadType,
} from "./types";
import { userLogout } from "../user";

const initialState: IOpponentsState = {
  daysFilter: 90,
  countryFilter: 0,
  searchKeywords: {
    0: "",
    1: "",
    2: "",
    3: "",
  },
  selectedOpponents: {
    0: null,
    1: null,
    2: null,
    3: null,
  },
  opponentsData: {
    0: null,
    1: null,
    2: null,
    3: null,
  },
  opponentGtrends: {},
  isFetchingGTrends: false,
  isFetchingData: false,
  alreadySearched: false,
};

const opponents = createReducer(initialState, {
  [opponentsSetDaysFilter.type]: (state, action: { payload: number }) => {
    return {
      ...state,
      daysFilter: action.payload,
    };
  },
  [opponentsSetCountryFilter.type]: (state, action: { payload: number }) => {
    return {
      ...state,
      countryFilter: action.payload,
    };
  },
  [opponentsSetSearchKeyword.type]: (
    state,
    action: { payload: { word: string; order: OpponentOrderType } }
  ) => {
    return {
      ...state,
      searchKeywords: {
        ...state.searchKeywords,
        [action.payload.order]: action.payload.word,
      },
    };
  },
  [opponentsSetSelectedOpponents.type]: (
    state,
    action: { payload: SelectOpponentPayloadType }
  ) => {
    return {
      ...state,
      selectedOpponents: {
        ...state.selectedOpponents,
        [action.payload.order]: action.payload.opponent,
      },
    };
  },
  [opponentsSetData.type]: (
    state,
    action: {
      payload: { data: IOpponentData | null; order: OpponentOrderType };
    }
  ) => {
    return {
      ...state,
      opponentsData: {
        ...state.opponentsData,
        [action.payload.order]: action.payload.data,
      },
    };
  },
  [opponentsSetGTrends.type]: (state, action: { payload: any }) => {
    return {
      ...state,
      opponentGtrends: action.payload,
    };
  },
  [opponentsSetGTrendsFetching.type]: (state, action: { payload: boolean }) => {
    return {
      ...state,
      isFetchingGTrends: action.payload,
    };
  },
  [opponentsSetDataFetching.type]: (state, action: { payload: boolean }) => {
    return {
      ...state,
      isFetchingData: action.payload,
    };
  },
  [opponentsSetAlreadySearched.type]: (state, action: { payload: boolean }) => {
    return {
      ...state,
      alreadySearched: action.payload,
    };
  },
  [opponentsResetOnSearch.type]: (
    state,
    action: { payload: OpponentOrderType }
  ) => {
    const order = action.payload;
    return {
      ...initialState,
      //Don't reset country filter
      countryFilter: state.countryFilter,
      searchKeywords: {
        ...initialState.searchKeywords,
        [order]: state.searchKeywords[order],
      },
    };
  },
  [opponentsResetSelected.type]: (state, action: { payload: OpponentOrderType }) => {
    const searchKeyword = state.searchKeywords[action.payload]
    //Delete GTrends data for this order
    const gTrendsCopy = { ...state.opponentGtrends }
    delete gTrendsCopy[searchKeyword]
    return {
      ...state,
      //Reset search word for this order
      searchKeywords: {
        ...state.searchKeywords,
        [action.payload]: ""
      },
      //Reset selected opponent for this order
      selectedOpponents: {
        ...state.selectedOpponents,
        [action.payload]: null
      },
      //Reset opponent data for this order
      opponentsData: {
        ...state.opponentsData,
        [action.payload]: null
      },
      opponentGtrends: gTrendsCopy
    }
  },
  [opponentsResetAll.type]: () => {
    return initialState;
  },
  //Clear state after logout
  [userLogout.type]: (state) => {
    return {
      ...initialState,
    };
  },
});

export default opponents;
