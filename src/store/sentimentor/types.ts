import {IAiImage} from "../../components/SentimentorComponents/AIPictureEditorComponent";

export type TagCloudType = {
  word: string;
  color: string;
  size: number;
};

export type SentimentorDateFilter = [string | null, string | null];


export type PublicationSourceType =
  | "govil"
  | "news"
  | "google_news"
  | "agendas"
  | "committee_session"
  | "plenum_session"
  | "query"
  | "bill"
  | "press_release"
  | "gov_statisctics"
  | "govil_data"
  | "govil_pdf"
  | "antique"
  | "antique_trends"
  | "news_11"
  // | "news_with_login"
  | "iplan"
  | "mavat"
  | "kns_parser_kns_plenum_weekly_agenda"
  | "dynamic_collector_first"
  | "dynamic_collector_second"
  | "dynamic_collector_third"
  | "kns_mmm";

export type PublicationType = {
  _sender: PublicationSourceType;
  [key: string]: any;
};

export interface ITrendingPost {
  id: string;
  label: "POSITIVE" | "NEGATIVE";
  date: string;
  emotions: string;
  network: "instagram" | "facebook" | "twitter" | "telegram"
  account: string | null
  keywords?: { id: number; word: string, parsing_style:string }[];
  institutions?: { id: number; inst_name: string }[];
  link: string;
  lang: string | null;
  is_processed: boolean
  topics: string | null;
  is_tracked_account: boolean
  defamatory: boolean | null;
  origin: string | null;
  table: string;
  score: number
  post_type: Array<string | null>
  post_grouping?: string
  post_text: string
  is_in_sheet?: boolean | null
  is_comment: boolean | null
  parent_id: string | null
  client_id?:number
  date_added_to_db:string
  [key: string]: any;
}

export interface IEmail {
  subject: string;
  body: string;
  recipients: string[];
}

export type SelectedTagType = {
  text: string;
  color: string;
};

export type AnalysisType = { [key: string]: any[] };

export type PublicationsCategory = "otherPubs" | "googlePubs";

type PublicationsFilter = {
  [key in PublicationsCategory]: string;
};

type PublicationsFetching = {
  [key in PublicationsCategory]: boolean;
};

export type SentimentorKeyword = { id: number; word: string, parsing_style:string };

export interface IAIImageRequest {
  id: number;
  request: string;
  message_id: string;
  childs: IAIImageRequest[]
  buttons: string[];
  status_success: boolean;
  image_url: string | null;
  post_text: string;
  datetime_created: string; // as Date
}


type AIPostTextRequestType = {
  id: number;
  datetime_created: string;
  finish_reason: string;
  request: string;
  response_created: number;
  response_id: string;
  text: string;
}

export interface IAIPost {
  id: number;
  image_requests: IImageRequest[];
  text_request: AIPostTextRequestType | null
}

export interface IImageRequest{
  id:number, status:string, files:IAiImage[], childs:IImageRequest[]
}

export interface IGenerateImageData{
  model_title: string
  width: number
  height:number
  prompt: string
  negative_prompt: string
  steps: number
  batch_size: number
  seed: number
  cfg_scale: number
  src_image_id?: number,
}

export type PDFComparisonType = {
  [key: string]: {
    current_period: number | null
    previous_period: number | null
    perc: number | null
  }
}


export type PDFReportCountries = {
  [key: string]: { num_posts: number, percentage_change: number }
}

export interface IPdfReportData {
  [key: string]: any;
  unique_authors: number;
  activity_for_country: PDFReportCountries
  category_analysis: {
    [key: string]: {
      count: number,
      perc: number
    }
  },
  category_by_platform:{
    [key: string]: {
        [key: string]: {
            count: number,
            perc: number
        }
    }
},
  platform_by_category: {
    [key: string]: {
        [key: string]: {
            count: number,
            perc: number
        }
    }
}
  age_gender_analysis: {
    [key: string]: {
      male?: number;
      female?: number;
    };
  };
  comparison: PDFComparisonType
  emotion_analysis?: {
    emotion: string;
    sentiment: "Positive" | "Negative";
    count: number;
  }[];
  total_amount: number
  keywords: string[]
  segments: string[]
  cloud: TagCloudType[]
  top_words: {
    [key: string]: { word: string, perc: number }[]
  }
}

export type SentimentorFiltersDataType = {
  lang: string[]
  network: string[]
}

export interface IChangePublicationType {
  _sender: PublicationSourceType,
  id: number
  type: string[]
}





export interface ISentimentorFilters {
  institution_ids?: string
  keyword_ids?: string
  post_type?: string
  date?: string
  defamatory?: boolean
  is_manual?: boolean
  tag?: string
  is_processed?: boolean
  lang?: string
  network?: string
}

export type SentimentorTabType = "filters" | "AIPost" | "AIHistory" | "summarization" | null


export interface ISentimentorState {
  analysis: AnalysisType;
  fetchingAnalysis: boolean;
  keywords: SentimentorKeyword[];
  tagsCloud: TagCloudType[];
  selectedTag: SelectedTagType | null;
  selectedPosts: ITrendingPost[]
  postsCount: { [key: string]: number }
  trendingPostsFetching: { [key: string]: boolean }
  appliedFilters: ISentimentorFilters
  publicationsFilter: PublicationsFilter;
  publicationsFilters: string[];
  publications: PublicationType[];
  isFetchingPublications: PublicationsFetching;
  AIPostsList: IAIPost[];
  selectedAIPostId: number | null;
  isFetchingAI: boolean;
  pdfReportData: IPdfReportData | null;
  isFetchingDefamatory: boolean
  filtersData: SentimentorFiltersDataType,
  isFetchingTagsCloud: boolean,
  openedTab: SentimentorTabType
  summarizationPosts: string[]
  aiModels:IModel[]
}

export interface IModel{
  hash:string
  model_name:string,
  title:string
}
