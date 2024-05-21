import { rootReducerType } from "../index";
import { ICreateField, IDefaultPage, ISettingsState } from "./types";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useMemo } from "react";
import {
  settingsCreateAnswer,
  settingsCreateField,
  settingsCreateQuestion,
  settingsCreateQuestionnaire,
  settingsDeleteAnswer,
  settingsDeleteQuestion,
  settingsDeleteQuestionnaire,
  settingsEditAnswer,
  settingsEditDefaultPages,
  settingsEditQuestion,
  settingsEditQuestionOrder,
  settingsGetVoterUsers,
  settingsGetAudiences,
  settingsGetDefaultPages,
  settingsGetInstitutions,
  settingsGetQuestionaries,
  settingsRenameQuestionnaire,
  settingsSetQuestionnaireId,
  settingsSetSelectedQuestion,
  settingsGetStatuses,
  settingsGetVoterQuests,
  settingsGetColumns,
  settingsGetSMTP,
  settingsDeleteAudience,
  settingsCloneQuestionnaire,
  settingsGetDistributionUsers,
  settingsGetPostTypes,
  settingsChangeColumnOrder,
  settingsDeleteVoterUsers, settingsFetchSentimentPrompt, settingsSetSentimentPrompt,
} from "./actions";

export const settingsSelector = (state: rootReducerType): ISettingsState =>
  state.settings;

export function useSettingsState(): ISettingsState {
  return useSelector(settingsSelector);
}

export function useSettingsActions() {
  const dispatch = useDispatch();

  const onGetColumns = useCallback(() => {
    dispatch(settingsGetColumns())
  }, [dispatch]);


  const onGetSMTP = useCallback(() => {
    dispatch(settingsGetSMTP())
  }, [dispatch]);

  const onGetStatuses = useCallback(() => {
    dispatch(settingsGetStatuses());
  }, [dispatch]);

  const onGetInstitutions = useCallback(() => {
    dispatch(settingsGetInstitutions());
  }, [dispatch]);

  const onGetQuestionaries = () => {
    dispatch(settingsGetQuestionaries());
  };

  const onGetAudiences = () => {
    dispatch(settingsGetAudiences());
  };

  const onSelectQuestionnaire = (questionnaireId: number) => {
    dispatch(settingsSetQuestionnaireId(questionnaireId));
  };

  const onSelectQuestionnaireQuestion = (questionId: number) => {
    dispatch(settingsSetSelectedQuestion(questionId));
  };

  const onCreateQuestionnaire = (name: string, is_voter: boolean) => {
    dispatch(settingsCreateQuestionnaire({ name, is_voter }));
  };

  const onRenameQuestionnaire = (name: string, is_voter: boolean) => {
    dispatch(settingsRenameQuestionnaire({ name, is_voter }));
  };

  const onDeleteQuestionnaire = (id: number, is_voter: boolean) => {
    dispatch(settingsDeleteQuestionnaire({ id, is_voter }));
  };

  const onCreateQuestion = (text: string, field: string, is_voter: boolean) => {
    dispatch(settingsCreateQuestion({ text, field, is_voter }));
  };

  const onEditQuesiton = (text: string, field: string, is_voter: boolean) => {
    dispatch(settingsEditQuestion({ text, field, is_voter }));
  };

  const onEditQuestionOrder = (questionId: number, order: number, is_voter: boolean) => {
    dispatch(settingsEditQuestionOrder({ id: questionId, order, is_voter }));
  };

  const onDeleteQuestion = (questionId: number, is_voter: boolean) => {
    dispatch(settingsDeleteQuestion({ id: questionId, is_voter }));
  };

  const onCreateAnswer = (
    answer_words: string,
    value: any,
    related_question_id: number | null,
    is_update_referal: boolean,
    is_voter: boolean
  ) => {
    dispatch(
      settingsCreateAnswer({
        answer_words,
        value_to_set: value,
        related_question_id,
        is_update_referal,
        is_voter
      })
    );
  };

  const onEditAnswer = (
    id: number,
    answer_words: string,
    value_to_set: string,
    related_question_id: number | null,
    is_update_referal: boolean,
    is_voter: boolean
  ) => {
    dispatch(
      settingsEditAnswer({
        id,
        answer_words,
        value_to_set,
        related_question_id,
        is_update_referal,
        is_voter
      })
    );
  };

  const onDeleteAnswer = (id: number, is_voter: boolean) => {
    dispatch(settingsDeleteAnswer({ id, is_voter }));
  };

  const onCreateField = (data: ICreateField) => {
    dispatch(settingsCreateField(data));
  };

  const onGetDefaultPages = () => {
    dispatch(settingsGetDefaultPages());
  };

  const onEditDefaullPages = (pages: IDefaultPage[]) => {
    dispatch(settingsEditDefaultPages(pages));
  };

  const onGetVoterUsers = () => {
    dispatch(settingsGetVoterUsers());
  };

  const onGetVoterQuests = () => {
    dispatch(settingsGetVoterQuests())
  }


  const onDeleteAudience = (audienceId: number) => {
    dispatch(settingsDeleteAudience(audienceId))
  }


  const onCloneQuestionnaire = (is_voter: boolean) => {
    dispatch(settingsCloneQuestionnaire({ is_voter }))
  }

  const onGetDistributionUsers = () => {
    dispatch(settingsGetDistributionUsers())
  }


  const onGetPostTypes = () => {
    dispatch(settingsGetPostTypes())
  }

  const onChangeColumnOrder = (id: number, order: number) => {
    dispatch(settingsChangeColumnOrder({id, order}))
  }


  const onDeleteVoterUsers = (list: number[], permanently: boolean) => {
    dispatch(settingsDeleteVoterUsers({list, permanently}))
  }

  const onFetchSentimentActivePrompt = ()=>{
    dispatch(settingsFetchSentimentPrompt());
  }

  const onSetSentimentPrompt = (positive:string, negative:string, topic:string)=>{
    dispatch(settingsSetSentimentPrompt({positive, negative, topic}));
  }

  return {
    onSetSentimentPrompt,
    onGetColumns,
    onGetSMTP,
    onGetStatuses,
    onGetInstitutions,
    onFetchSentimentActivePrompt,
    onGetQuestionaries,
    onGetAudiences,
    onSelectQuestionnaire,
    onCreateQuestionnaire,
    onRenameQuestionnaire,
    onDeleteQuestionnaire,
    onSelectQuestionnaireQuestion,
    onCreateQuestion,
    onEditQuesiton,
    onEditQuestionOrder,
    onDeleteQuestion,
    onCreateAnswer,
    onEditAnswer,
    onDeleteAnswer,
    onCreateField,
    onGetDefaultPages,
    onEditDefaullPages,
    onGetVoterUsers,
    onGetVoterQuests,
    onDeleteAudience,
    onCloneQuestionnaire,
    onGetDistributionUsers,
    onGetPostTypes,
    onChangeColumnOrder,
    onDeleteVoterUsers
  };
}
