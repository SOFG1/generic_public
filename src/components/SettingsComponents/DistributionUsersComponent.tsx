import React, { useMemo, useCallback, useEffect } from "react"
import { useSettingsActions, useSettingsState } from "../../store/settings"
import styled from "styled-components"
import { StyledTable, TableWrapper } from "../../UI/StyledTable"
import { desktopBp } from "../../styles/variables"
import { Checkbox } from "../../UI/Input"
import { useTranslation } from "react-i18next"


const StyledWrapper = styled(TableWrapper)`
    margin-bottom: 2.60vw;
    @media screen and (max-width: ${desktopBp}) {
        margin-bottom: 33px;
    }
`
const StyledTR = styled.tr`
cursor: pointer;
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



interface IProps {
    selectedUsers: number[]
    onChange: (u: number[]) => void
}

const DistributionUsersComponent = React.memo(({ selectedUsers, onChange }: IProps) => {
    const { t } = useTranslation()
    const { distributionUsers } = useSettingsState()
    const { onGetDistributionUsers } = useSettingsActions();


    const selectedAll: boolean = useMemo(() => {
        return distributionUsers.length === selectedUsers.length
    }, [distributionUsers, selectedUsers])


    const handleSelectAll = useCallback(() => {
        const list = selectedAll ? [] : distributionUsers.map(u => u.id)
        onChange(list)
    }, [distributionUsers, selectedAll])

    
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
        onGetDistributionUsers()
    }, [])

    return <StyledWrapper>
        <StyledTable>
            <thead>
                <tr>
                    <StyledTD as="th">
                        <StyledCheckbox label="" isActive={selectedAll} onChange={handleSelectAll} />
                    </StyledTD>
                    <StyledTD as="th">
                        {t("settings_dist-assignments-login")}
                    </StyledTD>
                    <StyledTD as="th">
                        {t("settings_dist-assignments-audience")}
                    </StyledTD>
                    <StyledTD as="th">
                        {t("settings_dist-assignments-questionnaire")}
                    </StyledTD>
                </tr>
            </thead>
            <tbody>
                {distributionUsers.map((user) => {
                    return (
                        <StyledTR key={user.id} onClick={() => handleSelect(user.id)}>
                            <StyledTD>
                                <StyledCheckbox label="" isActive={selectedUsers.includes(user.id)} onChange={() => handleSelect(user.id)} />
                            </StyledTD>
                            <StyledTD>{user.login}</StyledTD>
                            <StyledTD>{user.audience_name}</StyledTD>
                            <StyledTD>{user.questionarie_name}</StyledTD>
                        </StyledTR>
                    );
                })}
            </tbody>
        </StyledTable>
    </StyledWrapper>
})

export default DistributionUsersComponent