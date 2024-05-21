import { useDispatch, useSelector } from "react-redux";
import { rootReducerType } from "..";
import {
  electionGetFilters,
  electionGetKpi,
  electionGetTable,
  electionGetVotingRate,
  electionSetCityValue,
  electionSetTablePage,
  electionSetTableSort,
  electionGetMap,
  electionGetGenderStat,
  electionResetTableSort,
} from "./actions";
import { IElectionState } from "./types";

export const electionSelector = (state: rootReducerType) => state.election;

export const useElectionState = (): IElectionState => useSelector(electionSelector);

export const useElectionActions = () => {
  const dispatch = useDispatch();

  const onGetKpi = () => {
    dispatch(electionGetKpi());
  };

  const onGetVotingRate = () => {
    dispatch(electionGetVotingRate());
  };

  const onGetFilters = () => {
    dispatch(electionGetFilters());
  };

  const onGetTable = () => {
    dispatch(electionGetTable())
  };

  const onSetTableSort = (value: string) => {
    dispatch(electionSetTableSort(value))
  }

  const onResetTableSort = () => {
    dispatch(electionResetTableSort())
  }

  const onSetCityFilter = (value: string) => {
    dispatch(electionSetCityValue(value));
  };

  const onSetPage = (page: number) => {
    dispatch(electionSetTablePage(page))
    dispatch(electionGetTable())
  }

  const onGetMap = () => {
    dispatch(electionGetMap())
  }

  const onGetStats = () => {
    dispatch(electionGetGenderStat())
  }

  return {
    onSetCityFilter,
    onGetKpi,
    onGetVotingRate,
    onGetTable,
    onSetTableSort,
    onResetTableSort,
    onGetFilters,
    onSetPage,
    onGetMap,
    onGetStats
  };
};
