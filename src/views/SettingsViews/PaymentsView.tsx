import React from "react";
import { useUserState } from "../../store/user";
import { handle } from "../../api";
import { Settings } from "../../api/settings";
import { useAppActions } from "../../store/app";
import { useTranslation } from "react-i18next";
import {
  SettingsButton,
  SettingsCard,
  SettingsTitle,
} from "../../components/SettingsComponents";
import { activityList } from "../../config/userActivityList";
import { withErrorBoundaryHOC } from "../../utils/withErrorBoundaryHOC";

const PaymentsView = React.memo(() => {
  const { t } = useTranslation();
  const { token } = useUserState();
  const { onShowAlert } = useAppActions();
  const message: string = "123";

  const handlePayments = async () => {
    if (token) {
      const [dataRes, dataErr]: any = await handle(
        Settings.postPayment(token, message)
      );
      if (dataRes !== undefined) {
        console.log("dataRes", dataRes);
        onShowAlert(true, dataRes || t("settings_thanks"));
      }
      if (dataErr) {
        const { error } = dataErr;
        onShowAlert(false, error || t("settings_error"));
      }
    }
  };

  return (
    <>
      <SettingsCard>
        <SettingsTitle>{t("settings_payments")}</SettingsTitle>
        <SettingsButton onClick={handlePayments} data-action={activityList["settings-add-payment"]}>
          {t("settings_payments-add")}
        </SettingsButton>
      </SettingsCard>
    </>
  );
});

export default withErrorBoundaryHOC(PaymentsView);
