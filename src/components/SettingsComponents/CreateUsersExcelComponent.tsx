import React, { useCallback, useMemo, useState } from "react"
import readXlsxFile from 'read-excel-file'
import styled from "styled-components"
import { desktopBp } from "../../styles/variables";
import { useTranslation } from "react-i18next";
import { useUserState } from "../../store/user";
import { StyledTable, TableWrapper } from "../../UI/StyledTable";
import { Button } from "../../UI/Button";
import { handle } from "../../api";
import { Settings } from "../../api/settings";
import { useAppActions } from "../../store/app";
import { activityList } from "../../config/userActivityList";
import { saveAs } from "file-saver";


const StyledWrapper = styled.div`
    border: 1px solid #000;
`

const StyledHeader = styled.div`
    display: flex;
    justify-content: center;
    gap: 2.71vw;
    padding: 1.56vw;
    @media screen and (max-width: ${desktopBp}) {
        gap: 34px;
        padding: 20px;
    }
`

const StyledBtn = styled(Button)`
position: relative;
  width: fit-content;
  min-width: 7.03vw;
  border-radius: 100px;
  @media screen and (max-width: ${desktopBp}) {
    min-width: 88px;
  }
  input {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    cursor: pointer;
    opacity: 0;
  }
`;

const CreateBtn = styled(StyledBtn)`
    margin: 10px auto;
`


const CreateUsersExcelComponent = React.memo(() => {
    const { t } = useTranslation()
    const { token, userInfo } = useUserState()
    const { onShowAlert } = useAppActions()
    const [data, setData] = useState<{ ids: string[], phones: string[] }>({ ids: [], phones: [] })

    const candidates = useMemo(() => {
        return data.ids.map((id, index) => {
            return {
                id,
                mobile_phone: data.phones[index]
            }
        })
    }, [data])


    const handleUploadFile = useCallback(async (file: File | null) => {
        if (!file) return
        const fileData: any = await readXlsxFile(file)
        const obj: any = {
            ids: [],
            phones: []
        }
        fileData.forEach((f: any, index: number) => {
            if (index === 0) return
            obj.ids.push(String(f[1]))
            obj.phones.push(String(f[2]))
        })
        setData(obj)
    }, [])


    const handleCreate = useCallback(async () => {
        if (token) {
            const [dataRes, dataErr] = await handle(Settings.createVoterUsers(token, candidates))
            if (!dataErr) {
                onShowAlert(true, t("settings_app-creating_success"))
            }
            if (dataErr) {
                onShowAlert(false, dataErr.error)
            }
        }
    }, [token, candidates, t])


    const handleDownloadTemplate = useCallback(async () => {
        if (token) {
            const [dataRes, dataErr]: any = await handle(
                Settings.getCreateUsersTemplate(token)
            );
            if (dataRes !== undefined) {
                saveAs(dataRes, "template.xlsx");
            }
            if (dataErr) {
                console.log(dataErr);
            }
        }
    }, [token]);


    return <StyledWrapper>
        <StyledHeader>
            <StyledBtn onClick={handleDownloadTemplate}>{t("settings_app-creating_template")}</StyledBtn>
            <StyledBtn>
                <input type="file" accept=".xlsx" onChange={(e) => handleUploadFile(e.target.files && e.target.files[0])} />
                {t("raw-data_file-plhr")}
            </StyledBtn>
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
                    {candidates.map(c => {
                        return <tr key={c.id}>
                            <td>{c.id}</td>
                            <td>{c.mobile_phone}</td>
                            <td>{`${userInfo?.group.id}-${c.id.replaceAll(" ", "")}`}</td>
                            <td>{c.mobile_phone.replaceAll(" ", "").slice(-7)}</td>
                        </tr>
                    })}
                </tbody>
            </StyledTable>
        </TableWrapper>
        <CreateBtn onClick={handleCreate} disabled={!candidates.length} data-action={activityList["voter-create-users"]}>{t("settings_app-creating_btn")}</CreateBtn>
    </StyledWrapper>
})

export default CreateUsersExcelComponent