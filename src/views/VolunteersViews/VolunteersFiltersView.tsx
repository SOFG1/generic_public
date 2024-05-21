import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Card } from "../../components/common/Card";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { Multiselect } from "../../components/VolunteersComponents";
import {
  useVolunteersActions,
  useVolunteersState,
} from "../../store/volunteers/hooks";
import { Button } from "../../UI/Button";
import { debounce } from "lodash";
import { useUserState } from "../../store/user";
import { handle } from "../../api";
import { Volunteers } from "../../api/volunteers";
import { desktopBp } from "../../styles/variables";
import { activityList } from "../../config/userActivityList";
import { SingleInputDate } from "../../UI/Input";
import { getFormatDate } from "../../utils";
import { withErrorBoundaryHOC } from "../../utils/withErrorBoundaryHOC";

const Title = styled.p`
  width: 100%;
  font-weight: 500;
  font-size: 1.25vw;
  line-height: 1.51vw;
  margin: 0 0 1.04vw;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 16px;
    line-height: 19px;
    margin: 0 0 13px;
  }
`;

const FiltersBox = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: flex-start;
  gap: 1.04vw;
  margin-bottom: 1.04vw;
  @media screen and (max-width: ${desktopBp}) {
    gap: 13px;
    margin-bottom: 13px;
  }
  @media screen and (max-width: 440px) {
    flex-direction: column;
    align-items: center;
  }
`;

const StyledSelect = styled(Multiselect)`
  width: 10.42vw;
  @media screen and (max-width: ${desktopBp}) {
    width: 131px;
  }
`;

const ApplyButton = styled(Button)`
  margin-inline-start: auto;
  white-space: nowrap;
  @media screen and (max-width: 440px) {
    margin-inline-start: 0;
  }
`;

const VolunteersFiltersView = React.memo(() => {
  const { t } = useTranslation();
  const { token } = useUserState();
  const { staticData, appliedFilters, isFetching } = useVolunteersState();
  const { onApplyFilters, onClearFilters } = useVolunteersActions();
  const [filtersData, setFiltersData] = useState<{
    [key: string]: any;
  }>({});

  const [fetchedOptions, setFetchedOptions] = useState<{
    [key: string]: { value: string; label: string }[];
  }>({});

  const topicsOptions = useMemo(() => {
    return staticData.topics.map((t) => ({ value: t, label: t }));
  }, [staticData.topics]);

  const activitiesOptions = useMemo(() => {
    return staticData.activity.map((a) => ({
      value: String(a.id),
      label: a.name,
    }));
  }, [staticData.activity]);

  const appliedFiltersCount = useMemo(() => {
    return Object.keys(appliedFilters).length;
  }, [appliedFilters]);

  const isDisabledApply = useMemo(() => {
    return isFetching || Object.keys(filtersData).length === 0;
  }, [filtersData, isFetching]);

  const fetchOptions = useCallback(
    async (filter: string, option: string) => {
      if (token && option.length >= 2) {
        const [dataRes, dataErr] = await handle(
          Volunteers.getFiltersOptions(token, filter, option)
        );
        if (dataRes) {
          const options = dataRes.map((o: string) => ({ label: o, value: o }));
          setFetchedOptions((prev) => ({ ...prev, [filter]: options }));
        }
        if (dataErr) {
          console.log(dataErr);
        }
      }
    },
    [token]
  );

  const fetchOptionsDebounced = useCallback(
    debounce(
      (filterName: string, option: string) => fetchOptions(filterName, option),
      500
    ),
    [fetchOptions]
  );

  const handleApply = useCallback(() => {
    const data: { [key: string]: string } = {};
    Object.keys(filtersData).forEach(filter => {
      const filterValue = filtersData[filter];
      if(filter === "date" && filterValue) {
        data[filter] = getFormatDate(filterValue)
        return 
      }
      data[filter] = filterValue.map((f: any) => f.value).join(", ")
    })
    onApplyFilters(data);
  }, [filtersData]);

  const handleClearFilters = () => {
    onClearFilters();
    setFiltersData({});
  };

  useEffect(() => {
    return () => onClearFilters();
  }, []);

  return (
    <Card>
      <Title>{t("volunteers-filters_title")}</Title>
      <FiltersBox>
        <SingleInputDate  label={t("volunteers_date-filter")} startDate={filtersData.date} onChange={(val) =>
            setFiltersData((prev) => ({ ...prev, date: val }))
          } />
        <StyledSelect
          options={fetchedOptions?.person_name || []}
          label={t("volunteers_person-name-label")}
          placeholder={t("volunteers_person-name-plhr")}
          value={filtersData.person_name || []}
          onChange={(val) =>
            setFiltersData((prev) => ({ ...prev, person_name: val }))
          }
          onInputChange={(val) => fetchOptionsDebounced("person_name", val)}
        />

        <StyledSelect
          options={topicsOptions}
          label={t("volunteers_topic-label")}
          placeholder=""
          value={filtersData.topic || []}
          onChange={(val) =>
            setFiltersData((prev) => ({ ...prev, topic: val }))
          }
        />

        <StyledSelect
          options={activitiesOptions}
          label={t("volunteers_activity-label")}
          placeholder=""
          value={filtersData.activity_id || []}
          onChange={(val) =>
            setFiltersData((prev) => ({ ...prev, activity_id: val }))
          }
        />

        <StyledSelect
          options={fetchedOptions?.manager_name || []}
          label={t("volunteers_manager-name-label")}
          placeholder={t("volunteers_manager-name-plhr")}
          value={filtersData.manager_name || []}
          onChange={(val) =>
            setFiltersData((prev) => ({ ...prev, manager_name: val }))
          }
          onInputChange={(val) => fetchOptionsDebounced("manager_name", val)}
        />
        <ApplyButton
          data-action={activityList["volunteers-filters-apply"]}
          onClick={handleApply}
          disabled={isDisabledApply}
        >
          {t("volunteers_apply")}
        </ApplyButton>
      </FiltersBox>
      {appliedFiltersCount !== 0 && (
        <FiltersBox>
          <p>
            {appliedFiltersCount} {t("volunteers_applied")}
          </p>
          <Button
            data-action={activityList["volunteers-filters-clear"]}
            onClick={handleClearFilters}
          >
            {t("volunteers_clear")}
          </Button>
        </FiltersBox>
      )}
    </Card>
  );
});

export default withErrorBoundaryHOC(VolunteersFiltersView);
