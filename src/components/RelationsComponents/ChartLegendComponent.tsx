import React from "react";
import styled from "styled-components";
import { desktopBp } from "../../styles/variables";

const StyledWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px 15px;
  margin-top: 3.13vw;
  margin-bottom: 5px;
  @media screen and (max-width: ${desktopBp}) {
    margin-top: 39px;
  }
`;

const StyledItem = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const StyledText = styled.p`
    margin: 0;
`

const StyledPoint = styled.span<{color: string}>`
    height: 10px;
    width: 10px;
    border-radius: 50%;
    background-color: ${({color}) => color};
`

interface IProps {
  items: { color: string; id: number; tag: string }[];
}

const ChartLegendComponent = React.memo(({ items }: IProps) => {
  return <StyledWrapper>{items.map(i => <StyledItem key={i.id}>
    <StyledPoint color={i.color} />
    <StyledText>{i.tag}</StyledText>
  </StyledItem>)}</StyledWrapper>;
});

export default ChartLegendComponent;
