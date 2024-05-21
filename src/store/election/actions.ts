import { createAction } from "@reduxjs/toolkit";
import { IFilters, IKPI, IMapPoint, ITableCity, IVotingRate } from "./types";

export const electionSetCityValue = createAction<string>('election/setFilterCity')

export const electionGetKpi = createAction('election/getKpi')
export const electionSetKpi = createAction<IKPI>('election/setKpi')

export const electionGetGenderStat = createAction('election/getAgeStat')
export const electionSetGenderStat = createAction<any[]>('election/setAgeStat')


export const electionGetVotingRate = createAction('election/getVotingRate');
export const electionSetVotingRate = createAction<IVotingRate>('election/setVotingRate');

export const electionGetFilters = createAction('election/getFilters')
export const electionSetFilters = createAction<IFilters>('election/setFilters')

export const electionGetTable = createAction('electionGetTable')
export const electionSetTable = createAction<ITableCity[]>('election/setTable')
export const electionSetTableSort = createAction<string>('election/setTableSort')
export const electionResetTableSort = createAction('election/resetTableSort')
export const electionSetTablePage = createAction<number>('election/setTablePage')
export const electionSetPagesCount = createAction<number>('election/setPagesCount')

export const electionGetMap = createAction('election/getMap')
export const electionSetMap = createAction<IMapPoint[]>('election/setMap')

//Fetching
export const setIsFetchingTable = createAction<boolean>('election/setFetchingTable')
export const setIsFetchingKPI = createAction<boolean>('election/setFetchingKPI')
export const setIsFetchingRate = createAction<boolean>('election/setFetchingRate')




