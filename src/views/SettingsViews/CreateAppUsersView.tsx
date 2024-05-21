import React, { useState } from "react"
import styled from "styled-components"
import { desktopBp } from "../../styles/variables";
import { useTranslation } from "react-i18next";
import { activityList } from "../../config/userActivityList";
import { CreateUsersExcelComponent, CreateUsersManualComponent, SettingsSmallTabComponent } from "../../components/SettingsComponents";



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




const CreateAppUsersView = React.memo(() => {
  const { t } = useTranslation()
  const [tab, setTab] = useState<"file" | "manual">("file")



  return <>

    <SettingsSmallTabComponent title={t("settings_app-creating_title")} activity={activityList["open-voter-assignements"]}>
      <StyledTabs>
        <StyledTab
          active={tab === "file"}
          onClick={() => setTab("file")}
        >
          {t("settings_app-creating_file")}
        </StyledTab>
        <StyledTab
          active={tab === "manual"}
          onClick={() => setTab("manual")}
        >
          {t("settings_app-creating_manual")}
        </StyledTab>
      </StyledTabs>
      {tab === "file" && <CreateUsersExcelComponent />}
      {tab === "manual" && <CreateUsersManualComponent />}
    </SettingsSmallTabComponent>
  </>
})


export default CreateAppUsersView