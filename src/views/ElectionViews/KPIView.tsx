import React, { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { Card } from "../../components/common/Card";
import { colors } from "../../styles/colors";
import { DropdownWithSearch } from "../../UI/Dropdown";
import votersQnt from "../../assets/images/voters-qnt.svg";
import votersFor from "../../assets/images/voters-for.svg";
import votersPrct from "../../assets/images/voters-prct.svg";
import votersExp from "../../assets/images/voters-exp.svg";
import { useElectionActions, useElectionState } from "../../store/election";
import { Loader } from "../../UI/Spinners";
import { numberWithCommas } from "../../utils/numberWidthCommas";
import { GenderStatsComponent } from "../../components/ElectionComponents";
import { Button, EButtonSize, EButtonVariants } from "../../UI/Button";
import { desktopBp } from "../../styles/variables";
import { HintComponent } from "../../UI/HintComponent";
import { activityList } from "../../config/userActivityList";
import { withErrorBoundaryHOC } from "../../utils/withErrorBoundaryHOC";

const Wrapper = styled(Card)`
  margin-bottom: 1.56vw;
  @media screen and (max-width: ${desktopBp}) {
    margin-bottom: 20px;
  }
`;

const Box = styled.div`
  display: flex;
  width: 100%;
  gap: 1.56vw;
  margin-bottom: 1.56vw;
  @media screen and (max-width: ${desktopBp}) {
    gap: 39px;
    margin-bottom: 20px;
  }
  @media screen and (max-width: 800px) {
    flex-direction: column;
    gap: 5px;
  }
`;

const Title = styled.p`
  font-style: normal;
  font-weight: 500;
  font-size: 1.25vw;
  line-height: 1.51vw;
  margin: 0;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 16px;
    line-height: 19px;
  }
`;

const StyledHint = styled(HintComponent)`
  margin-inline-end: auto;
`

const StyledDropdown = styled(DropdownWithSearch)`
  width: 12.5vw;
  @media screen and (max-width: ${desktopBp}) {
    width: 157px;
  }
  @media screen and (max-width: 440px) {
    width: 100%;
  }
`;

const Cards = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1.04vw;
  @media screen and (max-width: ${desktopBp}) {
    gap: 13px;
  }
  @media screen and (max-width: 900px) {
    flex-wrap: wrap;
    justify-content: space-evenly;
  }
`;

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CardTitle = styled.p`
  font-weight: 500;
  font-size: 0.94vw;
  line-height: 1.15vw;
  text-align: center;
  letter-spacing: 1px;
  margin: 0.52vw;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 12px;
    line-height: 14px;
    margin: 7px;
  }
`;

const CardImg = styled.img`
  height: 5.1vw;
  object-fit: contain;
  object-position: center;
  @media screen and (max-width: ${desktopBp}) {
    height: 64px;
  }
`;

const CardValue = styled.p<{ isGreen?: true }>`
  font-weight: 700;
  font-size: 1.25vw;
  line-height: 1.56vw;
  text-align: center;
  letter-spacing: 1px;
  color: ${colors.graphite_6};
  margin: 0;
  ${({ isGreen }) => isGreen && "color: #27AE60;"}
  @media screen and (max-width: ${desktopBp}) {
    font-size: 16px;
    line-height: 20px;
  }
`;

const StyledLoader = styled(Loader)`
  height: 8.85vw;
  width: 8.85vw;
  @media screen and (max-width: ${desktopBp}) {
    height: 111px;
    width: 111px;
  }
`;

const KPIView = React.memo(() => {
  const { t } = useTranslation();
  const { kpi, filters, filterCity, isFetchingKPI } = useElectionState();
  const {
    onGetFilters,
    onGetKpi,
    onGetVotingRate,
    onSetCityFilter,
    onGetStats,
  } = useElectionActions();

  useEffect(() => {
    onGetFilters();
    onGetKpi();
    onGetStats();
  }, []);

  const citiesOptiontSorted = useMemo(() => {
    return [...filters.city].sort().map((c: string) => ({ item: c, value: c }));
  }, [filters]);

  const handleSelectFilter = (value: string) => {
    onSetCityFilter(value);
    onGetKpi();
    onGetVotingRate();
    onGetStats();
  };

  const votersCount = useMemo(() => {
    //Modify other types of variables to prevent bugs
    return typeof kpi.voters === "number" ? kpi.voters : 0;
  }, [kpi.voters]);

  const votedForCount = useMemo(() => {
    //Modify other types of variables to prevent bugs
    return typeof kpi.voted_for === "number" ? kpi.voted_for : 0;
  }, [kpi.voted_for]);

  const expectedCount = useMemo(() => {
    //Modify other types of variables to prevent bugs
    return typeof kpi.expected === "number" ? kpi.expected : 0;
  }, [kpi.expected]);

  return (
    <Wrapper>
      <Box>
        <Title>{t("election_kpi")}</Title>
        <StyledHint position="end" items={[t("election_kpi-hint")]} />
        {filterCity !== "" && (
          <Button
          data-action={activityList["election-kpi-clear"]}
            size={EButtonSize.Small}
            variants={EButtonVariants.Primary}
            onClick={() => handleSelectFilter("")}
          >
            {t("election_kpi-clear")}
          </Button>
        )}
        <StyledDropdown
          options={citiesOptiontSorted}
          label={t("election_kpi-cities")}
          placeholder={t("election_kpi-cities")}
          isMultiSelect={true}
          value={filterCity}
          onSelect={(val) => handleSelectFilter(val)}
        />
      </Box>
      {isFetchingKPI && (
        <>
          <>
            <StyledLoader />
          </>
        </>
      )}
      {!isFetchingKPI && (
        <Cards>
          <StyledCard dir="ltr">
            <CardTitle>{t("election_voters")}</CardTitle>
            <CardImg src={votersQnt} />
            <CardValue>{numberWithCommas(votersCount)}</CardValue>
          </StyledCard>
          <StyledCard dir="ltr">
            <CardTitle>{t("election_voted-for")}</CardTitle>
            <CardImg src={votersFor} />
            <CardValue>{numberWithCommas(votedForCount)}</CardValue>
          </StyledCard>
          <StyledCard dir="ltr">
            <CardTitle>{t("election_voters-prc")}</CardTitle>
            <CardImg src={votersPrct} />
            <CardValue isGreen={true}>{kpi.voters_per} %</CardValue>
          </StyledCard>
          <StyledCard dir="ltr">
            <CardTitle>{t("election_gender-stat")}</CardTitle>
            <GenderStatsComponent />
          </StyledCard>
          {/* <StyledCard dir="ltr">
            <CardTitle>{t("election_voters-exp")}</CardTitle>
            <CardImg src={votersExp} />
            <CardValue>{numberWithCommas(expectedCount)}</CardValue>
          </StyledCard> */}
        </Cards>
      )}
    </Wrapper>
  );
});

export default withErrorBoundaryHOC(KPIView);
