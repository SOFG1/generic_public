import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { Card } from "../../components/common/Card";
import { VotingBarComponent } from "../../components/ElectionComponents";
import { useElectionActions, useElectionState } from "../../store/election";
import { desktopBp } from "../../styles/variables";
import { Loader } from "../../UI/Spinners";
import { withErrorBoundaryHOC } from "../../utils/withErrorBoundaryHOC";
import { Button } from "../../UI/Button";
import ChangeVotingRateComponent from "../../components/ElectionComponents/ChangeVotingRateComponent";

const Title = styled.p`
  width: 100%;
  font-style: normal;
  font-weight: 500;
  font-size: 1.25vw;
  line-height: 1.51vw;
  color: #000;
  margin: 0 0 2.08vw;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 16px;
    line-height: 19px;
    margin: 0 0 26px;
  }
`;

const StyledLoader = styled(Loader)`
  height: 4.06vw;
  width: 4.06vw;
  @media screen and (max-width: ${desktopBp}) {
    height: 51px;
    width: 51px;
  }
`;

const VotingRateView = React.memo(() => {
  const { t } = useTranslation()
  const { votingRate, isFetchingRate } = useElectionState();
  const { onGetVotingRate } = useElectionActions();

  useEffect(() => {
    onGetVotingRate();
  }, []);
  
  return (
    <Card>
      <Title>{t("election_voting-rate")}</Title>
      {isFetchingRate && <StyledLoader />}
      {!isFetchingRate && (
        <VotingBarComponent
          bingo={votingRate.all_bingo}
          rate={votingRate.voting_rate}
        />
      )}
      <ChangeVotingRateComponent initialValue={votingRate.voting_rate} />
    </Card>
  );
});

export default withErrorBoundaryHOC(VotingRateView);
