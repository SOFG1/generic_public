import { IStatus } from "../settings";

export enum EFiltersType {
  "str",
  "timestamp",
  "int",
  "bool",
}

export type RawDataModalType = "file-upload" | "update" | "row-upload" | null;

export interface IFilters {
  id: number;
  default_disabled: boolean;
  fetch: boolean;
  is_multiplier: boolean;
  len_input_prefetch: number;
  name: string;
  options: Array<[string, string]>;
  slug: string;
  type: string;
  parent: string | null;
}
export interface IFields {
  id: number;
  name: string;
  slug: string;
  required: boolean;
  fetch: boolean;
  default_disabled: boolean;
  type: string;
  parent: null | string;
}
export interface IRawDataStats {
  gender_stat: { gender: string; age_group: null | string; count: number }[];
  city_stat: { city: string; count: number; change: number }[];
  age_stat: { age_group: null | string; count: number; change: number }[];
  status_stat: { status: string; count: number; percent: number }[];
  "2013_support"?: {
    pastold2013support: string | null;
    count: number;
    percent: number;
  }[];
  "2009_support"?: {
    pastold2009support: string | null;
    count: number;
    percent: number;
  }[];
  status_prediction_stat?: { count: number; status: string; percent: number }[];
}
export interface ITableColumn {
  [columns: string]: string | number | null | boolean;
}

export interface IModellingData {
  filterId: number
  proValues: string[]
  antiValues: string[]
  selectedTextual: string[]
  selectedNumeric: string[]
}

export interface IRawDataState {
  filters: IFilters[];
  tableColumns: { name: string; slug: string }[];
  fields: IFields[];
  //filtersData: { [slug: string]: string | number };
  appliedFilters?: { [slug: string]: any };
  filtersValues?: { [slug: string]: any };
  sortBy: { slug: string; direction: "ASC" | "DESC" | null };
  currentPage: number;
  limit: number;
  count: number;
  table: ITableColumn[];
  stats: IRawDataStats;
  isFetchingStats: boolean;
  isFetchingTable: boolean;
  modellingData: IModellingData
  statuses: IStatus[]
}
