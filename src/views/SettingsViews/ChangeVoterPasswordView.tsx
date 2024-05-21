import React, { useEffect, useState, useMemo, useCallback } from "react";
import styled from "styled-components";
import { desktopBp } from "../../styles/variables";
import { useTranslation } from "react-i18next";
import { useSettingsState } from "../../store/settings";
import { Input } from "../../UI/Input";
import { Button } from "../../UI/Button";
import { ConfirmDeleteFull } from "../../components/common/ConfirmDeleteFull";
import { Settings } from "../../api/settings";
import { useUserState } from "../../store/user";
import { handle } from "../../api";
import { useAppActions } from "../../store/app";
import { activityList } from "../../config/userActivityList";


const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1.04vw 1.56vw 1.56vw;
    margin-bottom: 0.78vw;
    min-height: 8.85vw;
    color: #000;
    @media screen and (max-width: ${desktopBp}) {
        padding: 13px 20px 20px;
        margin-bottom: 10px;
        min-height: 111px;
    }
`


const StyledInput = styled(Input)`
  margin-bottom: 2.6vw;
  @media screen and (max-width: ${desktopBp}) {
    margin-bottom: 33px; 
  }
`

const StyledBtn = styled(Button)`
    height: 2.19vw;
    border-radius: 0;
    white-space: nowrap;
    width: fit-content;
    margin:auto auto 0;
@media screen and (max-width: ${desktopBp}) {
    height: 27px;
}
`

interface IProps {
  selectedUsers: number[]
}

const ChangeVoterPasswordView = React.memo(({ selectedUsers }: IProps) => {
  const { t } = useTranslation();
  const { token } = useUserState();
  const { voterUsers } = useSettingsState()
  const { onShowAlert } = useAppActions()
  const [password, setPassword] = useState<string>("");
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);


  const buttonDisabled = useMemo(() => {
    if (!password.trim()) return true;
    return false;
  }, [password]);

  const handleChange = useCallback(async () => {
    if (token) {
      const success: number[] = []
      for (let id of selectedUsers) {
        const [dataRes, dataErr] = await handle(
          Settings.changeVoterPassword(token, id, password)
        );
        if (!dataErr) {
          success.push(id)
        }
      }
      const loginsList = success.map(id => voterUsers.find(u => u.id === id)?.login).join(", ")
      onShowAlert(true, t("settings_call-center-voter_pass-success", { list: loginsList }))
    }
  }, [token, selectedUsers, password]);

  useEffect(() => {
    setPassword("");
  }, [selectedUsers]);


  return (
    <StyledWrapper>
      <ConfirmDeleteFull
        title={t("settings_call-center-voter_pass-warn")}
        show={showConfirmation}
        onDelete={handleChange}
        onClose={() => setShowConfirmation(false)}
      />
      <StyledInput
        type="password"
        name="password"
        label={t("settings_call-center-voter_pass")}
        value={password}
        onChange={setPassword}
      />
      <StyledBtn
        data-action={activityList["voter-change-pass"]}
        onClick={() => setShowConfirmation(true)}
        disabled={buttonDisabled}
      >
        {t("settings_call-center-voter_pass-change")}
      </StyledBtn>
    </StyledWrapper>
  );
});

export default ChangeVoterPasswordView;
