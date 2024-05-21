import React, { useCallback, useState } from "react"
import styled from "styled-components"
import { Input } from "../../UI/Input"
import { useUserState } from "../../store/user"
import { Button } from "../../UI/Button"
import { NoIcon } from "../../UI/Svg"
import { useTranslation } from "react-i18next"
import { handle } from "../../api"
import { Settings } from "../../api/settings"
import { useAppActions } from "../../store/app"
import { desktopBp } from "../../styles/variables"
import { StyledTable, TableWrapper } from "../../UI/StyledTable"


const StyledWrapper = styled.div`
    border: 1px solid #000;
`

const StyledHeader = styled.div`
    display: flex;
    align-items: center;
    padding: 1.56vw;
    border-bottom: 1px solid #000;
    gap: 1.56vw;
    @media screen and (max-width: ${desktopBp}) {
        gap: 30px;
        padding: 20px;
    }
    @media screen and (max-width: 700px) {
        flex-direction: column;
        gap: 3px;
    }
`


const StyledInput = styled(Input)`
`



const StyledBtn = styled(Button)`
    position: relative;
  width: fit-content;
  white-space: nowrap;
  min-width: 7.03vw;
  border-radius: 100px;
  @media screen and (max-width: ${desktopBp}) {
    min-width: 88px;
  }
`;



const CreateBtn = styled(StyledBtn)`
    margin: 10px auto;
`

const DeleteBtn = styled.button`
    padding: 0;
    border: 0;
    background-color: transparent;
    margin-inline-start: auto;
    cursor: pointer;
    svg {
        background-color: #fff;
        border-radius: 50%;
    }
`


const CreateUsersManualComponent = React.memo(() => {
    const { t } = useTranslation()
    const { token, userInfo } = useUserState()
    const { onShowAlert } = useAppActions()
    const [rowId, setRowId] = useState<string>("")
    const [phone, setPhone] = useState<string>("")
    const [data, setData] = useState<{ id: string, phone: string }[]>([])
    const [isFetching, setIsFetching] = useState<boolean>(false)

    const handleDelete = useCallback((index: number) => {
        const copy = [...data]
        copy.splice(index, 1)
        setData(copy)
    }, [data])

    const handleAddRow = useCallback(() => {
        setData(p => ([...p, { id: rowId, phone }]))
        setRowId("")
        setPhone("")
    }, [data, rowId, phone])


    const handleCreate = useCallback(async () => {
        const candidates = data.map(d => {
            return {
                id: d.id,
                mobile_phone: d.phone
            }
        })
        if (token) {
            setIsFetching(true)
            const [dataRes, dataErr] = await handle(Settings.createVoterUsers(token, candidates))
            setIsFetching(false)
            if (!dataErr) {
                onShowAlert(true, t("settings_app-creating_success"))
            }
            if (dataErr) {
                onShowAlert(false, dataErr.error)
            }
        }
    }, [token, data, t])

    return <StyledWrapper>
        <StyledHeader>
            <StyledInput type="text" name="id" label={t("settings_app-creating_id")} value={rowId} onChange={setRowId} />
            <StyledInput type="text" name="id" label={t("settings_app-creating_phone")} value={phone} onChange={setPhone} />
            <StyledBtn onClick={handleAddRow}>{t("settings_app-creating_add-row")}</StyledBtn>
        </StyledHeader>
        <TableWrapper>
            <StyledTable>
                <thead>
                    <tr>
                        <th>{t("settings_app-creating_id")}</th>
                        <th>{t("settings_app-creating_phone")}</th>
                        <th>{t("settings_app-creating_login")}</th>
                        <th>{t("settings_app-creating_password")}</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((r, index) => {
                        return <tr key={index}>
                            <td>{r.id}</td>
                            <td>{r.phone}</td>
                            <td>{`${userInfo?.group.id}-${r.id.replaceAll(" ", "")}`}</td>
                            <td>{r.phone.replaceAll(" ", "").slice(-7)}</td>
                            <td><DeleteBtn onClick={() => handleDelete(index)}><NoIcon /></DeleteBtn></td>
                        </tr>
                    })}
                </tbody>
            </StyledTable>
        </TableWrapper>
        <CreateBtn onClick={handleCreate} disabled={!data[0] || isFetching}>{t("settings_app-creating_btn")}</CreateBtn>
    </StyledWrapper>
})

export default CreateUsersManualComponent