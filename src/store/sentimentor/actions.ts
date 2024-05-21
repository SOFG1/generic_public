import { createAction } from "@reduxjs/toolkit";
import {
  AnalysisType,
  IAIPost,
  IChangePublicationType, IModel,
  IPdfReportData,
  ISentimentorFilters,
  ITrendingPost,
  PublicationsCategory,
  PublicationSourceType,
  SelectedTagType,
  SentimentorFiltersDataType,
  SentimentorTabType,
  TagCloudType,
} from "./types";
import { IAIPostParams } from "../../api/sentimentor";


export const sentimentorGetAnalysis = createAction("sentimentor/getAnalysis");
export const sentimentorSetAnalysis = createAction<AnalysisType>(
  "sentimentor/setAnalysis"
);
export const sentimentorSetFetchingAnalysis = createAction<boolean>(
  "sentimentor/setFetchingAnalysis"
);

export const sentimentorGetKeywords = createAction("sentimentor/getKeywords");
export const sentimentorSetKeywords = createAction<
  { id: number; word: string }[]
>("sentimentor/setKeywords");

export const sentimentorAddKeyword = createAction<{ keyword:string, parsing_style:string}>(
  "sentimentor/addKeyword"
);
export const editSentimentorKeyword = createAction<{keywordId:number, parsing_style:string}>("sentimentor/editKeywordParsingStyle")
export const sentimentorDeleteKeyword = createAction<number>(
  "sentimentor/deleteKeyword"
);

export const sentimentorGetTagsCloud = createAction("sentimentor/getTagsCloud");
export const sentimentorSetTagsCloud = createAction<TagCloudType[]>(
  "sentimentor/setTagsCloud"
);
export const sentimentorSelectTag = createAction<SelectedTagType | null>(
  "sentimentor/selectTag"
);
export const sentimentorDeleteTag = createAction("sentimentor/deleteTag");
export const sentimentorRemoveTag = createAction<string>(
  "sentimentor/removeTag"
);




export const sentimentorGetPublicationsFilters = createAction(
  "sentimentor/getPublicationsFilters"
);
export const sentimentorSetPublicationsFilters = createAction<string[]>(
  "sentimentor/setPublicationsFilters"
);
export const sentimentorSetPublicationsFilter = createAction<{
  category: PublicationsCategory;
  filter: string;
}>("sentimentor/setPublicationsFilter");

export const sentimentorGetOtherPublications = createAction(
  "sentimentor/getOtherPublications"
);
export const sentimentorGetGooglePublications = createAction(
  "sentimentor/getGooglePublications"
);

export const sentimentorAddPublications = createAction<PublicationSourceType[]>(
  "sentimentor/addPublications"
);
export const sentimentorSetPublicationsFetching = createAction<{
  category: PublicationsCategory;
  isFetching: boolean;
}>("sentimentor/setPublicationsFetching");

export const sentimentorGetAllAIPosts = createAction(
  "sentimentor/getAllAIPosts"
);
export const sentimentorSetAllAIPosts = createAction<IAIPost[]>(
  "sentimentor/setAllAIPosts"
);

export const sentimentorCreateAIPost = createAction<IAIPostParams>(
  "sentimentor/createAIPost"
);

export const sentimentorRemoveAIPost = createAction<number>(
  "sentimentor/removeAIPost"
);

export const sentimentorDeleteAIPost = createAction<number>(
  "sentimentor/deleteAIPost"
);


export const sentimentorRegenerateAIPost = createAction<{ id: number, prompt: string }>(
  "sentimentor/regenerateAIPost"
);

export const sentimentorAddAIPost = createAction<IAIPost>(
  "sentimentor/addAIPost"
);

export const sentimentorSetSelectedAI = createAction<number | null>(
  "sentimentor/setSelectedAI"
);

export const sentimentorUpdateAIPost = createAction<number>(
  "sentimentor/updateAIPost"
);


export const sentimentorRefreshAIPost = createAction<IAIPost>(
  "sentimentor/refreshAIPost"
);

export const sentimentorEditAIPostText = createAction<{
  id: number;
  text: string;
}>("sentimentor/editAIPostText");
export const sentimentorUpdateAIPostText = createAction<{
  id: number;
  text: string;
}>("sentimentor/updateAIPost");

export const sentimentorSetIsFetchingAI = createAction<boolean>(
  "sentimentor/setIsFetchingAI"
);

export const sentimentorSetIsFetchingCloudTags = createAction<boolean>("sentimentor/setIsFetchingCloudTags");

export const sentimentorSetIsFetchingTrendingPosts = createAction<{ sentiment: string, f: boolean }>("sentimentor/setIsFetchingTrendingPosts");

export const sentimentorGetPdfReportData = createAction<ISentimentorFilters>(
  "sentimentor/getPdfReportData"
);


export const sentimentorSetPdfReportData = createAction<IPdfReportData | null>(
  "sentimentor/setPdfReportData"
);



export const sentimentorGetDefamatory = createAction<ISentimentorFilters>(
  "sentimentor/getDefamatory"
);
export const sentimentorSetDefamatoryFetching = createAction<boolean>(
  "sentimentor/getDefamatoryFetching"
);


export const sentimentorSetPubProcessed = createAction<{
  sender: PublicationSourceType;
  id: number;
}>("sentimentor/setPublicationProcessed");







export const sentimentorGetFiltersData = createAction("sentimentor/getFiltersData")
export const sentimentorSetFiltersData = createAction<SentimentorFiltersDataType>("sentimentor/setFiltersData")



export const sentimentorRemovePublication = createAction<{
  sender: PublicationSourceType;
  id: number;
}>("sentimentor/removePublication");

export const sentimentorChangePublicationType = createAction<IChangePublicationType>("sentimentor/changePublicationType");



export const sentimentorSetSelectedTrendingPosts = createAction<ITrendingPost[]>("sentimentor/setSelectedTrendingPosts");


export const sentimentorSetPostsCount = createAction<{ sentiment: string, count: number }>("sentimentor/setPostsCount")


export const sentimentorApplyFilters = createAction<ISentimentorFilters>("sentimentor/applyFilters")


export const sentimentorSetTab = createAction<SentimentorTabType>("sentimentor/setTab")


export const sentimentorSetSummarization = createAction<string[]>("sentimentor/setSummarization")

export const sentimentorGetAiModels = createAction("sentimentor/getAiModels");
export const sentimentorSetAiModels = createAction<IModel[]>("sentimentor/setAiModels");
