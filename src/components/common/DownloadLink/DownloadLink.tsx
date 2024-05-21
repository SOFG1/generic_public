import React from "react";
import styled from "styled-components";
import { colors } from "../../../styles/colors";
import { IProps } from "./types";
import { useTranslation } from "react-i18next";
import { desktopBp } from "../../../styles/variables";

const DownloadLinkStyled = styled.button<{disabled?: boolean}>`
  font-size: 0.94vw;
  background-color: transparent;
  border: 0;
  color: ${colors.graphite_4};
  cursor: pointer;
  font-weight: 600;
  ${({disabled}) => disabled && 'cursor: wait;'}
  &:disabled {
    color: ${colors.graphite_3};
  }
  @media screen and (max-width: ${desktopBp}) {
    font-size: 12px;
  }
`;

const DownloadLink: React.FC<IProps> = React.memo(({ handleClick, disabled, action }) => {
  const { t } = useTranslation();

  return (
    <DownloadLinkStyled onClick={handleClick} disabled={disabled} data-action={action}>
      {t("download-link")}
    </DownloadLinkStyled>
  );
});

export default DownloadLink;
