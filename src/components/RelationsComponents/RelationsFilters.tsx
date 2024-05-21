import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import styled from "styled-components";
import {
  DateFilterType,
  relationsDateFilterSelector,
  relationsKeywordsSelector,
  relationsKeywordFilterSelector,
  useRelationsActions,
} from "../../store/relations";
import { desktopBp } from "../../styles/variables";
import { Button } from "../../UI/Button";
import { DropdownWithSearch } from "../../UI/Dropdown";
import { InputDate } from "../../UI/Input";
import { activityList } from "../../config/userActivityList";
import { useSettingsActions, useSettingsState } from "../../store/settings";
import { extractInstitutionsKeywords } from "../../utils/extractInstitutionsKeywords";
import { useUserState } from "../../store/user";


const DropdownBox = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 0.63vw;
  margin-inline-start: 2.08vw;
  @media screen and (max-width: ${desktopBp}) {
    margin-inline-start: 26px;
    gap: 8px;
  }
`;


const DropdownStyled = styled(DropdownWithSearch)`
  width: 10.68vw;
  flex-grow: 1;
  margin-bottom: 0;
  label {
    display: none;
  }
  @media screen and (max-width: ${desktopBp}) {
    width: 134px;
  }
`;

const DateInputStyled = styled(InputDate)`
  margin-bottom: 0;
`;


const LabelStyled = styled.p`
  font-size: 0.83vw;
  line-height: 0.94vw;
  margin: 0 auto;
  white-space: nowrap;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 11px;
    line-height: 12px;
  }
`;

const StyledBtn = styled(Button)`
  width: auto;
  font-size: 0.83vw;
  line-height: 0.94vw;
  padding: 0.42vw 0.73vw;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 11px;
    line-height: 12px;
    padding: 5px 9px;
  }
`;

const RelationsFilters = React.memo(() => {
  const { t } = useTranslation();
  const { userInfo } = useUserState()
  const { institutions } = useSettingsState();
  const keywords = useSelector(relationsKeywordsSelector);
  const appliedKeywordFilter = useSelector(relationsKeywordFilterSelector);
  const appliedDateFilter = useSelector(relationsDateFilterSelector);
  const { onSetKeywordFilter, onSetDateFilter, onResetData, onGetKeywords } =
    useRelationsActions();
  const { onGetInstitutions } = useSettingsActions();
  const [institutionFilter, setInstitutionFilter] = useState<string>("");
  const [keywordFilter, setKeywordFilter] = useState<string>("");
  const [dateFilter, setDateFilter] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);

  const institutionsOptions = useMemo(() => {
    const opts = institutions.map((i) => {
      const id = i.inst_code;
      const name = i.inst_name;
      return {
        item: name,
        value: id,
      };
    });
    return opts;
  }, [institutions]);

  const mainInstitution = useMemo(() => {
    return institutions.find((i) => i.is_main);
  }, [institutions]);


  const is409group = useMemo(() => {
    return userInfo?.group.id === 409
  }, [userInfo?.group.id])

  useEffect(() => {
    if (mainInstitution) {
      const id = mainInstitution.inst_code;
      setInstitutionFilter(String(id));
      const keywords = mainInstitution.keywords
        .map((k) => k.word)
        .join(", ");
      onSetKeywordFilter(keywords);
    }
  }, [mainInstitution]);

  const handleApply = useCallback(() => {
    onSetKeywordFilter(keywordFilter);
    onSetDateFilter(
      dateFilter.map(
        (d) => d?.toISOString().split("T")[0] || null
      ) as DateFilterType
    );
  }, [keywordFilter, dateFilter]);

  const handleReset = useCallback(() => {
    setInstitutionFilter("");
    setKeywordFilter("");
    setDateFilter([null, null]);
    onResetData();
  }, [mainInstitution]);

  useEffect(() => {
    const first = appliedDateFilter[0] ? new Date(appliedDateFilter[0]) : null;
    const second = appliedDateFilter[1] ? new Date(appliedDateFilter[1]) : null;
    setDateFilter([first, second]);
  }, [appliedDateFilter]);

  const showResetButton = useMemo(() => {
    return (
      !!keywordFilter || dateFilter[0] || dateFilter[1] || institutionFilter
    );
  }, [keywordFilter, dateFilter, institutionFilter]);

  //Set keywords according to the selected institution
  useEffect(() => {
    if (!institutionFilter) return;
    const ids = institutionFilter.split(", ").map((i) => Number(i));
    const keywords = extractInstitutionsKeywords(ids, institutions);
    setKeywordFilter(keywords.map((k) => k.word).join(", "));
  }, [institutions, institutionFilter, keywords]);

  useEffect(() => {
    setKeywordFilter(appliedKeywordFilter);
  }, [appliedKeywordFilter]);

  const handleChangeKeywords = useCallback((v: string) => {
    setInstitutionFilter("");
    setKeywordFilter(v);
  }, []);

  useEffect(() => {
    onGetInstitutions();
    onGetKeywords();
  }, []);

  return (
    <>
      <DropdownBox>
        <LabelStyled>{is409group ? t("relations-institutions(409)") : t("relations-institutions")}</LabelStyled>
        <DropdownStyled
          label={is409group ? t("relations-institutions(409)") : t("relations-institutions")}
          value={institutionFilter}
          isMultiSelect={true}
          placeholder={is409group ? t("relations-institutions(409)") : t("relations-institutions")}
          onSelect={setInstitutionFilter}
          options={institutionsOptions}
        />
      </DropdownBox>
      <DropdownBox>
        <LabelStyled>{t("relations-date")}</LabelStyled>
        <DateInputStyled
          label=""
          onChange={setDateFilter}
          startDate={dateFilter[0]}
          expirationDate={dateFilter[1]}
        />
      </DropdownBox>
      <DropdownBox>
        <LabelStyled>{t("relations-keywords")}</LabelStyled>
        <DropdownStyled
          label={t("relations-keywords")}
          value={keywordFilter}
          isMultiSelect={true}
          placeholder={t("relations-keywords")}
          onSelect={handleChangeKeywords}
          options={
            keywords?.map((k) => ({ item: k.word, value: k.word })) || []
          }
        />
      </DropdownBox>
      <StyledBtn
        onClick={handleApply}
        data-action={activityList["connections-filter-apply"]}
      >
        {t("relations-apply")}
      </StyledBtn>
      {showResetButton && (
        <StyledBtn
          onClick={handleReset}
          data-action={activityList["connections-filter-clear"]}
        >
          {t("relations-clear")}
        </StyledBtn>
      )}
    </>
  );
});

export default RelationsFilters;
