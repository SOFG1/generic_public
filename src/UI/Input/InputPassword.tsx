import React, { useState } from "react";
import styled from "styled-components";
import Input from "./Input";
import { InputPasswordProps } from "./types";
import ShowIcon from "../../assets/images/pass-show.svg";
import HideIcon from "../../assets/images/pass-hide.svg";
import { desktopBp } from "../../styles/variables";
import {InputLegacy} from "./index";

const Wrapper = styled.div`
  position: relative;
  & input {
    padding-inline-end: 45px;
  }
`;

const StyledIcon = styled.img`
  height: 1.04vw;
  width: 1.04vw;
  position: absolute;
  z-index: 4;
  bottom: 0;
  inset-inline-end: 3px;
  cursor: pointer;
  transition: opacity 200ms linear;
  &:hover {
    opacity: 0.65;
  }
  padding-bottom: 0.89vw;
  @media screen and (max-width: ${desktopBp}) {
    height: 13px;
    width: 13px;
    padding-bottom: 17px;
  }
`;

const InputPassword = React.memo(
  ({
    placeholder,
    label,
    id,
    onChange,
    onBlur,
    value,
    name,
    errorMessage,
    isRequired,
    isAutoFocus,
    disabled,
    className,
      useLegacyInput
  }: InputPasswordProps) => {
    const [show, setShow] = useState<boolean>(false);

    return (
      <Wrapper className={className}>
        <StyledIcon
          src={show ? HideIcon : ShowIcon}
          onClick={() => setShow((p) => !p)}
        />
          {!useLegacyInput && (
              <Input
                  type={show ? "text" : "password"}
                  placeholder={placeholder}
                  label={label}
                  id={id}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  name={name}
                  errorMessage={errorMessage}
                  isRequired={isRequired}
                  isAutoFocus={isAutoFocus}
                  disabled={disabled}
              />
          )}
          {useLegacyInput && (
              <InputLegacy
                  type={show ? "text" : "password"}
                  placeholder={placeholder}
                  label={label}
                  id={id}
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  name={name}
                  errorMessage={errorMessage}
                  isRequired={isRequired}
                  isAutoFocus={isAutoFocus}
                  disabled={disabled}
              />
          )}
      </Wrapper>
    );
  }
);

export default InputPassword;
