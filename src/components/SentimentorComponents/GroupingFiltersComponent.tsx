import React, { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { desktopBp } from "../../styles/variables";
import { DropdownWithSearch } from "../../UI/Dropdown";
import { settingsPostTypesSelector, useSettingsActions } from "../../store/settings";
import { useSelector } from "react-redux";


const DropdownBox = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: flex-end;
  gap: 0.94vw;
  @media screen and (max-width: ${desktopBp}) {
    gap: 12px;
  }
`;


const DropdownStyled = styled(DropdownWithSearch)`
  flex-grow: 1;
  margin-bottom: 0;
  label {
    display: none;
  }
  @media screen and (max-width: ${desktopBp}) {
    width: 134px;
  }
`;

const LabelStyled = styled.p`
  font-size: 0.83vw;
  line-height: 0.94vw;
  min-width: 6.77vw;
  margin: 0 auto;
  white-space: nowrap;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 11px;
    min-width: 85px;
    line-height: 12px;
  }
`;

interface IProps {
  value: string
  onChange: (v: string) => void
}

const GroupingFiltersComponent = React.memo(({ value, onChange }: IProps) => {
  const { t } = useTranslation();
  const post_types = useSelector(settingsPostTypesSelector)
  const { onGetPostTypes } = useSettingsActions()


  const options = useMemo(() => {
    return post_types.map(type => ({ item: type, value: type }))
  }, [post_types])


  useEffect(() => {
    onGetPostTypes()
  }, [])

  return (
    <DropdownBox>
      <LabelStyled>{t("ranking_filters-grouping")}</LabelStyled>
      <DropdownStyled
        label={t("ranking_filters-grouping")}
        value={value}
        placeholder={t("ranking_filters-grouping")}
        onSelect={onChange}
        options={options}
        isMultiSelect={true}
      />
    </DropdownBox>
  );
});

export default GroupingFiltersComponent;
