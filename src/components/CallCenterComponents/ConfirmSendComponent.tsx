import React, { useEffect } from "react";
import styled from "styled-components";
import { colors } from "../../styles/colors";
import { desktopBp } from "../../styles/variables";
import { NoIcon, YesIcon } from "../../UI/Svg";
import { Text } from "../common/Text";
import { Title } from "../common/Title";

const ConfirmDelete = styled.div`
  background: #ffffff;
  border: 1px solid ${colors.blue_green};
  box-sizing: border-box;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.25);
  padding: 0.52vw 1.56vw;
  border-radius: 14px;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -100%);
  top: 0;
  z-index: 1000;
  &:before {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    display: block;
    width: 0;
    height: 0;
    border-top: 0.78vw solid ${colors.blue_green};
    border-right: 0.78vw solid transparent;
    border-bottom: 0.78vw solid transparent;
    border-left: 0.78vw solid transparent;
  }
  &:after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    display: block;
    width: 0;
    height: 0;
    border-top: 0.73vw solid ${colors.white};
    border-right: 0.73vw solid transparent;
    border-bottom: 0.73vw solid transparent;
    border-left: 0.73vw solid transparent;
  }

  @media screen and (max-width: ${desktopBp}) {
    padding: 7px 20px;
    &:before {
      border-top: 10px solid ${colors.blue_green};
      border-right: 10px solid transparent;
      border-bottom: 10px solid transparent;
      border-left: 10px solid transparent;
    }
    &:after {
      border-top: 9px solid ${colors.white};
      border-right: 9px solid transparent;
      border-bottom: 9px solid transparent;
      border-left: 9px solid transparent;
    }
  }
`;

const ButtonBlock = styled.div`
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  margin-top: 3px;
`;

const IconButton = styled.div`
  border: none;
  background-color: transparent;
  outline: none;
  margin: 0 0.52vw;
  padding: 0;
  display: flex;
  align-content: center;
  align-items: center;
  transition: all 0.25s ease;
  justify-content: center;
  cursor: pointer;
  &:hover {
    filter: drop-shadow(0 2px 2px rgba(34, 34, 34, 0.7));
  }
  @media screen and (max-width: ${desktopBp}) {
    margin: 0 7px;
  }
`;
const TextStyled = styled(Text)`
  font-size: 0.73vw;
  color: ${colors.graphite_6};
  text-align: center;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 9px;
  }
`;

interface IProps {
  text: string;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmSendComponent = React.memo(
  ({ onConfirm, onClose, text }: IProps) => {
    const handleClose = (e: React.MouseEvent) => {
      e.stopPropagation();
      onClose();
    };

    const handleDismiss = (e: any) => {
      if (!e.target.closest(".confirm_delete")) onClose();
    };

    useEffect(() => {
      document.addEventListener("click", handleDismiss);
      return () => document.removeEventListener("click", handleDismiss);
    }, []);

    const handleConfirm = (e: any) => {
      e.stopPropagation();
      onConfirm();
      onClose();
    };

    return (
      <ConfirmDelete className="confirm_delete">
        <TextStyled>{text}</TextStyled>
        <ButtonBlock>
          <IconButton onClick={handleConfirm}>
            <YesIcon />
          </IconButton>
          <IconButton onClick={handleClose}>
            <NoIcon />
          </IconButton>
        </ButtonBlock>
      </ConfirmDelete>
    );
  }
);

export default ConfirmSendComponent;
