import React, { useCallback, useEffect, useRef } from "react";
import { ModalProps } from "./types";
import styled from "styled-components";
import { NoIcon } from "../Svg";
import { activityList } from "../../config/userActivityList";

const Wrapper = styled.div`
  position: fixed;
  padding: 10px;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgba(34, 34, 34, 0.5);
  z-index: 9998;
  display: flex;
  padding: 10px;
`;

const ModalStyled = styled.div`
  position: relative;
  padding: 40px;
  min-width: 250px;
  box-shadow: inset 0 0 50px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  border-radius: 5px;
  box-sizing: border-box;
  margin: auto;
  @media screen and (max-width: 750px) {
    padding: 40px 20px;
  }
`;

const Content = styled.div`
  max-width: 1500px;
  max-height: 83vh;
  overflow-y: auto;
  box-sizing: border-box;
`;

const StyledCloseBtn = styled.button`
  position: absolute;
  top: 13px;
  inset-inline-end: 13px;
  cursor: pointer;
  transition: opacity 250ms linear;
  z-index: 2;
  padding: 0;
  border: 0;
  background-color: transparent;
  &:hover {
    opacity: 0.65;
  }
`;

const Modal = React.memo(
  ({
    show,
    children,
    onClose,
    isHiddenClose,
    stopBubbling,
    className,
      preventCloseOnClickOutside
  }: ModalProps): JSX.Element | null => {
    const wrapper = useRef<HTMLDivElement>(null);

    const onDismiss = useCallback(
      (e: any) => {
        if (wrapper.current === e.target) onClose();
      },
      [onClose]
    );

    useEffect(() => {
      if(preventCloseOnClickOutside) return;
      const element = wrapper.current;
      if (element) {
        element?.addEventListener("click", onDismiss, false);
        return () => {
          element?.removeEventListener("click", onDismiss, false);
        };
      }
    }, [onDismiss, wrapper]);

    useEffect(() => {
      const isAModalOpenedInApp = document.querySelector(".js-modal");
      //Enable scroll if no more modals are opened
      //PS - isAModalOpenedInApp prevents scroll adding when multiple modals opened be careful with modifying this
      if (isAModalOpenedInApp) {
        document.body.classList.add("no-scroll");
      }
      return () => {
        const isAModalOpenedInApp = document.querySelector(".js-modal");
        if (!isAModalOpenedInApp) {
          document.body.classList.remove("no-scroll");
        }
      };
    });

    if (!show) {
      return null;
    }

    return (
      <Wrapper ref={wrapper} className={`${className} js-modal`} onClick={(e) => { if (stopBubbling) { e.stopPropagation(); e.preventDefault() } }}>
        <ModalStyled>
          {!isHiddenClose && (
            <StyledCloseBtn onClick={onClose} data-action={activityList["close-modal"]}>
              <NoIcon />
            </StyledCloseBtn>
          )}

          <Content className="js-modal-content">{children}</Content>
        </ModalStyled>
      </Wrapper>
    );
  }
);

export default Modal;
