import { useEffect, useMemo } from "react";
import styled from "styled-components";
import {
  AddEmailView,
  PaymentsView,
  ModulesSettingsView,
  DistributionSettingsView,
  GeneralSettingsView,
  PostTypesView,
} from "../views/SettingsViews";
import { useSettingsActions } from "../store/settings";
import { usePermissions, useUserState } from "../store/user/hooks";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { activityList } from "../config/userActivityList";

const StyledBox = styled.div`
  display: flex;
  justify-content: center;
`;
const PrivacyLink = styled(Link)`
  color: #000;
  text-decoration: none;
`;

const Settings = () => {
  const { t } = useTranslation();
  const { onGetColumns, onGetSMTP, onGetStatuses, onGetInstitutions } = useSettingsActions();
  const settingsPermissions = usePermissions("Settings");

  useEffect(() => {
    onGetColumns();
    onGetSMTP()
    onGetStatuses()
    onGetInstitutions();
  }, [onGetColumns, onGetSMTP, onGetInstitutions]);


  const showDistribution = useMemo(() => {
    return settingsPermissions.call_center || settingsPermissions.VoterUsers
  }, [settingsPermissions])

  const showModules = useMemo(() => {
    if (settingsPermissions.app_connection) return true
    if (settingsPermissions.facebook) return true
    if (settingsPermissions.google) return true
    if (settingsPermissions.election_day) return true
    if (settingsPermissions.volunteers_module) return true
    if (settingsPermissions.sms_service) return true
    if (settingsPermissions.email_service) return true
    return false
  }, [settingsPermissions])

  const showGeneral = useMemo(() => {
    if (settingsPermissions.fields) return true
    if (settingsPermissions.statuses) return true
    if (settingsPermissions.institutions) return true
    if (settingsPermissions.facebook_pages) return true
    return false
  }, [settingsPermissions])


  return (
    <div>
      {showDistribution && <DistributionSettingsView />}
      {showModules && <ModulesSettingsView />}
      {showGeneral && <GeneralSettingsView />}
      {settingsPermissions.payment && <PaymentsView />}
      {settingsPermissions.post_types && <PostTypesView />}
      {settingsPermissions.SMTP && <AddEmailView />}
      <StyledBox>
        <PrivacyLink
          to={"/privacy-policy"}
          data-action={activityList["settings-privacy-policy"]}
        >
          {t("sign-in_privacy-policy")}
        </PrivacyLink>
      </StyledBox>
    </div>
  );
}

export default Settings;
