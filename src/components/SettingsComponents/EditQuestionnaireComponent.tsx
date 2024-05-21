import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { IQuestionnaire, useSettingsActions, useSettingsState } from "../../store/settings";
import { desktopBp } from "../../styles/variables";
import { Button } from "../../UI/Button";
import { DropdownManual } from "../../UI/Dropdown";
import { Input } from "../../UI/Input";
import { EditIcon, TrashIcon } from "../../UI/Svg";
import { ConfirmDeleteFull } from "../common/ConfirmDeleteFull";
import { activityList } from "../../config/userActivityList";

const StyledBox = styled.div`
  display: flex;
  gap: 1.61vw;
  @media screen and (max-width: ${desktopBp}) {
    gap: 20px;
  }
  @media screen and (max-width: 830px) {
    gap: 10px;
  }
`;

const StyledDropdown = styled(DropdownManual)`
  max-width: 19.74vw;
  margin-bottom: 1.04vw;
  @media screen and (max-width: ${desktopBp}) {
    max-width: 248px;
    margin-bottom: 13px;
  }
`;

const StyledBtn = styled.button`
  height: 1.82vw;
  width: 1.82vw;
  flex-shrink: 0;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #000;
  background-color: transparent;
  padding: 0;
  cursor: pointer;
  svg {
    height: 60%;
    width: 60%;
  }
  @media screen and (max-width: ${desktopBp}) {
    height: 23px;
    width: 23px;
  }
`;


const StyledInput = styled(Input)`
  max-width: 19.74vw;
  @media screen and (max-width: ${desktopBp}) {
    max-width: 248px;
  }
`;

const SaveButton = styled(Button)`
  height: 1.67vw;
  width: 4.17vw;
  @media screen and (max-width: ${desktopBp}) {
    height: 21px;
    width: 52px;
  }
`;

const CloneButton = styled(SaveButton)`
  margin-inline-start: auto;
`

interface IProps {
  is_voter: boolean
  questionaries: IQuestionnaire[]
}

const EditQuestionnaireComponent = React.memo(({ is_voter, questionaries }: IProps) => {
  const { t } = useTranslation();
  const { selectedQuestionnaireId } = useSettingsState();
  const {
    onSelectQuestionnaire,
    onCreateQuestionnaire,
    onDeleteQuestionnaire,
    onRenameQuestionnaire,
    onCloneQuestionnaire
  } = useSettingsActions();
  const boxRef = useRef<HTMLDivElement>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<null | number>(null);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [questionnaireName, setQuestionnaireName] = useState<string>("");

  const questionairesOptions = useMemo(() => {
    return questionaries.map((q) => ({ item: q.name, value: q.id }));
  }, [questionaries]);

  const selectedQuestionnaire = useMemo(() => {
    return questionaries.find((q) => q.id === selectedQuestionnaireId);
  }, [questionaries, selectedQuestionnaireId]);

  const handleClickOutside = useCallback(
    (e: any) => {
      if (!e.composedPath()?.includes(boxRef?.current)) {
        setEditMode(false);
      }
    },
    [boxRef.current]
  );

  useEffect(() => {
    if (editMode) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => document.removeEventListener("click", handleClickOutside);
  }, [handleClickOutside, editMode]);

  useEffect(() => {
    if (selectedQuestionnaire) {
      setQuestionnaireName(selectedQuestionnaire.name);
    }
  }, [selectedQuestionnaire, editMode]);

  useEffect(() => {
    setEditMode(false)
  }, [questionaries])


  //Deselect selected questionnaire
  useEffect(() => {
    return () => {
      onSelectQuestionnaire(0)
    }
  }, [])

  return (
    <>
      <StyledBox ref={boxRef}>
        {!editMode && (
          <>
            <StyledDropdown
              label={t("settings_questionnaires-label")}
              placeholder={t("settings_questionnaires-label")}
              options={questionairesOptions}
              value={selectedQuestionnaireId}
              onSelect={onSelectQuestionnaire}
              onAddOption={(n) => onCreateQuestionnaire(n, is_voter)}
            />
            {!!selectedQuestionnaireId && (
              <>
                <CloneButton data-action={activityList["questionnaires-clone"]} onClick={() => onCloneQuestionnaire(is_voter)}>
                  {t("settings_questionnaires-clone")}
                </CloneButton>
                <StyledBtn
                  onClick={() => setEditMode(true)}
                  data-action={activityList["questionnaires-edit-name"]}
                >
                  <EditIcon />
                </StyledBtn>
                <StyledBtn
                  data-action={activityList["questionnaires-delete"]}
                  onClick={() => setConfirmDeleteId(selectedQuestionnaireId)}
                >
                  <TrashIcon />
                </StyledBtn>
              </>
            )}
          </>
        )}
        {editMode && (
          <>
            <StyledInput
              type="text"
              name="name"
              label={t("settings_questionnaires-name")}
              value={questionnaireName}
              onChange={setQuestionnaireName}
            />
            <SaveButton
              data-action={activityList["questionnaires-save-name"]}
              onClick={() => onRenameQuestionnaire(questionnaireName, is_voter)}
            >
              {t("settings_questionnaires-save")}
            </SaveButton>
          </>
        )}
      </StyledBox>
      <ConfirmDeleteFull
        show={!!confirmDeleteId}
        title={t("settings_questionnaires-warning")}
        onClose={() => setConfirmDeleteId(null)}
        onDelete={() => onDeleteQuestionnaire(confirmDeleteId as number, is_voter)}
      />
    </>
  );
});

export default EditQuestionnaireComponent;
