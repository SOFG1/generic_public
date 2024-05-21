import React from "react";
import styled from "styled-components";
import { Card } from "../../components/common/Card";
import { Title } from "../../components/common/Title";
import { useUserState } from "../../store/user";
import { Settings } from "../../api/settings";
import { handle } from "../../api";
import { useAppActions } from "../../store/app";
import { useTranslation } from "react-i18next";
import { withErrorBoundaryHOC } from "../../utils/withErrorBoundaryHOC";

const CardStyled = styled(Card)`
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
  flex-direction: row;
  box-sizing: border-box;
`;

const CardTitle = styled(Title)`
  font-weight: 500;
  font-size: 24px;
  line-height: 29px;
  margin: 0;
  width: fit-content;
`;

const ButtonBlock = styled.div`
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: flex-end;

  & > button,
  & > div > button {
    min-width: 170px;
    padding: 14px 20px;

    &:last-child {
      margin-left: 30px;
    }
  }
`;

const AddCallingView = React.memo(() => {
  const { t } = useTranslation();
  const { onShowAlert } = useAppActions();
  const { token , userInfo} = useUserState();
  const message: string = "123";

  const handlePhone = async () => {
    if (token) {
      const [dataRes, dataErr]: any = await handle(
        Settings.postPhone(token, message)
      );
      if (dataRes !== undefined) {
        console.log("dataRes", dataRes);
        onShowAlert(true, dataRes || t("settings_thanks"));
      }
      if (dataErr) {
        const { error } = dataErr;
        console.log(dataErr);
        onShowAlert(false, error || t("settings_error"));
      }
    }
  };

  return (
    <>
      <CardStyled>
        <CardTitle>{t("settings_phone")}</CardTitle>
        <ButtonBlock>
            <CardTitle>Call Center Connected</CardTitle>
        </ButtonBlock>
      </CardStyled>
    </>
  );
}
)
export default withErrorBoundaryHOC(AddCallingView);
