import React, { useState, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { handle } from "../../api";
import { Settings } from "../../api/settings";
import {
  EditExistingSms,
  EditNewSms,
  SettingsBigTabComponent,
} from "../../components/SettingsComponents";
import { ISmsService } from "../../store/settings";
import { useUserState } from "../../store/user";
import { activityList } from "../../config/userActivityList";
import { withErrorBoundaryHOC } from "../../utils/withErrorBoundaryHOC";




const EditSmsView = React.memo(() => {
  const { t } = useTranslation();
  const { token } = useUserState();
  const [existingServices, setExistingServices] = useState<ISmsService[]>([]);
  const [newServices, setNewServices] = useState<ISmsService[]>([]);

  const getServicesAndFields = useCallback(async () => {
    if (token) {
      const [dataRes, dataErr] = await handle(Settings.getSms(token));
      if (dataRes) {
        setExistingServices(dataRes.user);
        setNewServices(dataRes.all);
      }
      if (dataErr) {
        console.log(dataErr);
      }
    }
  }, [token]);

  useEffect(() => {
    getServicesAndFields();
  }, [getServicesAndFields]);

  return (
    <SettingsBigTabComponent title={t("settings_call-center-sms")} activity={activityList["settings-sms-toggle"]}>
      <EditExistingSms services={existingServices} />
      <EditNewSms services={newServices} />
    </SettingsBigTabComponent>
  );
});

export default withErrorBoundaryHOC(EditSmsView);
