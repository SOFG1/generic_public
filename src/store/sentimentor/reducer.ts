import {createReducer, PayloadAction} from "@reduxjs/toolkit";
import {
  sentimentorAddPublications,
  sentimentorRemoveTag,
  sentimentorSetAnalysis,
  sentimentorSetKeywords,
  sentimentorSetPublicationsFetching,
  sentimentorSetTagsCloud,
  sentimentorSelectTag,
  sentimentorSetFetchingAnalysis,
  sentimentorSetPublicationsFilters,
  sentimentorSetPublicationsFilter,
  sentimentorSetIsFetchingAI,
  sentimentorUpdateAIPostText,
  sentimentorSetAllAIPosts,
  sentimentorRefreshAIPost,
  sentimentorAddAIPost,
  sentimentorSetSelectedAI,
  sentimentorSetPdfReportData,
  sentimentorSetDefamatoryFetching,
  sentimentorSetPubProcessed,
  sentimentorSetFiltersData,
  sentimentorRemovePublication,
  sentimentorChangePublicationType,
  sentimentorRemoveAIPost,
  sentimentorSetSelectedTrendingPosts,
  sentimentorSetPostsCount,
  sentimentorApplyFilters,
  sentimentorSetIsFetchingCloudTags,
  sentimentorSetIsFetchingTrendingPosts,
  sentimentorSetTab,
  sentimentorSetSummarization, sentimentorSetAiModels,
} from "./actions";
import {
  AnalysisType,
  IAIPost,
  IChangePublicationType, IModel,
  IPdfReportData,
  ISentimentorFilters,
  ISentimentorState,
  ITrendingPost,
  PublicationSourceType,
  PublicationType,
  SelectedTagType,
  SentimentorDateFilter,
  SentimentorFiltersDataType,
  SentimentorTabType,
  TagCloudType,
} from "./types";
import { userLogout } from "../user";

export const giladSources: PublicationSourceType[] = [
  "govil",
  "committee_session",
  "plenum_session",
  "bill",
  "press_release",
  "gov_statisctics",
  "news",
  "antique",
  "govil_pdf",
  "kns_mmm",
];

export const googleSources: PublicationSourceType[] = [
  "google_news",
  // "news_with_login",
];

const initialState: ISentimentorState = {
  analysis: {},
  fetchingAnalysis: false,
  keywords: [],
  tagsCloud: [],
  selectedTag: null,
  appliedFilters: {},
  selectedPosts: [],
  postsCount: {},
  trendingPostsFetching: {},
  publicationsFilter: {
    otherPubs: "",
    googlePubs: "",
  },
  publicationsFilters: [],
  publications: [],
  isFetchingPublications: {
    otherPubs: false,
    googlePubs: false,
  },
  AIPostsList: [],
  selectedAIPostId: null,
  isFetchingAI: false,
  isFetchingTagsCloud:false,
  pdfReportData: null,
  isFetchingDefamatory: false,
  filtersData: {
    lang: [],
    network: [],
  },
  openedTab: null,
  summarizationPosts: [],
  aiModels:[],
};

const sentimentor = createReducer(initialState, {
  [sentimentorSetAnalysis.type]: (state, action: { payload: AnalysisType }) => {
    return {
      ...state,
      analysis: action.payload,
    };
  },
  [sentimentorSetFetchingAnalysis.type]: (
    state,
    action: { payload: boolean }
  ) => {
    return {
      ...state,
      fetchingAnalysis: action.payload,
    };
  },
  [sentimentorSetKeywords.type]: (
    state,
    action: { payload: { id: number; word: string, parsing_style:string }[] }
  ) => {
    return {
      ...state,
      keywords: action.payload,
    };
  },
  [sentimentorSetTagsCloud.type]: (
    state,
    action: { payload: TagCloudType[] }
  ) => {
    return {
      ...state,
      tagsCloud: action.payload,
    };
  },
  [sentimentorSelectTag.type]: (
    state,
    action: { payload: SelectedTagType | null }
  ) => {
    return {
      ...state,
      trendingPosts: {
        positive: {
          isFetching: false,
          count: null,
          posts: [],
        },
        negative: {
          isFetching: false,
          count: null,
          posts: [],
        },
      },
      selectedTag: action.payload,
    };
  },
  [sentimentorRemoveTag.type]: (state, action: { payload: string }) => {
    const filtered = state.tagsCloud.filter((t) => t.word !== action.payload);
    return {
      ...state,
      tagsCloud: filtered,
    };
  },
  [sentimentorSetIsFetchingCloudTags.type]:(state, action:{payload:boolean})=>{
    return {
      ...state,
      isFetchingTagsCloud: action.payload,
    }
  },
  [sentimentorSetIsFetchingTrendingPosts.type]:(state, action: {payload: { sentiment: string, f: boolean }})=>{
    const obj = {
      ...state.trendingPostsFetching,
      [action.payload.sentiment]: action.payload.f
    }
    return {
      ...state,
      trendingPostsFetching: obj,
    }
  },
  [sentimentorSetPublicationsFilters.type]: (
    state,
    action: { payload: string[] }
  ) => {
    return {
      ...state,
      publicationsFilters: action.payload,
    };
  },
  [sentimentorSetPublicationsFilter.type]: (
    state,
    action: { payload: { category: PublicationType; filter: string } }
  ) => {
    return {
      ...state,
      publicationsFilter: {
        ...state.publicationsFilter,
        //@ts-ignore
        [action.payload.category]: action.payload.filter,
      },
    };
  },

  [sentimentorAddPublications.type]: (
    state,
    action: { payload: PublicationType[] }
  ) => {
    return {
      ...state,
      publications: [...state.publications, ...action.payload],
    };
  },
  [sentimentorSetPublicationsFetching.type]: (
    state,
    action: { payload: { category: PublicationType; isFetching: boolean } }
  ) => {
    return {
      ...state,
      isFetchingPublications: {
        ...state.isFetchingPublications,
        //@ts-ignore
        [action.payload.category]: action.payload.isFetching,
      },
    };
  },
  [sentimentorSetAllAIPosts.type]: (state, action: { payload: IAIPost[] }) => {
    return {
      ...state,
      AIPostsList: action.payload,
    };
  },
  [sentimentorAddAIPost.type]: (state, action: { payload: IAIPost }) => {
    return {
      ...state,
      AIPostsList: [...state.AIPostsList, action.payload],
    };
  },
  [sentimentorSetSelectedAI.type]: (
    state,
    action: { payload: number | null }
  ) => {
    return {
      ...state,
      selectedAIPostId: action.payload,
    };
  },
  [sentimentorRefreshAIPost.type]: (state, action: { payload: IAIPost }) => {
    const newList = state.AIPostsList.filter((p) => p.id !== action.payload.id);
    const inList = state.AIPostsList.find((p) => p.id === action.payload.id);
    if (inList) newList.push(action.payload); //Prevent cases if we try to update deleted post
    return {
      ...state,
      AIPostsList: newList,
    };
  },
  [sentimentorRemoveAIPost.type]: (state, action: { payload: number }) => {
    const newList = state.AIPostsList.filter((p) => p.id !== action.payload);
    const selectedId = state.selectedAIPostId === action.payload ? null : state.selectedAIPostId
    return {
      ...state,
      selectedAIPostId: selectedId,
      AIPostsList: newList,
    };
  },
  [sentimentorUpdateAIPostText.type]: (
    state,
    action: { payload: { id: number; text: string } }
  ) => {
    const selected = state.AIPostsList.find((p) => p.id === action.payload.id);
    const newList = state.AIPostsList.filter((p) => p.id !== action.payload.id);
    if (selected) {
      const newPost = {
        ...selected,
        text_request: selected?.text_request ? { ...selected?.text_request, text: action.payload.text } : null,
      };
      newList.push(newPost);
    }
    return {
      ...state,
      AIPostsList: newList,
    };
  },
  [sentimentorSetIsFetchingAI.type]: (state, action: { payload: boolean }) => {
    return {
      ...state,
      isFetchingAI: action.payload,
    };
  },
  [sentimentorSetPdfReportData.type]: (
    state,
    action: { payload: IPdfReportData }
  ) => {
    return {
      ...state,
      pdfReportData: action.payload,
    };
  },
  [sentimentorSetDefamatoryFetching.type]: (
    state,
    action: { payload: boolean }
  ) => {
    return {
      ...state,
      isFetchingDefamatory: action.payload,
    };
  },
  [sentimentorSetPubProcessed.type]: (
    state,
    action: {
      payload: {
        sender: PublicationSourceType;
        id: string;
      };
    }
  ) => {
    const sender = action.payload.sender
    const id = action.payload.id
    const copy = [...state.publications]
    const publication = copy.find(p => p._sender === sender && p.id === id) as PublicationType
    const index = copy.indexOf(publication)
    copy.splice(index, 1, { ...publication, is_processed: !publication.is_processed } as PublicationType)
    return {
      ...state,
      publications: copy
    };
  },

  [sentimentorRemovePublication.type]: (
    state,
    action: {
      payload: {
        sender: PublicationSourceType;
        id: string;
      }
    }
  ) => {
    const filtered = state.publications.filter(p => {
      if (p._sender !== action.payload.sender) return true
      if (p.id !== action.payload.id) return true
      return false
    })
    return {
      ...state,
      publications: filtered,
    };
  },
  [sentimentorChangePublicationType.type]: (
    state,
    action: {
      payload: IChangePublicationType
    }
  ) => {
    const { _sender, id, type } = action.payload
    const publications = [...state.publications]
    const index = publications.findIndex(p => p._sender === _sender && p.id === id)
    publications[index] = { ...publications[index], post_type: type }
    return {
      ...state,
      publications
    };
  },
  [sentimentorSetFiltersData.type]: (
    state,
    action: { payload: SentimentorFiltersDataType }
  ) => {
    return {
      ...state,
      filtersData: action.payload,
    };
  },
  [sentimentorSetSelectedTrendingPosts.type]: (
    state,
    action: { payload: ITrendingPost[] }
  ) => {
    return {
      ...state,
      selectedPosts: action.payload,
    };
  },
  [sentimentorSetPostsCount.type]: (
    state,
    action: { payload: {sentiment: string, count: number} }
  ) => {
    return {
      ...state,
      postsCount: {
        ...state.postsCount,
        [action.payload.sentiment]: action.payload.count
      },
    };
  },
  [sentimentorApplyFilters.type]: (
    state,
    action: { payload: ISentimentorFilters }
  ) => {
    const filters:ISentimentorFilters = JSON.parse(JSON.stringify(action.payload));
    for (const key in filters) {
      if (filters[key as keyof ISentimentorFilters] === false) {
        filters[key as keyof ISentimentorFilters] = undefined;
      }
    }
    return {
      ...state,
      appliedFilters:filters,
    };
  },
  [sentimentorSetTab.type]: (
    state,
    action: { payload: SentimentorTabType }
  ) => {
    return {
      ...state,
      openedTab: action.payload,
    };
  },
  [sentimentorSetSummarization.type]: (
    state,
    action: { payload: string[] }
  ) => {
    return {
      ...state,
      summarizationPosts: action.payload,
    };
  },
  //Clear state after logout
  [userLogout.type]: (state) => {
    return {
      ...initialState,
    };
  },
  [sentimentorSetAiModels.type]:(state, action:PayloadAction<IModel[]>)=>{
    state.aiModels = action.payload;
  }
});

export default sentimentor;
