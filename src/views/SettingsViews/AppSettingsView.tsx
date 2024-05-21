import React from "react";
import styled from "styled-components"
import {
  NotifyOnInjectComponent,
  SettingsBigTabComponent,
} from "../../components/SettingsComponents";
import { useTranslation } from "react-i18next";
import { activityList } from "../../config/userActivityList";
import { desktopBp } from "../../styles/variables";
import InjectToAppView from "./InjectToAppView";
import EditAssignmentsView from "./EditAssignmentsView";
import CreateAppUsersView from "./CreateAppUsersView";
import { withErrorBoundaryHOC } from "../../utils/withErrorBoundaryHOC";


const StyledText = styled.p`
  margin:0 0 2.71vw;
  @media screen and (max-width: ${desktopBp}) {
    margin-top: 10px;
    margin-bottom: 34px;
  }
`


const AppSettingsView = React.memo(() => {
  const { t } = useTranslation();

  return (
    <SettingsBigTabComponent title={t("settings_app")} activity={activityList["settings-app-open"]}>
      <StyledText>{t("settings_app-desc")}</StyledText>
      {/* <NotifyOnInjectComponent /> */}
       {/* <InjectToAppView />  */}
      <EditAssignmentsView />
      <CreateAppUsersView />
    </SettingsBigTabComponent>
  );
});

export default withErrorBoundaryHOC(AppSettingsView);
