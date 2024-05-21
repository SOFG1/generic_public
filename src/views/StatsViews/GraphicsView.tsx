import React, { useEffect } from "react";
import styled from "styled-components";
import {
  EngagementRateComponent,
  PostPreviewComponent,
} from "../../components/StatsComponents";
import { desktopBp } from "../../styles/variables";
import { useSMStatsActions } from "../../store/smStats";
import { withErrorBoundaryHOC } from "../../utils/withErrorBoundaryHOC";

const GraphicsViewStyled = styled.div`
  position: relative;
  display: flex;
  align-content: center;
  align-items: stretch;
  justify-content: flex-start;
  gap: 1.61vw;
  margin-bottom: 1.56vw;
  @media screen and (max-width: ${desktopBp}) {
    gap: 20px;
    margin-bottom: 20px;
  }
  @media screen and (max-width: 1050px) {
    flex-direction: column;
  }
`;

const GraphicsView = React.memo(() => {
  const { onGetPostList, onGetPostViews } = useSMStatsActions()


  useEffect(() => {
    onGetPostViews()
    onGetPostList()
  }, [])

  return (
    <GraphicsViewStyled>
      <EngagementRateComponent />
      <PostPreviewComponent />
    </GraphicsViewStyled>
  );
});

export default withErrorBoundaryHOC(GraphicsView);
