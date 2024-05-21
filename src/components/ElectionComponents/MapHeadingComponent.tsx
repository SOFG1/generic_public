import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { desktopBp } from "../../styles/variables";
import { HintComponent } from "../../UI/HintComponent";

const StyledBox = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 1.04vw;
  gap: 0.26vw;
  @media screen and (max-width: ${desktopBp}) {
    gap: 3px;
    margin: 0 0 13px;
  }
`;

const Title = styled.p`
  font-style: normal;
  font-weight: 500;
  font-size: 1.25vw;
  line-height: 1.51vw;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 16px;
    line-height: 19px;
  }
`;

const MapHeadingComponent = React.memo(() => {
  const { t } = useTranslation();
  const [maxWidth780, setMaxWidth780] = useState<boolean>(false);
  

  const mediaMaxWidth780 = useMemo(() => {
    return window.matchMedia("(max-width: 780px)");
  }, []);

  const handleSetMaxWidth780 = useCallback(() => {
    setMaxWidth780(mediaMaxWidth780.matches);
  }, [mediaMaxWidth780]);

  useEffect(() => {
    setMaxWidth780(mediaMaxWidth780.matches)
    mediaMaxWidth780?.addEventListener("change", handleSetMaxWidth780);
    return () =>
      mediaMaxWidth780?.removeEventListener("change", handleSetMaxWidth780);
  }, [handleSetMaxWidth780]);

  const hintPopupPosition = useMemo(() => {
    return maxWidth780 ? 'start' : 'end'
  }, [maxWidth780])

  return (
    <StyledBox>
      <Title>{t("election_map-title")}</Title>
      <HintComponent position={hintPopupPosition} items={[t('election_map-hint')]} />
    </StyledBox>
  );
});

export default MapHeadingComponent;
