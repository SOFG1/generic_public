import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import { Card } from "../../components/common/Card";
import { HintType, useAppActions, useAppState } from "../../store/app";
import { desktopBp } from "../../styles/variables";
import { FillingBorderAnim } from "../FillingBorderAnim";
import { ChevronLeftIcon, ChevronRightIcon, InfoIcon, NoIcon } from "../Svg";
import { drawArrow } from "../../utils/drawArrow";
import { activityList } from "../../config/userActivityList";

const Wrapper = styled.div<{ appFaded: boolean }>`
  position: relative;
  height: 20px;
  width: 20px;
  z-index: 15;
  &::before {
    content: "";
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    pointer-events: none;
    z-index: 15;
    transition: 300ms;
    background-color: transparent;
    ${({ appFaded }) => appFaded && "background-color: rgba(0, 0, 0, 0.45);"}
  }
  @media screen and (max-width: ${desktopBp}) {
      height: 20px;
      width: 20px;
  }
`;

const Toggler = styled.button`
  position: relative;
  cursor: pointer;
  padding: 0;
  background-color: transparent;
  border: 0;
  background-color: #fff;
  border-radius: 50%;
  box-shadow: 0 0 5px #fff;
  z-index: 15;
  height: 20px;
  width: 20px;
  svg {
    height: 100%;
    width: 100%;
  }
`;

type PopupElementProps = {
  position: "start" | "end" | "top";
  opened: boolean;
  isRtl: boolean;
};

const StyledPopup = styled.div<PopupElementProps>`
  position: absolute;
  font-size: 0.94vw;
  width: 19.32vw;
  transition: 400ms;
  z-index: 25;
  margin: 0;
  border-radius: 0.52vw;
  box-shadow: 0px 160px 64px rgba(0, 0, 0, 0.01),
    0px 90px 54px rgba(0, 0, 0, 0.05), 0px 40px 40px rgba(0, 0, 0, 0.09),
    0px 10px 22px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1);
  //Position depending on 'position'
  ${({ position }) =>
    position === "start" &&
    `
    top: 12px;
    transform-origin: top right;
    inset-inline-end: 115%;
  `}
  ${({ position }) =>
    position === "end" &&
    `
    top: 12px;
    inset-inline-start: 115%;
    transform-origin: top left;
  `}
    ${({ position }) =>
    position === "top" &&
    `
    transform-origin: bottom center;
    inset-inline-start: -9.64vw;
    bottom: 90%;
  `}
  //Hide when not opened
  ${({ opened }) => !opened && "transform: scale(0);"}
  //Transform origin depending on rtl
  ${({ position, isRtl }) =>
    isRtl && position === "start" && "transform-origin: top left;"}
  ${({ position, isRtl }) =>
    isRtl && position === "end" && "transform-origin: top right;"}
  @media screen and (max-width: ${desktopBp}) {
    font-size: 12px;
    border-radius: 7px;

    width: 242px;
    ${({ position }) =>
    position === "top" &&
    `
    inset-inline-start: -121px;
  `}
  }
`;

const PopupConent = styled(Card)`
  height: 100%;
  width: 100%;
  margin-bottom: 0;
  box-shadow: none;
  border-radius: 0.52vw;
  @media screen and (max-width: ${desktopBp}) {
    border-radius: 7px;
  }
`;

const StyledSwitcher = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 10px;
`;

const SwitcherBtn = styled.button`
  padding: 0;
  border-radius: 0;
  background-color: transparent;
  border: 0;
  :disabled svg {
    stroke: #ccc;
  }
  :not(:disabled) {
    cursor: pointer;
  }
  svg {
    height: 15px;
    width: 15px;
    stroke: #000;
  }
`;

interface IProps {
  items: React.ReactNode[]; //They could be strings, numbers, jsx elements...
  position: "start" | "end" | "top";
  currentHint?: HintType;
  arrowHintTarget?: string;
  className?: string;
}

const animationDuration = 1000;

const HintComponent = React.memo(
  ({ items, position, className, currentHint, arrowHintTarget }: IProps) => {
    const isRtl = document.body.dir === "rtl";
    const { hint } = useAppState();
    const { onSetHint } = useAppActions();
    const [isOpened, setIsOpened] = useState<boolean>(false);
    const [currentItem, setCurrentItem] = useState<number>(0);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const showHint = useMemo(() => {
      return hint === currentHint;
    }, [currentHint, hint]);

    const handleDocumentClick = useCallback(
      (e: any) => {
        const clickedOnCurrent = e.composedPath().includes(wrapperRef.current);
        const clickedOnSettingsItem = e.target.closest("#Menu-Settings");
        if (!clickedOnCurrent && !clickedOnSettingsItem) setIsOpened(false);
      },
      [wrapperRef]
    );

    //Add/remove eventListener for handleDocumentClick
    useEffect(() => {
      document.addEventListener("click", handleDocumentClick);
      return () => {
        document.removeEventListener("click", handleDocumentClick);
      };
    }, [handleDocumentClick]);

    //Set to the first hint initially when user opens up popup after closing on second, third...
    useEffect(() => {
      if (isOpened) setCurrentItem(0);
    }, [isOpened]);

    //Set hint in redux on open
    useEffect(() => {
      if (isOpened && currentHint) onSetHint(currentHint);
    }, [isOpened, currentHint]);

    //Remove hint in redux on close
    useEffect(() => {
      if (!isOpened && currentHint === hint) onSetHint(null);
    }, [isOpened, currentHint, hint]);

    //Show arrow
    useEffect(() => {
      let line: any;
      if (currentHint === hint && isOpened && arrowHintTarget) {
        line = drawArrow(currentHint as string, arrowHintTarget, {
          delay: animationDuration,
          startSocket: "bottom",
        });
      }
      return () => {
        if (line) line.remove();
      };
    }, [currentHint, hint, isOpened, arrowHintTarget, animationDuration]);

    return (
      <Wrapper className={className} ref={wrapperRef} appFaded={showHint}>
        <Toggler onClick={() => setIsOpened((p) => !p)} data-action={activityList["toggle-hint"]}>
          {isOpened ? <NoIcon /> : <InfoIcon />}
        </Toggler>
        <StyledPopup
          position={position}
          opened={isOpened}
          isRtl={isRtl}
          id={currentHint ? currentHint : ""}
        >
          <>
            {showHint && (
              <FillingBorderAnim
                duration={animationDuration}
                delay={0}
                startPoint="bottom"
              />
            )}
          </>
          <PopupConent>
            {items.length > 0 && items[currentItem]}
            {items.length > 1 && (
              <StyledSwitcher>
                <SwitcherBtn
                  data-action={activityList["toggle-hint-page"]}
                  disabled={!items[currentItem - 1]}
                  onClick={() => setCurrentItem((p) => p - 1)}
                >
                  {isRtl ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </SwitcherBtn>
                <SwitcherBtn
                  data-action={activityList["toggle-hint-page"]}
                  disabled={!items[currentItem + 1]}
                  onClick={() => setCurrentItem((p) => p + 1)}
                >
                  {isRtl ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </SwitcherBtn>
              </StyledSwitcher>
            )}
          </PopupConent>
        </StyledPopup>
      </Wrapper>
    );
  }
);

export default HintComponent;
