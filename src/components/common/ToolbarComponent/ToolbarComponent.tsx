import React, { useMemo } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import styled from "styled-components";
import { desktopBp } from "../../../styles/variables";
import { LanguageDropdown } from "../../../UI/LanguageDropdown";
import { OpponentsFilters } from "../../OpponentsComponents";
import { RelationsFilters } from "../../RelationsComponents";
import { SentimentorFilters } from "../../SentimentorComponents";
import { StatsFilters } from "../../StatsComponents";
import { NotificationsComponent } from "../NotificationsComponent";
import { Card } from "../Card";
import { signUpUrl } from "../../../config/signUpUrl";
import { withErrorBoundaryHOC } from "../../../utils/withErrorBoundaryHOC";

const ToolBar = styled(Card) <{ notCard: boolean }>`
  display: flex;
  flex-wrap: wrap;
  padding: 0.68vw;
  ${({notCard}) => notCard && `
    background-color: transparent;
    border: 0;
    box-shadow: none;
  `}
  @media screen and (max-width: ${desktopBp}) {
    padding: 9px;
  }
`;

const StyledContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
  gap: 0.63vw;
  @media screen and (max-width: ${desktopBp}) {
    gap: 8px;
  }
`

const ToolbarComponent = React.memo(() => {
  const { pathname } = useLocation()

  const signInOrSignUp = useMemo(() => {
    return pathname === "/sign-in" || pathname === signUpUrl
  }, [pathname,signUpUrl])



  return (
    <ToolBar id="toolbar-wrapper" notCard={signInOrSignUp}>
      <StyledContainer>
        <Routes>
          <Route path="/" element={<StatsFilters />} />
          <Route path="/monitoring" element={<SentimentorFilters />} />
          <Route path="/opponents" element={<OpponentsFilters />} />
          <Route path="/relations" element={<RelationsFilters />} />
        </Routes>
        {/*<StyledText>Notification Center</StyledText>*/}
        <NotificationsComponent />
        <LanguageDropdown />
      </StyledContainer>
    </ToolBar>
  );
});


export default withErrorBoundaryHOC(ToolbarComponent)

// const StyledText = styled.div`
//   color: #000;
//   font-family: "IBM Plex Sans Hebrew";
//   font-style: normal;
//   font-weight: 500;
//   line-height: normal;
//   font-size: ${props => props.theme.fontSize.headerPrimary.vw};
//   margin-right: 1.33vw;
//   @media(max-width: ${desktopBp}){
//     font-size: ${props => props.theme.fontSize.headerPrimary.px};
//     margin-right: 17px;
//   }
// `
