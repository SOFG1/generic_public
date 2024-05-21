import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { desktopBp } from "../../styles/variables";
import { HintComponent } from "../../UI/HintComponent";
import { withErrorBoundaryHOC } from "../../utils/withErrorBoundaryHOC";

const StyledHeading = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.3vw;
  gap: 5px;
  @media screen and (max-width: ${desktopBp}) {
    margin-bottom: 16px;
  }
`;

const StyledTitle = styled.h1`
  margin: 0;
  @media screen and (max-width: 540px) {
    font-size: 1.5em;
  }
`;

const VolunteersHeadingView = React.memo(() => {
  const { t } = useTranslation();
  const [maxWidth830, setMaxWidth830] = useState<boolean>(false);

  const mediaMaxWidth830 = useMemo(() => {
    return window.matchMedia('(max-width: 830px)')
  }, [])

  const handleSetMaxWidth830 = useCallback(() => {
    setMaxWidth830(mediaMaxWidth830.matches)
  }, [mediaMaxWidth830])

  useEffect(() => {
    setMaxWidth830(mediaMaxWidth830.matches)
    mediaMaxWidth830?.addEventListener('change', handleSetMaxWidth830)
    return () => mediaMaxWidth830.removeEventListener('change', handleSetMaxWidth830)
  }, [handleSetMaxWidth830])

  
  const hintPopupPosition = useMemo(() => {
    return maxWidth830 ? 'start' : 'end'
  }, [maxWidth830])


  return (
    <StyledHeading>
      <StyledTitle>{t("volunteers_title")}</StyledTitle>
      <HintComponent position={hintPopupPosition} items={[t("volunteers_hint")]} />
    </StyledHeading>
  );
});

export default withErrorBoundaryHOC(VolunteersHeadingView);
