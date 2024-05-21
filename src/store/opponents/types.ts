export interface IOpponents {
  preferred: any;
  all: { [key: string]: any }[];
}

type OpponentDataType = {
  chart: { month: number; value: number }[];
  last_month: number;
  total: number;
  currency?: string
};

type DemoCategory = 'male' | 'female' | 'unknown'


type IDemoData = {
  [key in DemoCategory]: {
    [key: string]: string
  }
}

export interface IOpponentData {
  budget: OpponentDataType;
  number_of_posts: OpponentDataType;
  reach: OpponentDataType;
  geo_target_groups: { [key: string]: string };
  demographic_target_groups: IDemoData
}

export type OpponentOrderType = "0" | "1" | "2" | "3";

export type SelectOpponentPayloadType = {
  opponent: any;
  order: OpponentOrderType;
};

export interface IGTrends {
  [key: string]: {
    [key: string]: any
  }
}

export interface IOpponentsState {
  daysFilter: number
  countryFilter: number
  searchKeywords: {
    0: string
    1: string
    2: string
    3: string
  }
  selectedOpponents: {
    0: any | null;
    1: any | null;
    2: any | null;
    3: any | null;
  };
  opponentsData: {
    0: IOpponentData | null;
    1: IOpponentData | null;
    2: IOpponentData | null;
    3: IOpponentData | null;
  };
  opponentGtrends: IGTrends;
  isFetchingGTrends: boolean
  isFetchingData: boolean
  alreadySearched: boolean
}
