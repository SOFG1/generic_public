import { Card } from "../../components/common/Card";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import React, { useCallback, useEffect, useState } from "react";
import {
  useVolunteersActions,
  useVolunteersState,
} from "../../store/volunteers/hooks";
import { DropdownManual } from "../../UI/Dropdown";
import { Input, InputDate } from "../../UI/Input";
import { Button } from "../../UI/Button";
import { useUserState } from "../../store/user";
import { getFormatDate } from "../../utils";
import { debounce } from "lodash";
import { handle } from "../../api";
import { Volunteers } from "../../api/volunteers";
import { desktopBp } from "../../styles/variables";
import { useAppActions } from "../../store/app";
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

const StyledForm = styled.div`
  width: 100%;
  justify-content: flex-start;
  align-items: flex-end;
  display: flex;
  gap: 1.04vw;
  margin-bottom: 0.52vw;
  flex-wrap: wrap;
  @media screen and (max-width: ${desktopBp}) {
    gap: 13px;
    margin-bottom: 7px;
  }
  @media screen and (max-width: 800px) {
    flex-direction: column;
    align-items: center;
    gap: 5px;
  }
`;

const StyledDropdown = styled(DropdownManual)`
  max-width: 10.42vw;
  @media screen and (max-width: ${desktopBp}) {
    max-width: 131px;
  }
  @media screen and (max-width: 440px) {
    max-width: 100%;
  }
`;

const StyledInput = styled(Input)`
  width: 100px;
  flex-grow: 1;
`;

const StyledBtn = styled(Button)`
  margin-inline-start: auto;
  @media screen and (max-width: 800px) {
    margin-inline-start: 0;
  }
`;

const CreateActivityView = React.memo(() => {
  const { t } = useTranslation();
  const { token } = useUserState();
  const { staticData, isFetching } = useVolunteersState();
  const { onCreateActivity } = useVolunteersActions();
  const { onShowAlert } = useAppActions();

  const [createData, setCreateData] = useState({
    topic: "",
    activity_name: "",
    manager: "",
    description: "",
    start_date: null,
    end_date: null,
  });

  const [topicsOptions, setTopicsOptions] = useState<
    { item: string; value: string }[]
  >([]);
  const [activityOptions, setActivityOptions] = useState<
    { item: string; value: string }[]
  >([]);
  const [managerOptions, setManagerOptions] = useState<
    { item: string; value: string }[]
  >([]);

  useEffect(() => {
    setTopicsOptions(staticData.topics.map((o) => ({ value: o, item: o })));
    setActivityOptions(
      staticData.activity.map((o) => ({ value: o.name, item: o.name }))
    );
  }, [staticData]);

  const onCreate = useCallback(async () => {
    if (token) {
      const reqData: { [key: string]: string } = {
        topic: createData.topic,
        activity_name: createData.activity_name,
        description: createData.description,
        manager: createData.manager,
      };
      if (createData.start_date) {
        reqData.start_date = getFormatDate(createData.start_date);
      }
      if (createData.end_date) {
        reqData.end_date = getFormatDate(createData.end_date);
      }
      onCreateActivity(reqData);
    }
  }, [token, createData]);

  const onFetchOptions = useCallback(
    async (filterName: "manager_name" | "person_name", option: string) => {
      if (token && option.length >= 2) {
        const [dataRes, dataErr] = await handle(
          Volunteers.getFiltersOptions(token, filterName, option)
        );
        if (dataRes) {
          //Add options
          console.log(dataRes);
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
      (filterName: "manager_name" | "person_name", option: string) =>
        onFetchOptions(filterName, option),
      500
    ),
    []
  );

  const handleAddTopicsOption = useCallback(
    (option: string) => {
      option = option.trim();
      const alreadyExist = topicsOptions.some(
        (o) => o.item === option || o.value === option
      );
      if (alreadyExist) {
        onShowAlert(false, "This option is already exist");
      }
      if (!alreadyExist && option !== "") {
        setTopicsOptions((prev) => [...prev, { value: option, item: option }]);
      }
    },
    [topicsOptions]
  );

  const handleAddActivityOption = useCallback(
    (option: string) => {
      option = option.trim();
      const alreadyExist = activityOptions.some(
        (o) => o.item === option || o.value === option
      );
      if (alreadyExist) {
        onShowAlert(false, "This option is already exist");
      }
      if (!alreadyExist && option !== "") {
        setActivityOptions((prev) => [
          ...prev,
          { value: option, item: option },
        ]);
      }
    },
    [activityOptions]
  );

  const handleAddManagerOption = useCallback(
    (option: string) => {
      option = option.trim();
      const alreadyExist = managerOptions.some(
        (o) => o.item === option || o.value === option
      );
      if (alreadyExist) {
        onShowAlert(false, "This option is already exist");
      }
      if (!alreadyExist && option !== "") {
        setManagerOptions((prev) => [...prev, { value: option, item: option }]);
      }
    },
    [managerOptions]
  );

  return (
    <Card>
      <Title>{t("volunteers-create_title")}</Title>
      <StyledForm>
        <StyledDropdown
          value={createData.topic}
          placeholder={t("volunteers_topic-label")}
          onSelect={(v) => setCreateData((p) => ({ ...p, topic: v }))}
          onAddOption={handleAddTopicsOption}
          options={topicsOptions}
          label={t("volunteers_topic-label")}
        />
        <StyledDropdown
          value={createData.activity_name}
          placeholder={t("volunteers_activity-label")}
          onSelect={(v) => setCreateData((p) => ({ ...p, activity_name: v }))}
          onAddOption={handleAddActivityOption}
          options={activityOptions}
          label={t("volunteers_activity-name-label")}
        />
        <StyledDropdown
          value={createData.manager}
          onSearch={(v) => fetchOptionsDebounced("manager_name", v)}
          placeholder={t("volunteers_manager-label")}
          onSelect={(v) => setCreateData((p) => ({ ...p, manager: v }))}
          onAddOption={handleAddManagerOption}
          options={managerOptions}
          label={t("volunteers_manager-label")}
        />
        <InputDate
          label={t("volunteers_date-label")}
          placeholder={t("volunteers_date-label")}
          startDate={createData.start_date}
          expirationDate={createData.end_date}
          onChange={(v) =>
            setCreateData((p) => ({ ...p, start_date: v[0], end_date: v[1] }))
          }
        />
        <StyledBtn disabled={isFetching} onClick={onCreate} data-action={activityList["volunteers-craete-task"]}>
          {t("volunteers_create")}
        </StyledBtn>
        <StyledInput
          isTextarea={true}
          type="text"
          name="desc"
          label={t("volunteers_desc-label")}
          placeholder={t("volunteers_desc-label")}
          value={createData.description}
          onChange={(v) => setCreateData((p) => ({ ...p, description: v }))}
        />
      </StyledForm>
    </Card>
  );
});

export default withErrorBoundaryHOC(CreateActivityView);
