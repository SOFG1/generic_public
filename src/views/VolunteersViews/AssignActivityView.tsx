import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { Card } from "../../components/common/Card";
import { useTranslation } from "react-i18next";
import {
  useVolunteersActions,
  useVolunteersState,
} from "../../store/volunteers/hooks";
import { useMemo } from "react";
import { DropdownWithSearch } from "../../UI/Dropdown";
import { Button } from "../../UI/Button";
import { useUserState } from "../../store/user";
import { handle } from "../../api";
import { Volunteers } from "../../api/volunteers";
import { debounce } from "lodash";
import { useAppActions } from "../../store/app";
import MultiSelect from "../../UI/CreateableDropdown/MultiSelect";
import { desktopBp } from "../../styles/variables";
import { activityList } from "../../config/userActivityList";
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

const StyledBox = styled.div`
  display: flex;
  gap: 1.04vw;
  align-items: center;
  margin-top: 1.04vw;
  @media screen and (max-width: ${desktopBp}) {
    gap: 13px;
    margin-top: 13px;
  }
  @media screen and (max-width: 1000px) {
    flex-direction: column;
  }
`;

const StyledDropdown = styled(DropdownWithSearch)`

`;

const AssignActivityView = React.memo(() => {
  const { t } = useTranslation();
  const { token } = useUserState();
  const { staticData, isFetching } = useVolunteersState();
  const { onAssignActivity } = useVolunteersActions();
  const { onShowAlert } = useAppActions();
  const [selectedActivityId, setSelectedActivityId] = useState<number>(0);
  const [selectedAssignees, setSelectedAssignees] = useState<
    { label: string; value: string }[]
  >([]);

  const [assigneesOptions, setAssigneesOptions] = useState<
    { label: string; value: string; color: string }[]
  >([]);

  const activitiesOptions = useMemo(() => {
    return staticData.activity.map((a) => ({ item: a.name, value: a.id }));
  }, [staticData.activity]);

  const fetchAssigneesOptions = useCallback(
    async (option?: string) => {
      if (token && selectedActivityId) {
        const [dataRes, dataErr] = await handle(
          Volunteers.searchRows(token, selectedActivityId, option)
        );
        if (dataRes) {
          setAssigneesOptions(
            dataRes.map((person: any) => ({
              label: person.full_name,
              value: person.id,
              color: person.color,
            }))
          );
        }
        if (dataErr) {
          onShowAlert(false, dataErr.error);
        }
      }
    },
    [token, selectedActivityId]
  );

  useEffect(() => {
    fetchAssigneesOptions();
  }, [selectedActivityId]);

  const fetchOptionsDebounced = useCallback(
    debounce((option: string) => fetchAssigneesOptions(option), 500),
    [selectedActivityId]
  );

  const handleAssign = useCallback(() => {
    onAssignActivity(
      selectedActivityId,
      selectedAssignees.map((o) => o.value)
    );
  }, [selectedActivityId, selectedAssignees, onAssignActivity]);

  const isButtonDisabled = useMemo(() => {
    return selectedAssignees.length === 0 || !selectedActivityId || isFetching;
  }, [selectedAssignees, selectedActivityId, isFetching]);

  return (
    <Card>
      <Title>{t("volunteers-assign_title")}</Title>
      <StyledDropdown
        value={selectedActivityId}
        placeholder={t("volunteers_activity-label")}
        onSelect={setSelectedActivityId}
        label={t("volunteers_activity-label")}
        options={activitiesOptions}
      />
      <StyledBox>
        <StyledDropdown
          as={MultiSelect}
          value={selectedAssignees}
          isDisabled={!selectedActivityId}
          label={t('volunteers-assign_label')}
          placeholder={t("volunteers-assign_plhr")}
          onChange={setSelectedAssignees}
          options={assigneesOptions}
          onInputChange={(val: string) => fetchOptionsDebounced(val)}
        />
        <Button disabled={isButtonDisabled} onClick={handleAssign} data-action={activityList["volunteers-assign-task"]}>
          {t("volunteers_assign")}
        </Button>
      </StyledBox>
    </Card>
  );
});

export default withErrorBoundaryHOC(AssignActivityView);
