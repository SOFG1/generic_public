import { createAction } from "@reduxjs/toolkit";
import { DateFilterType, IRelation, IRelationPerson, IRelationPost, ITag, RelationsKeyword } from "./types";


export const relationsGetTags = createAction('relations/getTags')
export const relationsSetTags = createAction<ITag>('relations/setTags')

export const relationsSetIsFetching = createAction<boolean>('relations/setIsFetching')


export const relationsSetKeywordFilter = createAction<string>('relation/setKeywordFilter')
export const relationsSetDateFilter = createAction<DateFilterType>('relation/setDateFilter')


export const relationsSetPosts = createAction<IRelationPost[]>('relations/setPosts')
export const relationsSetPersons = createAction<IRelationPerson[]>('relations/setPersons')
export const relationsSetRelations = createAction<IRelation[]>('relations/setRelations')



export const relationsResetData = createAction('relations/resetData')

export const relationsSetSelectedPost = createAction<IRelationPost | null>('relations/setSelectedPost')

export const relationsSetSelectedPostPersons = createAction<IRelationPerson[]>('relations/setSelectedPostPersons')
export const relationsSetSelectedPostRelations = createAction<IRelation[]>('relations/setSelectedPostRelations')


export const relationsGetKeywords = createAction('relations/getKeywords')
export const relationsSetKeywords = createAction<RelationsKeyword[]>('relations/setKeywords')
export const relationsSetIsFetchingKeywords = createAction<boolean>('relations/setIsFetchingKeywords')

export const relationsCreateKeyword = createAction<string>('relations/createKeyword')
export const relationsAppendKeyword = createAction<RelationsKeyword>('relations/appendKeyword')


export const relationsDeleteKeyword = createAction<number>('relations/deleteKeyword')
export const relationsRemoveKeyword = createAction<number>('relations/removeKeyword')



