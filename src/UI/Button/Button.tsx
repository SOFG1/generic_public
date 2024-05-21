import styled from "styled-components";
import { desktopBp } from "../../styles/variables";
import { ButtonProps, } from "./types";

const Button = styled.button<ButtonProps>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0.68vw 1.30vw;
  background-color: #fff;
  border-radius: 0.36vw;
  font-style: normal;
  font-weight: 400;
  font-size: 1.04vw;
  line-height: 1.25vw;
  font-family: inherit;
  text-decoration: none;
  text-align: center;
  letter-spacing: 1px;
  color: #000000;
  box-sizing: border-box;
  transition: all 0.25s ease;
  border: 2px solid #000000;
  width: 100%;
  max-width: 23.65vw;
  cursor: pointer;
  outline: none;
  &:not(:disabled):hover {
    background-color: #000;
    color: #fff;
  }
  &:disabled {
    cursor: not-allowed;
    color: #AAAAAA;
  }
  ${({isActive}) => isActive && 'background-color: #000; color: #fff;'}
  @media screen and (max-width: ${desktopBp}) {
    padding: 8px 16px;
    border-radius: 5px;
    font-size: 13px;
    line-height: 16px;
    max-width: 297px;
  }
  @media screen and (max-width: 740px) {
    padding: 8px;
  }
`;

export default Button;
