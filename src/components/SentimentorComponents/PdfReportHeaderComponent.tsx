import React, { useMemo } from "react";
import styled from "styled-components";
import logo from "../../assets/images/logo-black.png";
import { getFormatDate, getFormatTime } from "../../utils";
import { useTranslation } from "react-i18next";

const StyledHeader = styled.div`
  border: 1px solid #000;
  height: 35px;
  display: flex;
  margin-bottom: 50px;
`;

const StyledLogo = styled.img`
  padding-inline-end: 10px;
  border-inline-end: 1px solid #000;
  padding: 0 10px;
  box-sizing: border-box;
  height: 100%;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
  padding: 0 15px;
  align-items: center;
`;

const StyledText = styled.p`
  font-weight: 600;
  margin: 0;
`;

const PdfReportHeaderComponent = React.memo(() => {
  const {t} = useTranslation()
  const dateFormated = useMemo(() => {
    const d = new Date();
    const date = getFormatDate(d).replaceAll(".", " / ");
    const time = getFormatTime(d).replace(".", ":");
    return {
      date,
      time,
    };
  }, []);


  return (
    <StyledHeader>
      <StyledLogo src={logo} />
      <HeaderContainer>
        <StyledText>{t("ranking_pdf-title")}</StyledText>
        <StyledText>{dateFormated.date}</StyledText>
        <StyledText>{t("ranking_pdf-etm")}{dateFormated.time}</StyledText>
      </HeaderContainer>
    </StyledHeader>
  );
});

export default PdfReportHeaderComponent;
