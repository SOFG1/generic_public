import { rootReducerType } from "..";
import { DateFilterType, IRelationPerson, IRelationPost, ITag, RelationsKeyword } from "./types";

export const relationsTagsSelector = (state: rootReducerType): ITag[] => state.relations.tags || []
export const relationsIsFetchingSelector = (state: rootReducerType): boolean => state.relations.isFetching
export const relationsPostsSelector = (state: rootReducerType): any[] => state.relations.posts

export const relationsPersonsSelector = (state: rootReducerType): any[] => state.relations.persons
export const relationsRelationsSelector = (state: rootReducerType): any[] => state.relations.relations
export const relationsSelectedPostSelector = (state: rootReducerType): IRelationPost | null => state.relations.selectedPost
export const relationsSelectedPersonsSelector = (state: rootReducerType): IRelationPerson[] => {
    return state.relations.selectedPostPersons
}
export const relationsSelectedRelationsSelector = (state: rootReducerType): IRelationPerson[] => {
    return state.relations.selectedPostRelations
}
export const relationsKeywordFilterSelector = (state: rootReducerType): string => state.relations.keywordFilter
export const relationsDateFilterSelector = (state: rootReducerType): DateFilterType => state.relations.dateFilter

export const relationsKeywordsSelector = (state: rootReducerType): RelationsKeyword[] | undefined => state.relations.keywords
export const relationsKeywordsFetchingSelector = (state: rootReducerType): boolean | undefined=> state.relations.isFetchingKeywords
