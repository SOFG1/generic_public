import { createReducer } from "@reduxjs/toolkit";
import {
  relationsAppendKeyword,
  relationsRemoveKeyword,
  relationsResetData,
  relationsSetDateFilter,
  relationsSetIsFetching,
  relationsSetIsFetchingKeywords,
  relationsSetKeywords,
  relationsSetPersons,
  relationsSetPosts,
  relationsSetRelations,
  relationsSetSelectedPost,
  relationsSetSelectedPostPersons,
  relationsSetSelectedPostRelations,
  relationsSetKeywordFilter,
  relationsSetTags,
} from "./actions";
import {
  IRelationsState,
  IRelationPost,
  IRelationPerson,
  IRelation,
  DateFilterType,
  RelationsKeyword,
  ITag,
} from "./types";
import { userLogout } from "../user";

const initialState: IRelationsState = {
  isFetching: false,
  keywordFilter: "",
  tags: [],
  dateFilter: [null, null],
  posts: [],
  relations: [],
  persons: [],
  selectedPost: null,
  selectedPostPersons: [], //Persons of selected post
  selectedPostRelations: [], //Relations of selected post
  keywords: [],
  isFetchingKeywords: false,
};

const relations = createReducer(initialState, {
  [relationsSetIsFetching.type]: (state, action: { payload: boolean }) => {
    return {
      ...state,
      isFetching: action.payload,
    };
  },
  [relationsSetTags.type]: (state, action: { payload: ITag[] }) => {
    return {
      ...state,
      tags: action.payload,
    };
  },
  [relationsSetPosts.type]: (state, action: { payload: IRelationPost[] }) => {
    return {
      ...state,
      posts: action.payload,
    };
  },
  [relationsSetPersons.type]: (
    state,
    action: { payload: IRelationPerson[] }
  ) => {
    return {
      ...state,
      persons: action.payload,
    };
  },
  [relationsSetRelations.type]: (state, action: { payload: IRelation[] }) => {
    return {
      ...state,
      relations: action.payload,
    };
  },
  [relationsSetSelectedPost.type]: (
    state,
    action: { payload: IRelationPost | null }
  ) => {
    return {
      ...state,
      selectedPost: action.payload,
    };
  },
  [relationsSetSelectedPostPersons.type]: (
    state,
    action: { payload: IRelationPerson[] }
  ) => {
    const filtered = action.payload.filter((r) =>
      state.persons.some((p) => p.elementId !== r.elementId)
    );
    return {
      ...state,
      selectedPostPersons: filtered,
    };
  },
  [relationsSetSelectedPostRelations.type]: (
    state,
    action: { payload: IRelation[] }
  ) => {
    const filtered = action.payload.filter((r) =>
      state.relations.some((p) => p.elementId !== r.elementId)
    );
    return {
      ...state,
      selectedPostRelations: filtered,
    };
  },
  [relationsSetKeywordFilter.type]: (state, action: { payload: string }) => {
    return {
      ...state,
      keywordFilter: action.payload,
    };
  },
  [relationsSetDateFilter.type]: (
    state,
    action: { payload: DateFilterType }
  ) => {
    return {
      ...state,
      dateFilter: action.payload,
    };
  },
  [relationsSetKeywords.type]: (
    state,
    action: { payload: RelationsKeyword[] }
  ) => {
    return {
      ...state,
      keywords: action.payload,
    };
  },
  [relationsAppendKeyword.type]: (
    state,
    action: { payload: RelationsKeyword }
  ) => {
    return {
      ...state,
      keywords: [...(state.keywords || []), action.payload],
    };
  },
  [relationsRemoveKeyword.type]: (state, action: { payload: number }) => {
    return {
      ...state,
      keywords: state.keywords?.filter((k) => k.id !== action.payload),
    };
  },

  [relationsSetIsFetchingKeywords.type]: (
    state,
    action: { payload: boolean }
  ) => {
    return {
      ...state,
      isFetchingKeywords: action.payload,
    };
  },
  [relationsResetData.type]: (state) => {
    return {
      ...initialState,
      keywords: state.keywords,
    };
  },
  //Clear state after logout
  [userLogout.type]: (state) => {
    return {
      ...initialState,
    };
  },
});

export default relations;
