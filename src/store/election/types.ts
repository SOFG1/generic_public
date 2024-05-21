export interface IKPI {
  voters: number;
  voted_for: number;
  voters_per: number;
  expected: number;
}

export interface IFilters {
  city: string[];
}

export interface IVotingRate {
  all_bingo: number;
  voting_rate: number;
}

export interface ITableCity {
  [key: string]: string | number;
}

export interface IMapPoint {
  lat: number
  lng: number
  [key: string]: any
}

interface IStats {
  gender_stat: any[]
}


export interface IElectionState {
  filterCity: string;
  tableSortBy: {sortedTitle: string, direction: "ASC" | "DESC" | null}
  mapPoints: IMapPoint[];
  kpi: IKPI;
  stats: IStats
  filters: IFilters;
  votingRate: IVotingRate;
  table: ITableCity[];
  currentPage: number;
  pagesCount: number;
  isFetchingTable: boolean;
  isFetchingKPI: boolean;
  isFetchingRate: boolean;
}
