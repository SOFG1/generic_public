import React, { useCallback, useEffect, useMemo } from "react"
import { IVoterUser, useSettingsActions, useSettingsState } from "../../store/settings"
import { StyledTable, TableWrapper } from "../../UI/StyledTable"
import styled from "styled-components"
import { Checkbox } from "../../UI/Input"
import { useTranslation } from "react-i18next"
import { desktopBp } from "../../styles/variables"


const StyledWrapper = styled(TableWrapper)`
    margin-bottom: 2.60vw;
    @media screen and (max-width: ${desktopBp}) {
        margin-bottom: 33px;
    }
`
const StyledTR = styled.tr<{ mode: string }>`
cursor: pointer;
${({ mode }) => mode === "status_update" && "background-color: #D0EEFF;"}
${({ mode }) => mode === "questionarie" && "background-color: #E7C8FF;"}
${({ mode }) => mode === "eday_pledge" && "background-color: #D8EFDA;"}
${({ mode }) => mode === "eday_bingo" && "background-color: #FFD8C8;"}
&:last-child td {
        border-bottom: 0;
    }
`

const StyledTD = styled.td`
    text-transform: capitalize;
    padding: 6px !important;
    thead & {
        border-top: 0;
    }
    &:first-child {
        padding: 0;
        border-inline-start: 0;
    }
    &:last-child {
        padding: 0;
        border-inline-end: 0;
    }
`

const StyledCheckbox = styled(Checkbox)`
    justify-content: center;
`

const sortUsersByMode = (users: IVoterUser[]): IVoterUser[] => {
    let sorted = [...users]
    sorted = sorted.sort((c, p) => {
        let first = 1
        let second = 1
        if (c.mode === "questionarie") first = 2
        if (c.mode === "eday_bingo") first = 3
        if (c.mode === "eday_pledge") first = 4
        if (p.mode === "questionarie") second = 2
        if (p.mode === "eday_bingo") second = 3
        if (p.mode === "eday_pledge") second = 4
        return first - second
    })
    return sorted
}


interface IProps {
    selectedUsers: number[]
    onChange: (u: number[]) => void
}


const AppUsersComponent = React.memo(({ selectedUsers, onChange }: IProps) => {
    const { t } = useTranslation()
    const { voterUsers, voterQuests, audiences } = useSettingsState()
    const { onGetVoterUsers } = useSettingsActions()

    const selectedAll: boolean = useMemo(() => {
        return voterUsers.length === selectedUsers.length
    }, [voterUsers, selectedUsers])

    const handleSelectAll = useCallback(() => {
        const list = selectedAll ? [] : voterUsers.map(u => u.id)
        onChange(list)
    }, [voterUsers, selectedAll])

    const handleSelect = useCallback((id: number) => {
        const selected = selectedUsers.includes(id)
        if (selected) {
            onChange(selectedUsers.filter(i => i !== id))
        }
        if (!selected) {
            onChange([...selectedUsers, id])
        }
    }, [selectedUsers])



    useEffect(() => {
        onGetVoterUsers()
    }, [])


    return <StyledWrapper>
        <StyledTable>
            <thead>
                <tr>
                    <StyledTD as="th">
                        <StyledCheckbox label="" isActive={selectedAll} onChange={handleSelectAll} />
                    </StyledTD>
                    <StyledTD as="th">
                        {t("settings_app-assignments-first_name")}
                    </StyledTD>
                    <StyledTD as="th">
                        {t("settings_app-assignments-last_name")}
                    </StyledTD>
                    {Object.keys(voterUsers[0] || {}).map((key, index) => {
                        if (key === "first_name") return null
                        if (key === "last_name") return null
                        if (key === "email") return null
                        if (key === "id") return null
                        let formated = key.replaceAll("_", " ")
                        if (key === "questionarie_id") {
                            formated = t("settings_app-assignments_questionnaire")
                        }
                        if (key === "is_active") {
                            formated = t("settings_app-assignments_active")
                        }
                        if (key === "ballot_id") {
                            formated = t("settings_app-assignments_ballot")
                        }
                        if (key === "audience_id") {
                            formated = t("settings_app-assignments_audience")
                        }
                        return (
                            <StyledTD as="th" key={index}>
                                {formated}
                            </StyledTD>
                        );
                    })}
                </tr>
            </thead>
            <tbody>
                {sortUsersByMode(voterUsers).map((user) => {
                    return (
                        <StyledTR key={user.id} onClick={() => handleSelect(user.id)} mode={user.mode}>
                            <StyledTD>
                                <StyledCheckbox label="" isActive={selectedUsers.includes(user.id)} onChange={() => handleSelect(user.id)} />
                            </StyledTD>
                            <StyledTD>{user.first_name}</StyledTD>
                            <StyledTD>{user.last_name}</StyledTD>
                            {Object.keys(user).map((key: string) => {
                                let value = user[key as keyof typeof user]
                                if (key === "id") return null
                                if (key === "first_name") return null
                                if (key === "last_name") return null
                                if (key === "email") return null 
                                if (key === "questionarie_id") {
                                    const quest = voterQuests.find(q => q.id === value)
                                    value = quest?.name || "-"
                                }
                                if (key === "audience_id") {
                                    const audience = audiences.find(a => a.id === value)
                                    value = audience?.name || "-"
                                }
                                if (typeof value === "boolean") value = value ? "Yes" : "No"
                                if (value === null) value = "-"
                                if (typeof value === "string") value = value.replaceAll("_", " ")
                                return <StyledTD key={key}>{value}</StyledTD>
                            })}
                        </StyledTR>
                    );
                })}
            </tbody>
        </StyledTable>
    </StyledWrapper>
})

export default AppUsersComponent