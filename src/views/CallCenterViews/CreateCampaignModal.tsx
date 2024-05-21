import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { handle } from "../../api";
import { CallCenter } from "../../api/callCenter";
import { Title } from "../../components/common/Title";
import { useAppActions } from "../../store/app";
import {
  CreateCampaingAction,
  useCallCenterActions,
  useCallCenterState,
} from "../../store/callCenter";
import { desktopBp } from "../../styles/variables";
import { Button } from "../../UI/Button";
import { Dropdown } from "../../UI/Dropdown";
import { Input } from "../../UI/Input";
import { activityList } from "../../config/userActivityList";

const ModalFrame = styled.div<{ isFetching: boolean }>`
  ${({ isFetching }) => isFetching && "cursor: wait;& * {cursor: wait;}"}
`;

const TitleStyled = styled(Title)`
  font-size: 1.25vw;
  line-height: 1.2;
  font-weight: 500;
  margin: 0;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 16px;
  }
`;

const InputStyled = styled(Input)`
  min-width: 20.83vw;
  margin-bottom: 1.04vw;
  @media screen and (max-width: ${desktopBp}) {
    min-width: 261px;
    margin-bottom: 13px;
  }
  @media screen and (max-width: 500px) {
    min-width: 200px;
  }
`;

const DropdownStyled = styled(Dropdown)`
  margin-bottom: 1.04vw;
  min-width: 20.83vw;
  @media screen and (max-width: ${desktopBp}) {
    margin-bottom: 13px;
    min-width: 261px;
  }
  @media screen and (max-width: 500px) {
    min-width: 200px;
  }
`;

const ButtonStyled = styled(Button)`
  margin-top: 0.52vw;
  padding: 0.57vw 1.77vw;
  @media screen and (max-width: ${desktopBp}) {
    margin-top: 7px;
    padding: 7px 22px;
  }
`;

const CreateCampaignModal = React.memo(() => {
  const { t } = useTranslation();
  const { selectedFBAccount, isFetching } = useCallCenterState();
  const { onCreateCampaing } = useCallCenterActions();
  const { onShowAlert } = useAppActions();
  const [campaingParams, setCampaingParams] = useState<any>(null);
  const [newName, setNewName] = useState<string>("");
  const [selectedObjective, setSelectedObjective] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");

  const onCreateCampaingHandler = useCallback(() => {
    let sendData: CreateCampaingAction = {
      acc_id: selectedFBAccount,
      name: newName,
      objective: selectedObjective,
      status: selectedStatus,
    };
    onCreateCampaing(sendData);
  }, [selectedStatus, selectedObjective, newName, selectedFBAccount]);

  const getCampaingParams = useCallback(async () => {
    let [dataRes, dataErr]: any = await handle(CallCenter.getCampaingParams());
    if (dataRes) {
      setCampaingParams(dataRes);
    }
    if (dataErr) {
      const errText = dataErr.error.error_user_msg || dataErr.error
      onShowAlert(false, errText);
    }
  }, []);

  useEffect(() => {
    getCampaingParams();
  }, []);

  return (
    <ModalFrame isFetching={isFetching === "campaings"}>
      <TitleStyled>{t("campaing_title")}</TitleStyled>
      <InputStyled
        type="text"
        placeholder={t("campaing_placeholder")}
        value={newName}
        onChange={setNewName}
        name="campaing_name"
        label={t("campaing_label")}
      />
      {campaingParams && (
        <>
          <DropdownStyled
            value={selectedObjective}
            placeholder={t("campaing_obj-placeholder")}
            onSelect={setSelectedObjective}
            options={campaingParams.objective.map((item: string) => {
              return { item: item, value: item };
            })}
            label={t("campaing_obj-label")}
          />
          <DropdownStyled
            value={selectedStatus}
            placeholder={t("campaing_status-placeholder")}
            onSelect={setSelectedStatus}
            options={campaingParams.status.map((item: string) => {
              return { item: item, value: item };
            })}
            label={t("campaing_status-label")}
          />
        </>
      )}
      <ButtonStyled
        data-action={activityList["call-center-FB-campaign_create"]}
        disabled={isFetching === "campaings"}
        onClick={onCreateCampaingHandler}
      >
        {t("campaing_create")}
      </ButtonStyled>
    </ModalFrame>
  );
});

export default CreateCampaignModal;
