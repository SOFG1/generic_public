import React, { useState, useCallback, useEffect, useMemo } from "react"
import styled from "styled-components"
import { useTranslation } from "react-i18next"
import { ToolbarButton } from "../../UI/ToolbarButton"
import { DeleteUserIcon, TrackedUsersIcon, TrackerFacebookIcon, TrackerInstagramIcon, TrackerTelegramIcon, TrackerTiktokIcon, TrackerTwitterIcon, TrackerYoutubeIcon } from "../../UI/Svg"
import { Modal } from "../../UI/Modal"
import { desktopBp } from "../../styles/variables"
import { useUserState } from "../../store/user"
import { handle } from "../../api"
import { Sentimentor } from "../../api/sentimentor"
import { Loader } from "../../UI/Spinners"
import { useAppActions } from "../../store/app"
import { Input } from "../../UI/Input"
import { escapeRegExp } from "../../utils"


const StyledTitle = styled.p`
    font-size: 1.67vw;
    margin: 0 0 2.50vw;
    @media screen and (max-width: ${desktopBp}) {
        font-size: 21px;
        margin: 0 0 31px;
    }
`


const StyledInput = styled(Input)`
    margin-bottom: 25px;
`

const StyledLoader = styled(Loader)`
    height: 100px;
    width: 100px;
`

const StyledTable = styled.table`
    min-width: 690px;
    min-height: 300px;
    border-collapse: separate;
    max-width: 100%;
    font-size: 12px;
    th {
        font-weight: 400;
        padding: 0 46px;
        border-inline-end: 1px solid #000;
    }
    th:last-child {
        border: 0;
    }
    tr {
        height: 53px;
        outline: 1px solid #000;
    }
    td {
        padding: 0 17px;
    }
`

const ClickableTR = styled.tr`
    cursor: pointer;
`

const SmTD = styled.td`
    text-align: center;
`

const StyledBox = styled.div`
    display: flex;
    align-items: center;
`

const StyledNumber = styled.span`
    margin-inline-end: 25px;
`

const StyledLink = styled.a`
        position: relative;
        display: inline-block;
        max-width: 310px;
        width: 310px;
        white-space: nowrap;
        overflow: hidden;
        margin-inline-end: 10px;
        color: #000;
        text-decoration: 0;
        &::after {
            content: "";
            position: absolute;
            top: 0;
            bottom: 0;
            inset-inline-end: 0;
            width: 120px;
            background: linear-gradient(to left, #fff, rgba(255, 255, 255, 0));
        }
`


const DeleteBtn = styled.button`
    padding: 0;
    cursor: pointer;
    border: 0;
    background-color: transparent;
`


const smIcons = {
    twitter: <TrackerTwitterIcon />,
    facebook: <TrackerFacebookIcon />,
    tiktok: <TrackerTiktokIcon />,
    youtube: <TrackerYoutubeIcon />,
    telegram: <TrackerTelegramIcon />,
    instagram: <TrackerInstagramIcon />,
}

interface IUser {
    id: number
    name: string
    link: string
    network: string
}


const TrackedUsersView = React.memo(() => {
    const { t } = useTranslation()
    const { token } = useUserState()
    const { onShowAlert } = useAppActions()
    const [opened, setOpened] = useState<boolean>(false)
    const [searchQuery, setSearchQuery] = useState<string>("")
    const [isFetching, setIsFetching] = useState<boolean>(false)
    const [data, setData] = useState<IUser[]>([])



    const filteredData = useMemo(() => {
        const regexp = new RegExp(escapeRegExp(searchQuery), "i")
        return data.filter(u => u.name.match(regexp))
    }, [data, searchQuery])

    const handleFetchUsers = useCallback(async () => {
        if (token) {
            setIsFetching(true)
            const [dataRes, dataErr] = await handle(Sentimentor.getManualUsers(token))
            setIsFetching(false)
            if (dataRes) {
                setData(dataRes)
            }
            if (dataErr) {
                console.log(dataErr)
            }
        }
    }, [token])


    const handleDeleteUser = useCallback(async (id: number, e: React.MouseEvent) => {
        e.stopPropagation() //Prevent link opening
        if (token) {
            setIsFetching(true)
            const [dataRes, dataErr] = await handle(Sentimentor.deleteManualUser(token, id))
            setIsFetching(false)
            if (!dataErr) {
                setData(p => p.filter(u => u.id !== id))
                onShowAlert(true, t("ranking_tracked_users-del"))
            }
            if (dataErr) {
                onShowAlert(false, dataErr.error)
                console.log(dataErr)
            }
        }
    }, [token, t])



    useEffect(() => {
        if (opened) handleFetchUsers()
    }, [handleFetchUsers, opened])


    return <>
        <Modal show={opened} onClose={() => setOpened(false)}>
            <StyledTitle>{t("ranking_tracked_users-title")}</StyledTitle>
            <StyledInput type="text" name="search" label="Search" placeholder="search" value={searchQuery} onChange={setSearchQuery} />
            {isFetching && <StyledLoader />}
            {!isFetching && <StyledTable>
                <thead>
                    <tr>
                        <th>{t("ranking_tracked_users-name")}</th>
                        <th>{t("ranking_tracked_users-network")}</th>
                        <th>{t("ranking_tracked_users-link")}</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((u, i) => <ClickableTR onClick={() => window.open(u.link, "_blank")} key={u.id}>
                        <td><StyledNumber>{i + 1}.</StyledNumber> {u.name}</td>
                        <SmTD>{smIcons[u.network as keyof typeof smIcons]}</SmTD>
                        <td>
                            <StyledBox>
                                <StyledLink href={u.link}>{u.link}</StyledLink>
                                <DeleteBtn onClick={(e) => handleDeleteUser(u.id, e)}><DeleteUserIcon /></DeleteBtn>
                            </StyledBox>
                        </td>
                    </ClickableTR>)}
                </tbody>
            </StyledTable>}
        </Modal>
        <ToolbarButton opened={opened}  onClick={() => setOpened(true)}><p>{t("ranking_tracked_users-btn")}</p><TrackedUsersIcon />  </ToolbarButton>
    </>
})

export default TrackedUsersView