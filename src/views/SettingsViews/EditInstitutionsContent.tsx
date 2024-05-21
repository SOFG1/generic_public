import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import {
  EditKeywordsComponent,
  EditInsitutionComponent,
  AddInstitutionComponent,
} from "../../components/SettingsComponents";
import { useSentimentorActions } from "../../store/sentimentor";
import { useSettingsState } from "../../store/settings";
import { desktopBp } from "../../styles/variables";
import { Button } from "../../UI/Button";
import { usePermissions, useUserState } from "../../store/user";
import {createPortal} from "react-dom";


const CardTitle = styled.p`
  font-size: 1.67vw;
  line-height: 2.19vw;
  margin: 0;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 21px;
    line-height: 27px;
  }
`;



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

const StyledBtn = styled(Button)`
  width: fit-content;
  min-width: 7.03vw;
  border-radius: 100px;
  margin: 10px auto 10px;
  @media screen and (max-width: ${desktopBp}) {
    min-width: 88px;
  } 
`;


const EditInstitutionsContent = React.memo(() => {
  const { t } = useTranslation();
  const { userInfo } = useUserState()
  const permissions = usePermissions("Ranking")
  const { institutions } = useSettingsState();
  const { onGetKeywords } = useSentimentorActions();
  const [showModal, setShowModal] = useState<boolean>(false)

  const permissionForAllSegments = useMemo(() => {
    return !userInfo?.segments || userInfo?.segments.length === 0
  }, [userInfo])

  useEffect(() => {
    onGetKeywords();
  }, []);

  return (
    <>
      <StyledTitles>
        <StyledTitle>{userInfo?.group.id === 409 ? t("settings_institution-subtitle1(409)") : t("settings_institution-subtitle1")}</StyledTitle>
        <StyledTitle>{t("settings_institution-subtitle2")}</StyledTitle>
        <StyledTitle>{t("settings_institution-subtitle3")}</StyledTitle>
      </StyledTitles>

      {institutions.map((institution) => {
        return (
          <EditInsitutionComponent
            key={institution.inst_code}
            institution={institution}
          />
        );
      })}
      <StyledBtn onClick={() => setShowModal(true)}>{userInfo?.group.id === 409 ? t("settings_institutions-add(409)") : t("settings_institutions-add")}</StyledBtn>
      {createPortal(<AddInstitutionComponent show={showModal} onClose={() => setShowModal(false)} />,  document.querySelector(".App") as Element)}

      {permissions.add_keyword && permissions.delete_keyword && <>
        {permissionForAllSegments && <CardTitle>{t("settings_institutions-title3")}</CardTitle>}
        <EditKeywordsComponent />
      </>}
    </>
  );
});

export default EditInstitutionsContent;
