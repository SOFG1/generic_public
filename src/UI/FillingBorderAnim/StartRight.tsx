import React, { useMemo } from "react";
import styled, { keyframes } from "styled-components";
import { desktopBp } from "../../styles/variables";

const Wrapper = styled.div`
  position: absolute;
  top: -5px;
  left: -5px;
  right: -5px;
  bottom: -5px;
  z-index: -1;
  pointer-events: none;
  border-radius: 0.78vw;
  overflow: hidden;
  @media screen and (max-width: ${desktopBp}) {
    border-radius: 10px;
  }
`;

const Filler = styled.span`
  position: absolute;
  display: block;
  background-color: #fe5912;
`;

const fill1 = keyframes`
    0% {
        height: 0;
    }
    100% {
        height: 50%;
    }
`;

const Filler1 = styled(Filler)<{ duration: number; delay: number }>`
  bottom: 50%;
  right: 0;
  height: 0;
  width: 10px;
  animation: ${fill1} linear ${({ duration }) => `${duration}ms`}
    ${({ delay }) => `${delay}ms`} forwards;
`;

const fill2 = keyframes`
    0% {
        width: 0;
    }
    100% {
        width: 100%;
    }
`;

const Filler2 = styled(Filler)<{ duration: number; delay: number }>`
  top: 0;
  right: 0;
  height: 10px;
  width: 0;
  animation: ${fill2} linear ${({ duration }) => `${duration}ms`}
    ${({ delay }) => `${delay}ms`} forwards;
`;

const fill3 = keyframes`
    0% {
        height: 0;
    }
    100% {
        height: 100%;
    }
`;

const Filler3 = styled(Filler)<{ duration: number; delay: number }>`
  top: 0;
  left: 0;
  height: 0;
  width: 10px;
  animation: ${fill3} linear ${({ duration }) => `${duration}ms`}
    ${({ delay }) => `${delay}ms`} forwards;
`;

const fill4 = keyframes`
    0% {
        width: 0;
    }
    100% {
        width: 100%;
    }
`;

const Filler4 = styled(Filler)<{ duration: number; delay: number }>`
  bottom: 0;
  left: 0;
  height: 10px;
  width: 0;
  animation: ${fill4} linear ${({ duration }) => `${duration}ms`}
    ${({ delay }) => `${delay}ms`} forwards;
`;

const fill5 = keyframes`
    0% {
        height: 0;
    }
    100% {
        height: 50%;
    }
`;

const Filler5 = styled(Filler)<{ duration: number; delay: number }>`
  bottom: 0;
  right: 0;
  height: 0;
  width: 10px;
  animation: ${fill5} linear ${({ duration }) => `${duration}ms`}
    ${({ delay }) => `${delay}ms`} forwards;
`;

interface IProps {
  duration: number;
  delay: number;
  className?: string
}

const StartRight = ({ duration, delay, className }: IProps) => {

  const duartionPart = useMemo(() => {
    return duration / 12;
  }, []);

  const filler2Delay = useMemo(() => {
    return delay + duartionPart
  }, [delay, duartionPart])


  const filler3Delay = useMemo(() => {
    return delay + duartionPart * 6
  }, [delay, duartionPart])


  const filler4Delay = useMemo(() => {
    return delay + duartionPart * 8
  }, [delay, duartionPart])

  const filler5Delay = useMemo(() => {
    return delay + duartionPart * 13
  }, [delay, duartionPart])

  return (
    <Wrapper className={className}>
      <Filler1 duration={duartionPart} delay={delay}></Filler1>
      <Filler2 duration={duartionPart * 5} delay={filler2Delay}></Filler2>
      <Filler3 duration={duartionPart * 2} delay={filler3Delay}></Filler3>
      <Filler4 duration={duartionPart * 5} delay={filler4Delay}></Filler4>
      <Filler5 duration={duartionPart} delay={filler5Delay}></Filler5>
    </Wrapper>
  );
};

export default StartRight;
