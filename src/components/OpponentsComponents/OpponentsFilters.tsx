import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useDateOptions } from "../../config";
import { useOpponentsActions, useOpponentsState } from "../../store/opponents";
import { desktopBp } from "../../styles/variables";
import { Dropdown } from "../../UI/Dropdown";

const DropdownBox = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 0.63vw;
  margin-inline-start: 2.08vw;
  @media screen and (max-width: ${desktopBp}) {
    margin-inline-start: 26px;
    gap: 8px;
  }
`;


const DropdownStyled = styled(Dropdown)`
  width: 10.68vw;
  flex-grow: 1;
  margin-bottom: 0;
  label {
    display: none;
  }
  @media screen and (max-width: ${desktopBp}) {
    width: 134px;
  }
`;

const LabelStyled = styled.p`
  font-size: 0.83vw;
  line-height: 0.94vw;
  margin: 0 auto;
  white-space: nowrap;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 11px;
    line-height: 12px;
  }
`;


const OpponentsFilters = React.memo(() => {
  const { t } = useTranslation();
  const { daysFilter: opponentsDayFilter } = useOpponentsState();
  const { onSetDaysFilter: onSetOpponentsDayFilter } = useOpponentsActions();
  const dateOptions = useDateOptions()

  return (
    <DropdownBox>
      <LabelStyled>{t("stats_date-dropdown")}</LabelStyled>
      <DropdownStyled
        label={t("stats_date-dropdown")}
        value={opponentsDayFilter}
        placeholder={t("stats_date-dropdown")}
        onSelect={(val) => onSetOpponentsDayFilter(val)}
        options={dateOptions}
      />
    </DropdownBox>
  );
});

export default OpponentsFilters;
