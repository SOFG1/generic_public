import React, { useCallback, forwardRef } from "react";
import DatePicker from "react-datepicker";
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";
import { InputSingleDateProps } from "./types";
import CustomHeader from "./DateCustomHeader";
import CalendarIcon from "../../assets/images/calendar-icon.png";
import { desktopBp } from "../../styles/variables";

const InputBlock = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.89vw;
  border-bottom: 1px solid #000;
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
  line-height: 0.89vw;
  color: ${props => props.theme.color.darkGrey};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-inline-end: 5px;
  margin-inline-end: auto;
  ${({ isActive }) => isActive && "color: #FE5912;"}
  @media screen and (max-width: ${desktopBp}) {
  font-size: ${props => props.theme.fontSize.medium.px};
    line-height: 11px;
  padding-left: 6px;
  }
`;

const InputStyled = styled.button`
  display: flex;
  flex-grow: 1;
  align-items: center;
  gap: 5px;
  padding: 0;
  border: 0;
  cursor: pointer;
  background-color: transparent;
`;

const InputText = styled.p`
  font-weight: 500;
  font-size: ${props => props.theme.fontSize.medium.vw};
  color:${props => props.theme.color.red};
  line-height: 1.20vw;
  margin: 0;
  white-space: nowrap;
  @media screen and (max-width: ${desktopBp}) {
    font-size: ${props => props.theme.fontSize.medium.px};
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
      <img width = {12} height = {12} src={CalendarIcon} alt="calendat icon" />
      <InputText>{value ? value : "-- / -- / -- / "}</InputText>
    </InputStyled>
  );
});

const SingleInputDate = React.memo(
  ({
    label,
    onChange,
    showTimeSelect,
    startDate,
    disabled,
    required,
    ...props
  }: InputSingleDateProps) => {
    const onChangeStarting = useCallback((event: any) => {
      onChange(event);
    }, []);

    return (
      <InputBlock {...props}>
        <LabelStyled isActive={!!startDate}>{label}</LabelStyled>
        {required && <StyledRequired>*</StyledRequired>}
        <DatePicker
          renderCustomHeader={CustomHeader}
          selected={startDate}
          onChange={onChangeStarting}
          customInput={<ExampleCustomInput />}
          timeInputLabel="Time:"
          dateFormat={showTimeSelect ? "dd / MM / yyyy HH:mm" : "dd / MM / yyyy"}
          disabled={disabled}
          showTimeInput={showTimeSelect}
        />
      </InputBlock>
    );
  }
);

export default SingleInputDate;
