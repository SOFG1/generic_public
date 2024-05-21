import React, { useEffect, useState } from "react";
import {
  EditQuestionnaireComponent,
  QuestionnairePreview,
  SettingsBigTabComponent,
} from "../../components/SettingsComponents";
import { useSettingsActions, useSettingsState } from "../../store/settings";
import EditQuestionView from "./EditQuestionView";
import { useTranslation } from "react-i18next";
import { activityList } from "../../config/userActivityList";
import styled from "styled-components";
import { desktopBp } from "../../styles/variables";
import { withErrorBoundaryHOC } from "../../utils/withErrorBoundaryHOC";



const StyledTabs = styled.div`
  display: flex;
  width: fit-content;
  border: 1px solid #000;
`

const StyledTab = styled.div<{ active: boolean }>`
  font-size: 0.94vw;
  font-weight: 700;
  min-width: 8.23vw;
  padding: 0.52vw;
  text-align: center;
  &:first-child {
    border-inline-end: 1px solid #000;
  }
  &:hover {
    color: #fff;
    background-color: #000;
  }
  ${({ active }) => active && "color: #fff; background-color: #000;"}
  @media screen and (max-width: ${desktopBp}) {
    font-size: 12px;
    padding: 7px;
    min-width: 103px;
  }
`

const StyledContent = styled.div`
  padding: 1.04vw;
  text-align: start;
  border: 1px solid #000;
  @media screen and (max-width: ${desktopBp}) {
    padding: 13px;
  }
  @media screen and (max-width: 700px) {
    padding: 3px;
  }
`



const EditQuestionnairesView = React.memo(() => {
  const { t } = useTranslation()
  const { questionaries, voterQuests } = useSettingsState();
  const { onGetQuestionaries, onGetVoterQuests } = useSettingsActions();
  const [isVoter, setIsVoter] = useState<boolean>(false)

  useEffect(() => { 
    onGetQuestionaries()
    onGetVoterQuests()
  }, [])


  return (
    <SettingsBigTabComponent title={t("settings_questionnaires-title")} activity={activityList["questionnaires-toggle"]}>
      <StyledTabs>
        <StyledTab active={!isVoter} onClick={() => setIsVoter(false)}>{t("settings_questionnaires-distribution")}</StyledTab>
        <StyledTab active={isVoter} onClick={() => setIsVoter(true)}>{t("settings_questionnaires-app")}</StyledTab>
      </StyledTabs>
      <StyledContent>
        <EditQuestionnaireComponent is_voter={isVoter} questionaries={isVoter ? voterQuests : questionaries} />
        <QuestionnairePreview questionaries={isVoter ? voterQuests : questionaries} is_voter={isVoter} />
        <EditQuestionView questionaries={isVoter ? voterQuests : questionaries} is_voter={isVoter} />
      </StyledContent>
    </SettingsBigTabComponent>
  );
});

export default withErrorBoundaryHOC(EditQuestionnairesView);
