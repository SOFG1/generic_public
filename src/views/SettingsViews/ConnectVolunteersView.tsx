import React, { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { handle } from "../../api";
import { Settings } from "../../api/settings";
import {
  SettingsTitle,
} from "../../components/SettingsComponents";
import { useAppActions } from "../../store/app";
import { useUserState } from "../../store/user";
import { useUserActions } from "../../store/user/hooks";
import { Loader } from "../../UI/Spinners";
import { activityList } from "../../config/userActivityList";
import styled from "styled-components";
import { Switcher } from "../../UI/Switcher";
import { desktopBp } from "../../styles/variables";
import { withErrorBoundaryHOC } from "../../utils/withErrorBoundaryHOC";


const StyledWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.81vw;
  @media screen and (max-width: ${desktopBp}) {
    margin-bottom: 35px;
  }
  @media screen and (max-width: 700px) {
    flex-direction: column;
    gap: 5px;
  }
`

const ConnectVolunteersView = React.memo(() => {
  const { t } = useTranslation();
  const { token, userInfo } = useUserState();
  const { getUserInfoAction } = useUserActions();
  const { onShowAlert } = useAppActions();
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const isConencted = useMemo(() => {
    return userInfo?.permissions?.Volunteer?.access;
  }, [userInfo?.permissions?.Volunteer?.access]);

  const handleConnect = useCallback(async () => {
    if (token) {
      setIsFetching(true);
      const [dataRes, dataErr] = await handle(
        Settings.connectVolunteers(token)
      );
      setIsFetching(false);
      if (!dataErr) {
        getUserInfoAction(token);
      }
      if (dataErr) {
        onShowAlert(false, dataErr.error);
      }
    }
  }, [token]);

  const handleDisconnect = useCallback(async () => {
    if (token) {
      setIsFetching(true);
      const [dataRes, dataErr] = await handle(
        Settings.disconnectVolunteers(token)
      );
      setIsFetching(false);
      if (!dataErr) {
        getUserInfoAction(token);
      }
      if (dataErr) {
        onShowAlert(false, dataErr.error);
      }
    }
  }, [token]);

  return (
    <StyledWrapper>
      <SettingsTitle>{t("settings_volunteers")}</SettingsTitle>
      {isFetching ? <Loader /> : (
        <Switcher
          action={activityList["toggle-volunteers-module"]}
          switched={!!isConencted}
          onSwithOff={handleDisconnect}
          onSwithOn={handleConnect}
        />
      )}
    </StyledWrapper>
  );
});

export default withErrorBoundaryHOC(ConnectVolunteersView);
