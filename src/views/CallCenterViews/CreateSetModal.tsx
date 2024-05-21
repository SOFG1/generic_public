import React, { useState, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { handle } from "../../api";
import { CallCenter } from "../../api/callCenter";
import { Title } from "../../components/common/Title";
import { useAppActions } from "../../store/app";
import { CreateSetAction, useCallCenterActions, useCallCenterState } from "../../store/callCenter";
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

const CreateSetModal = React.memo(() => {
  const { t } = useTranslation();
  const { selectedFBAccount, isFetching } = useCallCenterState();
  const { FBAudiences, FBCampaings } = useCallCenterState();
  const {onCreateSet} = useCallCenterActions()
  const {onShowAlert} = useAppActions()
  const [setParams, setSetParams] = useState<any>(null);
  const [newName, setNewName] = useState<string>("");
  const [selectedAudience, setSelectedAudience] = useState<number>(0);
  const [selectedBillingEvent, setBillingEvent] = useState<string>("");
  const [selectedOptimization, setOptimization] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [bidAmount, setBidAmount] = useState<number>(0);
  const [dailyBudget, setDailyBudget] = useState<number>(0);
  const [selectedCampaing, setSelectedCampaing] = useState<number>(0);

  const onCreateSetHandler = useCallback(() => {
    let sendData: CreateSetAction = {
      acc_id: selectedFBAccount,
      audience_id: selectedAudience,
      name: newName,
      optimization: selectedOptimization,
      billing_event: selectedBillingEvent,
      bid_amount: bidAmount,
      campaign_id: selectedCampaing,
      status: selectedStatus,
      daily_budget: dailyBudget,
    };
    onCreateSet(sendData);
  }, [
    selectedStatus,
    dailyBudget,
    bidAmount,
    selectedAudience,
    newName,
    selectedOptimization,
    selectedBillingEvent,
    selectedCampaing,
    selectedStatus,
  ]);

  const fetchSetParams = useCallback(async () => {
    let [dataRes, dataErr]: any = await handle(CallCenter.getSetParems());
    if (dataRes) {
      setSetParams(dataRes);
    }
    if (dataErr) {
      const errText = dataErr.error.error_user_msg || dataErr.error
      onShowAlert(false, errText);
    }
  }, []);

  useEffect(() => {
    fetchSetParams()
  }, [])

  return (
    <ModalFrame isFetching={isFetching === "sets"}>
      <TitleStyled>{t("sets_title")}</TitleStyled>
      <InputStyled
        type={"text"}
        placeholder={t("sets_placeholder")}
        value={newName}
        onChange={setNewName}
        name={"set_name"}
        label={t("sets_label")}
      />
      <DropdownStyled
        value={selectedAudience}
        placeholder={t("sets_audience-placeholder")}
        onSelect={setSelectedAudience}
        options={FBAudiences.map((item: any) => {
          return { item: item.name, value: item.id };
        })}
        label={t("sets_audience-label")}
      />
      {setParams && (
        <>
          <DropdownStyled
            value={selectedBillingEvent}
            placeholder={t("sets_billing-placeholder")}
            onSelect={setBillingEvent}
            options={setParams.billing_event.map((item: string) => {
              return { item: item, value: item };
            })}
            label={t("sets_billing-label")}
          />
          <DropdownStyled
            value={selectedOptimization}
            placeholder={t("sets_optimization-placeholder")}
            onSelect={setOptimization}
            options={setParams.optimization.map((item: string) => {
              return { item: item, value: item };
            })}
            label={t("sets_optimization-label")}
          />
          <DropdownStyled
            value={selectedStatus}
            placeholder={t("sets_status-placeholder")}
            onSelect={setSelectedStatus}
            options={setParams.status.map((item: string) => {
              return { item: item, value: item };
            })}
            label={t("sets_status-label")}
          />
        </>
      )}
      <InputStyled
        type={"number"}
        placeholder={t("sets_bid-placeholder")}
        value={bidAmount}
        onChange={setBidAmount}
        name={"bid_amount"}
        label={t("sets_bid-label")}
      />
      <InputStyled
        type={"number"}
        placeholder={t("sets_budget-placeholder")}
        value={dailyBudget}
        onChange={setDailyBudget}
        name={"dailyBudget"}
        label={t("sets_budget-label")}
      />
      <DropdownStyled
        value={selectedCampaing}
        placeholder={t("sets_campaing-placeholder")}
        onSelect={setSelectedCampaing}
        options={FBCampaings.map((item: any) => {
          return { item: item.name, value: item.id };
        })}
        label={t("sets_campaing-label")}
      />
      <ButtonStyled
        data-action={activityList["call-center-FB-set_create"]}
        disabled={isFetching === "sets"}
        onClick={onCreateSetHandler}
      >
        {t("sets_campaing-create")}
      </ButtonStyled>
    </ModalFrame>
  );
});

export default CreateSetModal;
