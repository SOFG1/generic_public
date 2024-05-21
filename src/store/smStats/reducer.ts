import { createReducer } from "@reduxjs/toolkit";
import { IMapLevel, IMapPoint, IPreviewPost, ISMStatsState, ISmStatsPost, SmStatsType } from "./types";
import {
  smStatsAddedKeywords,
  smStatsAddKeywords,
  smStatsAddPages,
  smStatsAddPreviewPost,
  smStatsSelectPreviewPost,
  smStatsToggleStatsFetching,
  smStatsSetDaysFilter,
  smStatsSetPageFilter,
  smStatsSetPostViews,
  smStatsSetSmStats,
  smStatsSetPostList,
  smStatsSetMapPoints,
  smStatsSetMapLevel,
  smStatsSetGroupsFilter,
  smStatsSetOfflineScore,
} from "./actions";
import { userLogout } from "../user";

const initialState: ISMStatsState = {
  pages: [],
  smStats: [
    { total_reach: 0 },
    { unique_reach: 0 },
    { total_engagement: 0 },
    { social_media_score: 0 },
    { last_data_update: null },
  ],
  offlineScore: 0,
  postViews: {},
  postList: [],
  selectedPreviewPost: "",
  keywords: [],
  mapPoints: [],
  mapLevel: [],
  previewPost: null,
  addedKeywords: [],
  pageFilter: "",
  daysFilter: 30,
  groupsFilter: "",
  isFetchingStats: false,
};

const smStats = createReducer(initialState, {
  [smStatsSetSmStats.type]: (state, action: { payload: SmStatsType }) => {
    return {
      ...state,
      smStats: action.payload,
    };
  },
  [smStatsSetOfflineScore.type]: (state, action: { payload: number }) => {
    return {
      ...state,
      offlineScore: action.payload,
    };
  },
  [smStatsSetPostList.type]: (state, action: { payload: ISmStatsPost[] }) => {
    return {
      ...state,
      postList: action.payload,
    };
  },
  [smStatsSetMapPoints.type]: (state, action: { payload: IMapPoint[] }) => {
    return {
      ...state,
      mapPoints: action.payload,
    };
  },
  [smStatsSetMapLevel.type]: (state, action: { payload: IMapLevel[] }) => {
    return {
      ...state,
      mapLevel: action.payload,
    };
  },
  [smStatsSetPostViews.type]: (state, action: { payload: any }) => {
    return {
      ...state,
      postViews: action.payload,
    };
  },
  [smStatsAddPages.type]: (
    state,
    action: { payload: { id: string; name: string }[] }
  ) => {
    return {
      ...state,
      pages: [...action.payload],
    };
  },
  [smStatsAddKeywords.type]: (
    state,
    action: {
      payload: { color: number; ndoc: number; nentry: number; word: string }[];
    }
  ) => {
    return {
      ...state,
      keywords: action.payload,
    };
  },
  [smStatsAddPreviewPost.type]: (
    state,
    action: { payload: IPreviewPost | null }
  ) => {
    return {
      ...state,
      previewPost: action.payload,
    };
  },
  [smStatsSetDaysFilter.type]: (state, action: { payload: number }) => {
    return {
      ...state,
      daysFilter: action.payload,
    };
  },
  [smStatsSetPageFilter.type]: (state, action: { payload: string }) => {
    return {
      ...state,
      pageFilter: action.payload,
    };
  },
  [smStatsSetGroupsFilter.type]: (state, action: { payload: string }) => {
    return {
      ...state,
      groupsFilter: action.payload,
    };
  },
  [smStatsAddedKeywords.type]: (
    state,
    action: { payload: { word: string; status: "delete" | "add" } }
  ) => {
    console.log("action", action);
    console.log("action.payload.word", action.payload.word);
    return {
      ...state,
      addedKeywords:
        action.payload.status === "add"
          ? [...state.addedKeywords, action.payload.word]
          : state.addedKeywords.filter(
            (element) => element !== action.payload.word
          ),
    };
  },

  [smStatsSelectPreviewPost.type]: (state, action: { payload: string }) => {
    return {
      ...state,
      selectedPreviewPost: action.payload,
    };
  },
  [smStatsToggleStatsFetching.type]: (state, action: { payload: boolean }) => {
    return {
      ...state,
      isFetchingStats: action.payload,
    };
  },
  //Clear state after logout
  [userLogout.type]: (state) => {
    return {
      ...initialState,
    };
  },
});

export default smStats;
