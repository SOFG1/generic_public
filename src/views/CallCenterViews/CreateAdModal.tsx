import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { handle } from "../../api";
import { CallCenter } from "../../api/callCenter";
import { Title } from "../../components/common/Title";
import { useAppActions } from "../../store/app";
import {
  CreateAdAction,
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

const CreateAdModal = React.memo(() => {
  const { t } = useTranslation();
  const { FBSets, FBCreatives, selectedFBAccount, isFetching } =
    useCallCenterState();
  const { onCreateAd } = useCallCenterActions();
  const { onShowAlert } = useAppActions();
  const [newName, setNewName] = useState<string>("");
  const [selectedSet, setSelectedSet] = useState<number>(0);
  const [selectedCreative, setSelectedCreative] = useState<number>(0);
  const [setParams, setSetParams] = useState<any>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>("");

  const onCreateAdHandler = useCallback(() => {
    let adData: CreateAdAction = {
      acc_id: selectedFBAccount,
      name: newName,
      status: selectedStatus,
      creative_id: selectedCreative,
      set_id: selectedSet,
    };
    onCreateAd(adData);
  }, [
    selectedFBAccount,
    newName,
    selectedStatus,
    selectedCreative,
    selectedSet,
  ]);

  const getSetParams = useCallback(async () => {
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
    getSetParams();
  }, []);

  return (
    <ModalFrame isFetching={isFetching === "ad"}>
      <TitleStyled>Create AD</TitleStyled>
      <InputStyled
        type="text"
        placeholder="Name"
        value={newName}
        onChange={setNewName}
        name="creative_name"
        label="Name"
      />
      <DropdownStyled
        value={selectedSet}
        placeholder={"Select set"}
        onSelect={setSelectedSet}
        options={FBSets?.map((item: any) => {
          return { item: item.name, value: item.id };
        })}
        label={t("ad_set-label")}
      />
      <DropdownStyled
        value={selectedCreative}
        placeholder={t("ad_creative-placeholder")}
        onSelect={setSelectedCreative}
        options={FBCreatives.map((item: any) => {
          return { item: item.name, value: item.id };
        })}
        label={t("ad_creative-label")}
      />

      {setParams ? (
        <DropdownStyled
          value={selectedStatus}
          placeholder={t("ad_status-placeholder")}
          onSelect={setSelectedStatus}
          options={setParams.status.map((item: string) => {
            return { item: item, value: item };
          })}
          label={t("ad_status-label")}
        />
      ) : null}
      <ButtonStyled
        data-action={activityList["call-center-FB-ad_modal_create"]}
        disabled={isFetching === "ad"}
        onClick={onCreateAdHandler}
      >
        {t("ad_create")}
      </ButtonStyled>
    </ModalFrame>
  );
});

export default CreateAdModal;
