import React, { useMemo } from "react";
import { Dropdown } from "../../UI/Dropdown";
import { Button, EButtonVariants } from "../../UI/Button";
import styled from "styled-components";
import { useAppActions } from "../../store/app";
import { useTranslation } from "react-i18next";
import { desktopBp } from "../../styles/variables";

const CampaingWraper = styled.div<{ isFetching: boolean | undefined }>`
  ${({ isFetching }) => isFetching && "cursor: wait; & * {cursor: wait;}"};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;
const ButtonStyled = styled(Button)`
  font-size: ${props => props.theme.fontSize.semiMedium.vw};
  width: 10.00vw;
  @media(max-width: ${desktopBp}){
    font-size: ${props => props.theme.fontSize.semiMedium.px};
    width: 125px;
  }
`;
export interface FbSelectType {
  value: number;
  onSelect: (d: any) => void;
  options: any;
  label: string;
  onCreateAction: () => void;
  onDeleteAction?: () => void | null;
  isFetching?: boolean;
  className?:string;
}
const FbSelect = React.memo(
  ({
    value,
    onSelect,
    options,
    label,
    onCreateAction,
    onDeleteAction,
    isFetching,
    className
  }: FbSelectType): JSX.Element | null => {
    const { t } = useTranslation();
    const { onShowAlert } = useAppActions();

    const ddoptions: { item: string; value: string | number }[] =
      useMemo(() => {
        if (options.error) {
          onShowAlert(false, options.error.message);
          return [];
        }
        return options.map((item: any) => {
          return {
            item: item.name,
            value: item.id,
          };
        });
      }, [options]);
    return (
      <CampaingWraper className={className} isFetching={isFetching}>
        <Dropdown
          value={value}
          placeholder={label}
          onSelect={onSelect}
          options={ddoptions}
          label={label}
        />
        {onDeleteAction ? (
          <ButtonStyled
            className = "styled_facebook_select_btn"
            disabled={isFetching}
            onClick={onDeleteAction}
            variants={EButtonVariants.Primary}
          >
            {t("fb-select_del")}
          </ButtonStyled>
        ) : null}

        <ButtonStyled
            className = "styled_facebook_select_btn"
            onClick={onCreateAction}
            variants={EButtonVariants.Secondary}
        >
          {t("fb-select_add")}
        </ButtonStyled>
      </CampaingWraper>
    );
  }
);

export default FbSelect;
