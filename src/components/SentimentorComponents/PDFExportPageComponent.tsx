import React, { useCallback } from "react"
import { Button } from "../../UI/Button"
import { useTranslation } from "react-i18next"
import styled from "styled-components"
import jsPDF from "jspdf"
import { addPDFReportFonts } from "../../utils/addPDFReportFonts"
import { addReportHeader } from "../../utils/addReportHeader"
import { addReportSegments } from "../../utils/addReportSegments"
import { sentimentorpdfReportDataSelector } from "../../store/sentimentor/selectors"
import { useSelector } from "react-redux"
import { useUserState } from "../../store/user"
import { getFormatDateTime } from "../../utils"
const { useScreenshot } = require("use-react-screenshot");



const StyledButton = styled(Button)`
    margin: 10px;
`



interface IProps {
    page: number
    isKeywordsPage: boolean
    disabled: boolean
    onSetIsDisabled: (d: boolean) => void
}


const PDFExportPageComponent = React.memo(({ disabled, onSetIsDisabled, page, isKeywordsPage }: IProps) => {
    const { t } = useTranslation()
    const { userInfo } = useUserState()
    const data = useSelector(sentimentorpdfReportDataSelector)
    const [image, takeScreenshot] = useScreenshot();



    const handleDownloadPage1 = useCallback(async () => {
        onSetIsDisabled(true);
        const pdf = new jsPDF("p", "mm", "a4");
        addPDFReportFonts(pdf)
        addReportHeader(pdf, t);
        addReportSegments({ segments: data?.segments, is409: userInfo?.group.id === 409, pdf, isRtl: userInfo?.group.country?.id === 328 })
        const img1Element = document.getElementById("pdf-report-img1");
        const img1 = await takeScreenshot(img1Element);
        pdf.addImage(img1, "png", 8, 71, 194, 185);
        //Save the document
        const date = getFormatDateTime(new Date()).replace("_", ":");
        pdf.save(`Sentiment analysis report ${date}, page - ${page}.pdf`);
        onSetIsDisabled(false);
    }, [t, data, page])



    const handleDownloadPage2 = useCallback(async () => {
        onSetIsDisabled(true);
        const pdf = new jsPDF("p", "mm", "a4");
        addPDFReportFonts(pdf)
        addReportHeader(pdf, t);
        const img2Element = document.getElementById("pdf-report-img3");
        const img2 = await takeScreenshot(img2Element);
        pdf.addImage(img2, "png", 8, 31, 194, 200);
        //Save the document
        const date = getFormatDateTime(new Date()).replace("_", ":");
        pdf.save(`Sentiment analysis report ${date}, page - ${page}.pdf`);
        onSetIsDisabled(false);
    }, [t, page])


    const handleDownloadPage3 = useCallback(async () => {
        onSetIsDisabled(true);
        const pdf = new jsPDF("p", "mm", "a4");
        addPDFReportFonts(pdf)
        addReportHeader(pdf, t);
        const img3Element = document.getElementById("pdf-report-img3");
        const img3 = await takeScreenshot(img3Element);
        pdf.addImage(img3, "png", 8, 31, 194, 200);
        //Save the document
        const date = getFormatDateTime(new Date()).replace("_", ":");
        pdf.save(`Sentiment analysis report ${date}, page - ${page}.pdf`);
        onSetIsDisabled(false);
    }, [t, page])


    const handleDownloadKeywordsPage = useCallback(async () => {
        onSetIsDisabled(true);
        const pdf = new jsPDF("p", "mm", "a4");
        addPDFReportFonts(pdf)
        addReportHeader(pdf, t);
        pdf.setFontSize(13);
        const pageElement = document.querySelector(`.ranking-pdf-keywords${page}`) as HTMLDivElement
        const text = pageElement.textContent;
        const multilineText = pdf.splitTextToSize(text as string, 190);
        pdf.text(multilineText, 10, 26, {
            baseline: "top",
            align: "left",
        });
        //Save the document
        const date = getFormatDateTime(new Date()).replace("_", ":");
        pdf.save(`Sentiment analysis report ${date}, page - ${page}.pdf`);
        onSetIsDisabled(false);
    }, [page, t])



    const handleExport = useCallback(() => {
        if (page === 1 && !isKeywordsPage) handleDownloadPage1()
        if (page === 2 && !isKeywordsPage) handleDownloadPage2()
        if (page === 3 && !isKeywordsPage) handleDownloadPage3()
        if (isKeywordsPage) handleDownloadKeywordsPage()
    }, [page, handleDownloadPage1, handleDownloadPage2, handleDownloadPage3, handleDownloadKeywordsPage, isKeywordsPage])






    return <StyledButton onClick={handleExport} disabled={disabled}>
        {t("ranking_pdf-export_page")}
    </StyledButton>
})


export default PDFExportPageComponent