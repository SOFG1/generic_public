import React from "react";
import { useTranslation } from "react-i18next";
import EditMappingView from "./EditMappingView";
import EditUsersCountView from "./EditUsersCountView";
import { activityList } from "../../config/userActivityList";
import { SettingsBigTabComponent } from "../../components/SettingsComponents";
import { withErrorBoundaryHOC } from "../../utils/withErrorBoundaryHOC";


const EditCallCenterView = React.memo(() => {
  const { t } = useTranslation();

  return (
    <SettingsBigTabComponent title={t("settings_call-center-settings")} activity={activityList["settings-distribution-toggle"]}>
      <EditUsersCountView />
      <EditMappingView />
    </SettingsBigTabComponent>
  );
});

export default withErrorBoundaryHOC(EditCallCenterView);
