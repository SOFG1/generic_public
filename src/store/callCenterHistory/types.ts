type FilterType = {
  fetch: boolean;
  name: string;
  type?: string
  options?: string[]
}

export interface ICallCenterHistoryFilters {
  sms: {
    incoming: {
      [key: string]: FilterType
    }
    outgoing: {
      [key: string]: FilterType
    };
  };
  email: {
    outgoing: {
      [key: string]: FilterType
    };
  };
}

export interface IInterviewer {
  id: number;
  login: string;
}


interface ISection {
  table: any[]
  currentPage: number
  sorting: string
  count: number
  isFetching: boolean
}

export interface ICallCenterHistoryFilter {
  [key: string]: string | number
}

export interface IQuestionarieFilter {
  date_range?: string;
  questionarie?: number;
  interviewier?: string;
}


export interface IActivityFilters {
  action: string
  page: string
  selectedUsers: string
  dateFilter: [Date | null, Date | null]
}


//State
export interface ICallCenterHistoryState {
  filters: ICallCenterHistoryFilters | null;
  smsIncoming: ISection
  smsOutgoing: ISection
  emails: ISection
  questionaries: ISection
  activities: ISection
  voterQuests: ISection
  interviewers: IInterviewer[];
  activityFilters: IActivityFilters
}