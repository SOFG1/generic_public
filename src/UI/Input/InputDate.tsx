import React, { forwardRef } from "react";
import styled from "styled-components";
import { InputDateProps } from "./types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CustomHeader from "./DateCustomHeader";
import CalendarIcon from "../../assets/images/calendar-icon.png";
import { desktopBp } from "../../styles/variables";

const InputBlock = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 5px;
  justify-content: flex-end;
  padding-bottom: 3px;
  border-bottom: 1px solid #000;
  margin-bottom: 0.89vw;
  .react-datepicker {
    &-wrapper {
      width: auto;
    }
    &-popper {
      z-index: 31;
    }
    &__header {
      background-color: #fff;
    }
    &__month {
      margin: 0;
    }
    &__day {
      padding: 0.166rem;
      margin: 0;
      border: 1px solid #000;
      border-radius: 0;
    }
    &__day:hover {
      background-color: #000;
      color: #fff;
    }
    &__day--keyboard-selected,
    &__day--selected {
      color: #fff;
      background-color: #000;
    }
    &__day--today {
      background-color: #fff;
      color: #000;
    }
    &__day--disabled {
      color: #ccc;
      pointer-events: none;
    }
  }
  @media screen and (max-width: ${desktopBp}) {
    margin-bottom: 11px;
  }
`;
const LabelStyled = styled.label<{ isActive: boolean }>`
  font-weight: 500;
  padding-left: 0.47vw;
  font-size: ${props => props.theme.fontSize.medium.vw};
  color: #838080;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-inline-end: auto;
  ${({ isActive, theme }) => isActive && `color: ${theme.color.red}`}};
  @media screen and (max-width: ${desktopBp}) {
    font-size: ${props => props.theme.fontSize.medium.px};
    padding-left: 6px;
  }
`;

const InputStyled = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 0;
  border: 0;
  cursor: pointer;
  background-color: transparent;
`;

const InputText = styled.p`
  font-weight: 500;
  font-size: 0.94vw;
  line-height: 1.2vw;
  margin: 0;
  white-space: nowrap;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 12px;
    line-height: 15px;
  }
`;

const StyledRequired = styled.span`
  position: absolute;
  top: -6px;
  inset-inline-end: 0;
  color: red;
`;

const ExampleCustomInput = forwardRef(({ value, onClick }: any, ref: any) => {
  return (
    <InputStyled onClick={onClick} ref={ref}>
      <img width={12} height={12} src={CalendarIcon} alt="calendat icon" />
      <InputText>{value ? value : "--.--.--"}</InputText>
    </InputStyled>
  );
});

const InputDate = React.memo(
  ({
    label,
    onChange,
    placeholder,
    startDate,
    expirationDate,
    disabled,
    required,
    ...props
  }: InputDateProps) => {
    return (
      <InputBlock {...props}>
        <LabelStyled className = "styled_input_date_label" isActive={!!startDate || !!expirationDate}>
          {label}
        </LabelStyled>
        {required && <StyledRequired>*</StyledRequired>}
        <DatePicker
          renderCustomHeader={CustomHeader}
          maxDate={expirationDate}
          selected={startDate}
          selectsStart
          onChange={(event) => onChange([event, expirationDate])}
          customInput={<ExampleCustomInput label="Start" />}
          dateFormat="dd.MM.yyyy"
          disabled={disabled}
        />
        /
        <DatePicker
          renderCustomHeader={CustomHeader}
          minDate={startDate}
          selected={expirationDate}
          onChange={(event) => onChange([startDate, event])}
          customInput={<ExampleCustomInput label="End" />}
          dateFormat="dd.MM.yyyy"
          selectsEnd
          disabled={disabled}
        />
      </InputBlock>
    );
  }
);

export default InputDate;
