import styled from "styled-components";
import { desktopBp } from "../../styles/variables";

export const StyledHint = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: center;
  align-items: center;
  margin: 0.21vw 0.21vw 0;
  position: relative;
  cursor: pointer;
  z-index: 3;
  &:hover {
    & > div:first-child {
      opacity: 1;
      visibility: visible;
      top: -50%;
    }
  }
  svg {
    height: 1.04vw;
    width: 1.04vw;
  }
  @media screen and (max-width: ${desktopBp}) {
    margin: 3px 3px 0;
    svg {
      height: 13px;
      width: 13px;
    }
  }
`;

export const HintText = styled.div`
  font-size: 0.73vw;
  line-height: 1;
  text-align: center;
  position: absolute;
  width: max-content;
  max-width: 200px;
  top: 0;
  opacity: 0;
  inset-inline-end: 100%;
  visibility: hidden;
  transition: all 0.25s ease;
  z-index: 2;
  background-color: #fff;
  border-radius: 4px;
  padding: 5px;
  cursor: auto;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 10px;
  }
`;
