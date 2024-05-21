import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { Card } from "../../components/common/Card";
import { Title } from "../../components/common/Title";
import { colors } from "../../styles/colors";
import { Input } from "../../UI/Input";
import { handle } from "../../api";
import { Settings } from "../../api/settings";
import { useUserState } from "../../store/user";
import { useSettingsState } from "../../store/settings";
import { useAppActions } from "../../store/app";
import { useTranslation } from "react-i18next";
import { desktopBp } from "../../styles/variables";
import { SettingsButton } from "../../components/SettingsComponents";
import { activityList } from "../../config/userActivityList";
import { withErrorBoundaryHOC } from "../../utils/withErrorBoundaryHOC";

const CardStyled = styled(Card)`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

const CardHeader = styled.div`
  width: 100%;
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  box-sizing: border-box;
  > button {
    max-width: 8.85vw;
  }
  @media screen and (max-width: ${desktopBp}) {
    > button {
      max-width: 111px;
    }
  }
`;

const CardTitle = styled(Title)`
  font-weight: 500;
  font-size: 1.25vw;
  line-height: 1.51vw;
  margin: 0;
  width: fit-content;
  display: flex;
  align-content: center;
  align-items: center;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 16px;
    line-height: 19px;
  }
`;

const Form = styled.div`
  margin-top: 1.04vw;
  width: 100%;
  @media screen and (max-width: ${desktopBp}) {
    margin-top: 13px;
  }
`;

const FormTitle = styled(Title)`
  font-weight: normal;
  font-size: 0.94vw;
  line-height: 1.15vw;
  color: ${colors.graphite_5};
  @media screen and (max-width: ${desktopBp}) {
    font-size: 12px;
    line-height: 14px;
  }
`;

const FormRow = styled.div`
  width: 100%;
  display: flex;
  gap: 0.78vw;
  align-content: flex-start;
  align-items: flex-start;
  justify-content: flex-start;
  flex-wrap: wrap;
  @media screen and (max-width: 430px) {
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
`;

const InputStyled = styled(Input)`
  width: calc(50% - 1.04vw);
  max-width: unset;
  @media screen and (max-width: ${desktopBp}) {
    width: calc(50% - 15px);
  }
  @media screen and (max-width: 430px) {
    width: 100%;
  }
`;

const AddEmailView = React.memo(() => {
  const { t } = useTranslation();
  const { token } = useUserState();
  const { smtp } = useSettingsState();
  const { onShowAlert } = useAppActions();
  const [data, setData] = useState<any>({});


  const message: string = "Email";
  const addEmail = useCallback(async () => {
    if (token) {
      const [firstRes, firstErr]: any = await handle(
        Settings.postSMTP(data, token)
      );
      if (firstErr) {
        const { error } = firstErr;
        onShowAlert(false, error || t("settings_error"));
      }
      if (firstRes !== undefined) {
        onShowAlert(true, firstRes || t("settings_thanks"));
        const [dataRes, dataErr]: any = await handle(
          Settings.putEmail(token, message)
        );
      }
    }
  }, [data, message]);

  useEffect(() => {
    if (smtp?.connection)
      setData({ ...smtp?.connection, name: smtp.name ? smtp.name : "" });
  }, [smtp]);

  return (
    <>
      <CardStyled>
        <CardHeader>
          <CardTitle>{t("settings_email")}</CardTitle>
          <SettingsButton onClick={addEmail} data-action={activityList["settings-add-email"]}>
            {t("settings_email-add")}
          </SettingsButton>
        </CardHeader>
        <Form>
          <FormTitle>{t("settings_email-from")}</FormTitle>
          <FormRow>
            <InputStyled
              name="host"
              type="text"
              label={t("settings_email-host")}
              value={data?.host || ""}
              onChange={(v) => setData((p: any) => ({ ...p, host: v }))}
            />
            <InputStyled
              name="port"
              type="text"
              label={t("settings_email-port")}
              value={data?.port || ""}
              onChange={(v) => setData((p: any) => ({ ...p, port: v }))}
            />
            <InputStyled
              name="mail"
              type="text"
              label={t("settings_email-mail")}
              value={data?.mail || ""}
              onChange={(v) => setData((p: any) => ({ ...p, mail: v }))}
            />
            <InputStyled
              name="password"
              type="password"
              label={t("settings_email-password")}
              value={data?.password || ""}
              onChange={(v) => setData((p: any) => ({ ...p, password: v }))}
            />
            <InputStyled
              name="name"
              type="text"
              label={t("settings_email-name")}
              value={data?.name || ""}
              onChange={(v) => setData((p: any) => ({ ...p, name: v }))}
            />
          </FormRow>
        </Form>
      </CardStyled>
    </>
  );
});

export default withErrorBoundaryHOC(AddEmailView);
