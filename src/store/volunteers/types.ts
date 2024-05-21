export type StaticDataType = {
  activity: { name: string; id: number }[];
  topics: string[];
};

export type TableItemType = {
  [key: string]: string | number;
  id: number;
};

export interface IVolunteersState {
  appliedFilters: { [key: string]: string };
  staticData: StaticDataType;
  tableData: TableItemType[];
  tableTotalCount: number;
  isFetching: boolean;
  tableCurrentPage: number
}
