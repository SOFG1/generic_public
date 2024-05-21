import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { handle } from "../../api";
import { Settings } from "../../api/settings";
import {
  EditExistingEmail,
  EditNewEmail,
  SettingsBigTabComponent,
} from "../../components/SettingsComponents";
import { ISmsService } from "../../store/settings";
import { usePermissions, useUserState } from "../../store/user";
import { activityList } from "../../config/userActivityList";
import EditSignaturesView from "./EditSignaturesView";

const EditEmailView = React.memo(() => {
  const { t } = useTranslation();
  const { token } = useUserState();
  const settingsPermissions = usePermissions("Settings");
  const [existingServices, setExistingServices] = useState<ISmsService[]>([]);
  const [newServices, setNewServices] = useState<ISmsService[]>([]);

  const fetchEmailServices = useCallback(async () => {
    if (token) {
      const [dataRes, dataErr] = await handle(Settings.getEmailServices(token));
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
    fetchEmailServices();
  }, [fetchEmailServices]);

  return (
    <SettingsBigTabComponent title={t("settings_call-center-email")} activity={activityList["settings-email-toggle"]}>
      <EditExistingEmail services={existingServices} />
      <EditNewEmail services={newServices} />
      {settingsPermissions.edit_signature && <EditSignaturesView />}
    </SettingsBigTabComponent>
  );
});

export default EditEmailView;
