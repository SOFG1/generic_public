import { Modal } from "../../../UI/Modal";
import React, { useCallback } from "react";
import styled from "styled-components";
import { Text } from "../Text";
import { Title } from "../Title";
import { NoIcon, YesIcon } from "../../../UI/Svg";
import { desktopBp } from "../../../styles/variables";
import { activityList } from "../../../config/userActivityList";

const ButtonBlock = styled.div`
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  margin-top: 0.78vw;
  @media screen and (max-width: ${desktopBp}) {
    margin-top: 10px;
  }
`;

const NoBtn = styled.button`
  border: none;
  background-color: transparent;
  outline: none;
  margin: 0 10px;
  padding: 0;
  display: flex;
  align-content: center;
  align-items: center;
  transition: all 0.25s ease;
  justify-content: center;
  cursor: pointer;
  svg rect, svg path {
    stroke: #FE5912;
  }
  &:hover {
    filter: drop-shadow(0 2px 2px rgba(34, 34, 34, 0.7));
  }
`;

const YesBtn = styled(NoBtn)`
    svg rect, svg path {
    stroke: #65864B;
  }
`



const StyledTitle = styled(Title)`
  text-transform: none;
`;

const StyledText = styled(Text)`
  text-align: center;
`

interface IProps {
  show: boolean;
  onClose: () => void;
  onDelete: () => void;
  title?: string;
  text?: string;
  stopBubbling?: boolean
}

const ConfirmDeleteFull = React.memo(
  ({ show, onClose, onDelete, title, text, stopBubbling }: IProps) => {
    const handleDelete = useCallback(() => {
      onDelete();
      onClose();
    }, [onDelete, onClose]);

    return (
      <Modal show={show} onClose={onClose} stopBubbling={stopBubbling}>
        {title && <StyledTitle> {title}</StyledTitle>}
        {text && <StyledText>{text}</StyledText>}
        <ButtonBlock>
          <YesBtn onClick={handleDelete} data-action={activityList["warning-confirm"]}>
            <YesIcon />
          </YesBtn>
          <NoBtn onClick={onClose} data-action={activityList["warning-refuse"]}>
            <NoIcon />
          </NoBtn>
        </ButtonBlock>
      </Modal>
    );
  }
);

export default ConfirmDeleteFull;
