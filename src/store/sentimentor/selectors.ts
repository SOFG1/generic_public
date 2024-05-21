import { rootReducerType } from "..";
import {
  AnalysisType,
  IAIPost,
  IPdfReportData,
  ISentimentorFilters,
  ITrendingPost,
  SelectedTagType,
  SentimentorFiltersDataType,
  SentimentorTabType,
} from "./types";

export const sentimentorAnalysisSelector = (
  state: rootReducerType
): AnalysisType => state.sentimentor.analysis;
export const sentimentorFetchingAnalysisSelector = (
  state: rootReducerType
): boolean => state.sentimentor.fetchingAnalysis;
export const sentimentorKeywordsSelector = (state: rootReducerType) =>
  state.sentimentor.keywords;
export const sentimentorTagsSelector = (state: rootReducerType) =>
  state.sentimentor.tagsCloud;

export const sentimentorTagsFetchingSelector = (state:rootReducerType)=> state.sentimentor.isFetchingTagsCloud;
export const sentimentorSelectedTagSelector = (
  state: rootReducerType
): SelectedTagType | null => state.sentimentor.selectedTag;

export const sentimentorTrendingPostsFetchingSelector = (
  state: rootReducerType
): any => state.sentimentor.trendingPostsFetching;

export const sentimentorPublicationsFiltersSelector = (
  state: rootReducerType
): string[] => state.sentimentor.publicationsFilters;
export const sentimentorPublicationsFilterSelector = (state: rootReducerType) =>
  state.sentimentor.publicationsFilter;
export const sentimentorPublicationsSelector = (state: rootReducerType) =>
  state.sentimentor.publications;
export const sentimentorPublicationsFetchingSelector = (
  state: rootReducerType
) => state.sentimentor.isFetchingPublications;



export const sentimentorAIPostsListSelector = (
  state: rootReducerType
): IAIPost[] => state.sentimentor.AIPostsList;
export const sentimentorIsFetchingAISelector = (
  state: rootReducerType
): boolean => state.sentimentor.isFetchingAI;
export const sentimentorSelectedAIPostSelector = (
  state: rootReducerType
): IAIPost | undefined => {
  const id = state.sentimentor.selectedAIPostId;
  const list = state.sentimentor.AIPostsList;
  return list.find((p) => p.id === id);
};

export const sentimentorpdfReportDataSelector = (
  state: rootReducerType
): IPdfReportData | null => state.sentimentor.pdfReportData;



export const sentimentorIsFetchingDefamatorySelector = (state: rootReducerType): boolean => {
  return state.sentimentor.isFetchingDefamatory
}


export const sentimentorFiltersDataSelector = (state: rootReducerType): SentimentorFiltersDataType => {
  return state.sentimentor.filtersData
}



export const sentimentorSelectedPostsSelector = (
  state: rootReducerType
): ITrendingPost[] => state.sentimentor.selectedPosts;



export const sentimentorPostsCountSelector = (
  state: rootReducerType
): {[key: string]: number} => state.sentimentor.postsCount;




export const sentimentorAppliedFiltersSelector = (
  state: rootReducerType
): ISentimentorFilters => state.sentimentor.appliedFilters;


export const sentimentorOpenedTabSelector = (
  state: rootReducerType
): SentimentorTabType => state.sentimentor.openedTab;

export const sentimentorAiModels = (state:rootReducerType)=>state.sentimentor.aiModels;

export const sentimentorSummarizationSelector = (state: rootReducerType): string[] => state.sentimentor.summarizationPosts;
