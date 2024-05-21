import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { handle } from "../../api";
import { Settings } from "../../api/settings";
import { useAppActions } from "../../store/app";
import { useUserState } from "../../store/user";
import { useUserActions } from "../../store/user/hooks";
import { Loader } from "../../UI/Spinners";
import { activityList } from "../../config/userActivityList";
import { Switcher } from "../../UI/Switcher";


const FacebookLoginComponent = React.memo(() => {
  const { token, userInfo } = useUserState();
  const { getUserInfoAction } = useUserActions();
  const { onShowAlert } = useAppActions();
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const isConnected = useMemo(() => {
    return userInfo?.group?.facebook.length !== 0;
  }, [userInfo]);

  const handleLogin = useCallback(async () => {
    if (token) {
      setIsFetching(true);
      const [dataRes, dataErr] = await handle(Settings.facebookLogin(token));
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
        onShowAlert(false, dataErr.error);
      }
    }
  }, [token]);

  const handleLogout = useCallback(async () => {
    if (token) {
      setIsFetching(true);
      const [dataRes, dataErr] = await handle(Settings.facebookLogout(token));
      if (!dataErr) {
        getUserInfoAction(token);
      }
      if (dataErr) {
        onShowAlert(false, dataErr.error);
      }
      setIsFetching(false);
    }
  }, [token]);

  const handleDisconect = useCallback(async () => {
    if (token) {
      setIsFetching(true);
      const [dataRes, dataErr] = await handle(
        Settings.facebookDisconnect(token)
      );
      if (!dataErr) {
        getUserInfoAction(token);
      }
      if (dataErr) {
        onShowAlert(false, dataErr.error);
      }
      setIsFetching(false);
    }
  }, [token]);

  //Update userinfo in interval
  useEffect(() => {
    const interval = setInterval(() => {
      if (token && isFetching) {
        console.log("update");
        getUserInfoAction(token);
      }
    }, 3500);
    return () => clearInterval(interval);
  }, [token, isFetching]);

  useEffect(() => {
    if (isConnected) {
      setIsFetching(false);
    }
  }, [isConnected]);

  return (
    <>
      <Switcher
        action={activityList["toggle-facebook-connection"]}
        switched={isConnected}
        onSwithOff={handleDisconect}
        onSwithOn={handleLogin}
      />
      {isFetching && <Loader />}
    </>
  );
});

export default FacebookLoginComponent;
