import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "../../UI/Button";
import {
  IStatus,
  useSettingsActions,
  useSettingsState,
} from "../../store/settings";
import { useUserState } from "../../store/user";
import { handle } from "../../api";
import { Settings } from "../../api/settings";
import { useTranslation } from "react-i18next";
import { useUserActions } from "../../store/user/hooks";
import { useAppActions } from "../../store/app";
import { desktopBp } from "../../styles/variables";
import { HintComponent } from "../../UI/HintComponent";
import {
  AddStatusComponent,
  EditStatusComponent,
} from "../../components/SettingsComponents";
import { activityList } from "../../config/userActivityList";
import {createPortal} from "react-dom";



const StyledTitles = styled.div`
  display: flex;
  margin-bottom: 1.25vw;
  @media screen and (max-width: ${desktopBp}) {
    margin-bottom: 16px;
  }
`

const StyledTitle = styled.p`
  font-size: 0.83vw;
  margin: 0;
  text-align: start;
  text-decoration: underline;
  width: 20%;
  &:first-child {
    width: 45%;
  }
  @media screen and (max-width: ${desktopBp}) {
    font-size: 10px;
  }
`

const StyledBox = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 4.27vw;
  @media screen and (max-width: ${desktopBp}) {
    margin-bottom: 54px;
  }
`;

const StyledButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`

const CardTitle = styled.p`
  font-size: 1.67vw;
  line-height: 2.19vw;
  font-weight: 700;
  margin: 0;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 21px;
    line-height: 27px;
  }
`;


const StyledBtn = styled(Button)`
  width: fit-content;
  min-width: 7.03vw;
  border-radius: 100px;
  @media screen and (max-width: ${desktopBp}) {
    min-width: 88px;
  }
`;


const EditStatusModal = React.memo(() => {
  const { t } = useTranslation();
  const { onGetStatuses } = useSettingsActions();
  const { onUpdateUserStatus } = useUserActions();
  const { onShowAlert } = useAppActions();
  const [statusData, setStatusData] = useState<IStatus[]>([]);
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false)
  const { token } = useUserState();
  const { all_statuses } = useSettingsState();

  useEffect(() => {
    setStatusData(all_statuses);
  }, [all_statuses]);

  const onSave = useCallback(async () => {
    const reqData = {
      statuses: statusData,
      default: statusData.find((s) => s.is_default)?.status,
    };
    if (token) {
      const [dataRes, dataErr]: any = await handle(
        Settings.postStatus(reqData, token)
      );
      if (!dataErr) {
        onUpdateUserStatus();
        onGetStatuses();
        onShowAlert(true, "Saved successfully");
      }
      if (dataErr) {
        console.log(dataErr);
        onShowAlert(false, dataErr.error);
      }
    }
  }, [statusData, token, onGetStatuses]);

  const onChangeHandler = (field: string, index: number, value: any) => {
    if (field === "default") {
      let modified = statusData.map((s) => ({ ...s, is_default: false }));
      modified[index].is_default = true;
      setStatusData(modified);
    }

    if (field === "exclude_words" || field === "include_words") {
      let modified = [...statusData];
      //validate values
      value = value.map((v: string) => v.trim());
      modified.splice(index, 1, { ...modified[index], [field]: value });
      setStatusData(modified);
    }

    if (field !== "default") {
      let modified = [...statusData];
      modified.splice(index, 1, { ...modified[index], [field]: value });
      setStatusData(modified);
    }
  };

  return (
    <>
      <StyledBox>
        <CardTitle>{t("settings_status-title")}</CardTitle>
        <HintComponent position="end" items={[t("settings_status-hint")]} />
      </StyledBox>

      <StyledTitles>
        <StyledTitle>{t("settings_status-subtitle1")}</StyledTitle>
        <StyledTitle>{t("settings_status-subtitle2")}</StyledTitle>
        <StyledTitle>{t("settings_status-subtitle3")}</StyledTitle>
      </StyledTitles>
      {statusData?.map((s, i) => (
        <EditStatusComponent
          key={s.id}
          status={s}
          onChange={(f, v) => onChangeHandler(f, i, v)}
        />
      ))}
      <StyledButtons>
        <StyledBtn onClick={onSave} data-action={activityList["settings-statuses-save"]}>{t("settings_status-save")}</StyledBtn>
        <StyledBtn onClick={() => setShowCreateModal(true)} data-action={activityList["open-create-status"]}>{t("settings_status-create")}</StyledBtn>
      </StyledButtons>
      {createPortal(<AddStatusComponent show={showCreateModal} onClose={() => setShowCreateModal(false)} />, document.querySelector(".App")!)}
    </>
  );
});

export default EditStatusModal;
