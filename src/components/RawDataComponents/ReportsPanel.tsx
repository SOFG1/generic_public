import {memo, useCallback, useState} from "react";
import styled from "styled-components";
import {SquareCheckbox} from "../../UI/Input";
import {useTranslation} from "react-i18next";
import {desktopBp} from "../../styles/variables";
import {SecondaryButton} from "../../UI/SecondaryButton";
import {useRawDataActions, useRawDataState} from "../../store/rawData";
import {handle} from "../../api";
import {RawData} from "../../api/rawData";
import {useAppActions} from "../../store/app";
import {usePermissions, useUserState} from "../../store/user";


const ReportsPanel = memo(()=>{
    const [summarization, setSummarization] = useState(false);
    const [pivot, setPivot] = useState(false);
    const [downloadTable, setDownloadTable] = useState(false);
    const { appliedFilters } = useRawDataState();
    const permissions = usePermissions("Raw_Data");

    const {t} = useTranslation();
    const { onDownloadPivot, onGetSummarizationReport } = useRawDataActions();
    const { onShowAlert } = useAppActions();
    const { token } = useUserState();


    const onDownloadTable = useCallback(async () => {
        if (token) {
            const [dataRes, dataErr]: any = await handle(
                RawData.requestExcelDownload(token, appliedFilters)
            );
            if (!dataErr) {
                onShowAlert(
                    true,
                    "We've received your request. You'll receive a notification when your file is ready. Thank you."
                );
            }
            if (dataErr) {
                onShowAlert(false, dataErr.error);
            }
        }
    }, [token, permissions, appliedFilters, t]);

    const handleExport = useCallback(()=>{
        if(summarization) onGetSummarizationReport();
        if(pivot) onDownloadPivot();
        if(downloadTable) onDownloadTable();
    },[summarization, pivot, downloadTable]);



    const isDisabled = useCallback(()=>{
        return !summarization && !pivot && !downloadTable
    },[summarization, pivot, downloadTable]);

    return (
        <Container>
            <Content>
                {permissions.planing_tools && (
                    <>
                        <StyledItem>
                            <SquareCheckbox onChange={setSummarization}  active={summarization}/>
                            <Label>{t("raw-data_table-pivot")}</Label>
                        </StyledItem>
                        <StyledItem>
                            <SquareCheckbox onChange={setPivot}  active={pivot}/>
                            <Label>{t("raw-data-reports-summarization")}</Label>
                        </StyledItem>
                    </>
                )}

                {permissions["download"] && <StyledItem>
                    <SquareCheckbox onChange={setDownloadTable}  active={downloadTable}/>
                    <Label>{t("raw-data_table-download")}</Label>
                </StyledItem>}
            </Content>
            <StyledButton onClick = {handleExport} disabled={isDisabled()}>{t("raw-data-reports-export")}</StyledButton>
        </Container>
    )
})


export default ReportsPanel;



const Container = styled.div`
  cursor: pointer;
  display: flex;
  z-index: 10;
  flex-direction: column;
  width: fit-content;
  align-items: flex-start;
  @media(max-width: ${desktopBp}){
  }
`

const Content = styled.div`
    width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  gap: 1.73vw;
  @media(max-width: ${desktopBp}){
    gap: 22px;
  }
`

const StyledItem =  styled.div`
    display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
`

const Label = styled.p`
  width: fit-content;
  white-space: nowrap;
  font-weight: 500;
  font-size: ${props => props.theme.fontSize.semiMedium.vw};
  
  @media(max-width: ${desktopBp}){
    font-size: ${props => props.theme.fontSize.semiMedium.px};
  }  
`

const StyledButton = styled(SecondaryButton)`
  width: 6.33vw;
  height: 2.80vw;
  
  margin: 1.53vw auto 0 auto;
  @media(max-width: ${desktopBp}){
    height: 35px;
    width: 79px;
    margin: 19px auto 0 auto;
  }
`
