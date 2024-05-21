import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { desktopBp } from "../../styles/variables";

const InputBlock = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 5px;
  justify-content: flex-end;
  padding-bottom: 3px;
  border-bottom: 1px solid #000;
  margin-bottom: 0.89vw;
  @media screen and (max-width: ${desktopBp}) {
    margin-bottom: 11px;
  }
`;

const LabelStyled = styled.label<{ isActive: boolean }>`
  font-weight: 500;
  font-size: 0.83vw;
  line-height: 0.89vw;
  color: #000;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-inline-end: auto;
  max-width: 5.83vw;
  ${({ isActive }) => isActive && "color: #FE5912;"}
  @media screen and (max-width: ${desktopBp}) {
    font-size: 10px;
    line-height: 11px;
  max-width: 73px;
  }
`;

const TextStyled = styled.p`
  font-size: 0.83vw;
  line-height: 0.83vw;
  margin: 0;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 10px;
    line-height: 10px;
  }
`;

const StyledRequired = styled.span`
  position: absolute;
  top: -10px;
  inset-inline-end: 0;
  color: red;
`;

const InputStyled = styled.input`
  width: 3.65vw;
  font-size: 0.83vw;
  background: transparent;
  &:not(:disabled) {
    cursor: pointer;
  }
  @media screen and (max-width: ${desktopBp}) {
    width: 46px;
    font-size: 10px;
  }
`;

interface IProps {
  label: string;
  onChange: (val: any) => void;
  value: [string | null, string | null];
  disabled?: boolean;
  isRequired?: boolean;
}

const NumberRange = React.memo(
  ({ label, onChange, value, disabled, isRequired }: IProps) => {
    const { t } = useTranslation()
    return (
      <InputBlock>
        {isRequired && <StyledRequired>*</StyledRequired>}
        <LabelStyled isActive={!!value[0] || !!value[1]} title={label}>{label}</LabelStyled>
        <TextStyled>{t('number-input_from')}</TextStyled>
        <InputStyled
          onChange={(e) => onChange([e.target.value, value[1]])}
          value={value[0] || ""}
          type="number"
          disabled={disabled}
        />
        <TextStyled>{t('number-input_to')}</TextStyled>
        <InputStyled
          onChange={(e) => onChange([value[0], e.target.value])}
          value={value[1] || ""}
          type="number"
          disabled={disabled}
        />
      </InputBlock>
    );
  }
);

export default NumberRange;
