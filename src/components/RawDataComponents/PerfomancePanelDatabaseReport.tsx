import React, {memo, useCallback, useEffect, useMemo, useRef, useState} from "react";
import styled from "styled-components";
import {Input, InputDate} from "../../UI/Input";
import {Dropdown} from "../../UI/Dropdown";
import {useTranslation} from "react-i18next";
import {IHistoryState, useHistoryActions, useHistoryState} from "../../store/history";
import {usePermissions} from "../../store/user";
import {getFormatDate} from "../../utils";


export const DataBaseReportFiltersInitialState = {
    editors: "",
    edited_row: "",
    action: "",
    edit_at_start: null,
    edit_at_end: null,
    test_date: "",
}

interface IProps{
    filterParams:any
    setFilterParams: React.Dispatch<React.SetStateAction<any>>
}

const PerfomancePanelDatabaseReport = memo(({filterParams, setFilterParams}:IProps)=>{
    const { t } = useTranslation();

    const actionOptions = [
        { item: t("history_action-create"), value: "create" },
        { item: t("history_action-update"), value: "update" },
        { item: t("history_action-delete"), value: "delete" },
        { item: t("history_action-delete-mon"), value: "deleted_from_monitoring" },
    ];

    useEffect(()=>{
       setFilterParams(DataBaseReportFiltersInitialState)
    },[]);

    return (
        <Container>
            <Input
                value={filterParams.edited_row}
                type="text"
                label={t("history_row")}
                name="row"
                onChange={(value) =>
                    setFilterParams((prev:any) => ({ ...prev, edited_row: value }))
                }
                placeholder={t("history_row")}
            />
            <Input
                value={filterParams.editors}
                type="text"
                label={t("history_editors")}
                name="row"
                onChange={(value) =>
                    setFilterParams((prev:any) => ({ ...prev, editors: value }))
                }
                placeholder={t("history_editors")}
            />
            <StyledInputDate
                label={t("history_field-date_label")}
                startDate={filterParams.edit_at_start}
                expirationDate={filterParams.edit_at_end}
                onChange={(dates: Date[]) =>
                    setFilterParams((prev: any) => ({
                        ...prev,
                        edit_at_start: dates[0],
                        edit_at_end: dates[1],
                    }))
                }
            />
            <Dropdown
                value={filterParams.action}
                placeholder={t("history_action")}
                onSelect={(value: string) =>
                    setFilterParams((prev:any) => ({ ...prev, action: value }))
                }
                options={actionOptions}
                label={t("history_action")}
                isSmall={true}
                isMultiSelect={true}
            />
        </Container>
    )
})

export default PerfomancePanelDatabaseReport;


const Container = styled.div`
`
const StyledInputDate = styled(InputDate)`
  flex-shrink: 0;
`
