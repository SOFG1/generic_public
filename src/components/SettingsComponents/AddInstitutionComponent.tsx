import React, { useState, useCallback, useMemo } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { handle } from "../../api";
import { Settings } from "../../api/settings";
import { useAppActions } from "../../store/app";
import { useSettingsActions, useSettingsState } from "../../store/settings";
import { useUserState } from "../../store/user";
import { desktopBp } from "../../styles/variables";
import { Button } from "../../UI/Button";
import { Input } from "../../UI/Input";
import { HintComponent } from "../../UI/HintComponent";
import { activityList } from "../../config/userActivityList";
import { Modal } from "../../UI/Modal";


const StyledHeader = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 7.81vw;
  @media screen and (max-width: ${desktopBp}) {
    margin-bottom: 98px;
  }
`;

const CardTitle = styled.p`
  font-size: 1.67vw;
  line-height: 2.19vw;
  margin: 0;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 21px;
    line-height: 27px;
  }
`;

const CreateBlock = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 2.71vw;
  min-width: 57.29vw;
  @media screen and (max-width: ${desktopBp}) {
    gap: 34px;
    min-width: 719px;
  }
  @media screen and (max-width: 900px) {
    min-width: 0;
  }
  @media screen and (max-width: 700px) {
  flex-direction: column;
  align-items: center;
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

interface IProps {
  show: boolean
  onClose: () => void
}

const AddInstitutionComponent = React.memo(({ show, onClose }: IProps) => {
  const { t } = useTranslation();
  const { token, userInfo } = useUserState();
  const { institutions } = useSettingsState();
  const { onGetInstitutions } = useSettingsActions();
  const { onShowAlert } = useAppActions();
  const [institutionName, setInstitutionName] = useState<string>("");

  const nextInstCode: number = useMemo(() => {
    const nextCode: number = institutions.reduce((acc, item) => {
      return item.inst_code > acc
        ? item.inst_code
        : acc;
    }, 0);
    return nextCode > 0 ? nextCode + 1 : 1;
  }, [institutions]);

  const isGroup409 = useMemo(() => {
    return userInfo?.group.id === 409
  }, [userInfo?.group.id])

  const onSaveInstitution = useCallback(async () => {
    if (token) {
      const [dataRes, dataErr]: any = await handle(
        Settings.createInstitution(institutionName, nextInstCode, token)
      );
      if (!dataErr) {
        onShowAlert(true, "Successfully added");
        onGetInstitutions();
        setInstitutionName("");
      }
      if (dataErr) {
        onShowAlert(false, dataErr.error);
      }
    }
  }, [institutionName, token, onGetInstitutions, nextInstCode]);

  return (
    <Modal show={show} onClose={onClose}>
      <StyledHeader>
        <CardTitle>{isGroup409 ? t("settings_institutions-title1(409)") : t("settings_institutions-title1")}</CardTitle>
        <HintComponent
          position="end"
          items={[isGroup409 ? t("settings_institutions-hint(409)") : t("settings_institutions-hint")]}
        />
      </StyledHeader>
      <CreateBlock>
        <Input
          type="text"
          label={isGroup409 ? t("settings_institutions-label(409)") : t("settings_institutions-label")}
          value={institutionName}
          onChange={setInstitutionName}
          name="institutions"
        />
        <StyledBtn
          data-action={activityList["create-segment"]}
          disabled={institutionName === ""}
          onClick={onSaveInstitution}
        >
          {isGroup409 ? t("settings_institutions-add(409)") : t("settings_institutions-add")}
        </StyledBtn>
      </CreateBlock>
    </Modal>
  );
});

export default AddInstitutionComponent;
