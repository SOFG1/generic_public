import React, { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { Card } from "../../components/common/Card";
import {
  OpponentGTrendsComponent,
  SearchOpponentComponent,
} from "../../components/OpponentsComponents";
import { desktopBp } from "../../styles/variables";
import { useUserActions, useUserState } from "../../store/user/hooks";
import { Dropdown } from "../../UI/Dropdown";
import { useOpponentsActions, useOpponentsState } from "../../store/opponents";
import { TrashIcon } from "../../UI/Svg";
import { activityList } from "../../config/userActivityList";
import { withErrorBoundaryHOC } from "../../utils/withErrorBoundaryHOC";

const StyledCard = styled(Card)`
  margin-top: 1.82vw;
  padding-inline-start: 2.71vw;
  margin-bottom: 1.88vw;
  @media screen and (max-width: ${desktopBp}) {
    margin-top: 23px;
    padding-inline-start: 34px;
    margin-bottom: 24px;
  }
`;

const StyledBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2.19vw;
  @media screen and (max-width: ${desktopBp}) {
    margin-top: 27px;
  }
`;

const CardTitle = styled.p`
  margin: 0;
  font-size: 1.67vw;
  line-height: 2.19vw;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 21px;
    line-height: 27px;
  }
`;

const ClearButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border-radius: 50%;
  border: 1px solid #000;
  background-color: transparent;
  height: 25px;
  width: 25px;
  cursor: pointer;
  @media screen and (max-width: ${desktopBp}) {
    height: 25px;
    width: 25px;
  }
`;

const StyledContent = styled.div`
  display: flex;
  gap: 1.93vw;
  width: 100%;
  @media screen and (max-width: ${desktopBp}) {
    gap: 24px;
  }
  @media screen and (max-width: 1000px) {
    flex-direction: column;
  }
`;

const StyledOpponentsList = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  padding-top: 2.6vw;
  width: 16.2vw;
  @media screen and (max-width: ${desktopBp}) {
    padding-top: 33px;
    width: 203px;
  }
`; 

const StyledDropdown = styled(Dropdown)`
  max-width: 12.29vw;
  margin-bottom: 2.76vw;
  @media screen and (max-width: ${desktopBp}) {
    max-width: 154px;
    margin-bottom: 35px;
  }
`;

const OpponentsView = React.memo(() => {
  const { t } = useTranslation();
  const { countryFilter } = useOpponentsState();
  const { countries } = useUserState();
  const { onSetCountryFilter, onResetAll } = useOpponentsActions();
  const { onGetCountries } = useUserActions();

  useEffect(() => {
    onGetCountries();
  }, []);

  const countriesOptions = useMemo(() => {
    return countries
      ? [
          { item: "", value: -1 },
          ...countries.map((c) => ({ item: c.name, value: c.id })),
        ]
      : [];
  }, [countries]);

  const handleSelectCountry = (id: number) => {
    if (id === -1) {
      onSetCountryFilter(0);
      return;
    }
    onSetCountryFilter(id);
  };

  return (
    <StyledCard>
      <StyledBox>
        <CardTitle>{t("opponents-title")}</CardTitle>
        <ClearButton onClick={onResetAll} data-action={activityList["opponents-reset"]}>
          <TrashIcon />
        </ClearButton>
      </StyledBox>
      <StyledContent>
        <StyledOpponentsList>
          <StyledDropdown
            label={t("opponents-label")}
            placeholder={t("opponents-label")}
            value={countryFilter}
            onSelect={(v) => handleSelectCountry(v)}
            options={countriesOptions}
          />
          <SearchOpponentComponent order="0" />
          <SearchOpponentComponent order="1" />
          <SearchOpponentComponent order="2" />
          <SearchOpponentComponent order="3" />
        </StyledOpponentsList>
        <OpponentGTrendsComponent />
      </StyledContent>
    </StyledCard>
  );
});

export default withErrorBoundaryHOC(OpponentsView);
