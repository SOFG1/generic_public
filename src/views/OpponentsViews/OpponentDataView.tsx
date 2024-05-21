import React, { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import {
  OpponentDataComponent,
  GeoTableComponent,
  DemoTableComponent,
  OpponentsRelatedTable,
} from "../../components/OpponentsComponents";
import { useOpponentsState } from "../../store/opponents";
import { desktopBp } from "../../styles/variables";
import { Loader } from "../../UI/Spinners";
import { withErrorBoundaryHOC } from "../../utils/withErrorBoundaryHOC";

const StyledOpponentDataBox = styled.div`
  display: grid;
  gap: 2.45vw;
  grid-template-columns: 1fr 1fr 1fr;
  margin-bottom: 2.19vw;
  @media screen and (max-width: ${desktopBp}) {
    gap: 31px;
    margin-bottom: 27px;
  }
  @media screen and (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
`;

const StyledTables = styled(StyledOpponentDataBox)`
  grid-template-columns: 1fr 1fr;
  margin-bottom: 5px;
  @media screen and (max-width: ${desktopBp}) {
    margin-bottom: 5px;
  }
  @media screen and (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
`;

const StyledLoader = styled(Loader)`
  height: 15.63vw;
  width: 15.63vw;
  margin: 1.56vw auto;
  @media screen and (max-width: ${desktopBp}) {
    height: 196px;
    width: 196px;
    margin: 19px auto;
  }
`;

const OpponentDataView = React.memo(() => {
  const { t } = useTranslation();
  const { opponentsData, opponentGtrends, isFetchingData } =
    useOpponentsState();

  const gTrendsDataAvailable = useMemo(() => {
    return Object.values(opponentGtrends).length !== 0;
  }, [opponentGtrends]);

  const opponentsDataAvailable = useMemo(() => {
    return Object.values(opponentsData).some((d) => d !== null);
  }, [opponentsData]);

  return (
    <>
      {isFetchingData && <StyledLoader />}

      {opponentsDataAvailable && !isFetchingData && (
        <>
          <StyledOpponentDataBox>
            <OpponentDataComponent
              title={t("opponents-budget")}
              property="budget"
            />
            <OpponentDataComponent
              title={t("opponents-number_of_posts")}
              property="number_of_posts"
            />
            <OpponentDataComponent
              title={t("opponents-reach")}
              property="reach"
            />
          </StyledOpponentDataBox>
          <StyledTables>
            <GeoTableComponent />
            <DemoTableComponent />
          </StyledTables>
        </>
      )}

      {gTrendsDataAvailable && (
        <StyledTables>
          <OpponentsRelatedTable
            title={t("opponents-topics")}
            dataKey="related_topics"
            dataTitle="topic_title"
            dataValue="formattedValue"
          />
          <OpponentsRelatedTable
            title={t("opponents-queries")}
            dataKey="related_queries"
            dataTitle="query"
            dataValue="value"
          />
        </StyledTables>
      )}
    </>
  );
});

export default withErrorBoundaryHOC(OpponentDataView);
