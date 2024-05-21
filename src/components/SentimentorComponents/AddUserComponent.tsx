import React, { useState, useCallback, useEffect } from "react"
import styled from "styled-components"
import { useTranslation } from "react-i18next"
import { desktopBp } from "../../styles/variables"
import { Input } from "../../UI/Input"
import { DropdownWithSearch } from "../../UI/Dropdown"
import { networkOptions } from "../../store/sentimentor"
import { Button } from "../../UI/Button"
import { activityList } from "../../config/userActivityList"
import { useUserState } from "../../store/user"
import { handle } from "../../api"
import { Sentimentor } from "../../api/sentimentor"
import { detectNetwork } from "../../utils/detectNetwork"
import { useAppActions } from "../../store/app"


const StyledTitle = styled.p`
    font-size: 1.67vw;
    margin: 0 0 2.50vw;
    @media screen and (max-width: ${desktopBp}) {
        font-size: 21px;
        margin: 0 0 31px;
    }
`

const StyledInput = styled(Input)`
    width: 33.85vw;
    max-width: 100%;
    @media screen and (max-width: ${desktopBp}) {
        width: 425px;
    }
`

const StyledDropdown = styled(DropdownWithSearch)`
    margin-bottom: 30px;
`

const StyledBtn = styled(Button)`
    width: 7.92vw;
    margin-inline-start: auto;
    border-radius: 100px;
    @media screen and (max-width: ${desktopBp}) {
        width: 99px;
    }
`


const AddUserComponent = React.memo(() => {
    const { t } = useTranslation()
    const { token } = useUserState()
    const { onShowAlert } = useAppActions()
    const [name, setName] = useState<string>("")
    const [link, setLink] = useState<string>("")
    const [network, setNetwork] = useState<string>("")
    const [isFetching, setIsFetching] = useState<boolean>(false)


    const handleAddUser = useCallback(async () => {
        if (token) {
            setIsFetching(true)
            const [dataRes, dataErr] = await handle(Sentimentor.addUserManually(token, { name, link, network }))
            setIsFetching(false)
            if (!dataErr) {
                onShowAlert(true, t("ranking_manual_user-success"))
            }
            if (dataErr) {
                onShowAlert(false, dataErr.error)
                console.log(dataErr)
            }
        }

    }, [token, name, link, network, t])


    //Detect network automatically
    useEffect(() => {
        const detected = detectNetwork(link)
        if (detected) setNetwork(detected)
    }, [link])


    return <>
        <StyledTitle>{t("ranking_manual_user-title")}</StyledTitle>
        <StyledInput type="text" name="url" label={t("ranking_manual_user-name")} value={name} onChange={setName} />
        <StyledInput type="text" name="url" label={t("ranking_manual_user-link")} value={link} onChange={setLink} />
        <StyledDropdown isReversed={true} label={t("ranking_manual_user-network")} placeholder={t("ranking_manual_user-network")} value={network} options={networkOptions} onSelect={setNetwork} />
        <StyledBtn data-action={activityList["monitoring-add-user"]} onClick={handleAddUser} disabled={isFetching}>{t("ranking_manual_user-btn")}</StyledBtn>
    </>
})

export default AddUserComponent