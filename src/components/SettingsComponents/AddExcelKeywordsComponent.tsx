import React, { useState, useCallback } from "react"
import styled from "styled-components";
import { Button } from "../../UI/Button";
import { useTranslation } from "react-i18next";
import { Modal } from "../../UI/Modal";
import { Text } from "../common/Text";
import { colors } from "../../styles/colors";
import { desktopBp } from "../../styles/variables";
import { Sentimentor } from "../../api/sentimentor";
import { useUserState } from "../../store/user";
import { handle } from "../../api";
import { saveAs } from "file-saver";
import { InputFile } from "../../UI/Input";
import { Title } from "../common/Title";
import { UploadIcon } from "../../UI/Svg";
import { StyledTable, TableWrapper } from "../../UI/StyledTable";
import readXlsxFile from 'read-excel-file'
import { Loader } from "../../UI/Spinners";
import { useAppActions } from "../../store/app";
import { useSentimentorActions } from "../../store/sentimentor";
import { useSettingsActions } from "../../store/settings";
import { activityList } from "../../config/userActivityList";
import {createPortal} from "react-dom";
import {AddInstitutionComponent} from "./index";

const StyledLoader = styled(Loader)`
    height: 200px;
    width: 200px;
    margin: 50px auto 0;
`

const StyledWrapper = styled.div`
    min-width: 300px;
    min-height: 300px;
`


const StyledTableWrapper = styled(TableWrapper)`
    margin-bottom: 20px;
`


const TextStyled = styled(Text)`
  margin-bottom: 1.04vw;
  text-align: center;
  width: 100%;
  font-size: 1.25vw;
  span {
    text-decoration: underline;
    color: ${colors.cyan_5};
    cursor: pointer;
  }
  @media screen and (max-width: ${desktopBp}) {
    margin-bottom: 13px;
    font-size: 16px;
  }
`;


const InputFileStyled = styled(InputFile)`
  margin-bottom: 1.04vw;
  .file-drop {
    min-width: 15.63vw;
  }
  @media screen and (max-width: ${desktopBp}) {
    margin-bottom: 13px;
    .file-drop {
      min-width: 196px;
    }
  }
`;



const TitleModal = styled(Title)`
  margin-bottom: 0.52vw;
  margin-top: 0;
  min-width: 15.63vw;
  @media screen and (max-width: ${desktopBp}) {
    margin-bottom: 7px;
    min-width: 196px;
  }
`;

const TextModal = styled(Text)`
  margin-bottom: 0.52vw;
  margin-top: 0;
  text-decoration: underline;
  cursor: pointer;
  @media screen and (max-width: ${desktopBp}) {
    margin-bottom: 7px;
  }
`;

const StyledBtn = styled(Button)`
    white-space: nowrap;
`;


const AddExcelKeywordsComponent = React.memo(() => {
    const { t } = useTranslation()
    const { token } = useUserState()
    const { onGetKeywords } = useSentimentorActions()
    const { onGetInstitutions } = useSettingsActions()
    const { onShowAlert } = useAppActions()
    const [opened, setOpened] = useState<boolean>(false)
    const [file, setFile] = useState<File | null>(null)
    const [fileData, setFileData] = useState<any[]>([])
    const [isFetching, setIsFetching] = useState<boolean>(false)

    const handleUploadFile = useCallback(async (file: File | null) => {
        if (!file) return
        const fileData: any = await readXlsxFile(file)
        setFileData(fileData.slice(1))
        setFile(file)
    }, [])



    const onDownloadCurrentTemplate = useCallback(async () => {
        if (token) {
            setIsFetching(true)
            const [dataRes, dataErr]: any = await handle(
                Sentimentor.getKeywordsExcel(token)
            );
            setIsFetching(false)
            if (dataRes !== undefined) {
                saveAs(dataRes, "Template.xlsx");
            }
            if (dataErr) {
                console.log(dataErr);
            }
        }
    }, [token]);


    const handleUpload = useCallback(async () => {
        if (token && file) {
            setIsFetching(true)
            const [dataRes, dataErr] = await handle(Sentimentor.uploadKeywordsExcel(token, file))
            setIsFetching(false)
            if (!dataErr) {
                onShowAlert(true, t("settings_keywords-excel_success"))
            }
            if (dataErr) {
                onShowAlert(false, dataErr.error)
            }
            onGetKeywords()
            onGetInstitutions()
        }
    }, [token, file, t])


    return <>
        {createPortal(        <Modal show={opened} onClose={() => setOpened(false)}>
                <StyledWrapper>
                    {isFetching ? <StyledLoader /> : (
                        <>
                            <TextStyled>
                            <span
                                onClick={onDownloadCurrentTemplate}
                            >
                                {t("settings_keywords-excel_template")}
                            </span>
                            </TextStyled>

                            <InputFileStyled
                                formats=".xlsx"
                                content={
                                    <>
                                        <TitleModal>{t("settings_keywords-excel_drop")}</TitleModal>
                                        <TextModal>{t("settings_keywords-excel_click")}</TextModal>
                                        <Text>{t("settings_keywords-excel_files")}</Text>
                                    </>
                                }
                                placeholder={<>
                                    <UploadIcon /> {t("settings_keywords-excel_upload")}
                                </>}
                                onChange={(f) => handleUploadFile(f as File)}
                            />
                            {file && <><StyledTableWrapper>
                                <StyledTable>
                                    <thead>
                                    <tr>
                                        <th>{t("settings_keywords-excel_keyword")}</th>
                                        <th>{t("settings_keywords-excel_segment")}</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {fileData.map((f, i) => {
                                        return <tr key={i}>
                                            <td>{f[0]}</td>
                                            <td>{f[1]}</td>
                                        </tr>
                                    })}
                                    </tbody>
                                </StyledTable>
                            </StyledTableWrapper>

                                <StyledBtn onClick={handleUpload} disabled={isFetching} data-action={activityList["settings-upload-keywords-excel"]}>
                                    {t("settings_keywords-excel_upload-btn")}
                                </StyledBtn>
                            </>}
                        </>
                    )}
                </StyledWrapper>
            </Modal>
            ,document.querySelector(".App") as Element)}
        <StyledBtn onClick={() => setOpened(true)} data-action={activityList["settings-open-keywords-excel"]}>
            {t("settings_keywords-add_excel")}
        </StyledBtn>
    </>
})

export default AddExcelKeywordsComponent
