import React from "react";
import styled from "styled-components";
import { Loader } from "../../UI/Spinners";
import { colors } from "../../styles/colors";
import { desktopBp } from "../../styles/variables";

const StyledLoader = styled(Loader)`
  height: 6.25vw;
  width: 6.25vw;
  margin: 0 auto;
  @media screen and (max-width: ${desktopBp}) {
    height: 78px;
    width: 78px;
  }
`;

const LoadingText = styled.p`
  font-size: 1.15vw;
  line-height: 1.25vw;
  font-weight: normal;
  color: ${colors.graphite_6};
  @media screen and (max-width: ${desktopBp}) {
    font-size: 14px;
    line-height: 16px;
  }
`;

const StatisticsPrelaoder = React.memo(() => {
  return (
    <>
      <LoadingText>Refreshing your data</LoadingText>
      <StyledLoader />
    </>
  );
});

export default StatisticsPrelaoder;
