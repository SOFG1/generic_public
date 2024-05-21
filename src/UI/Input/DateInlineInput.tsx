import styled from "styled-components";
import {HTMLAttributes} from "react";
import DatePicker from "react-datepicker";
import arrowRight from "./../../assets/images/ArrowRight.svg"
import {desktopBp} from "../../styles/variables";
interface IProps extends HTMLAttributes<HTMLDivElement>{
    startDate:Date,
    onChangeHandler:(date:Date[] | null)=>void,
}

const DateInlineInput = ({startDate, onChangeHandler, ...props}:IProps)=>{
    return (
        <Container {...props}>
            <DatePicker
                selected={startDate}
                onChange={(date)=>onChangeHandler(date as any)}
                selectsRange
                dateFormat="dd.MM.yyyy HH:mm"
                dateFormatCalendar="MMMM"
                inline
            />
        </Container>
    )
}

export default DateInlineInput;


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .react-datepicker{
    border: 0;
    &__header {
      background-color: #fff;
      border-bottom: 0;
    }
    &__navigation--next{
      margin-top: -5px;
      &:before{
        content:"";
        background: url(${arrowRight}) no-repeat;
        background-size: contain;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 4px;
        height: 7px;
        border: none;
      }
    }
    &__navigation--previous{
      margin-top: -5px;
      &:after{
        content:"";
        background: url(${arrowRight}) no-repeat;
        background-size: contain;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 4px;
        height: 7px;
        border: none;
        transform: rotate(180deg);
      }
    }
    &__navigation-icon{
      display: none;
    }
    &__current-month{
      font-size: ${props => props.theme.fontSize.medium.vw};
      @media screen and (max-width: ${desktopBp}) {
        font-size: ${props => props.theme.fontSize.medium.px};
      }
    }
    &__month{
      margin: 0;
    }
    &__day{
      border-radius: 0;
      border-bottom:1px solid rgba(220, 220, 220, 1);
      border-right:1px solid rgba(220, 220, 220, 1);
      margin: 0;
      padding: 0.166rem;
      &:last-child{
        border-right: 0;
      }
      font-size: ${props => props.theme.fontSize.semiMedium.vw};
      @media screen and (max-width: ${desktopBp}) {
        font-size: ${props => props.theme.fontSize.semiMedium.px};
      }
      width: 1rem;
      line-height: 1rem;
      &:hover {
        border-radius: 0;
        color:#fff;
        background: #000;
      }
    }
    &__week{
      &:last-child {
        & .react-datepicker__day{
          border-bottom: 0;
        }
      }
    }
    &__day--selected{
      color:#fff;
      background: #000;
    }
    &__day-names{
      display: none;
    }
    
    &__day-name{
      font-size: ${props => props.theme.fontSize.semiMedium.vw};
      @media screen and (max-width: ${desktopBp}) {
        font-size: ${props => props.theme.fontSize.semiMedium.px};
      }
    }
  }
`

