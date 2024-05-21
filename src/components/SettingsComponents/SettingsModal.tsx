import React, { useCallback, useEffect, useRef } from "react"
import styled from "styled-components"
import { Card } from "../common/Card";
import { desktopBp } from "../../styles/variables";
import { NoIcon } from "../../UI/Svg";
import clsx from "clsx";

const StyledModal = styled(Card)`
  position: fixed;
  top:50%;
  transform: translateY(-50%) translateX(33%);
  padding: 6px 1.46vw 2.4vw;
  width: 70%;
  max-height: 80vh;
  overflow: auto;
  inset-inline-end: 6.25vw;
  z-index: 17;
  left: 0;
  min-height: 32.03vw;
  color: #000;
  text-align: start;
  @media screen and (max-width: ${desktopBp}) {
    min-height: 402px;
    padding: 4px 18px 30px;
    inset-inline-end: 78px;
  }
`;

const StyledOverlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
`

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 0.78vw;
  margin-bottom: 2.71vw;
  @media screen and (max-width: ${desktopBp}) {
    margin-top: 10px;
    margin-bottom: 34px;
  }
`;

const ModalTitle = styled.p`
  font-size: 1.67vw;
  line-height: 2.19vw;
  font-weight: 700;
  margin: 0 0 3.54vw;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 21px;
    line-height: 27px;
    margin-bottom: 44px;
  }
`;

const CloseBtn = styled.button`
  height: 22px;
  width: 22px;
  border: 0;
  padding: 0;
  background-color: transparent;
  flex-shrink: 0;
  cursor: pointer;
`;

interface IProps {
    title: string
    children: React.ReactNode,
    className?:string,
    onClose: () => void
}

const SettingsModal = React.memo(({ title, children, onClose, className }: IProps) => {
  const modalRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null);



  const handleClickOutside = useCallback(
    (e: any) => {
      if (e.composedPath().includes(overlayRef.current)) onClose();
    },
    [modalRef?.current]
  );

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleClickOutside]);

    return (
       <>
           <StyledOverlay ref = {overlayRef}/>
           <StyledModal className = {className} ref={modalRef}>
               <StyledHeader className="styled_setting_modal_header">
                   <ModalTitle className="styled_setting_modal_title">{title}</ModalTitle>
                   <CloseBtn onClick={(e) => {e.stopPropagation(); onClose()}}>
                       <NoIcon />
                   </CloseBtn>
               </StyledHeader>
               {children}
           </StyledModal>
       </>
    )
})

export default SettingsModal
