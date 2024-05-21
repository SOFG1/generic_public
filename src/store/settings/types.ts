export interface IColumns {
  id: number;
  slug: string;
  name: string;
  is_filter: boolean;
  fetch: boolean;
  is_multiplier: boolean;
  is_field: boolean;
  is_table: boolean;
  is_volunteer?: boolean
  options?: Array<[string, string]>;
  type: string;
  required?: boolean
  is_manual_input?: boolean
  is_interviewews_info?: boolean
  is_excel?: boolean
  order: number
}

export interface IInstitution {
  inst_code: number;
  inst_name: string;
  is_main: boolean
  color: string | null
  keywords: { word: string; id: number }[];
}

export interface ISMTP {
  host: string;
  mail: string;
  password: string;
  port: string;
}
export interface IColumnsForm extends IColumns {
  required?: boolean;
  is_manual_input?: boolean;
  is_excel?: boolean;
  len_input_prefetch?: number;
  is_interviewews_info?: boolean
}

export interface IStatus {
  color: string;
  id: number;
  is_default: boolean;
  exclude_words: string[];
  include_words: string[];
  score: number | null;
  status: string;
}

export interface ISmsServiceField {
  name: string;
  required: boolean;
  slug: string;
  type: string;
  value: any;
}

export interface ISmsService {
  id: number;
  name: string;
  view_name?: string;
  form: {
    description: string;
    fields: ISmsServiceField[];
  };
  is_active?: boolean;
  _isExisting?: boolean;
}

export interface IAudience {
  name: string;
  id: number;
}

export type FieldType = "int" | "str" | "float" | "bool" | "timestamp";

//Pages that are shown by default in SM_Stats chart (if viewed === true)
export interface IDefaultPage {
  name: string;
  page_id: string;
  viewed: boolean;
}

export interface ICreateField {
  name: string;
  db_name: string;
  type: FieldType;
  fetch: boolean;
  is_multiplier: boolean;
  is_volunteer: boolean
  order?: number
  required: boolean;
  is_filter: boolean;
  is_field: boolean;
  is_table: boolean;
  is_manual_input: boolean;
  is_excel: boolean;
  options?: string[][];
}

export interface IAnswer {
  id: number;
  answer_words: string;
  value_to_set: string | null;
  related_question?: IQuestion
  is_update_referal: boolean
}

export interface IEditAnswerPayload {
  id: number;
  answer_words: string;
  value_to_set: string | null;
  related_question_id: number | null
  is_update_referal: boolean
  is_voter: boolean
}

export type ICreateAnswerPayload = Omit<IEditAnswerPayload, 'id'>


export interface IQuestion {
  id: number;
  answers_options: any[];
  field_to_update: string | null;
  query: string;
  query_pos: number;
  query_wording: any;
}

export interface IQuestionnaire {
  id: number;
  name: string;
  questions: IQuestion[];
  [key: string]: any;
}

export interface IVoterUser {
  id: number
  login: string
  first_name: string
  last_name: string
  is_active: boolean
  email: string | null
  audience_id: number | null
  negative_status: boolean
  questionarie_id: number | null
  mode: "status_update" | "questionarie" | "eday_bingo" | "eday_pledge"
}


export interface IDistributionUser {
  id: number
  login: string
  audience_name: string | null
  questionarie_name: string | null
}

export interface ISettingsState {
  columns: IColumns[];
  isCreatingField: boolean
  all_statuses: IStatus[];
  defaultPages: IDefaultPage[]; //Pages that are shown by default in SM_Stats chart
  status_colors: {
    id: number;
    status: string;
    color: string;
  }[];
  smtp: { connection: ISMTP; name: string } | null;
  institutions: IInstitution[];
  questionaries: IQuestionnaire[];
  voterQuests: IQuestionnaire[]
  isEditingQuestions: boolean
  selectedQuestionnaireId: number;
  selectedQuestionId: number;
  audiences: IAudience[];
  voterUsers: IVoterUser[]
  distributionUsers: IDistributionUser[]
  post_types: string[]
  isFetchingPostTypes: boolean,
  isFetchingSentimentPrompt:boolean,
  sentimentPrompt:{
    positive:string,
    negative:string,
    topic:string,
  }
}
