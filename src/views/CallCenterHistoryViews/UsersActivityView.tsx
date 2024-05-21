import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import { Button } from "../../UI/Button";
import { desktopBp } from "../../styles/variables";
import { useTranslation } from "react-i18next";
import { Input, InputDate } from "../../UI/Input";
import { DropdownWithSearch } from "../../UI/Dropdown";
import { useUsersActions, useUsersState } from "../../store/users/hooks";
import {
  IActivityFilters,
  useCallCenterHistoryActions,
  useCallCenterHistoryState,
} from "../../store/callCenterHistory";
import { Loader } from "../../UI/Spinners";
import { DownloadLink } from "../../components/common/DownloadLink";
import {
  StyledScrollBtn,
  StyledTable,
  StyledTableActions,
  TableWrapper,
} from "../../UI/StyledTable";
import { ChevronLeftIcon, ChevronRightIcon, SortIcon } from "../../UI/Svg";
import { Pagination } from "../../components/common/Pagination/Pagination";
import { activitiesCountPerPage } from "../../store/callCenterHistory/reducer";
import { activityList } from "../../config/userActivityList";
import { useUserState } from "../../store/user";
import { withErrorBoundaryHOC } from "../../utils/withErrorBoundaryHOC";

const defaultFilters: IActivityFilters = {
  page: "",
  action: "",
  selectedUsers: "",
  dateFilter: [null, null],
};


const ButtonsBox = styled.div`
  display: flex;
  gap: 0.63vw;
  width: 100%;
  @media screen and (max-width: ${desktopBp}) {
    gap: 8px;
  }
`

const StyledButton = styled(Button)`
  max-width: 13.02vw;
  @media screen and (max-width: ${desktopBp}) {
    max-width: 163px;
  }
`;

const Form = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-end;
  gap: 0.63vw 2.86vw;
  flex-wrap: wrap;
  margin-top: 2.92vw;
  margin-bottom: 40px;
  > div {
    width: 15.78vw;
  }
  @media screen and (max-width: ${desktopBp}) {
    gap: 8px 36px;
    margin-top: 37px;
    > div {
      width: 198px;
    }
  }
  @media screen and (max-width: 440px) {
    align-items: center;
    flex-direction: column;
  }
`;

const StyledInputDate = styled(InputDate)`
  flex-shrink: 0;
`;

const StyledLaoder = styled(Loader)`
  margin: 0.52vw auto;
  height: 5.21vw;
  width: 5.21vw;
  @media screen and (max-width: ${desktopBp}) {
    margin: 7px auto;
    height: 65px;
    width: 65px;
  }
`;

const StyledCount = styled.p`
  font-weight: 600;
  margin-inline-end: auto;
`;

const SortBtn = styled.button<{ reversed: boolean }>`
  padding: 0;
  height: 17px;
  margin-inline-start: 10px;
  background-color: transparent;
  border-radius: 0;
  border: 0;
  cursor: pointer;
  transition: opacity 200ms linear;
  ${({ reversed }) => reversed && "transform: rotate(180deg);"}
  &:hover {
    opacity: 0.6;
  }
  svg {
    height: 17px;
    width: 17px;
  } 
`;

const UsersActivityView = React.memo(() => {
  const { t, i18n } = useTranslation();
  const { userInfo } = useUserState()
  const { users } = useUsersState();
  const { activityFilters, activities } = useCallCenterHistoryState();
  const {
    onSetActivityFilters,
    onDownloadActivities,
    onSetActivitySorting,
    onSetActivityPage,
  } = useCallCenterHistoryActions();
  const { onGetUsers, onGetDefaultPerms } = useUsersActions();
  const isRtl = document.body.dir === "rtl";
  const TableWrapperRef = useRef<HTMLDivElement>(null);
  const [action, setAction] = useState<string>("");
  const [page, setPage] = useState<string>("");
  const [selectedUsers, setSelectedUsers] = useState<string>("");
  const [dateFilter, setDateFilter] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);

  const dataKeys = useMemo(() => {
    return activities.table[0] ? Object.keys(activities.table[0]) : [];
  }, [activities.table]);

  const showClear = useMemo(() => {
    if (activityFilters.action) return true;
    if (activityFilters.page) return true;
    if (activityFilters.selectedUsers) return true;
    if (activityFilters.dateFilter[0]) return true;
    if (activityFilters.dateFilter[1]) return true;
    return false;
  }, [activityFilters]);

  const pageOptions = useMemo(() => {
    const options = []
    if (userInfo?.permissions?.SM_stats.access) {
      options.push({ value: "stats", item: t("page-stats") })
    }
    if (userInfo?.permissions?.Raw_Data.access) {
      options.push({ value: "raw-data", item: t("page-raw-data") })
    } if (userInfo?.permissions?.Ranking.access) {
      options.push({ value: "monitoring", item: t("page-monitoring") })
    } if (userInfo?.permissions?.CallCenter.access) {
      options.push({ value: "distribution", item: t("page-distribution") })
    } if (userInfo?.permissions?.CallCenterHistory.access) {
      options.push({ value: "distribution-history", item: t("page-distribution-history") })
    } if (userInfo?.permissions?.ElectionDay.access) {
      options.push({ value: "election", item: t("page-election") })
    } if (userInfo?.permissions?.Volunteer.access) {
      options.push({ value: "volunteers", item: t("page-volunteers") })
    } if (userInfo?.permissions?.opponnents.access) {
      options.push({ value: "opponents", item: t("page-opponents") })
    } if (userInfo?.permissions?.Users.access) {
      options.push({ value: "user", item: t("page-user") })
    } if (userInfo?.permissions?.Settings.access) {
      options.push({ value: "settings", item: t("page-settings") })
    } if (userInfo?.permissions?.connections.access) {
      options.push({ value: "relations", item: t("page-relations") })
    }
    return options
  }, [t, userInfo?.permissions]);

  const handleClear = useCallback(() => {
    setAction("");
    setPage("");
    setSelectedUsers("");
    setDateFilter([null, null]);
    onSetActivityFilters(defaultFilters);
  }, [defaultFilters]);

  const handleApply = useCallback(() => {
    const filters = {
      page,
      action,
      selectedUsers,
      dateFilter,
    };
    onSetActivityFilters(filters);
  }, [page, action, selectedUsers, dateFilter]);

  const handleSetSorting = useCallback(
    (column: string) => {
      const order =
        activities.sorting === `${column} ASC`
          ? `${column} DESC`
          : `${column} ASC`;
      onSetActivitySorting(order);
      handleApply();
    },
    [handleApply, activities.sorting, activities]
  );

  const handleScrollTable = useCallback(
    (dir: "left" | "right") => {
      let scrollValue = dir === "right" ? 300 : -300;
      TableWrapperRef?.current?.scrollBy(scrollValue, 0);
    },
    [TableWrapperRef]
  );

  useEffect(() => {
    onGetUsers();
    onGetDefaultPerms()
  }, [i18n.language]);

  useEffect(() => {
    setPage(activityFilters.page);
    setAction(activityFilters.action);
    setSelectedUsers(activityFilters.selectedUsers);
    setDateFilter(activityFilters.dateFilter);
  }, [activityFilters]);

  const usersOptions = useMemo(() => {
    return users.map((u) => ({ item: u.login, value: u.id }));
  }, [users]);

  const activitiesOptions = useMemo(() => {
    return Object.keys(activityList).map(k => ({ item: t(`activity-${k}`), value: k }))
  }, [activityList, t])



  return (
    <>
      <Form>
        <DropdownWithSearch
          value={page}
          placeholder={t("history_activity-page")}
          onSelect={setPage}
          options={pageOptions}
          label={t("history_activity-page")}
          isSmall={true}
        />
        <DropdownWithSearch
          value={selectedUsers}
          placeholder={t("history_activity-users")}
          onSelect={setSelectedUsers}
          options={usersOptions}
          label={t("history_activity-users")}
          isSmall={true}
          isMultiSelect={true}
        />
        <DropdownWithSearch
          value={action}
          placeholder={t("history_activity-action")}
          onSelect={setAction}
          options={activitiesOptions}
          label={t("history_activity-action")}
          isSmall={true}
          isMultiSelect={true}
        />
        <StyledInputDate
          label={t("history_activity-date")}
          startDate={dateFilter[0]}
          expirationDate={dateFilter[1]}
          onChange={setDateFilter}
        />
      </Form>


      <ButtonsBox>
        <StyledCount>{`Total items for this filter: ${activities.count}`}</StyledCount>
        {showClear && (
          <StyledButton
            onClick={handleClear}
            data-action={activityList["reports-activity-clear"]}
          >
            {t("history_activity-clear")}
          </StyledButton>
        )}
        <StyledButton
          onClick={handleApply}
          data-action={activityList["reports-activity-apply"]}
        >
          {t("history_activity-apply")}
        </StyledButton>
      </ButtonsBox>


      {activities.isFetching && <StyledLaoder />}
      {!activities.isFetching && (
        <>
          {!!activities.table.length && (
            <DownloadLink
              handleClick={onDownloadActivities}
              action={activityList["reports-activity-download"]}
            >
              Download
            </DownloadLink>
          )}
        </>
      )}

      {!activities.isFetching && activities.count > 0 && (
        <>
          <TableWrapper ref={TableWrapperRef}>
            <StyledTable>
              <thead>
                <tr>
                  {dataKeys.map((key, index) => {
                    return (
                      <th key={index}>
                        {key}
                        <SortBtn
                          data-action={activityList["reports-activity-sort"]}
                          onClick={() => handleSetSorting(key)}
                          reversed={activities.sorting === `${key} DESC`}
                        >
                          <SortIcon />
                        </SortBtn>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {activities.table.map((item, index) => {
                  return (
                    <tr key={index}>
                      {dataKeys.map((k, i) => {
                        if (k === "page") {
                          return <td key={i}>{t(`page-${item[k]}`)}</td>;
                        }
                        return (
                          <td
                            key={i}
                            dangerouslySetInnerHTML={{ __html: item[k] }}
                          />
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </StyledTable>
          </TableWrapper>
          <StyledTableActions>
            <StyledScrollBtn
              data-action={activityList["reports-activity-scroll"]}
              onClick={() => handleScrollTable(isRtl ? "right" : "left")}
            >
              {isRtl ? (
                <ChevronRightIcon height="16px" />
              ) : (
                <ChevronLeftIcon height="16px" />
              )}
            </StyledScrollBtn>

            <Pagination
              currentPage={activities.currentPage}
              count={activities.count}
              limit={activitiesCountPerPage}
              onSelectPage={(page) => onSetActivityPage(page)}
            />

            <StyledScrollBtn
              data-action={activityList["reports-activity-scroll"]}
              onClick={() => handleScrollTable(isRtl ? "left" : "right")}
            >
              {isRtl ? (
                <ChevronLeftIcon height="16px" />
              ) : (
                <ChevronRightIcon height="16px" />
              )}
            </StyledScrollBtn>
          </StyledTableActions>
        </>
      )}
    </>
  );
});

export default withErrorBoundaryHOC(UsersActivityView);
