import React from "react";
import { useTranslation } from "react-i18next";
import {
  SettingsBigTabComponent,
} from "../../components/SettingsComponents";
import EditPagesContent from "./EditPagesContent";
import { activityList } from "../../config/userActivityList";
import { withErrorBoundaryHOC } from "../../utils/withErrorBoundaryHOC";

const EditPagesView = React.memo(() => {
  const { t } = useTranslation();

  return (
    <SettingsBigTabComponent title={t("settings_pages")} activity={activityList["open-edit-pages"]}>
      <EditPagesContent />
    </SettingsBigTabComponent>
  );
});

export default withErrorBoundaryHOC(EditPagesView);
