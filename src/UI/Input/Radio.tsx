import React from "react";
import styled from "styled-components";
import { colors } from "../../styles/colors";
import { desktopBp } from "../../styles/variables";

const RadioBlock = styled.div`
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: flex-start;
`;

const RadioStyled = styled.div<{ isActive: boolean }>`
  width: 1.15vw;
  height: 1.15vw;
  border: 1px solid #000;
  overflow: hidden;
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  background-color: ${colors.white};
  border-radius: 50%;
  cursor: pointer;
  div {
    width: 0.73vw;
    height: 0.73vw;
    transition: all 0.25s ease;
    border-radius: 50%;
    background-color: ${({ isActive }) =>
      isActive ? '#000' : colors.white};
  }
  @media screen and (max-width: ${desktopBp}) {
    width: 14px;
    height: 14px;
    div {
      width: 9px;
      height: 9px;
    }
  }
`;

const Label = styled.div`
  margin-inline-start: 0.26vw;
  font-style: normal;
  font-size: 0.94vw;
  line-height: 1.15vw;
  font-weight: bold;
  color: ${colors.graphite_6};
  cursor: pointer;
  @media screen and (max-width: ${desktopBp}) {
    margin-inline-start: 3px;
    font-size: 12px;
    line-height: 14px;
  }
`;

const Radio = React.memo(
  ({
    isActive,
    label,
    id,
    onChange,
    ...props
  }: {
    isActive: boolean;
    id: number;
    label: string;
    onChange: (id: number) => void;
  }) => {
    return (
      <RadioBlock {...props}>
        <RadioStyled onClick={() => onChange(id)} isActive={isActive}>
          <div />
        </RadioStyled>
        <Label onClick={() => onChange(id)}>{label}</Label>
      </RadioBlock>
    );
  }
);

export default Radio;
