import {createAction} from "@reduxjs/toolkit";
import {IMapLevel, IMapPoint, IPreviewPost, ISmStatsPost, SmStatsType} from "./types";

export const smStatsGetPages = createAction('msStats/getPagesData')
export const smStatsAddPages = createAction<{id: string, name: string}[]>('msStats/addPages')


export const smStatsGetSmStats = createAction('smStats/getSmStats')
export const smStatsSetSmStats = createAction<SmStatsType>('smStats/setSmStats')


export const smStatsGetPostList = createAction('smStats/getPostList')
export const smStatsSetPostList = createAction<ISmStatsPost[]>('smStats/setPostList')

export const smStatsGetMapPoints = createAction('smStats/getMapPoints')
export const smStatsSetMapPoints = createAction<IMapPoint[]>('smStats/setMapPoints')

export const smStatsGetMapLevel = createAction('smStats/getMapLevel')
export const smStatsSetMapLevel = createAction<IMapLevel[]>('smStats/setMapLevel')








export const smStatsGetPostViews = createAction('smStats/getPostViews')
export const smStatsSetPostViews = createAction<{[key: string]: any[]}>('smStats/setPostViews')
export const smStatsGetPreviewPost = createAction<string>('msStats/getPreviewPost')


export const smStatsSetDaysFilter = createAction<number>('smStats/setDaysFilter')
export const smStatsSetPageFilter = createAction<string>('smStats/setPageFilter')


export const smStatsSetGroupsFilter = createAction<string>('smStats/setGroupsFilter')



export const smStatsAddKeywords = createAction<{color: number, ndoc: number, nentry: number, word: string}[]>('msStats/addKeywords')
export const smStatsAddedKeywords = createAction<{ word: string, status: 'delete' | 'add' }>('msStats/addedKeywords')
export const smStatsAddPreviewPost = createAction<IPreviewPost | null>('msStats/addPreviewPost')
export const smStatsSelectPreviewPost = createAction<string>('smStats/selectPreviewPost')
export const smStatsToggleStatsFetching = createAction<boolean>('smStats/toggleStatsFetching')

export const smStatsGetOfflineScore = createAction('smStats/getOfflineScore')
export const smStatsSetOfflineScore = createAction<number>('smStats/setOfflineScore')
