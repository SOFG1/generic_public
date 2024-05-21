import React, { useState } from "react"
import { useTranslation } from "react-i18next";
import { activityList } from "../../config/userActivityList";
import AppUsersComponent from "../../components/SettingsComponents/AppUsersComponent";
import { AppModeComponent, AssignCustomQuestionnaire, AssignementsExcelComponent, DeleteVoterUsersComponent, InjectAppAudienceComponent, ResyncContactsComponent, SetAppQuestionnairesComponent, SettingsSmallTabComponent } from "../../components/SettingsComponents";
import styled from "styled-components";
import { desktopBp } from "../../styles/variables";
import ChangeVoterPasswordView from "./ChangeVoterPasswordView";



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





const EditAssignmentsView = React.memo(() => {
  const { t } = useTranslation()
  const [selectedUsers, setSelectedUsers] = useState<number[]>([])



  return <SettingsSmallTabComponent title={t("settings_app-assignments_title")} activity={activityList["open-voter-assignements"]}>
    <StyledTabs>
      <StyledTab>{t("settings_app-mode_switch")}
        <StyledPopup>  <AppModeComponent selectedUsers={selectedUsers} /></StyledPopup>
      </StyledTab>
      <StyledTab>{t("settings_call-quests_users")}
        <StyledPopup>  <SetAppQuestionnairesComponent selectedUsers={selectedUsers} /></StyledPopup>
      </StyledTab>
      <StyledTab>{t("settings_audiences-inject")}
        <StyledPopup>  <InjectAppAudienceComponent selectedUsers={selectedUsers} /></StyledPopup>
      </StyledTab>
      <StyledTab>{t("settings_call-center-app_pass")}
        <StyledPopup>  <ChangeVoterPasswordView selectedUsers={selectedUsers} /></StyledPopup>
      </StyledTab>
      <ResyncContactsComponent selectedUsers={selectedUsers} />
      <AssignCustomQuestionnaire selectedUsers={selectedUsers} />
      <AssignementsExcelComponent />
      <StyledTab>{t("settings_app-delete")}
        <StyledPopup>  <DeleteVoterUsersComponent selectedUsers={selectedUsers} /></StyledPopup>
      </StyledTab>
    </StyledTabs>
    <AppUsersComponent selectedUsers={selectedUsers} onChange={setSelectedUsers} />
  </SettingsSmallTabComponent>
})

export default EditAssignmentsView