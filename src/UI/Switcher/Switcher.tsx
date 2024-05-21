import React from "react";
import { IProps } from "./types";
import styled from "styled-components";
import { desktopBp } from "../../styles/variables";
import { useTranslation } from "react-i18next";

const StyledBtn = styled.button<{ switched: boolean }>`
  display: flex;
  align-items: center;
  height: 3.28vw;
  width: 6.35vw;
  border-radius: 2.6vw;
  padding: 4px;
  border: 2px solid #000000;
  background-color: transparent;
  flex-shrink: 0;
  cursor: pointer;
  ${({ switched }) => switched && "justify-content: flex-end;"}
  transition: opacity 200ms linear;
  &:hover {
    opacity: 0.8;
  }
  &:disabled {
    opacity: 0.3;
    cursor: auto;
  }
  @media screen and (max-width: ${desktopBp}) {
    height: 41px;
    width: 80px;
    border-radius: 33px;
    padding: 3px;
  }
`;

const StyledCircle = styled.span<{ switched: boolean }>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 2.55vw;
  width: 2.55vw;
  border-radius: 50%;
  flex-shrink: 0;
  background-color: #CFCFCF;
  border: 2px solid #000;
  ${({ switched }) => switched && `background-color: #1998A7;`}
  @media screen and (max-width: ${desktopBp}) {
    height: 32px;
    width: 32px;
  }
`;

const Switcher = React.memo(
  ({ switched, onSwithOn, onSwithOff, action, disabled, className }: IProps) => {
    const { t } = useTranslation()
    return (
      <StyledBtn
        data-action={action}
        onClick={() => (switched ? onSwithOff() : onSwithOn())}
        disabled={disabled}
        switched={switched}
        className={className}
      >
        <StyledCircle switched={switched}>{switched ? t("switcher_on") : t("switcher_off")}</StyledCircle>
      </StyledBtn>
    );
  }
);

export default Switcher;
