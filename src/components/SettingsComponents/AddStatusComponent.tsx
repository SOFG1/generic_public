import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { handle } from "../../api";
import { Settings } from "../../api/settings";
import { useAppActions } from "../../store/app";
import { useSettingsActions, useSettingsState } from "../../store/settings";
import { useUserState } from "../../store/user";
import { useUserActions } from "../../store/user/hooks";
import { desktopBp } from "../../styles/variables";
import { Button } from "../../UI/Button";
import { Input } from "../../UI/Input";
import { activityList } from "../../config/userActivityList";
import { Modal } from "../../UI/Modal";


const StyledTitle = styled.p`
  font-size: 1.67vw;
  line-height: 2.19vw;
  font-weight: 500;
  margin: 0 0 3.13vw;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 21px;
    line-height: 27px;
    margin: 0 0 39px;
  }
`;

const StyledBtn = styled(Button)`
  height: 3.91vw;
  width: 211px;
  padding: 3px 1.56vw;
  border-radius: 100px;
  margin: 3.13vw auto 0;
  @media screen and (max-width: ${desktopBp}) {
    height: 49px;
    width: 138px;
    padding: 2px 20px;
    margin: 39px auto 0;
  }
`;


interface IProps {
  show: boolean
  onClose: () => void
}


const AddStatusComponent = React.memo(({ show, onClose }: IProps) => {
  const { t } = useTranslation();
  const { token } = useUserState();
  const { all_statuses } = useSettingsState();
  const { onGetStatuses } = useSettingsActions();
  const { onUpdateUserStatus } = useUserActions();
  const { onShowAlert } = useAppActions();
  const [newStatusName, setNewStatusName] = useState<string>("");

  const addHandler = useCallback(async () => {
    if (!newStatusName) {
      onShowAlert(false, "Status name mustn't be empty");
      return;
    }
    const reqData = {
      statuses: [
        {
          color: "",
          is_default: false,
          score: null,
          exclude_words: [],
          include_words: [],
          status: newStatusName,
        },
      ],
      default: all_statuses.find((status) => status.is_default)?.status,
    };
    setNewStatusName("");
    if (token) {
      const [dataRes, dataErr]: any = await handle(
        Settings.postStatus(reqData, token)
      );
      if (!dataErr) {
        onShowAlert(true, "Successfully added !");
        onUpdateUserStatus();
        onGetStatuses();
      }
      if (dataErr) {
        onShowAlert(false, dataErr.error);
        console.log(dataErr);
      }
    }
  }, [newStatusName, all_statuses, token]);

  return (
    <Modal show={show} onClose={onClose}>
        <StyledTitle>{t("settings_status-add_title")}</StyledTitle>
        <Input
          type="text"
          label={t("settings_status-label")}
          onChange={setNewStatusName}
          value={newStatusName}
          name="name"
        />
        <StyledBtn data-action={activityList["settings-create-status"]} onClick={addHandler}>{t("settings_status-add")}</StyledBtn>
    </Modal>

  );
});

export default AddStatusComponent;
