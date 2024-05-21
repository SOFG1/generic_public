import { rootReducerType } from "../index";
import { IModellingData, IRawDataState } from "./types";
import { useDispatch, useSelector } from "react-redux";
import {
  rawDataApplyFilters,
  rawDataChangeFilters,
  rawDataChangeModellingData,
  rawDataDeleteRow,
  rawDataDownloadPivot,
  rawDataGetFields,
  rawDataGetFilters,
  rawDataGetStat,
  rawDataGetStatuses,
  rawDataGetTable,
  rawDataGetTableColumns,
  rawDataResetSort,
  rawDataSelectPage,
  rawDataSelectSort,
  rawDataSummarizationReport,
  rawDataUpdateRowStatus,
  rawDataUpdateStat,
} from "./actions";

export const rawDataSelector = (state: rootReducerType): IRawDataState => state.rawData;

export function useRawDataState(): IRawDataState {
  return useSelector(rawDataSelector);
}

export function useRawDataActions() {
  const dispatch = useDispatch();

  const onGetTable = () => {
    dispatch(rawDataGetTable());
  };
  const onDeleteAction = (id: string) => {
    dispatch(rawDataDeleteRow(id));
  };
  const getRawData = () => {
    dispatch(rawDataGetFilters());
    dispatch(rawDataGetFields());
    dispatch(rawDataGetTableColumns());
    dispatch(rawDataGetStat());
    onGetTable();
  };

  const onGetTableColumns = () => {
    dispatch(rawDataGetTableColumns());
  };

  const onGetStats = () => {
    dispatch(rawDataGetStat());
  };

  const onUpdateStat = () => {
    dispatch(rawDataUpdateStat());
  };
  const getFields = () => {
    dispatch(rawDataGetFields());
  };

  const getFilters = () => {
    dispatch(rawDataGetFilters());
  };

  const onSelectSort = (slug: string) => {
    dispatch(rawDataSelectSort(slug));
  };

  const onResetSort = () => {
    dispatch(rawDataResetSort());
  };

  const onChangeFilters = (filters: {[key: string]: any}) => {
    dispatch(rawDataChangeFilters(filters))
  }

  const onApplyFilters = () => {
    dispatch(rawDataApplyFilters());
    dispatch(rawDataGetTable());
    dispatch(rawDataUpdateStat());
  };

  const onSelectPage = (page: number) => {
    dispatch(rawDataSelectPage(page));
    onGetTable();
  };

  const onDownloadPivot = () => {
    dispatch(rawDataDownloadPivot());
  };

  const onUpdateRowStatus = (id: string, status: string) => {
    dispatch(rawDataUpdateRowStatus({ id, status }));
  };

  const onChangeModellingData = (key: keyof IModellingData, value: number | string[]) => {
    dispatch(rawDataChangeModellingData({key, value}))
  }


  const onGetSummarizationReport = () => {
    dispatch(rawDataSummarizationReport())
  }

  const onGetStatuses = () => {
    dispatch(rawDataGetStatuses())
  }


  return {
    getRawData,
    onChangeFilters,
    onSelectSort,
    onResetSort,
    onApplyFilters,
    onGetTable,
    onSelectPage,
    getFilters,
    onDeleteAction,
    getFields,
    onUpdateStat,
    onGetStats,
    onGetTableColumns,
    onDownloadPivot,
    onUpdateRowStatus,
    onChangeModellingData,
    onGetSummarizationReport,
    onGetStatuses
  };
}
