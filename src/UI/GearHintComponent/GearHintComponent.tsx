import React, { useCallback, useEffect, useMemo } from "react";
import styled, { keyframes } from "styled-components";
import { fixedMenuBP } from "../../config/menu";
import { HintType, useAppActions, useAppState } from "../../store/app";
import { desktopBp } from "../../styles/variables";
import { drawArrow } from "../../utils/drawArrow";
import { GearIcon } from "../Svg";

const AnimationDuration = 1000;

const DurationForthPart = AnimationDuration / 4;

const Wrapper = styled.div<{ showAnim: boolean }>`
  position: relative;
  height: 2.08vw;
  width: 2.08vw;
  flex-shrink: 0;
  border-radius: 50%;
  padding: 4px;
  ${({ showAnim }) => showAnim && "z-index: 15;"}
  &::before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0);
    pointer-events: none;
    transition: background 200ms;
    ${({ showAnim }) => showAnim && "background-color: rgba(0, 0, 0, 0.45);"}
  }
  @media screen and (max-width: ${desktopBp}) {
    height: 26px;
    width: 26px;
  }
  //Don't show animation on fixedMenuBP
  @media screen and (max-width: ${fixedMenuBP}) {
    display: none;
  }
`;

const AnimationContainer = styled.div<{ startPoint: "left" | "right" }>`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #fe5912;
  overflow: hidden;
  border-radius: 50%;
  ${({ startPoint }) => startPoint === "left" && "transform: rotateY(180deg);"}
`;

const AnimSpan = styled.span`
  position: absolute;
  background: #fff;
  width: 100%;
  border-radius: 50%;
  transition: 300ms linear;
`;

const anim1 = keyframes`
    from {
        left: 50%;
         bottom: 50%;
    }
    to {
    left: 0;
    bottom: 100%;
    }
`;

const Span1 = styled(AnimSpan)`
  left: 50%;
  bottom: 50%;
  animation: ${anim1} linear ${DurationForthPart}ms forwards;
`;

const anim2 = keyframes`
    from {
        right: 50%;
         bottom: 50%;
    }
    to {
    right: 100%;
    bottom: 0;
    }
`;

const Span2 = styled(AnimSpan)`
  right: 50%;
  bottom: 50%;
  animation: ${anim2} linear ${DurationForthPart}ms ${DurationForthPart}ms
    forwards;
`;

const anim3 = keyframes`
    from {
        top: 50%;
  right: 50%;
    }
    to {
        top: 100%;
  right: 0;
    }
`;

const Span3 = styled(AnimSpan)`
  top: 50%;
  right: 50%;
  animation: ${anim3} linear ${DurationForthPart}ms ${DurationForthPart * 2}ms
    forwards;
`;

const anim4 = keyframes`
    from {
        left: 50%;
        top: 50%;
    }
    to {
        left: 102%;
        top: 49%;

    }
`;

const Span4 = styled(AnimSpan)`
  left: 50%;
  top: 50%;
  border-radius: 0 50% 50% 50%;
  animation: ${anim4} linear ${DurationForthPart}ms ${DurationForthPart * 3}ms
    forwards;
`;

const StyledBtn = styled.button`
  position: relative;
  border: 0;
  padding: 0;
  background-color: transparent;
  padding: 5px;
  height: 100%;
  width: 100%;
  border-radius: 50%;
  background-color: #fff;
  cursor: pointer;
  svg {
    height: 100%;
    border-radius: 50%;
    width: 100%;
    object-fit: contain;
  }
`;

interface IProps {
  currentHint: HintType;
  startPoint: "left" | "right";
  hintArrowTarget: string; //Id of the element arrow should be pointed (without '#') e.g. - 'Menu-Settings'
  action?: string //User actiivity
  className?: string;
}

const GearHintComponent = React.memo(
  ({ currentHint, startPoint, hintArrowTarget, action, className }: IProps) => {
    const { hint } = useAppState();
    const { onSetHint } = useAppActions();

    const hanleDocumentClick = useCallback(
      (e: any) => {
        const clickedOnSettingsItem = e.target.closest("#Menu-Settings");
        const clickedOnCurrent = e.target.closest(`#${currentHint}`);
        if (!clickedOnCurrent && !clickedOnSettingsItem && hint === currentHint) {
          onSetHint(null);
        }
      },
      [currentHint, hint]
    );

    useEffect(() => {
      document.addEventListener("click", hanleDocumentClick);
      return () => {
        setTimeout(() => {
          document.removeEventListener("click", hanleDocumentClick);
        }, 400);
      };
    }, [hanleDocumentClick]);

    const showAnim = useMemo(() => {
      return hint === currentHint;
    }, [hint, currentHint]);

    useEffect(() => {
      let line: any;
      if (showAnim) {
        line = drawArrow(currentHint as string, hintArrowTarget, {
          delay: AnimationDuration,
          startSocket: startPoint,
        });
      }
      return () => {
        if (line) line.remove();
      };
    }, [showAnim, hintArrowTarget, currentHint, startPoint]);

    return (
      <Wrapper
        showAnim={showAnim}
        id={currentHint ? currentHint : ""}
        className={className}
      >
        {showAnim && (
          <AnimationContainer startPoint={startPoint}>
            <Span1></Span1>
            <Span2></Span2>
            <Span3></Span3>
            <Span4></Span4>
          </AnimationContainer>
        )}
        <StyledBtn onClick={() => onSetHint(currentHint)} data-action={action}>
          <GearIcon />
        </StyledBtn>
      </Wrapper>
    );
  }
);

export default GearHintComponent;
