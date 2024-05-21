import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { StyledIdTD } from "../../UI/StyledTable"
import styled from "styled-components";
import { useUserState } from "../../store/user";
import { ITableColumn, useRawDataActions, useRawDataState } from "../../store/rawData";
import {ChevronIcon, MoreIcon} from "../../UI/Svg";
import { IStatus } from "../../store/settings";
import { handle } from "../../api";
import { RawData } from "../../api/rawData";
import { Loader } from "../../UI/Spinners";
import { useAppActions } from "../../store/app";
import { activityList } from "../../config/userActivityList";
import { Modal } from "../../UI/Modal";
import { createPortal } from "react-dom";
import {useTranslation} from "react-i18next";




const OpenStatusBtn = styled.button`
    display: inline-flex;
    border: 0;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    cursor: pointer;
`

const StyledList = styled.div`

`

const StyledOption = styled.div<{ color: string }>`
    background-color: ${({ color }) => color};
    cursor: pointer;
    color: #000;
    text-align: start;
    border: 1px solid #000;
    border-inline-start: 0;
    border-top: 1px solid #000;
    padding: 9px 24px;
    &:hover {
        color: #fff;
    }
`

const StyledLoader = styled(Loader)`
    height: 20px;
    width: 20px;
    margin: 10px auto;
`

const StyledStatus = styled.div<{color?:string}>`
  display: flex;
  align-items: center;
  padding: 0 8px;
  border-radius: 28px;
  color:#000;
  width: 78px;
  height: 25px;
  justify-content: space-between;
  background: ${props => props.color || "#fff"};
`

const StyledText = styled.div`
    margin: 0 auto;
`

interface IProps {
    row: ITableColumn
}

const TableStatusComponent = React.memo(({ row }: IProps) => {
    const { token } = useUserState()
    const { statusCoors } = useUserState();
    const { statuses } = useRawDataState()
    const { onUpdateRowStatus, onGetStatuses } = useRawDataActions()
    const { onShowAlert } = useAppActions()
    const [opened, setOpened] = useState<boolean>(false)
    const [isFetching, setIsFetching] = useState<boolean>(false)
    const {t} = useTranslation();

    const statusOptions = useMemo(() => {
        return statuses?.filter(s => s.status !== row.status)
    }, [statuses, row.status])



    const handleSave = useCallback(async (status: string) => {
        if (token) {
            setIsFetching(true)
            const [dataRes, dataErr] = await handle(RawData.setRowStatus(token, row.id as string, status))
            setIsFetching(false)
            if (!dataErr) {
                onShowAlert(true, "Successfully changed")
                onUpdateRowStatus(row.id as string, status)
                setOpened(false)
            }
            if (dataErr) {
                onShowAlert(false, dataErr.error)
            }
        }
    }, [token, row.id])


    useEffect(() => {
        onGetStatuses()
    }, [])


    return <>
        {createPortal(
            <Modal show={opened} onClose={() => setOpened(false)}><StyledList>
                {isFetching && <StyledLoader />}
                {!isFetching && statusOptions?.map((s: IStatus) => {
                    return <StyledOption as="div" color={s.color} key={s.id} onClick={() => handleSave(s?.status as string)} data-action={activityList["table-row-change-status"]}>{s.status}</StyledOption>
                })}
                {(!isFetching && !statusOptions?.length) && (
                    <StyledText>{t("raw-data_status-no-permission")}</StyledText>
                )}
            </StyledList></Modal>,
            document.querySelector(".App") as Element
        )}

        <td>
            <StyledStatus
                color={
                    statusCoors?.find(
                        (s) => s.status === row.status
                    )?.color
                }
            >
                <OpenStatusBtn onClick={() => setOpened(p => !p)}>
                    <MoreIcon/>
                </OpenStatusBtn>
                <StyledText>{row.status}</StyledText>
            </StyledStatus>
        </td>
    </>
})

export default TableStatusComponent
