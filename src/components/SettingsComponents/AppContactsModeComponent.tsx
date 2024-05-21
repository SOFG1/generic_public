import React, { useCallback, useEffect, useState } from "react"
import styled from "styled-components"
import { Loader } from "../../UI/Spinners";
import { useUserState } from "../../store/user";
import { useAppActions } from "../../store/app";
import { Settings, VoterContactsModeType } from "../../api/settings";
import { handle } from "../../api";
import { useTranslation } from "react-i18next";
import { Checkbox } from "../../UI/Input";
import SettingsSmallTabComponent from "./SettingsSmallTabComponent";
import { desktopBp } from "../../styles/variables";



const StyledTab = styled(SettingsSmallTabComponent)`
& > div {
  margin-bottom: 0;
  padding-top: 5px;
}
& > div > p {
  font-size: 0.94vw;
    line-height: 1;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 12px;
  }
}

`


const StyledLoader = styled(Loader)`
  height: 20px;
  width: 20px;
`;

const StyledBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const StyledCheckbox = styled(Checkbox)<{isDisabled?: boolean}>`
  ${({isDisabled}) => isDisabled && "opacity: 0.65;"}
`

const AppContactsModeComponent = React.memo(() => {
  const { t } = useTranslation()
  const { token } = useUserState();
  const { onShowAlert } = useAppActions();
  const [mode, setMode] = useState<VoterContactsModeType>(
    "Contacts sync and inject"
  );
  const [showSkip, setShowSkip] = useState<boolean>(false)
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const fetchCurrentMode = useCallback(async () => {
    if (token) {
      setIsFetching(true);
      const [dataRes, dataErr] = await handle(
        Settings.getVoterContactMode(token)
      );
      setIsFetching(false);
      if (dataRes) {
        console.log(dataRes)
        setMode(dataRes.contacts_mode);
        setShowSkip(dataRes.skip_upload_contacts);

      }
      if (dataErr) {
        console.log(dataErr);
      }
    }
  }, [token]);

  const handleChangeMode = useCallback(async (m: "Inject only" | "Contacts sync and inject", skip: boolean) => {
    if (token) {
      setIsFetching(true);
      const [dataRes, dataErr] = await handle(
        Settings.switchVoterContactMode(token, m, skip)
      );
      setIsFetching(false);
      if (!dataErr) {
        setMode(m);
        setShowSkip(skip)
        onShowAlert(true, t("settings_app-contacts-success"));
      }
      if (dataErr) {
        onShowAlert(false, dataErr.error);
      }
    }
  }, [token, mode]);

  useEffect(() => {
    fetchCurrentMode();
  }, [fetchCurrentMode]);

  useEffect(() => {
    if (mode === "Inject only") setShowSkip(false)
  }, [mode])


  return <StyledTab title={t("settings_app-contacts-title")}>
    {isFetching && <StyledLoader />}
    {!isFetching && (
      <StyledBox>
        <Checkbox
          label={t("settings_app-contacts-sync")}
          isActive={mode === "Contacts sync and inject"}
          onChange={(v) => handleChangeMode(v ? "Contacts sync and inject" : "Inject only", showSkip)}
        />
        <StyledCheckbox
          label={t("settings_app-contacts-skip")}
          isDisabled={mode !== "Contacts sync and inject"}
          isActive={showSkip}
          onChange={(v) => handleChangeMode(mode, v)}
        />
      </StyledBox>
    )}
  </StyledTab>
})

export default AppContactsModeComponent