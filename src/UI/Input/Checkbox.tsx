import React, { useCallback } from "react";
import styled from "styled-components";
import { colors } from "../../styles/colors";
import { desktopBp } from "../../styles/variables";

const CheckboxBlock = styled.div`
  position: relative;
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: flex-start;
`;

const CheckboxStyled = styled.div<{ name: string; isDisabled?: boolean }>`
  position: relative;
  width: 15px;
  height: 15px;
  border: 1px solid #000;
  box-sizing: border-box;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  transition: all 0.25s ease;
  flex-shrink: 0;
  cursor: pointer;
  ${({ isDisabled }) =>
    isDisabled &&
    `border: 1px solid ${colors.graphite_5}; background-color: ${colors.graphite_2};`}
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    display: block;
    height: 10px;
    width: 10px;
    background-color: #000;
    border-radius: 50%;
  }
`;

const Label = styled.p<{active:boolean}>`
  margin: 0;
  margin-inline-start: 0.26vw;
  font-style: normal;
  font-weight: normal;
  font-size: ${props => props.theme.fontSize.medium.vw};
  line-height: 1.15vw;
  color: ${props => props.active ? props.theme.color.red : "#000"};
  cursor: pointer;
  @media screen and (max-width: ${desktopBp}) {
    margin-inline-start: 3px;
    font-size: ${props => props.theme.fontSize.medium.px};
    line-height: 14px;
  }
`;

const StyledRequired = styled.span`
  position: absolute;
  top: -0.36vw;
  inset-inline-end: 0.21vw;
  color: red;
  @media screen and (max-width: ${desktopBp}) {
    top: -5px;
    inset-inline-end: 3px;
  }
`;

const Checkbox = React.memo(
  ({
    isActive,
    label,
    isDisabled,
    onChange,
    name = "",
    required,
    className,
    ...props
  }: {
    isActive: boolean;
    required?: boolean;
    isDisabled?: boolean;
    label: string;
    name?: string;
    onChange: (val: boolean) => void;
    className?: string;
  }) => {
    const onToggle = useCallback(() => {
      if (!isDisabled) {
        onChange(!isActive);
      }
    }, [isDisabled, isActive]);

    return (
      <CheckboxBlock {...props} className={className}>
        {required && <StyledRequired>*</StyledRequired>}
        <CheckboxStyled className="styled_checkbox_btn" onClick={onToggle} name={name} isDisabled={isDisabled}>
          <div>{isActive && <span></span>}</div>
        </CheckboxStyled>
        <Label active = {isActive} className="styled_checkbox_label" onClick={onToggle}>{label}</Label>
      </CheckboxBlock>
    );
  }
);

export default Checkbox;
