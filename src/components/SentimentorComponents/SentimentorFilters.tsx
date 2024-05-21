import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import styled from "styled-components";
import {
  ISentimentorFilters,
  SentimentorDateFilter,
  useSentimentorActions,
} from "../../store/sentimentor";
import {
  sentimentorAppliedFiltersSelector,
  sentimentorFiltersDataSelector,
  sentimentorKeywordsSelector,
  sentimentorOpenedTabSelector,
} from "../../store/sentimentor/selectors";
import { useSettingsActions, useSettingsState } from "../../store/settings";
import { desktopBp } from "../../styles/variables";
import { Button } from "../../UI/Button";
import { DropdownWithSearch } from "../../UI/Dropdown";
import { Checkbox, InputDate } from "../../UI/Input";
import { getDateFromStr, getFormatDate } from "../../utils";
import {
  AIPostsHistoryView,
  AddPostUserView,
  ReportPdfView,
  SuggestAIPostView,
  TrackedUsersView,
} from "../../views/SentimentorViews";
import { usePermissions, useUserState } from "../../store/user";
import DefamatoryReportComponent from "./DefamatoryReportComponent";
import { activityList } from "../../config/userActivityList";
import GroupingFiltersComponent from "./GroupingFiltersComponent";
import { createPortal } from "react-dom";
import { ToolbarButton } from "../../UI/ToolbarButton";
import { SentimentorFiltersIcon } from "../../UI/Svg";
import PostsSummarizationComponent from "./PostsSummarizationComponent";
import { STORAGE_SENTIMENTOR_FILTERS_KEY } from "../../config/409LocalStorageFiltersKey";



const DropdownBox = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: flex-end;
  gap: 0.94vw;
  @media screen and (max-width: ${desktopBp}) {
    gap: 12px;
  }
`;


const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.83vw;
  @media screen and (max-width: ${desktopBp}) {
    gap: 10px;
  }
`


const CheckboxContainerMargin = styled(CheckboxContainer)`
  margin-inline-end: auto;
`


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

const StyledBtn = styled(Button)`
  width: 5.42vw;
  height: 1.88vw;
  font-size: 0.83vw;
  line-height: 1;
  border-radius: 1.56vw;
  @media screen and (max-width: ${desktopBp}) {
    width: 68px;
    height: 24px;
    border-radius: 20px;
    font-size: 11px;
  }
`;

const DateInputStyled = styled(InputDate)`
  flex-grow: 1;
  margin-bottom: 0;
`;

const StyledBox = styled.div`
  flex-grow: 1;
  display: flex;
  gap: 0.42vw;
  flex-wrap: wrap;
  margin-inline-end: auto;
  @media screen and (max-width: ${desktopBp}) {
    gap: 5px;
  }
`;

const StyledFilters = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  padding: 0 1.56vw;
  gap: 1.93vw 4.17vw;
  @media screen and (max-width: ${desktopBp}) {
    padding: 0 20px;
    gap: 24px 52px;
  }
`

const FiltersFooter = styled.div`
  display: flex;
  gap: 1.15vw;
  width: 100%;
  margin-top: 10px;
  padding: 0 1.56vw;
  @media screen and (max-width: ${desktopBp}) {
    gap: 14px;
    padding: 0 20px;
  }
`


const StyledFiltersBtn = styled(ToolbarButton) <{ opened: boolean }>`
  ${({ opened }) => opened && `
    path, rect {
      fill: #fff;
    }
  `}
`




const getKalmanFiltersStorageKey = (userId: number) => {
   return  `${STORAGE_SENTIMENTOR_FILTERS_KEY}-${userId}`
}


const SentimentorFilters = React.memo(() => {
  const { t } = useTranslation();
  const { userInfo } = useUserState();
  const keywords = useSelector(sentimentorKeywordsSelector);
  const filtersData = useSelector(sentimentorFiltersDataSelector)
  const appliedFilters = useSelector(sentimentorAppliedFiltersSelector)
  const openedTab = useSelector(sentimentorOpenedTabSelector)
  const permsissions = usePermissions("Ranking");
  const { post_types: postTypesPermissions } = usePermissions("Settings");
  const { institutions } = useSettingsState();
  const { onGetKeywords, onGetFilters, onApplyFilters, onSetTab } = useSentimentorActions();
  const { onGetInstitutions } = useSettingsActions();
  const [institutionsValue, setInsitutionsValue] = useState<string>("");
  const [keywordsValue, setKeywordsValue] = useState<string>("");
  const [langsValue, setLangsValue] = useState<string>("");
  const [networkValue, setNetworkValue] = useState<string>("");
  const [gropuingValue, setGroupingValue] = useState<string>("");
  const [dateFilter, setDateFilter] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const [defamatory, setDefamatory] = useState<boolean | null>(null)
  const [manual, setManual] = useState<boolean | null>(null)
  const [processed, setProcessed] = useState<boolean | null>(null)


  const is409Group = useMemo(() => {
    return userInfo?.group.id === 409
  }, [userInfo?.group.id])


  const institutionsOptions = useMemo(() => {
    return institutions.map((institution) => ({
      item: institution.inst_name,
      value: institution.inst_code,
    }));
  }, [institutions]);




  //Keywords of selected institutions
  const selectedInstitutionsKeywords = useMemo(() => {
    const instIds = institutionsValue
      .split(", ")
      .filter((id) => id) //remove ''
      .map((id) => Number(id));
    const keywords: any[] = [];
    institutions.forEach((i) => {
      if (instIds.includes(i.inst_code)) {
        keywords.push(...i.keywords);
      }
    });
    return keywords;
  }, [institutions, institutionsValue]);

  const keywordsOptions = useMemo(() => {
    //Return only selected institutions' keywords if there are selected institutions
    if (institutionsValue) {
      return selectedInstitutionsKeywords.map((k) => ({
        item: k.word,
        value: k.id,
      }));
    }
    //Return all keywords if there is no institution selected
    return keywords?.map((k) => ({ item: k.word, value: k.id })) || []
  }, [keywords, institutionsValue, selectedInstitutionsKeywords]);

  const showClearButton = useMemo(() => {
    let show = false
    if (appliedFilters.institution_ids) show = true
    if (appliedFilters.network) show = true
    if (appliedFilters.lang) show = true
    if (dateFilter[0] || dateFilter[1]) show = true
    if (typeof appliedFilters.defamatory === "boolean") show = true
    if (typeof appliedFilters.is_manual === "boolean") show = true
    if (typeof appliedFilters.is_processed === "boolean") show = true
    //current inputs
    if (institutionsValue) show = true
    if (keywordsValue) show = true
    if (langsValue) show = true
    if (networkValue) show = true
    if (gropuingValue) show = true
    if (dateFilter[0]) show = true
    if (dateFilter[1]) show = true
    if (typeof defamatory === "boolean") show = true
    if (typeof manual === "boolean") show = true
    if (typeof processed === "boolean") show = true
    return show
  }, [appliedFilters, dateFilter, manual, institutionsValue, keywordsValue, langsValue, gropuingValue, dateFilter, defamatory, processed, networkValue]);


  const filtersForApply: ISentimentorFilters = useMemo(() => {
    let date: any
    if(dateFilter[0] && dateFilter[1]) {
      date = `${getFormatDate(dateFilter[0])} - ${getFormatDate(dateFilter[1])}`
    }
    if(dateFilter[0] && !dateFilter[1]) {
      date = `${getFormatDate(dateFilter[0])} - `
    }
    if(!dateFilter[0] && dateFilter[1]) {
      date = ` - ${getFormatDate(dateFilter[1])}`
    }

    return {
      institution_ids: keywordsValue ? undefined : institutionsValue, //Do not apply institution_ids filter if there is keywords filter selected
      keyword_ids: keywordsValue,
      post_type: gropuingValue,
      date: date,
      defamatory: typeof defamatory === "boolean" ? defamatory : undefined,
      is_manual: typeof manual === "boolean" ? manual : undefined,
      lang: langsValue,
      network: networkValue,
      is_processed: typeof processed === "boolean" ? processed : undefined
    }
  }, [institutionsValue, keywordsValue, dateFilter, gropuingValue, manual, defamatory, processed, langsValue, networkValue])



  const handleApply = useCallback(() => {
    onApplyFilters(filtersForApply)
    if (is409Group) {
      localStorage.setItem(getKalmanFiltersStorageKey(userInfo?.id as number), JSON.stringify({ ...filtersForApply, institution_ids: institutionsValue }))
    }
  }, [filtersForApply, is409Group, institutionsValue, userInfo?.id]);

  const handleClear = useCallback(() => {
    onApplyFilters({})
    setInsitutionsValue("");
    setKeywordsValue("");
    setLangsValue("")
    setNetworkValue("")
    setDateFilter([null, null]);
    setGroupingValue("");
    setDefamatory(null)
    setManual(null)
    setProcessed(null)
    localStorage.removeItem(getKalmanFiltersStorageKey(userInfo?.id as number))
  }, [userInfo?.id]);

  useEffect(() => {
    onGetKeywords();
    onGetInstitutions();
  }, []);




  //Fill date inputs according to applied filters
  useEffect(() => {
    const formated: [Date | null, Date | null] = [null, null];
    const arr = appliedFilters.date?.split(" - ") || [null, null]
    if (arr[0]) {
      formated[0] = getDateFromStr(arr[0]);
    }
    if (arr[1]) {
      formated[1] = getDateFromStr(arr[1]);
    }
    setDateFilter(formated);
  }, [appliedFilters.date]);


  //Fill inputs according to applied filters
  useEffect(() => {
    if (appliedFilters.institution_ids) setInsitutionsValue(appliedFilters.institution_ids)
    if (appliedFilters.keyword_ids) setKeywordsValue(appliedFilters.keyword_ids)
    if (appliedFilters.post_type) setGroupingValue(appliedFilters.post_type)
    if (appliedFilters.defamatory) setDefamatory(appliedFilters.defamatory)
    if (appliedFilters.is_manual) setManual(appliedFilters.is_manual)
    if (appliedFilters.is_processed) setProcessed(appliedFilters.is_processed)
    if (appliedFilters.lang) setLangsValue(appliedFilters.lang)
    if (appliedFilters.network) setNetworkValue(appliedFilters.network)
  }, [appliedFilters])



  useEffect(() => {
    onGetFilters()
  }, [])


  const langFilterOptions = useMemo(() => {
    return filtersData.lang.map(l => ({ item: l, value: l }))
  }, [filtersData])


  const networkFilterOptions = useMemo(() => {
    return filtersData.network.map(l => ({ item: l, value: l }))
  }, [filtersData])




  //Save applied filters for Kalman in local storage
  useEffect(() => {
    const appliedFiltersInStorage = localStorage.getItem(getKalmanFiltersStorageKey(userInfo?.id as number))
    if (is409Group && appliedFiltersInStorage) {
      onSetTab("filters")
      onApplyFilters(JSON.parse(appliedFiltersInStorage))
    }
  }, [is409Group, userInfo?.id])


  return (
    <>
      <StyledBox>
        {permsissions.add_posts_manualy && <AddPostUserView />}
        <TrackedUsersView />
        {permsissions.post_history && <SuggestAIPostView opened={openedTab === "AIPost"} setOpened={(o) => onSetTab(o ? "AIPost" : null)} />}
        {permsissions.suggest_post && <AIPostsHistoryView opened={openedTab === "AIHistory"} setOpened={(o) => onSetTab(o ? "AIHistory" : null)} />}
        {permsissions.pdf && <ReportPdfView filters={filtersForApply} />}
        {permsissions.excel && <DefamatoryReportComponent filters={filtersForApply} />}
        {/* <PostsSummarizationComponent opened={openedTab === "summarization"} setOpened={(o) => onSetTab(o ? "summarization" : null)} /> */}
        <StyledFiltersBtn
          opened={openedTab === "filters"}
          onClick={() => onSetTab(openedTab === "filters" ? null : "filters")}
          data-action={activityList["defamatory-report"]}
        >
          <p>{t("ranking_filters-label")}</p>
          <SentimentorFiltersIcon />
        </StyledFiltersBtn>
      </StyledBox>
      {openedTab === "filters" && document.getElementById("toolbar-wrapper") && createPortal(<><StyledFilters>
        <DropdownBox>
          <LabelStyled>{t("ranking_filters-date")}</LabelStyled>
          <DateInputStyled
            label=""
            onChange={setDateFilter}
            startDate={dateFilter[0]}
            expirationDate={dateFilter[1]}
          />
        </DropdownBox>
        <DropdownBox>
          <LabelStyled>{t("ranking_filters-language")}</LabelStyled>
          <DropdownStyled
            label={t("ranking_filters-language")}
            value={langsValue}
            placeholder={t("ranking_filters-language")}
            onSelect={setLangsValue}
            options={langFilterOptions}
            isMultiSelect={true}
          />
        </DropdownBox>
        <DropdownBox>
          <LabelStyled>{t("ranking_filters-network")}</LabelStyled>
          <DropdownStyled
            label={t("ranking_filters-network")}
            value={networkValue}
            placeholder={t("ranking_filters-network")}
            onSelect={setNetworkValue}
            options={networkFilterOptions}
            isMultiSelect={true}
          />
        </DropdownBox>
        <>
          <DropdownBox>
            <LabelStyled>{userInfo?.group.id === 409 ? t("ranking_filters-insts(409)") : t("ranking_filters-insts")}</LabelStyled>
            <DropdownStyled
              label={userInfo?.group.id === 409 ? t("ranking_filters-insts(409)") : t("ranking_filters-insts")}
              value={institutionsValue}
              placeholder={userInfo?.group.id === 409 ? t("ranking_filters-insts(409)") : t("ranking_filters-insts")}
              onSelect={setInsitutionsValue}
              options={institutionsOptions}
              isMultiSelect={true}
            />
          </DropdownBox>
        </>
        {postTypesPermissions && (
          <GroupingFiltersComponent
            value={gropuingValue}
            onChange={setGroupingValue}
          />
        )}
        <DropdownBox>
          <LabelStyled>{t("ranking_filters-keywords")}</LabelStyled>
          <DropdownStyled
            label={t("ranking_filters-keywords")}
            value={keywordsValue}
            placeholder={t("ranking_filters-keywords")}
            onSelect={setKeywordsValue}
            options={keywordsOptions}
            isMultiSelect={true}
          />
        </DropdownBox>
      </StyledFilters>
        <FiltersFooter>
          <CheckboxContainer>
            <Checkbox label="" isActive={!!defamatory} onChange={setDefamatory} />
            <LabelStyled>{t("ranking_filters-defamatory")}</LabelStyled>
          </CheckboxContainer>
          <CheckboxContainer>
            <Checkbox label="" isActive={!!manual} onChange={setManual} />
            <LabelStyled>{t("ranking_filters-manual")}</LabelStyled>
          </CheckboxContainer>
          <CheckboxContainerMargin>
            <Checkbox label="" isActive={!!processed} onChange={setProcessed} />
            <LabelStyled>{t("ranking_filters-processed")}</LabelStyled>
          </CheckboxContainerMargin>
          {showClearButton && (
            <StyledBtn
              onClick={handleClear}
              data-action={activityList["rankings-filters-clear"]}
            >
              {t("ranking_filters-clear")}
            </StyledBtn>
          )}
          <StyledBtn
            onClick={handleApply}
            data-action={activityList["rankings-filters-apply"]}
          >
            {t("ranking_filters-apply")}
          </StyledBtn>
        </FiltersFooter>
      </>, document.getElementById("toolbar-wrapper") as HTMLDivElement)}
    </>
  );
});

export default SentimentorFilters;
