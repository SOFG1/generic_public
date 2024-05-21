import React, {useCallback, useEffect, useMemo, useState} from "react";
import {Button} from "../../UI/Button";
import {Text} from "../../components/common/Text";
import styled from "styled-components";
import {Card} from "../../components/common/Card";
import {useRawDataActions, useRawDataState} from "../../store/rawData";
import {useTranslation} from "react-i18next";
import {Arrow, ChevronIcon, RawDataSearchIcon} from "../../UI/Svg";
import {useAppActions,} from "../../store/app";
import {desktopBp} from "../../styles/variables";
import FilterInput from "../../components/common/FilterInput/FilterInput";
import {activityList} from "../../config/userActivityList";
import {AudienceComponent, CreateCampaignModal} from "../../components/RawDataComponents";
import {Dropdown, DropdownWithSearch} from "../../UI/Dropdown";
import {useUserState} from "../../store/user";
import {useSettingsState} from "../../store/settings";
import {withErrorBoundaryHOC} from "../../utils/withErrorBoundaryHOC";

const CardStyled = styled(Card) <{ isFetching?: boolean }>`
  margin-top: 0;
  ${(props) => props.isFetching && "cursor: wait;"};
  & * {
    cursor: ${(props) => props.isFetching && "wait"};
  }
  @media screen and (max-width: ${desktopBp}) {
    padding: 21px 21px 32px 23px;
  }
  @media screen and (max-width: 850px) {
    flex-direction: column;
    gap: 10px;
    padding-bottom: 10px;
    padding-top: 10px;
  }
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.73vw;
  margin-bottom: 2.81vw;
  @media screen and (max-width: ${desktopBp}) {
    margin-top: 9px;
    margin-bottom: 35px;
  }
`;

const CardTitle = styled(Text)`
  font-weight: 400;
  font-size: 1.67vw;
  line-height: 2.19vw;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 21px;
    line-height: 27px;
  }
`;


const FiltersContent = styled.div`
  max-width: 100%;
  display: flex;
  margin-bottom: 1.00vw;
  align-items: stretch;
  gap: 2.45vw;
  padding-inline-end: 0.78vw;
  & > div:first-child {
    flex-grow: 1;
    & .styled_dropdown_label{
      font-size: ${props => props.theme.fontSize.primary.vw};
      @media screen and (max-width: ${desktopBp}) {
        font-size: ${props => props.theme.fontSize.primary.px};
      }
    }
  }
  @media screen and (max-width: ${desktopBp}) {
    gap: 31px;
    margin-bottom: 13px;
  }
  @media screen and (max-width: 850px) {
    flex-direction: column;
    gap: 0;
  }
`;

const ActionsBlock = styled.div`
  display: flex;
  gap: 2.13vw;
  @media screen and (max-width: ${desktopBp}) {
    gap: 27px;
  }
  @media screen and (max-width: 850px) {
    flex-direction: column;
    gap: 10px;
    margin-bottom: 10px;
  }
`;


const KeywordsInputWrapper = styled.div`
position: relative;
width: 100%;
border-radius: 100px;
svg {
  position: absolute;
  width: 1.77vw;
  height: 1.77vw;
  inset-inline-end: 2.08vw;
  top: 50%;
  transform: translateY(-50%);
  @media screen and (max-width: ${desktopBp}) {
    width: 22px;
    height: 22px;
    inset-inline-end: 26px;
  }
}
`


const KeywordsInput = styled.input`
  width: 100%;
  height: 3.33vw;
  padding-left:1.67vw;
  border-radius: 5px;
  box-sizing: border-box;
  border:1px solid ${props => props.theme.color.lightGrey};

  font-size: ${props => props.theme.fontSize.primary.px};
  line-height: 1;
  outline: 0;
  &::placeholder{
    font-size: ${props => props.theme.fontSize.primary.vw};
    @media screen and (max-width: ${desktopBp}) {
      font-size: ${props => props.theme.fontSize.primary.px};
    }
  }
  @media screen and (max-width: ${desktopBp}) {
    height: 42px;
    font-size: ${props => props.theme.fontSize.primary.px};
  }
`;


const ButtonStyled = styled(Button)`
  text-align: center;
  font-weight: 500;
  border-radius: 5px;
  padding: 0;
  margin: 0;
  width: 8.13vw;
  height: 3.40vw;
  white-space: nowrap;
  font-size: ${props => props.theme.fontSize.primary.vw};
  border:1px solid ${props => props.theme.color.lightGrey};
  @media screen and (max-width: ${desktopBp}) {
    width: 102px;
    height: 43px;
    font-size: ${props => props.theme.fontSize.primary.px};
  }
  transition: background-color .2s ease-in-out, color .2s ease-in-out;
  &:not(:disabled):hover{
    background-color: ${props => props.theme.color.lightGrey};
    color: #000;
  }
`;

const ClearBtn = styled(ButtonStyled)`
  width: 5.73vw;
  @media screen and (max-width: ${desktopBp}) {
    width: 72px;
  }
`

const StyledAppliedFilters = styled.p`
  font-weight: 600;
  margin-inline-start: 1.98vw;
  margin-inline-end: 0.89vw;
  @media screen and (max-width: ${desktopBp}) {
    margin-inline-end: 11px;
    margin-inline-start: 25px;
  }
  @media screen and (max-width: 570px) {
    width: 100%;
    margin: 0;
    text-align: end;
  }
`;

const StyledToggleFilters = styled.div<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  border: 0;
  border-bottom: 1px solid #000;
  padding: 0;
  padding-bottom: 2px;
  background-color: transparent;
  font-weight: 700;
  font-size: ${props => props.theme.fontSize.primary.vw};
  line-height: 0.89vw;
  color: #000;
  transition: opacity 200ms linear,  transform 200ms linear;
  margin-inline-end: 0.89vw;
  margin-bottom: 1.04vw;
  cursor: pointer;
  &:hover {
    opacity: 0.65;
  }
  & svg {
    transform:${props => props.isOpen && "rotate(90deg)"};
    margin-inline-start: auto;
    transition: transform .2s ease-in-out;
    ${({ isOpen }) => isOpen && "transform: rotate(90deg);"}
  }
  @media screen and (max-width: ${desktopBp}) {
    font-size: ${props => props.theme.fontSize.primary.px};
    line-height: 11px;
    margin-inline-end: 11px;
    margin-bottom: 13px;
    & svg {
      width: 9px;
      height: 5px;
    }
  }
`;

const ExcludeDropdown = styled(DropdownWithSearch)`
  grid-column: span 3;
`

const StyledAdditionalFilters = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1vw;
  margin-inline-start: 2.34vw;
  padding-top: 0.36vw;
  padding-inline-end: 2.08vw;
  margin-bottom: 1.56vw;
  margin-top: 2.66vw;
  @media screen and (max-width: ${desktopBp}) {
    gap: 10px;
    margin-inline-start: 29px;
    padding-top: 33px;
    padding-inline-end: 26px;
    margin-bottom: 20px;
  }
`;

const ButtonsContainer =  styled.div`
  display: flex;
  gap: 0.53vw;
  align-items: center;
  
  @media(max-width: ${desktopBp}){
    gap: 7px;
  }
`

const AudienceFilterContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 2.13vw;
  @media screen and (max-width: ${desktopBp}) {
    gap: 27px;
  }
`


const FiltersView = React.memo(() => {
  const isRtl = document.body.dir === "rtl";
  const { t } = useTranslation();
  const { userInfo } = useUserState()
  const { filters, appliedFilters, filtersValues, isFetchingTable } = useRawDataState();
  const { audiences } = useSettingsState()
  const { onApplyFilters, onChangeFilters } = useRawDataActions();
  const { onShowAlert } = useAppActions();
  const [filtersOpened, setFiltersOpened] = useState<boolean>(false);

  const appliedFiltersQnt: number = useMemo(() => {
    return Object.keys(appliedFilters || {}).length;
  }, [appliedFilters]);



  const audienceOptions = useMemo(() => {
    return audiences.map(a => ({ item: a.name, value: a.id }))
  }, [audiences])




  const onChangeHandler = useCallback((key: string, value: any) => {
    if (key === "audience") {
      const filters: any = {audience: value}
      if(filtersValues?.exclude_audience) {
        filters.exclude_audience = filtersValues.exclude_audience
      }
      onChangeFilters(filters)
      return
    }
    if(key !== "audience") {
      const copy = { ...filtersValues }
      if(key !== "exclude_audience") delete copy.audience
      copy[key] = value
      onChangeFilters(copy)
    }
  }, [filtersValues]);

  const setNotNullHandler = useCallback(
    (slug: string) => {
      const arr: string[] = filtersValues?.not_null || []
      if (!arr?.includes(slug)) {
        onChangeHandler("not_null", [...arr, slug])
      }
      if (arr?.includes(slug)) {
        const filtered = arr.filter((s: string) => s !== slug)
        onChangeHandler("not_null", filtered)
      }
    },
    [filtersValues]
  );


  const onClear = useCallback(() => {
    onChangeFilters({});
    onApplyFilters();
  }, [appliedFiltersQnt]);

  const handleFilterClick = useCallback(
    (slug: string) => {
      //Show alert if user tries to select street and city is not selected
      if (slug === "street" && !filtersValues?.city) {
        onShowAlert(false, "You must select city at first");
      }
    },
    [filtersValues]
  );


  //Clear street if city is not selected
  useEffect(() => {
    if (!filtersValues?.city && filtersValues?.street) {
      onChangeHandler("street", "")
    }
  }, [filtersValues?.city, filtersValues?.street]);



  //Clear filters if there is a filter in local storage which was deleted or not actual
  useEffect(() => {
    Object.keys(appliedFilters || {}).forEach(k => {
      if (k === "keywords") return
      if (k === "audience") return
      if (k === "exclude_audience") return
      if (k === "not_null") return
      if (k === "order_by") return
      if (filters.every(f => f.slug !== k)) {
        onChangeFilters({});
        onApplyFilters();
        return
      }
    })
  }, [appliedFilters, filters])

  useEffect(() => {
    if (!userInfo?.group_connect) onChangeHandler("group_ids", "")
  }, [userInfo?.group_connect])


  useEffect(() => {
    if(!userInfo?.group_connect) onChangeHandler("group_ids", "")
  }, [userInfo?.group_connect]);

  return (
    <>
      {/*<CreateAudienceModal isOpen={audienceModal}  onClose={()=>setAudienceModal(false)}/>*/}
      <CardStyled isFetching={isFetchingTable}>
        <FiltersContent>
          <ActionsBlock>
            <AudienceFilterContainer>
              <KeywordsInputWrapper>
                <KeywordsInput type="text" value={filtersValues?.keywords || ""} placeholder={t("raw-data_input-placeholder")} onChange={(e) => onChangeHandler("keywords", e.target.value)} />
                <RawDataSearchIcon />
              </KeywordsInputWrapper>
              <ButtonsContainer>
                <ButtonStyled
                    data-action={activityList["filters-apply"]}
                    disabled={isFetchingTable}
                    onClick={onApplyFilters}
                >
                  {t("raw-data_filters-apply")}
                </ButtonStyled>
                <ClearBtn onClick={onClear} data-action={activityList["clear-filters"]}>
                  {t("raw-data_filters-clear")}
                </ClearBtn>
              </ButtonsContainer>
            </AudienceFilterContainer>
            <AudienceComponent audienceId={filtersValues?.audience || ""} onChange={(id) => onChangeHandler("audience", id)} />
          </ActionsBlock>
        </FiltersContent>
        {userInfo?.group_connect && (
          <FiltersContent>
            <Dropdown label={t("raw-data_filters-groups")} isMultiSelect={true} placeholder={t("raw-data_filters-groups")} value={filtersValues?.group_ids} onSelect={(v) => onChangeHandler("group_ids", v)} options={userInfo?.group_connect?.map(g => ({ item: String(g), value: g })) || []} />
          </FiltersContent>
        )}
        {appliedFiltersQnt !== 0 && (
          <>
            <StyledAppliedFilters>
              {t("raw-data_filters-count", { count: appliedFiltersQnt })}
            </StyledAppliedFilters>
          </>
        )}
        <StyledToggleFilters
          isOpen={filtersOpened}
          onClick={() => setFiltersOpened((prev) => !prev)}
        >
          {t("raw-data-filters-apply")}

          <Arrow />
        </StyledToggleFilters>
        {filtersOpened && (
          <StyledAdditionalFilters>
            <ExcludeDropdown
              label={t("raw-data_exclude_audience-label")}
              placeholder={t("raw-data_exclude_audience-label")}
              value={filtersValues?.exclude_audience?.replaceAll(",", ", ") || ""}
              onSelect={(v) => onChangeHandler("exclude_audience", v?.replaceAll(", ", ","))}
              options={audienceOptions}
              isMultiSelect={true}
            />
            {filters.map((filter_item, id) => {
              return (
                <FilterInput
                  onClick={() => handleFilterClick(filter_item.slug)}
                  toggleNotNull={() => setNotNullHandler(filter_item.slug)}
                  isNotNull={filtersValues?.not_null?.includes(filter_item.slug)}
                  filter={filter_item}
                  key={`FilterItem-${id}`}
                  dependentOption={
                    filter_item.parent !== null && filtersValues
                      ? String(filtersValues[filter_item.parent])
                      : null
                  }
                  isDisabled={
                    filter_item.default_disabled &&
                    filter_item.parent !== null &&
                    filtersValues &&
                    !filtersValues[filter_item.parent]
                  }
                  value={filtersValues && filtersValues[filter_item.slug] || ""}
                  realValue={(filtersValues && filtersValues[filter_item.slug])}
                  onChange={(val) => onChangeHandler(filter_item.slug, val)}
                />
              );
            })}
          </StyledAdditionalFilters>
        )}
      </CardStyled>
    </>
  );
});

export default withErrorBoundaryHOC(FiltersView);



