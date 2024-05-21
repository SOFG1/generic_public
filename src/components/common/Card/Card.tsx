import styled from "styled-components";
import { desktopBp } from "../../../styles/variables";
import { CardProps } from "./types";

const Card = styled.div<CardProps>`
  position: relative;
  background: #fff;
  box-sizing: border-box;
  box-shadow: 0px 160px 64px rgba(0, 0, 0, 0.01),
    0px 90px 54px rgba(0, 0, 0, 0.05), 0px 40px 40px rgba(0, 0, 0, 0.09),
    0px 10px 22px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 1.30vw 2.08vw;
  margin-bottom: 0.93vw;
  @media screen and (max-width: ${desktopBp}) {
    padding: 16px 26px;
    margin-bottom: 12px;
  }
  @media screen and (max-width: 740px) {
    padding: 20px;
  }
`;

export default Card;
