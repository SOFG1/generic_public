import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import {
  DistributionAudienceComponent,
  DistributionUsersComponent,
  QuestionarieAudienceMapping,
  DistributionQuestionnaireComponent,
  SettingsSmallTabComponent,
} from "../../components/SettingsComponents";
import { useSettingsActions } from "../../store/settings";
import { desktopBp } from "../../styles/variables";
import { activityList } from "../../config/userActivityList";


const StyledText = styled.p`
  font-weight: 500;
  font-size: 1.25vw;
  line-height: 1.51vw;
  margin: 0;
  text-align: center;
  width: 100%;
  margin-bottom: 1.56vw;
  text-transform: none;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 16px;
    line-height: 19px;
    margin-bottom: 20px;
  }
`;


const StyledTabs = styled.div`
  display: flex;
  width: fit-content;
  margin-bottom: 1.56vw;
  flex-wrap: wrap;
  gap: 10px;
  @media screen and (max-width: ${desktopBp}) {
    margin-bottom: 20px;
  }
`

const StyledTab = styled.div`
  position: relative;
  font-size: 0.94vw;
  font-weight: 700;
  min-width: 8.23vw;
  line-height: 1;
  padding: 0.52vw;
  text-align: center;
  border: 1px solid #000;
  &:hover {
    color: #fff;
    background-color: #000;
  }
  &:hover > div {
    display: block;
  }
  @media screen and (max-width: ${desktopBp}) {
    font-size: 12px;
    padding: 7px;
    min-width: 103px;
  }
`

const StyledPopup = styled.div<{ onEnd?: boolean }>`
  display: none;
  position: absolute;
  top: 100%;
  inset-inline-start: 0;
  background-color: #fff;
  border: 1px solid #000;
  z-index: 1;
  ${({ onEnd }) => onEnd && "inset-inline-start: auto; inset-inline-end: 0;"}
`


const EditMappingView = React.memo(() => {
  const { t } = useTranslation();
  const { onGetQuestionaries, onGetAudiences } = useSettingsActions();
  const [selectedUsers, setSelectedUsers] = useState<number[]>([])

  useEffect(() => {
    onGetQuestionaries();
    onGetAudiences();
  }, []);



  return (<SettingsSmallTabComponent title={t("settings_mapping-title")} activity={activityList["toggle-mapping"]}>
    <StyledText>{t("settings_mapping-hint")}</StyledText>
    <StyledTabs>
      <StyledTab>{t("settings_users_mapping-title")}
        <StyledPopup><DistributionQuestionnaireComponent selectedUsers={selectedUsers} /></StyledPopup>
      </StyledTab>
      <StyledTab>{t("settings_mapping-title2")}
        <StyledPopup><QuestionarieAudienceMapping /></StyledPopup>
      </StyledTab>
      <StyledTab>{t("settings_mapping-title3")}
        <StyledPopup><DistributionAudienceComponent selectedUsers={selectedUsers} /></StyledPopup>
      </StyledTab>
    </StyledTabs>
    <DistributionUsersComponent selectedUsers={selectedUsers} onChange={setSelectedUsers} />

  </SettingsSmallTabComponent>
  );
});

export default EditMappingView;
