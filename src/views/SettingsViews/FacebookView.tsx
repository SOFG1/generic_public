import React, { useMemo, useCallback, useEffect, useRef } from "react";
import styled from "styled-components";
import { FacebookIcon } from "../../UI/Svg";
import { useUserState } from "../../store/user";
import { useTranslation } from "react-i18next";
import { FacebookLoginComponent, SettingsTitle } from "../../components/SettingsComponents";
import { useAppActions, useAppState } from "../../store/app";
import { SettingsCardHint } from "../../UI/SettingsCardHint/SettingsCardHint";
import { desktopBp } from "../../styles/variables";
import { useHint } from "../../hooks/useHint";
import { withErrorBoundaryHOC } from "../../utils/withErrorBoundaryHOC";

const StyledWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.81vw;
  > svg {
    min-width: 112px;
  }
  @media screen and (max-width: ${desktopBp}) {
    margin-bottom: 35px;
  }
  @media screen and (max-width: 700px) {
    flex-direction: column;
    gap: 5px;
  }
`

const StyledAccountName = styled(SettingsTitle)`
    margin-inline-end: 1.04vw;
  @media screen and (max-width: ${desktopBp}) {
    margin-inline-end: 13px;
  }
`

const StyledTitle = styled(SettingsTitle)`
  text-align: start;
  margin-inline-start: 5px;
`


const FacebookView = React.memo(() => {
  const { t } = useTranslation();
  const { userInfo } = useUserState();
  const { onSetHint } = useAppActions();
  const { hint } = useAppState();
  const cardRef = useRef<HTMLDivElement>(null);

  const facebookList = useMemo(() => {
    return userInfo?.group?.facebook;
  }, [userInfo]);


  useHint("digital-post2", "digital-post3", cardRef)


  return (
    <StyledWrapper ref={cardRef}>
      {hint === "digital-post3" && <SettingsCardHint />}
      <FacebookIcon />
      <StyledTitle>
        {t("settings_facebook")}
      </StyledTitle>
      {facebookList?.map((acc) => (
        <StyledAccountName key={acc}>{acc}</StyledAccountName>
      ))}
      <FacebookLoginComponent />
    </StyledWrapper>
  );
});

export default withErrorBoundaryHOC(FacebookView);
