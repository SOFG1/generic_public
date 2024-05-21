import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { EditAnswersComponent } from "../../components/SettingsComponents";
import { useRawDataState, useRawDataActions } from "../../store/rawData";
import {
  IQuestionnaire,
  useSettingsActions,
  useSettingsState,
} from "../../store/settings";
import { desktopBp } from "../../styles/variables";
import { Button } from "../../UI/Button";
import { Dropdown } from "../../UI/Dropdown";
import { SunEditorComponent } from "../../components/common/SunEditorComponent";
import { activityList } from "../../config/userActivityList";

const StyledTitle = styled.p`
  font-size: 1.25vw;
  line-height: 1.61vw;
  font-weight: 700;
  margin: 0 0 1.09vw;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 16px;
    line-height: 20px;
    margin: 0 0 14px;
  }
`;

const StyledWrapper = styled.div`
  margin-inline-start: 1.41vw;
  @media screen and (max-width: ${desktopBp}) {
    margin-top: -4px;
    margin-inline-start: 18px;
  }
  @media screen and (max-width: 900px) {
    margin-inline-start: 0;
  }
`;

const StyledDropdown = styled(Dropdown)`
  margin-inline-start: auto;
  max-width: 19.74vw;
  margin-bottom: 0;
  @media screen and (max-width: ${desktopBp}) {
    max-width: 248px;
  }
`;

const StyledOrder = styled.p`
  margin-top: -6px;
  font-size: 0.94vw;
  text-decoration: underline;
  @media screen and (max-width: ${desktopBp}) {
    margin-top: -4px;
  font-size: 12px;
  }
  @media screen and (max-width: 840px) {
    margin-top: 14px;
  }
`;

const StyledLabel = styled.p`
  font-size: 0.94vw;
  line-height: 1.2vw;
  margin-bottom: 0.52vw;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 12px;
    line-height: 15px;
    margin-top: 7px;
  }
`;

const StyledBox = styled.div`
  display: flex;
  gap: 0.52vw;
  margin: 2.76vw 0 2.19vw;
  @media screen and (max-width: ${desktopBp}) {
    gap: 7px;
    margin: 35px 0 27px;
  }
`;

const StyledButton = styled(Button)`
  font-size: 0.94vw;
  line-height: 1.2vw;
  font-weight: 600;
  height: 4.58vw;
  width: 10.83vw;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 12px;
    line-height: 15px;
    height: 58px;
    width: 136px;
  }
`;

interface IProps {
  questionaries: IQuestionnaire[]
  is_voter: boolean
}

const EditQuestionView = React.memo(({ questionaries, is_voter }: IProps) => {
  const { t } = useTranslation();
  const { selectedQuestionnaireId, selectedQuestionId } =
    useSettingsState();
  const { fields } = useRawDataState();
  const {
    onCreateQuestion, //+
    onSelectQuestionnaireQuestion, //+
    onEditQuesiton //+
  } = useSettingsActions();
  const { getFields, getFilters } = useRawDataActions();
  const [fieldToUpdate, setFieldToUpdate] = useState<string>("");
  const editorRef = useRef<any>(null)

  const selectedQuestionnaire = useMemo(() => {
    return questionaries.find((q) => q.id === selectedQuestionnaireId);
  }, [questionaries, selectedQuestionnaireId]);

  const fieldsOptions = useMemo(() => {
    return [
      { item: "", value: "" },
      ...fields.map((f) => ({ item: f.name, value: f.slug })),
    ];
  }, [fields]);

  const selectedQuestion = useMemo(() => {
    return selectedQuestionnaire?.questions.find(
      (q) => q.id === selectedQuestionId
    );
  }, [selectedQuestionnaire, selectedQuestionId]);

  const questionOrder = useMemo(() => {
    if (!selectedQuestionnaire) return 0;
    if (!selectedQuestionId) {
      return selectedQuestionnaire.questions.length + 1;
    }
    const index = selectedQuestionnaire.questions.findIndex(
      (q) => q.id === selectedQuestionId
    );
    return index + 1;
  }, [selectedQuestionId, selectedQuestionnaire]);

  const handleCreateQuestion = useCallback(() => {
    onCreateQuestion(editorRef.current.getContents(), fieldToUpdate, is_voter);
  }, [editorRef.current, fieldToUpdate, is_voter]);

  const handleEditQuestion = useCallback(() => {
    onEditQuesiton(editorRef.current.getContents(), fieldToUpdate, is_voter);
  }, [editorRef.current, fieldToUpdate, is_voter]);

  useEffect(() => {
    if (selectedQuestion && editorRef?.current?.setContents) {
      editorRef?.current?.setContents(selectedQuestion.query)
      const fieldVal = selectedQuestion.field_to_update
        ? selectedQuestion.field_to_update
        : "";
      setFieldToUpdate(fieldVal);
    }
  }, [selectedQuestion, editorRef.current]);

  useEffect(() => {
    if (!selectedQuestion && editorRef?.current?.setContents) {
      editorRef?.current?.setContents('')
      setFieldToUpdate("");
    }
  }, [selectedQuestion]);

  useEffect(() => {
    getFields();
    getFilters();
  }, []);

  if (!selectedQuestionnaire) return null;

  return (
    <>
      <StyledTitle>
        {t(
          selectedQuestion
            ? "settings_question-edit_title"
            : "settings_question-create_title"
        )}
      </StyledTitle>
      <StyledWrapper>
        <StyledDropdown
          label={t("settings_question-update-lbl")}
          placeholder={t("settings_question-update-lbl")}
          value={fieldToUpdate}
          onSelect={setFieldToUpdate}
          options={fieldsOptions}
        />
        <StyledOrder>{t("settings_question", {order: questionOrder})}</StyledOrder>
        <StyledLabel>{t("settings_question-question-lbl")}</StyledLabel>
        <SunEditorComponent ref={editorRef} />
        {selectedQuestion && <EditAnswersComponent questionaries={questionaries} is_voter={is_voter} />}
        <StyledBox>
          {selectedQuestion ? (
            <>
              <StyledButton onClick={handleEditQuestion} data-action={activityList["save-editing-question"]}>
                {t("settings_question-edit")}
              </StyledButton>
              <StyledButton onClick={() => onSelectQuestionnaireQuestion(0)} data-action={activityList["editing-question-reset"]}>
                {t("settings_question-reset")}
              </StyledButton>
            </>
          ) : (
            <StyledButton onClick={handleCreateQuestion} data-action={activityList["add-question"]}>
              {t("settings_question-add")}
            </StyledButton>
          )}
        </StyledBox>
      </StyledWrapper>
    </>
  );
});

export default EditQuestionView;
