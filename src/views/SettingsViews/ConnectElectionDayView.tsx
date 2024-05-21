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
import { desktopBp } from "../../styles/variables";
import { Switcher } from "../../UI/Switcher";
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

const ConnectElectionDayView = React.memo(() => {
  const { t } = useTranslation();
  const { token, userInfo } = useUserState();
  const { getUserInfoAction } = useUserActions();
  const { onShowAlert } = useAppActions();
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const isConencted = useMemo(() => {
    return userInfo?.permissions?.ElectionDay?.access;
  }, [userInfo?.permissions?.ElectionDay?.access]);

  const handleConnect = useCallback(async () => {
    if (token) {
      setIsFetching(true);
      const [dataRes, dataErr] = await handle(
        Settings.connectElectionDay(token)
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
        Settings.disconnectElectionDay(token)
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
      <SettingsTitle>{t("settings_election")}</SettingsTitle>
      {isFetching ? <Loader /> : (
        <Switcher
          action={activityList["toggle-election-day"]}
          switched={!!isConencted}
          onSwithOff={handleDisconnect}
          onSwithOn={handleConnect}
        />
      )}
    </StyledWrapper>
  );
});

export default withErrorBoundaryHOC(ConnectElectionDayView);
