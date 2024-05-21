import styled from "styled-components";
import {colors} from "../../styles/colors";

type CheckmarkType = {
    checked?: boolean;
};

export const RadioWrapperStyled = styled('div')`
  display: flex;
  flex-direction: row;
  margin-bottom: 5px;
  gap: 20px;
`

export const RadioContainerStyled = styled('div')`
  user-select: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  gap: 5px;
  cursor: pointer;
`

export const RadioNameStyled = styled('div')`
  font-size: 16px;
  font-weight: 700;
  color: ${colors.graphite_4};
`

export const RadioInputStyled = styled('input')`
  z-index: 999;
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  cursor: pointer;
`

export const RadioCheckmarkStyled = styled('div')<CheckmarkType>`
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background-color: ${colors.white};
  border: 1px solid ${colors.orange};
  
  &:after {
    content: '';
    position: absolute;
    display: ${(props: CheckmarkType) => props.checked ? 'block' : 'none'};
    background-color: ${(props: CheckmarkType) => props.checked ? colors.orange : colors.white};
    border: ${(props: CheckmarkType) => props.checked ? '1px solid none' : `1px solid ${colors.orange}`};
    top: 5px;
    left: 5px;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: ${colors.orange};
  }
`