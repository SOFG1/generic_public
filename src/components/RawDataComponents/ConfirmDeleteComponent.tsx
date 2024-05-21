import React, { useEffect } from 'react';
import styled from "styled-components";
import {colors} from "../../styles/colors";
import {Title} from "../common/Title";
import {Text} from "../common/Text";
import {NoIcon, YesIcon} from "../../UI/Svg";
import { useTranslation } from "react-i18next";

interface ConfirmDeleteComponentProps {
    callback: () => void,
    onClose: () => void,
    text?: string
}

const ConfirmDelete = styled.div`
  background: #FFFFFF;
  border: 1px solid #000;
  box-sizing: border-box;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.25);
  padding: 10px 30px;
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
    border-top: 15px solid #000;
    border-right: 15px solid transparent;
    border-bottom: 15px solid transparent;
    border-left: 15px solid transparent;
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
    border-top: 14px solid ${colors.white};
    border-right: 14px solid transparent;
    border-bottom: 14px solid transparent;
    border-left: 14px solid transparent;
  }
`

const TitleStyled = styled(Title)`
  font-weight: bold;
  font-size: 14px;
  text-align: center;
  line-height: 1;
  margin-top: 0;
  margin-bottom: 3px;
  letter-spacing: 1px;
  color: ${colors.graphite_6};
`

const ButtonBlock = styled.div`
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  margin-top: 3px;
`

const IconButton = styled.button`
  border: none;
  background-color: transparent;
  outline: none;
  margin: 0 10px;
  padding: 0;
  display: flex;
  align-content: center;
  align-items: center;
  transition: all .25s ease;
  justify-content: center;
  cursor: pointer;
  &:hover {
    filter: drop-shadow(0 2px 2px rgba(34,34,34,.7));
  }
`
const TextStyled = styled(Text)`
  font-size: 14px;
  color: ${colors.graphite_6};
  text-align: center;
  white-space: nowrap;
`

const ConfirmDeleteComponent = React.memo(({callback, onClose, text}: ConfirmDeleteComponentProps) => {
  const { t } = useTranslation();

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation()
    onClose()
  }

  const handleCallback = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    callback()
  }

  const handleDismiss = (e: any) => {
    if (!e.target.closest('.confirm_delete')) onClose()
  }

  useEffect(() => {
    document.addEventListener('click', handleDismiss)
    return () => document.removeEventListener('click', handleDismiss)
  }, [])


  return (
      <ConfirmDelete className="confirm_delete">
          <TitleStyled>{t('raw-data_confirm-delete')}</TitleStyled>
          <TextStyled>{t('raw-data_confirm')}</TextStyled>
          {
              text && <TextStyled>{text}</TextStyled>
          }
          <ButtonBlock>
              <IconButton onClick={handleCallback}><YesIcon/></IconButton>
              <IconButton onClick={handleClose}><NoIcon/></IconButton>
          </ButtonBlock>
      </ConfirmDelete>
  );
})

export default ConfirmDeleteComponent;