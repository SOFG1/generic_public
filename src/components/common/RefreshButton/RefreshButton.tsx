import React from 'react'
import styled from 'styled-components'
import { desktopBp } from '../../../styles/variables';
import { RefreshIcon } from '../../../UI/Svg';
import { HoverPopup } from '../../../UI/HoverPopup';


const StyledUpdateBtn = styled.button`
  position: relative;
  border: 0;
  padding: 0;
  flex-shrink: 0;
  background-color: transparent;
  transition: opacity 200ms linear;
  cursor: pointer;
    height: 1.56vw;
    width: 1.56vw;
  &:active span {
    display: inline-block;
    transition: transform 100ms linear;
    transform: rotate(180deg);
  }
  svg {
    height: 100%;
    width: 100%;
  }
  @media screen and (max-width: ${desktopBp}) {
      height: 20px;
      width: 20px;
  }
`;

interface IProps {
    hint: string
    onClick: () => void
    disabled: boolean
    action?: string 
    className?: string
}

const RefreshButton = React.memo(({hint, onClick, disabled, action, className}: IProps) => {
    return (
      <StyledUpdateBtn onClick={onClick} disabled={disabled} className={className} data-action={action}>
        <HoverPopup>{hint}</HoverPopup>
        <span>
          <RefreshIcon />
        </span>
      </StyledUpdateBtn>
    );
  })

export default RefreshButton;
