import {rootReducerType} from "../index";
import {IPreviewPost, ISMStatsState} from "./types";
import {useDispatch, useSelector} from "react-redux";
import {
    smStatsAddedKeywords,
    smStatsGetPages,
    smStatsGetPreviewPost,
    smStatsAddPreviewPost,
    smStatsSelectPreviewPost,
    smStatsSetDaysFilter,
    smStatsSetPageFilter,
    smStatsGetPostViews,
    smStatsGetSmStats,
    smStatsGetPostList,
    smStatsGetMapPoints,
    smStatsGetMapLevel,
    smStatsSetGroupsFilter,
    smStatsGetOfflineScore,
} from "./actions";

export const smStatsSelector = (state:rootReducerType) => state.smStats

export function useSMStatsState(): ISMStatsState {
    return useSelector(smStatsSelector)
}

export function useSMStatsActions() {
    const dispatch = useDispatch()

    const onGetPages = () => {
        dispatch(smStatsGetPages())
    }

    const onGetSmStats = () => {
        dispatch(smStatsGetSmStats())
    }

    const onGetPostList = () => {
        dispatch(smStatsGetPostList())
    }

    const onGetMapPoints = () => {
        dispatch(smStatsGetMapPoints())
    }

    const onGetMapLevel = () => {
        dispatch(smStatsGetMapLevel())
    }

    const onSelectPreviewPost = (id: string) => {
        dispatch(smStatsGetPreviewPost(id))
        dispatch(smStatsSelectPreviewPost(id))
    }

    const onClearPreviewPost = () => {
        dispatch(smStatsAddPreviewPost(null))
    }

    const onSetDayFilter = (day: number) => {
        dispatch(smStatsSetDaysFilter(day))
    }

    const onSetPageFilter = (page: string) => {
        dispatch(smStatsSetPageFilter(page))
    }

    const onSetGroupsFilter = (groups: string) => {
        dispatch(smStatsSetGroupsFilter(groups))
    }

    const onChangeAddedKeywords  = (word: string, status: 'delete' | 'add') => {
        dispatch(smStatsAddedKeywords({word, status }))
    }

    const onGetPostViews = () => {
        dispatch(smStatsGetPostViews())
    }

    const onGetOfflineScore = () => {
        dispatch(smStatsGetOfflineScore())
    }

    const onSetPreviewPost = (post: IPreviewPost | null) => {
        dispatch(smStatsAddPreviewPost(post))
    }
    
    return {
        onGetPages,
        onGetSmStats,
        onGetPostList,
        onGetMapPoints,
        onGetMapLevel,
        onClearPreviewPost,
        onSelectPreviewPost,
        onSetDayFilter,
        onSetPageFilter,
        onSetGroupsFilter,
        onChangeAddedKeywords,
        onGetPostViews,
        onGetOfflineScore,
        onSetPreviewPost
    }
}