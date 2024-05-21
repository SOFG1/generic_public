import { useDispatch } from "react-redux";
import {
  sentimentorAddKeyword,
  sentimentorDeleteKeyword,
  sentimentorDeleteTag,
  sentimentorEditAIPostText,
  sentimentorCreateAIPost,
  sentimentorGetAnalysis,
  sentimentorGetGooglePublications,
  sentimentorGetKeywords,
  sentimentorGetOtherPublications,
  sentimentorGetPublicationsFilters,
  sentimentorGetTagsCloud,
  sentimentorSelectTag,
  sentimentorSetPublicationsFilter,
  sentimentorSetSelectedAI,
  sentimentorGetAllAIPosts,
  sentimentorUpdateAIPost,
  sentimentorGetPdfReportData,
  sentimentorGetDefamatory,
  sentimentorSetPubProcessed,
  sentimentorGetFiltersData,
  sentimentorRemovePublication,
  sentimentorChangePublicationType,
  sentimentorRemoveAIPost,
  sentimentorRegenerateAIPost,
  sentimentorDeleteAIPost,
  sentimentorSetSelectedTrendingPosts,
  sentimentorSetPostsCount,
  sentimentorApplyFilters,
  sentimentorSetIsFetchingTrendingPosts,
  sentimentorSetTab,
  sentimentorSetSummarization,
  sentimentorSetPdfReportData, sentimentorGetAiModels, editSentimentorKeyword, sentimentorAddAIPost,
} from "./actions";
import {
  IChangePublicationType,
  IPdfReportData,
  ISentimentorFilters,
  ITrendingPost,
  PublicationSourceType,
  PublicationsCategory,
  SelectedTagType,
  SentimentorDateFilter,
  SentimentorTabType, IAIPost,
} from "./types";
import { IAIPostParams } from "../../api/sentimentor";
import {useCallback} from "react";

type FiltersType = {
  institutions: string;
  keywords: string;
  grouping: string;
  dateFilter: SentimentorDateFilter;
  langs: string
  network: string
  manual: boolean | null
  defamatory: boolean | null
  processed: boolean | null
};


export const useSentimentorActions = () => {
  const dispatch = useDispatch();

  const onApplyFilters = (filters: ISentimentorFilters) => {
    dispatch(sentimentorApplyFilters(filters))
  }


  const onGetAnalysis = () => {
    dispatch(sentimentorGetAnalysis());
  };

  const onGetKeywords = () => {
    dispatch(sentimentorGetKeywords());
  };

  const onSelectTag = (tag: SelectedTagType | null) => {
    dispatch(sentimentorSelectTag(tag));
  };

  const onAddKeyword = (word: string, parsing_style:string) => {
    dispatch(sentimentorAddKeyword({keyword:word, parsing_style}));
  };
  const onEditKeywordParsingStyle = (id:number, parsing_style:string)=>{
    dispatch(editSentimentorKeyword({keywordId:id, parsing_style}));
  }
  const onDeleteKeyword = (id: number) => {
    dispatch(sentimentorDeleteKeyword(id));
  };

  const onGetTagsCloud = () => {
    dispatch(sentimentorGetTagsCloud());
  };


  const onGetFilters = () => {
    dispatch(sentimentorGetFiltersData())
  }

  const onGetPublicationsFilters = () => {
    dispatch(sentimentorGetPublicationsFilters());
  };

  const onSetPublicationsFilter = (
    category: PublicationsCategory,
    filter: string
  ) => {
    dispatch(sentimentorSetPublicationsFilter({ category, filter }));
  };

  const onGetOtherPublications = () => {
    dispatch(sentimentorGetOtherPublications());
  };

  const onGetGooglePublications = () => {
    dispatch(sentimentorGetGooglePublications());
  };

  const onDeleteTag = () => {
    dispatch(sentimentorDeleteTag());
  };

  const onGetAIPosts = () => {
    dispatch(sentimentorGetAllAIPosts());
  };

  const onUpdateAIPost = (id: number) => {
    dispatch(sentimentorUpdateAIPost(id));
  };



  const onCreateAIPost = (params: IAIPostParams) => {
    dispatch(sentimentorCreateAIPost(params));
  };

  const onDeleteAIPost = (id: number) => {
    dispatch(sentimentorDeleteAIPost(id));
  };

  const onRemoveAIPost = (id: number) => {
    dispatch(sentimentorRemoveAIPost(id));
  };

  const onRegeneratePostText = (id: number, prompt: string) => {
    dispatch(sentimentorRegenerateAIPost({ id, prompt }));
  };

  const onSetSelectedAIPost = (post: number | null) => {
    dispatch(sentimentorSetSelectedAI(post));
  };

  const editAIPostText = (id: number, text: string) => {
    dispatch(sentimentorEditAIPostText({ id, text }));
  };

  const onGetPdfReportData = (filters: ISentimentorFilters) => {
    dispatch(sentimentorGetPdfReportData(filters));
  };


  const onSetPdfReportData = (data: IPdfReportData | null) => {
    dispatch(sentimentorSetPdfReportData(data))
  }


  const onDownloadDefamatory = (filters: ISentimentorFilters) => {
    dispatch(sentimentorGetDefamatory(filters));
  };

  const onSetPubProcessed = (sender: PublicationSourceType, id: number) => {
    dispatch(sentimentorSetPubProcessed({ sender, id }));
  };


  const onRemovePublication = (sender: PublicationSourceType, id: number) => {
    dispatch(sentimentorRemovePublication({ sender, id }))
  }

  const onChangePublicationType = (params: IChangePublicationType) => {
    dispatch(sentimentorChangePublicationType(params))
  }


  const onSelectTrendingPosts = (posts: ITrendingPost[]) => {
    dispatch(sentimentorSetSelectedTrendingPosts(posts))
  }


  const onSetPostsCount = (sentiment: string, count: number) => {
    dispatch(sentimentorSetPostsCount({sentiment, count}))
  }

  const onSetIsFetchingTrendingPosts = (sentiment: string, f: boolean) => {
    dispatch(sentimentorSetIsFetchingTrendingPosts({sentiment, f}))
  }

  const onSetTab = (tab: SentimentorTabType) => {
    dispatch(sentimentorSetTab(tab))
  }

  const onSetSummarization = (postIds: string[]) => {
    dispatch(sentimentorSetSummarization(postIds))
  }

  const getAiModels = useCallback(()=>{
    dispatch(sentimentorGetAiModels());
  }, [dispatch])

  const addAiPost = useCallback((post:IAIPost)=>{
    console.log("ADD?", post)
    dispatch(sentimentorAddAIPost(post));
  },[dispatch]);
  const setSelectedAi = useCallback((post:IAIPost)=>{
    dispatch(sentimentorSetSelectedAI(post.id));
  },[dispatch])

  return {
    addAiPost,
    setSelectedAi,
    getAiModels,
    onGetAnalysis,
    onGetKeywords,
    onAddKeyword,
    onDeleteKeyword,
    onSelectTag,
    onGetTagsCloud,
    onSetPublicationsFilter,
    onGetPublicationsFilters,
    onGetOtherPublications,
    onGetGooglePublications,
    onDeleteTag,
    onGetAIPosts,
    onUpdateAIPost,
    onRemoveAIPost,
    onCreateAIPost,
    onSetSelectedAIPost,
    editAIPostText,
    onGetPdfReportData,
    onDownloadDefamatory,
    onSetPubProcessed,
    onGetFilters,
    onRemovePublication,
    onDeleteAIPost,
    onChangePublicationType,
    onRegeneratePostText,
    onSelectTrendingPosts,
    onSetPostsCount,
    onApplyFilters,
    onSetIsFetchingTrendingPosts,
    onSetTab,
    onSetSummarization,
    onSetPdfReportData,
    onEditKeywordParsingStyle
  };
};
