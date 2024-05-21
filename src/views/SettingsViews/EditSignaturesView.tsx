import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import {
  AddSignatureComponent,
  SignaturePreviewComponent,
} from "../../components/SettingsComponents";
import { useUserState } from "../../store/user";
import { desktopBp } from "../../styles/variables";

const CardTitle = styled.p`
  font-size: 1.67vw;
  line-height: 2.19vw;
  margin: 0;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 21px;
    line-height: 27px;
  }
`;

const EditSignaturesView = React.memo(() => {
  const { t } = useTranslation();
  const { userInfo } = useUserState();

  return (
    <>
      <CardTitle>{t("settings_signatures-title")}</CardTitle>
      {userInfo?.email_signatures.map((s: any, index: number) => {
        return (
          <SignaturePreviewComponent
            key={s.id}
            signature={s}
            order={index + 1}
          />
        );
      })}
      {userInfo?.email_signatures && userInfo.email_signatures.length < 2 && <AddSignatureComponent />}
    </>
  );
});

export default EditSignaturesView;
