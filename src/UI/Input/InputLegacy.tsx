import React from "react";
import styled from "styled-components";
import { colors } from "../../styles/colors";
import { desktopBp } from "../../styles/variables";
import { InputProps, InputTypes, InputVariants } from "./types";

const InputBlock = styled.div`
  position: relative;
  padding-bottom: 0.89vw;
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  box-sizing: border-box;
  textarea {
    font: inherit;
    border-radius: 0.26vw;
    min-height: 1.04vw;
    font-style: normal;
    font-weight: normal;
    font-size: 0.83vw;
    line-height: 0.94vw;
    color: #000;
  }
  @media screen and (max-width: ${desktopBp}) {
    padding-bottom: 11px;
    textarea {
      font-size: 10px;
      line-height: 12px;
      border-radius: 3px;
      min-height: 13px;
    }
  }
`;

const LabelStyled = styled.label<{ isActive: boolean; isTextarea?: boolean }>`
  display: block;
  width: 100%;
  position: absolute;
  text-align: start;
  bottom: 0;
  inset-inline-start: 0;
  font-style: normal;
  font-weight: normal;
  font-size: 0.83vw;
  font-weight: 500;
  line-height: 0.89vw;
  color: #000;
  z-index: 3;
  pointer-events: none;
  transition: transform 200ms;
  color: #fe5912;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  ${({ isActive }) =>
    isActive &&
    `
    transform: translateY(-1.20vw);
    color: #222222;
  `}
  input:focus+ &, textarea:focus + & {
    transform: translateY(0);
    color: #fe5912;
  }
  ${({ isTextarea }) =>
    isTextarea && `padding-top: 0.36vw; padding-inline-start: 0.36vw;`}

  @media screen and (max-width: ${desktopBp}) {
    font-size: 10px;
    line-height: 11px;
    ${({ isActive }) =>
    isActive &&
    `
    transform: translateY(-15px);
  `}
    ${({ isTextarea }) =>
    isTextarea && `padding-top: 5px; padding-inline-start: 5px;`}
  }
`;

const InputStyled = styled.input<InputTypes>`
  background: ${colors.white};
  border: 0;
  border-bottom: 1px solid
    ${({ isError }) => (isError ? colors.orange : "#000")};
  border: ${({ isError, isTextArea }) =>
    isTextArea && `1px solid ${isError ? colors.orange : "#000"}`};
  box-sizing: border-box;
  padding: ${({ withIcon }) =>
    withIcon ? "0.16vw 1.04vw 0.16vw 1.88vw" : "0.16vw 0px"};
  ${({ isTextArea }) =>
    isTextArea &&
    "padding-left: 0.52vw; padding-right: 0.52vw; margin-top: 0.36vw;"};
  width: 100%;
  transition: all 0.25s ease;
  font-style: normal;
  font-weight: normal;
  font-size: 0.83vw;
  line-height: 0.94vw;
  color: #000;
  ${({ disabled }) => disabled && 'cursor: not-allowed;'}
  &:focus {
    outline: 0;
  }

  @media screen and (max-width: ${desktopBp}) {
    padding: ${({ withIcon }) => (withIcon ? "2px 13px 2px 24px" : "2px 0px")};
    ${({ isTextArea }) =>
    isTextArea && "padding-left: 7px; padding-right: 7px; margin-top: 5px;"};
    font-size: 10px;
    line-height: 12px;
  }
`;

const IconStyled = styled.div<InputTypes>`
  position: absolute;
  top: ${({ variant }) =>
    variant === InputVariants.Small ? "0.63vw" : "1.15vw"};
  left: ${({ variant }) =>
    variant === InputVariants.Small ? "0.73vw" : "0.78vw"};
  @media screen and (max-width: ${desktopBp}) {
    top: ${({ variant }) => (variant === InputVariants.Small ? "8px" : "14px")};
    left: ${({ variant }) =>
    variant === InputVariants.Small ? "9px" : "10px"};
  }
`;

const ErrorMessage = styled.div`
  margin-top: 4px;
  font-size: 12px;
  line-height: 1;
  text-align: left;
  color: ${colors.orange};
`;

const StyledRequired = styled.span`
  position: absolute;
  top: 0.36vw;
  inset-inline-end: -0.36vw;
  color: red;
  @media screen and (max-width: ${desktopBp}) {
    top: 5px;
    inset-inline-end: -5px;
  }
`;

const InputLegacy = React.memo(
    ({
         id,
         label,
         type,
         variant = InputVariants.Default,
         onChange,
         onBlur,
         name,
         placeholder,
         isRequired,
         disabled,
         value,
         isTextarea,
         errorMessage,
         Icon,
         isAutoFocus,
         className,
         ...props
     }: InputProps) => {
        return (
            <InputBlock {...props} className={className}>
                {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
                {isTextarea ? (
                    <InputStyled
                        dir="auto"
                        isTextArea={true}
                        disabled={disabled}
                        variant={variant}
                        required={isRequired}
                        isError={!!errorMessage}
                        as={"textarea"}
                        id={id}
                        name={name}
                        value={value}
                        onChange={(event: { target: { value: any } }) =>
                            onChange(event.target.value)
                        }
                        onBlur={onBlur}
                        placeholder=""
                        autoFocus={isAutoFocus}
                    />
                ) : (
                    <InputStyled
                        dir="auto"
                        withIcon={!!Icon}
                        disabled={disabled}
                        variant={variant}
                        required={isRequired}
                        isError={!!errorMessage}
                        id={id}
                        name={name}
                        type={type}
                        value={value}
                        onChange={(event) => onChange(event.target.value)}
                        onBlur={onBlur}
                        placeholder=""
                        autoFocus={isAutoFocus}
                    />
                )}
                <LabelStyled
                    isActive={value === ""}
                    isTextarea={isTextarea}
                    htmlFor={id}
                    dir="auto"
                >
                    {label}
                </LabelStyled>
                {isRequired && <StyledRequired>*</StyledRequired>}
                {Icon && (
                    <IconStyled variant={variant}>
                        <Icon />
                    </IconStyled>
                )}
            </InputBlock>
        );
    }
);

export default InputLegacy;
