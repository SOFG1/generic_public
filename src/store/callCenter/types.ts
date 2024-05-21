export interface IQuestions {
  answers_options: {
    answer_words: string;
    related_question: IQuestions;
    is_update_referal: boolean;
    id: number;
  }[];
  id: number;
  query: string;
  query_pos: number;
  query_wording: string;
}

export interface IInterviewees {
  first_name: string;
  last_name: string;
  id: string;
  phone: string;
  mobile_phone: string | null;
  birthdate?: string;
  no_answer?: number;
  city?: string;
  log_id: number;
}

export interface SendEmailAction {
  title: string;
  text: string;
  link?: boolean;
  test_list?: boolean;
  from?: string;
  date?: string | null;
  now?: boolean;
  audience_ids?: number[];
  attachments?: number[];
}

export interface SendSmsAction {
  text: string;
  from: string;
  date: string | null;
  now: boolean;
  test_list: boolean;
  add_param_comment: string | null;
  exclude_compaings?: string[];
  audience_ids?: number[];
}

export type SendAnswerAction = {
  question: number;
  answer: number;
  comment: string;
};


export interface IQuestionaries {
  id: number;
  name: string;
  questions: IQuestions[];
}

export interface IFbAccount {
  id: string;
  account_id: number;
  buisness_name: string;
  name: string;
}

export interface IFbCampaings {
  id: number;
  name: string;
}

export interface IFbSet {
  id: number;
  name: string;
}

export interface IFbAudience {
  id: number;
  name: string;
}

export interface IFbCreative {
  id: number;
  name: string;
}

export interface IFbAd {
  id: number;
  name: string;
}

export interface CreateCampaingAction {
  acc_id: number;
  name: string;
  objective: string;
  status: string;
}

export interface CreateSetAction {
  acc_id: number;
  audience_id: number;
  name: string;
  optimization: string;
  billing_event: string;
  bid_amount: number;
  campaign_id: number;
  status: string;
  daily_budget: number;
}

export interface CreateCreativeAction {
  acc_id: number;
  name: string;
  title: string;
  body: string;
  media: File | null;
  page_id: number;
}

export interface CreateAudienceAction {
  acc_id: number;
  name: string;
  description: string;
}

export interface CreateAdAction {
  acc_id: number;
  name: string;
  status: string;
  creative_id: number;
  set_id: number;
}

export type FbNodeType =
  | "campaings"
  | "sets"
  | "customaudience"
  | "creatives"
  | "ad"
  | "sms"
  | null;

export interface DeleteNodeAction {
  node: FbNodeType;
  id: number;
}


export type ApplayFilterType = {
  email_count: number;
  phone_count: number;
};

export type CallCenterSMSType = {
  from?: string[];
  permanent_recipients?: string[];
};

export type CallCenterEmailType = {
  from: string[];
  quota: number;
};

export interface ICallCenterState {
  applayFilter: ApplayFilterType;
  sms: CallCenterSMSType;
  email: CallCenterEmailType;
  questionariesList: IQuestionaries[];
  selectedQuestionarieId: number;
  selectedAudienceId: number | null
  selectedIntervieweeNumber: string | null;
  interviewees: IInterviewees | null;
  selectedFBAccount: number;
  FBAccountList: IFbAccount[];
  FBCampaings: IFbCampaings[];
  campaigns: any[];
  FBSets: IFbSet[];
  FBAudiences: IFbAudience[];
  FBCreatives: IFbCreative[];
  FBAds: IFbAd[];
  isFetching: FbNodeType;
}
