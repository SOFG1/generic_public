import React, { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { handle } from "../../api";
import { Settings } from "../../api/settings";
import {
  SettingsTitle,
} from "../../components/SettingsComponents";
import { useAppActions } from "../../store/app";
import { useUserState } from "../../store/user";
import { useUserActions } from "../../store/user/hooks";
import { desktopBp } from "../../styles/variables";
import { Button } from "../../UI/Button";
import { Modal } from "../../UI/Modal";
import { Loader } from "../../UI/Spinners";
import { Switcher } from "../../UI/Switcher";
import { activityList } from "../../config/userActivityList";
import { StoicIcon } from "../../UI/Svg";
import { useNavigate } from "react-router-dom";
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

const StyledLoader = styled(Loader)`
  height: 2.6vw;
  width: 2.6vw;
  @media screen and (max-width: ${desktopBp}) {
    height: 33px;
    width: 33px;
  }
`;

const BtnBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.78vw;
  @media screen and (max-width: ${desktopBp}) {
    gap: 10px;
  }
`;

const StyledTitle = styled(SettingsTitle)`
  margin-inline-end: 1.20vw;
  @media screen and (max-width: ${desktopBp}) {
    margin-inline-end: 15px;
  }
`


const StyledSwitcher = styled(Switcher)`
  margin-inline-start: auto;
  @media screen and (max-width: 700px) {
    margin-inline-start: 0;
  }
`


interface IProps {
  onClose: () => void
}


const AddVoterView = React.memo(({onClose}: IProps) => {
  const { t } = useTranslation();
  const { userInfo, token } = useUserState();
  const { getUserInfoAction } = useUserActions();
  const { onShowAlert } = useAppActions();
  const navigate = useNavigate()
  const [showWarning, setShowWarning] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const appConnected = useMemo(() => {
    return typeof userInfo?.group.voter_group_id === "number";
  }, [userInfo]);


  const connectApp = useCallback(async () => {
    if (token) {
      setIsFetching(true);
      const [dataRes, dataErr] = await handle(Settings.connectApp(token));

      if (!dataErr) {
        getUserInfoAction(token);
        onShowAlert(true, t("settings_app-success"))
      }
      setIsFetching(false);
      if (dataErr) {
        onShowAlert(false, dataErr?.error);
        navigate("/settings?modal=general&tab=status")
        onClose()
      }
    }
  }, [token, t]);

  const disconnectApp = useCallback(async () => {
    if (token) {
      setIsFetching(true);
      const [dataRes, dataErr] = await handle(Settings.disconnectApp(token));
      setIsFetching(false);
      if (!dataErr) {
        getUserInfoAction(token);
        setShowWarning(false);
      }
      if (dataErr) {
        onShowAlert(false, dataErr?.error);
      }
    }
  }, [token]);

  return (
    <StyledWrapper>
      <StyledTitle>{t("settings_app-connect")}</StyledTitle>
      <StoicIcon />
      <Modal show={showWarning && !isFetching} onClose={() => setShowWarning(false)}>
        <p>{t("settings_app-warning")}</p>
        <BtnBox>
          <Button
            data-action={activityList["disconnect-voter-refuse"]}
            onClick={() => setShowWarning(false)}
          >
            No
          </Button>
          <Button
            data-action={activityList["disconnect-voter-agree"]}
            onClick={disconnectApp}
          >
            Yes
          </Button>
        </BtnBox>
      </Modal>
      {isFetching ? (
        <StyledLoader />
      ) : (
        <StyledSwitcher
          action={activityList["toggle-voter"]}
          switched={appConnected}
          onSwithOff={() => setShowWarning(true)}
          onSwithOn={connectApp}
        />
      )}
    </StyledWrapper>
  );
});

export default withErrorBoundaryHOC(AddVoterView);
