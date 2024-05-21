import React, {memo, useCallback, useEffect, useMemo, useRef, useState} from "react";
import styled from "styled-components";
import {DropdownWithSearch} from "../../UI/Dropdown";
import {useTranslation} from "react-i18next";
import {useUserState} from "../../store/user";
import {useUsersState} from "../../store/users";
import {useCallCenterHistoryActions, useCallCenterHistoryState} from "../../store/callCenterHistory";
import {useUsersActions} from "../../store/users/hooks";
import {activityList} from "../../config/userActivityList";
import {InputDate} from "../../UI/Input";

const PerfomanceUserActivityReport = memo(()=>{
    const { t, i18n } = useTranslation();
    const { userInfo } = useUserState()
    const { users } = useUsersState();
    const { activityFilters } = useCallCenterHistoryState();
    const {
        onDownloadActivities,
    } = useCallCenterHistoryActions();
    const { onGetUsers, onGetDefaultPerms } = useUsersActions();
    const [action, setAction] = useState<string>("");
    const [page, setPage] = useState<string>("");
    const [selectedUsers, setSelectedUsers] = useState<string>("");
    const [dateFilter, setDateFilter] = useState<[Date | null, Date | null]>([
        null,
        null,
    ]);



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
        <Container>
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
        </Container>
    )
})



export default PerfomanceUserActivityReport;

const Container = styled.div`
`

const StyledInputDate = styled(InputDate)`
  flex-shrink: 0;
`;
