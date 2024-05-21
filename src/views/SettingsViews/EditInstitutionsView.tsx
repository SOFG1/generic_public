import React, { useState, useEffect, useMemo } from "react";
import EditInstitutionsContent from "./EditInstitutionsContent";
import { useTranslation } from "react-i18next";
import {
  SettingsBigTabComponent,
} from "../../components/SettingsComponents";
import { useSearchParams } from "react-router-dom";
import { useAppActions } from "../../store/app";
import { activityList } from "../../config/userActivityList";
import { useUserState } from "../../store/user";
import { withErrorBoundaryHOC } from "../../utils/withErrorBoundaryHOC";

const EditInstitutionsView = React.memo(() => {
  const { t } = useTranslation();
  const { userInfo } = useUserState()
  const { onShowAlert } = useAppActions();
  const [opened, setOpened] = useState<boolean>(false);
  const [searchParams] = useSearchParams();

  const groupIs409 = useMemo(() => {
    return userInfo?.group.id === 409
  }, [userInfo?.group.id])

  useEffect(() => {
    const tab = searchParams.get("tab");
    const message = searchParams.get("message");
    if (tab === "institutions") {
      setOpened(true);
    }
    if (message) {
      onShowAlert(false, t(message));
    }
  }, [searchParams, t]);

  return (
    <SettingsBigTabComponent title={groupIs409 ? t("settings_institutions(409)") : t("settings_institutions")} activity={activityList["open-edit-segments"]} opened={opened}>
      <EditInstitutionsContent />
    </SettingsBigTabComponent>
  );
});

export default withErrorBoundaryHOC(EditInstitutionsView);
