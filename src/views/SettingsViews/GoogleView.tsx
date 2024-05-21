import React, { useMemo, useCallback, useState, useEffect } from "react";
import styled from "styled-components";
import { useUserActions } from "../../store/user/hooks";
import { GoogleIcon } from "../../UI/Svg";
import { useUserState } from "../../store/user";
import { handle } from "../../api";
import { Settings } from "../../api/settings";
import { useAppActions } from "../../store/app";
import { Loader } from "../../UI/Spinners";
import { SettingsButton, SettingsTitle } from "../../components/SettingsComponents";
import { useTranslation } from "react-i18next";
import { activityList } from "../../config/userActivityList";
import { desktopBp } from "../../styles/variables";
import { Switcher } from "../../UI/Switcher";
import { withErrorBoundaryHOC } from "../../utils/withErrorBoundaryHOC";

const StyledWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.81vw;
  > svg {
    min-width: 112px;
  }
  @media screen and (max-width: ${desktopBp}) {
    margin-bottom: 35px;
  }
  @media screen and (max-width: 700px) {
    flex-direction: column;
    gap: 5px;
  }
`

const StyledAccountName = styled(SettingsTitle)`
  margin-inline-end: 1.04vw;
  @media screen and (max-width: ${desktopBp}) {
    margin-inline-end: 13px;
  }
`

const StyledTitle = styled(SettingsTitle)`
  text-align: start;
  margin-inline-start: 5px;
`

const GoogleView = React.memo(() => {
  const { t } = useTranslation()
  const { token, userInfo } = useUserState();
  const { getUserInfoAction } = useUserActions()
  const { onShowAlert } = useAppActions();
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const accountName = useMemo(() => {
    return userInfo?.group?.google_name;
  }, [userInfo?.group?.google_name]);

  const handleConnect = useCallback(async () => {
    if (token) {
      setIsFetching(true);
      const [dataRes, dataErr] = await handle(Settings.connectGoogleAds(token));
      if (dataRes) {
        //Open in new window received URL
        window.open(
          dataRes.auth_url,
          "targetWindow",
          `toolbar=no,
          location=no,
          status=no,
          menubar=no,
          scrollbars=yes,
          resizable=yes,
          width=400,
          height=600`
        );
      }
      if (dataErr) {
        onShowAlert(
          false,
          "Please, check that you have disabled your add blocker"
        );
      }
    }
  }, [token]);

  const handleDisconnect = useCallback(async () => {
    if (token) {
      setIsFetching(true);
      const [dataRes, dataErr] = await handle(Settings.disconnectGoogleAds(token));
      setIsFetching(false);
      if (!dataErr) {
        onShowAlert(true, 'Disconnected successfully')
        getUserInfoAction(token)
      }
      if (dataErr) {
        onShowAlert(
          false,
          "Please, check that you have disabled your add blocker"
        );
      }
    }
  }, [])

  //Update userinfo in interval
  useEffect(() => {
    const interval = setInterval(() => {
      if (token && isFetching) {
        getUserInfoAction(token)
      }
    }, 3500)
    return () => clearInterval(interval)
  }, [token, isFetching])

  useEffect(() => {
    if (accountName) {
      setIsFetching(false)
    }
  }, [accountName])

  return (
    <StyledWrapper>
      <GoogleIcon />
      <StyledTitle>
        {t("settings_google2")}
      </StyledTitle>
      <StyledAccountName>{accountName}</StyledAccountName>
      {isFetching ? <Loader /> : (
        <Switcher
          action={activityList["toggle-google-connection"]}
          switched={!!accountName}
          onSwithOff={handleDisconnect}
          onSwithOn={handleConnect}
        />
      )}
    </StyledWrapper>
  );
});

export default withErrorBoundaryHOC(GoogleView);