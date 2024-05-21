export interface IPreviewPost {
  activity_comments: number;
  activity_shares: number;
  attachment_description: string | null;
  attachment_type: "videos" | null
  attachment_url: string;
  created_at: string;
  post_message: string;
  reactions_angers: number;
  reactions_likes: number;
  reactions_loves: number;
  unique_link_clicks: number;
  unique_other_clicks: number;
  unique_video_plays: number;
  html: string;
  is_inline_created: boolean; //Post paid or not
}

export interface IMapLevel {
  amt_24?: number;
  city_id?: number;
  city_name?: string;
  city_score: number;
  city_size: number;
  lat: number;
  lng: number;
  mitpakdim?: number;
  total_voters_24?: number;
}

export interface IMapPoint {
  lng: string;
  lat: string;
  per: number;
  size: number;
}

export type SmStatsType = [
  { total_reach: number },
  { unique_reach: number },
  { total_engagement: number },
  { social_media_score: number },
  { last_data_update: string | null }
];

export interface ISmStatsPost {
  post_id: string;
  title: string | null;
  date: string;
}

export interface ISMStatsState {
  pages: { id: string; name: string }[];
  smStats: SmStatsType;
  offlineScore: number
  postViews: {
    [legend: string]: {
      page_id: string;
      engagements_rate: number;
      m_date: string;
      posts_rate: number;
      video_rate: number;
    }[];
  };
  postList: ISmStatsPost[];
  selectedPreviewPost: string;
  keywords: { color: number; ndoc: number; nentry: number; word: string }[];
  mapPoints: IMapPoint[];
  mapLevel: IMapLevel[];
  previewPost: IPreviewPost | null;
  addedKeywords: string[];
  daysFilter: number;
  pageFilter: string;
  groupsFilter: string
  isFetchingStats: boolean;
}
