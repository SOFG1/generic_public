import React, { useEffect } from "react";
import styled from "styled-components";
import { desktopBp } from "../../styles/variables";
import { TrashIcon } from "../../UI/Svg";

const StyledBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.89vw;
  @media screen and (max-width: ${desktopBp}) {
    gap: 11px;
  }
`;

const StyledWord = styled.p<{color: string}>`
  font-weight: 500;
  font-size: 1.46vw;
  line-height: 0.95;
  margin: 0;
  ${({color}) => `color: ${color};`}
  @media screen and (max-width: ${desktopBp}) {
    font-size: 18px;
  }
`;

const DeleteBtn = styled.button`
  height: 25px;
  width: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  border: 1px solid #000;
  border-radius: 50%;
  padding: 0;
  background-color: transparent;
  flex-shrink: 0;
  transition: 200ms;
  cursor: pointer;
  &:hover {
    opacity: .65;
  }
`

interface IProps {
  word: any;
  onClose: () => void;
  onDelete: () => void;
  className?: string;
}

const DeleteTagComponent = React.memo(
  ({ word, onClose, onDelete, className }: IProps) => {
    const onDismiss = (e: any) => {
      //Close when user clicks outside the word, and event target is not a keyword that should be selected
      if (
        !e.target.closest("#keyword-wrapper") &&
        e.target.tagName !== "text"
      ) {
        onClose();
      }
    };

    useEffect(() => {
      document.addEventListener("click", onDismiss);
      return () => {
        document.removeEventListener("click", onDismiss);
      };
    }, [onDismiss]);

    return (
        <StyledBox id="keyword-wrapper" className={className}>
          <StyledWord color={word.color}>{word.text}</StyledWord>
          <DeleteBtn onClick={onDelete}>
            <TrashIcon />
          </DeleteBtn>
        </StyledBox>
    );
  }
);

export default DeleteTagComponent;
