import { useDispatch } from "react-redux";
import {
  relationsResetData,
  relationsSetDateFilter,
  relationsSetIsFetching,
  relationsSetSelectedPost,
  relationsSetKeywordFilter,
  relationsSetPosts,
  relationsSetPersons,
  relationsSetRelations,
  relationsSetSelectedPostRelations,
  relationsSetSelectedPostPersons,
  relationsGetKeywords,
  relationsCreateKeyword,
  relationsDeleteKeyword,
  relationsGetTags,
} from "./actions";
import { DateFilterType, IRelationPost } from "./types";

export const useRelationsActions = () => {
  const dispatch = useDispatch();


  const onGetTags = () => {
    dispatch(relationsGetTags())
  }


  const onSetDateFilter = (filter: DateFilterType) => {
    dispatch(relationsSetDateFilter(filter));
    //Reset old data below
    dispatch(relationsSetPosts([]));
    dispatch(relationsSetPersons([]));
    dispatch(relationsSetRelations([]));
    dispatch(relationsSetSelectedPostRelations([]));
    dispatch(relationsSetSelectedPostPersons([]));
  };

  const onSetKeywordFilter = (filter: string) => {
    dispatch(relationsSetKeywordFilter(filter));
    //Reset old data below
    dispatch(relationsSetPosts([]));
    dispatch(relationsSetPersons([]));
    dispatch(relationsSetRelations([]));
    dispatch(relationsSetSelectedPostRelations([]));
    dispatch(relationsSetSelectedPostPersons([]));
  };
  const onSetIsFetching = (isFetching: boolean) => {
    dispatch(relationsSetIsFetching(isFetching));
  };

  const onSelectPost = (post: IRelationPost) => {
    dispatch(relationsSetSelectedPost(post));
    dispatch(relationsSetSelectedPostRelations([]));
    dispatch(relationsSetSelectedPostPersons([]));
  };

   const onResetData = () => {
    dispatch(relationsResetData());
  };

  const onGetKeywords = () => {
    dispatch(relationsGetKeywords())
  }

  const onCreateKeyword = (word: string) => {
    dispatch(relationsCreateKeyword(word))
  }

  const onDeleteKeyword = (id: number) => {
    dispatch(relationsDeleteKeyword(id))
  }

  return {
    onGetTags,
    onResetData,
    onSelectPost,
    onSetIsFetching,
    onSetKeywordFilter,
    onSetDateFilter,
    onGetKeywords,
    onCreateKeyword,
    onDeleteKeyword
  };
};

export const useRelationsData = () => {};
