import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { desktopBp } from "../../styles/variables";
import { useRawDataActions, useRawDataState } from "../../store/rawData";
import FilterInput from "../../components/common/FilterInput/FilterInput";
import { useAppActions } from "../../store/app";
import { InputValueType } from "../../types";
import { useSettingsActions, useSettingsState } from "../../store/settings";
import { DropdownWithSearch } from "../../UI/Dropdown";
import { Button } from "../../UI/Button";
import { convertFiltersData } from "../../utils/convertFiltersData";
import { useUserState } from "../../store/user";
import { handle } from "../../api";
import { Settings } from "../../api/settings";
import { debounce } from "lodash";
import { numberWithCommas } from "../../utils/numberWidthCommas";
import { ConfirmDeleteFull } from "../../components/common/ConfirmDeleteFull";
import { activityList } from "../../config/userActivityList";
import { SettingsSmallTabComponent } from "../../components/SettingsComponents";

const StyledWrapper = styled.div<{ isOpened: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-inline-start: 1.77vw;
  margin-inline-end: 2.14vw;
  border-bottom: 1px solid #aaaaaa;
  padding-bottom: 0.57vw;
  margin-bottom: 1.77vw;
  svg path {
    stroke: #000;
  }
  svg {
    width: 1.56vw;
    ${({ isOpened }) => isOpened && "transform: rotate(90deg);"}
  }
  //Not selectable
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently */
  cursor: pointer;
  @media screen and (max-width: ${desktopBp}) {
    margin-inline-start: 22px;
    margin-inline-end: 27px;
    padding-bottom: 7px;
    margin-bottom: 22px;
    svg {
      width: 20px;
    }
  }
  @media screen and (max-width: 900px) {
    margin-inline-start: 0;
    margin-inline-end: 0;
  }
`;

const StyledContent = styled.div`
  margin-inline-start: 1.77vw;
  margin-inline-end: 2.14vw;
  padding-inline-start: 0.68vw;
  padding-inline-end: 1.25vw;
  padding-top: 0.47vw;
  margin-bottom: 5vw;
  @media screen and (max-width: ${desktopBp}) {
    margin-inline-start: 22px;
    margin-inline-end: 27px;
    padding-inline-start: 8px;
    padding-inline-end: 16px;
    padding-top: 6px;
    margin-bottom: 63px;
  }
  @media screen and (max-width: 1000px) {
    flex-direction: column;
  }
`;

const StyledTitle = styled.p`
  font-size: 1.67vw;
  line-height: 2.19vw;
  font-weight: 400;
  margin: 0;
  @media screen and (max-width: ${desktopBp}) {
    font-size: 21px;
    line-height: 27px;
  }
`;

const Filters = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  align-content: flex-start;
  justify-content: flex-start;
  margin: 15px 0;

  & > div {
    margin-right: 1.04vw;
    width: 20.31vw;
    margin-bottom: 0.52vw;
    @media screen and (max-width: ${desktopBp}) {
      margin-right: 13px;
      width: 255px;
      margin-bottom: 7px;
    }
  }
`;

const StyledDropdown = styled(DropdownWithSearch)`
  margin-bottom: 2.6vw;
  @media screen and (max-width: ${desktopBp}) {
    margin-bottom: 33px;
  }
`;


const StyledTotal = styled.p`
  font-weight: 500;
  margin-inline-start: 1.56vw;
  font-size: 1.15vw;
  span {
    color: #FE5912;
  }
  @media screen and (max-width: ${desktopBp}) {
    margin-inline-start: 20px;
    font-size: 14px;
  }
`;

const ButtonBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.52vw;
  @media screen and (max-width: ${desktopBp}) {
    gap: 7px;
  }
`;

const StyledBtn = styled(Button)`
  height: 4.58vw;
  font-size: 0.94vw;
  width: fit-content;
  min-width: 10.52vw;
  @media screen and (max-width: ${desktopBp}) {
    height: 58px;
    font-size: 12px;
    min-width: 132px;
  }
`;


const InjectToAppView = React.memo(() => {
  const { t } = useTranslation();
  const { token } = useUserState();
  const { filters } = useRawDataState();
  const { voterUsers } = useSettingsState();
  const { onGetVoterUsers } = useSettingsActions();
  const { getFilters } = useRawDataActions();
  const { onShowAlert } = useAppActions();
  const [selectedUsers, setSelectedUsers] = useState<string>("");
  const [data, setData] = useState<{ [key: string]: any }>({});
  const [notNullFilters, setNotNullFilters] = useState<string[]>([]);
  const [usersCount, setUsersCount] = useState<number>(0);
  const [injectConfirm, setInjectConfirm] = useState<boolean>(false);
  const [clearConfirm, setClearConfirm] = useState<boolean>(false);

  const handleInject = useCallback(async () => {
    const usersIds = selectedUsers.split(", ").map((id) => Number(id));
    let newData: any = convertFiltersData(data);
    if (notNullFilters.length) newData.not_null = notNullFilters;
    if (token) {
      const [dataRes, dataErr] = await handle(
        Settings.injectVoterUsers(token, usersIds, newData)
      );
      if (!dataErr) {
        onShowAlert(true, t("settings_call-center-inject_m"));
      }
      if (dataErr) {
        onShowAlert(false, dataErr?.error);
      }
    }
  }, [token, selectedUsers, data, notNullFilters]);

  const handleClear = useCallback(async () => {
    const usersIds = selectedUsers.split(", ").map((id) => Number(id));
    if (token) {
      const [dataRes, dataErr] = await handle(
        Settings.clearVoterUsers(token, usersIds)
      );
      if (!dataErr) {
        onShowAlert(true, t("settings_call-center-clear_m"));
      }
      if (dataErr) {
        onShowAlert(false, dataErr?.error);
      }
    }
  }, [token, selectedUsers]);

  const handleFilterClick = useCallback(
    (slug: string) => {
      //Show alert if user tries to select street and city is not selected
      if (slug === "street" && !data.city) {
        onShowAlert(false, "You must select city at first");
      }
    },
    [data]
  );

  const handleSetNotNull = useCallback(
    (slug: string) => {
      if (!notNullFilters.includes(slug)) {
        setNotNullFilters((p) => [...p, slug]);
      }
      if (notNullFilters.includes(slug)) {
        const copy = [...notNullFilters];
        const index = notNullFilters.indexOf(slug);
        copy.splice(index, 1);
        setNotNullFilters(copy);
      }
    },
    [notNullFilters]
  );

  const getFiltersCount = useCallback(
    async (data: any, notNullFilters: any) => {
      let newData = convertFiltersData(data);
      if (notNullFilters.length) newData.not_null = notNullFilters;
      if (token) {
        const [dataRes, dataErr] = await handle(
          Settings.getInjectedCount(token, newData)
        );
        if (dataRes !== undefined) {
          setUsersCount(dataRes);
        }
        if (dataErr) {
          console.log(dataErr);
        }
      }
    },
    [token]
  );

  const getCountDebounced = useCallback(
    debounce(
      (data, notNullFilters) => getFiltersCount(data, notNullFilters),
      1000
    ),
    []
  );

  useEffect(() => {
    getCountDebounced(data, notNullFilters);
  }, [data, notNullFilters, getCountDebounced]);

  const emptyData = useMemo(() => {
    const empty_data: { [key: string]: InputValueType } = {};
    for (const item of filters) {
      let val: any = "";
      if (item.type === "timestamp") val = [null, null];
      empty_data[item.slug] = val;
    }
    return empty_data;
  }, [filters]);

  useEffect(() => {
    setData(emptyData);
  }, [emptyData]);

  //Clear street if city is not selected
  useEffect(() => {
    if (!data.city) {
      setData((p) => ({ ...p, street: "" }));
    }
  }, [data.city]);

  useEffect(() => {
    onGetVoterUsers();
    getFilters();
  }, []);

  const selectedUsersCount = useMemo(() => {
    return selectedUsers.split(", ").filter((u) => u).length;
  }, [selectedUsers]);

  const usersOptions = useMemo(() => {
    return voterUsers.map((u) => ({
      item: `${u.first_name} ${u.last_name}, ${u.login}`,
      value: u.id,
    }));
  }, [voterUsers]);

  return (
    <>
      <ConfirmDeleteFull
        title={t("settings_call-center-inject", { count: usersCount })}
        show={injectConfirm}
        onClose={() => setInjectConfirm(false)}
        onDelete={handleInject}
      />
      <ConfirmDeleteFull
        title={t("settings_call-center-clear-m", { count: selectedUsersCount })}
        show={clearConfirm}
        onClose={() => setClearConfirm(false)}
        onDelete={handleClear}
      />
      <SettingsSmallTabComponent title={t("settings_call-center-app")} activity={activityList["open-inject-users-app"]}>
        <StyledDropdown
          label={t("settings_call-center-voters")}
          placeholder={t("settings_call-center-voters")}
          options={usersOptions}
          value={selectedUsers}
          isMultiSelect={true}
          onSelect={setSelectedUsers}
        />
        <StyledTotal>
          {t("settings_call-center-total")}
          <span>{numberWithCommas(usersCount)}</span>
        </StyledTotal>
        <Filters>
          {filters.map((filter_item, id) => {
            return (
              <FilterInput
                onClick={() => handleFilterClick(filter_item.slug)}
                filter={filter_item}
                key={`FilterItem-${id}`}
                dependentOption={
                  filter_item.parent !== null
                    ? String(data[filter_item.parent])
                    : null
                }
                isDisabled={
                  filter_item.default_disabled &&
                  filter_item.parent !== null &&
                  !data[filter_item.parent]
                }
                value={data[filter_item.slug] || ""}
                onChange={(v) =>
                  setData((p) => ({ ...p, [filter_item.slug]: v }))
                }
                isNotNull={notNullFilters.includes(filter_item.slug)}
                toggleNotNull={() => handleSetNotNull(filter_item.slug)}
              />
            );
          })}
        </Filters>
        <ButtonBox>
          <StyledBtn
            data-action={activityList["inject-users-app"]}
            disabled={!selectedUsers}
            onClick={() => setInjectConfirm(true)}
          >
            {t("settings_call-center-btn")}
          </StyledBtn>
          <StyledBtn
            data-action={activityList["clear-injected-users"]}
            disabled={!selectedUsers}
            onClick={() => setClearConfirm(true)}
          >
            {t("settings_call-center-clear")}
          </StyledBtn>
        </ButtonBox>
      </SettingsSmallTabComponent>
    </>
  );
});

export default InjectToAppView;
