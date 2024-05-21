import React, { useCallback, useEffect, useMemo, useState } from "react"
import styled from "styled-components"
import { convert } from "html-to-text";
import { desktopBp } from "../../styles/variables";
import VoterAnswerDropdown from "./VoterAnswerDropdown";
import { IQuestion, IQuestionnaire, useSettingsActions, useSettingsState } from "../../store/settings";
import { Checkbox, Input } from "../../UI/Input";
import { IFilters } from "../../store/rawData";
import { FieldInput } from "../common/FieldInput";
import { Dropdown } from "../../UI/Dropdown";
import { activityList } from "../../config/userActivityList";
import { CheckedIcon } from "../../UI/Svg";
import { useTranslation } from "react-i18next";
import { getFormatDate } from "../../utils";


const StyledBox = styled.div`
  display: flex;
  justify-content: flex-start;
  padding-inline-end: 0.73vw;
  align-items: flex-end;
  @media screen and (max-width: ${desktopBp}) {
    padding-inline-end: 9px;
  }
  @media screen and (max-width: 550px) {
    flex-wrap: wrap;
    gap: 10px 0;
  }
`;

const StyledInput = styled(Input)`
  max-width: 27.5vw;
  flex-grow: 1;
  margin-inline-end: 4.17vw;
  @media screen and (max-width: ${desktopBp}) {
    max-width: 345px;
    margin-inline-end: 52px;
  }
  @media screen and (max-width: 550px) {
    max-width: 100%;
    margin-inline-end: 0;
  }
`;


const StyledValue = styled(FieldInput)`
  max-width: 13.96vw;
  margin-inline-end: auto;
  @media screen and (max-width: ${desktopBp}) {
    max-width: 175px;
  }
`;

const StyledDropdown = styled(Dropdown)`
  margin-inline-start: 0.78vw;
  @media screen and (max-width: ${desktopBp}) {
    margin-inline-start: 10px;
  }
`;

const StyledCheckbox = styled(Checkbox)`
  margin-inline-start: 10px;
`;

const AddButton = styled.button`
  height: 1.25vw;
  width: 1.25vw;
  padding: 0;
  flex-shrink: 0;
  border: 1px solid #000;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  font-size: 0.94vw;
  line-height: 100%;
  align-self: center;
  font-weight: 700;
  margin-inline-start: 10px;
  cursor: pointer;
  svg {
    height: 65%;
    width: 65%;
  }
  @media screen and (max-width: ${desktopBp}) {
    height: 16px;
    width: 16px;
    font-size: 12px;
  }
`;


interface IProps {
    is_voter: boolean
    selectedQuestionnaire?: IQuestionnaire
    selectedQuestion?: IQuestion
    fieldFilter?: IFilters
    questionaries: IQuestionnaire[]
} 

const CreateAnswerComponent = React.memo(({ is_voter, selectedQuestionnaire, selectedQuestion, fieldFilter, questionaries }: IProps) => {
    const { t } = useTranslation()
    const { selectedQuestionId } =
        useSettingsState();
    const { onCreateAnswer } = useSettingsActions();
    const [answerText, setAnswerText] = useState<string>("");
    const [fieldValue, setFieldValue] = useState<any>("");
    const [relatedQuestionId, setRelatedQuestionId] = useState<number>(0);
    const [updateReferal, setUpdateReferal] = useState<boolean>(false);


    const questionsOptions = useMemo(() => {
        const questions = selectedQuestionnaire?.questions || [];
        const options = questions
            .filter((q) => q.id !== selectedQuestionId)
            .map((q) => ({ item: convert(q.query), value: q.id }));
        return [{ item: "", value: "" }, ...options];
    }, [selectedQuestionnaire, selectedQuestionId]);

    const showAddAnswer = useMemo(() => {
        return !is_voter || selectedQuestion?.answers_options.length !== 3
    }, [is_voter, selectedQuestion?.answers_options])

    const handleAddAnswer = useCallback(() => {
      let valueFormated = fieldValue
      if(valueFormated instanceof Date) {
        valueFormated = getFormatDate(valueFormated)
      }
        onCreateAnswer(
            answerText,
            valueFormated,
            relatedQuestionId || null,
            updateReferal,
            is_voter
        );
    }, [answerText, fieldValue, relatedQuestionId, updateReferal, is_voter]);


    //Set answer to field value if answer is empty
    const handleSetFieldValue = useCallback((v: any) => {
      if(answerText === String(fieldValue)) {
        setAnswerText(String(v))
      }
      setFieldValue(v)
    }, [answerText, fieldValue])


    useEffect(() => {
        setFieldValue("");
    }, [fieldFilter]);

    //Reset values when questionnaires has been updated
    useEffect(() => {
        setAnswerText("");
    }, [questionaries]);

    useEffect(() => {
        setRelatedQuestionId(0);
    }, [selectedQuestionId]);

    const valueType = useMemo(() => {
      if(fieldFilter?.type === "int") return "int-single"
      if(fieldFilter?.type === "timestamp") return "date-single"
      return fieldFilter?.type
    }, [fieldFilter])


    if (!showAddAnswer) return null

    return <StyledBox>
        {is_voter && <VoterAnswerDropdown value={answerText} onChange={setAnswerText} answers={selectedQuestion?.answers_options} />}
        {!is_voter &&
            <StyledInput
                type="text"
                name="answer"
                label={t("settings_answers-label")}
                value={answerText}
                onChange={setAnswerText}
            />}

        {fieldFilter && (
            <StyledValue
                isForPreview={false}
                filter={{
                    ...fieldFilter,
                    type: valueType as string,
                    label: t("settings_answers-field"),
                    is_multiplier: false,
                    name: fieldFilter.slug,
                }}
                value={fieldValue}
                onChange={(s, v) => handleSetFieldValue(v)}
            />
        )}
        <StyledDropdown
            label={t("settings_answers-related")}
            placeholder={t("settings_answers-related")}
            value={relatedQuestionId}
            options={questionsOptions}
            onSelect={setRelatedQuestionId}
        />
        <StyledCheckbox
            label={t("settings_answers-update_referal")}
            isActive={updateReferal}
            onChange={() => setUpdateReferal(!updateReferal)}
        />
        <AddButton onClick={handleAddAnswer} data-action={activityList["add-answer"]}><CheckedIcon /></AddButton>
    </StyledBox>
})

export default CreateAnswerComponent