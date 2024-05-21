import React from "react";
import jsPDF from "jspdf";
import { Button } from "../../UI/Button";
import { useTranslation } from "react-i18next";
import { getFormatDateTime } from "../../utils";
import { useSelector } from "react-redux";
import { sentimentorpdfReportDataSelector } from "../../store/sentimentor/selectors";
import { addReportHeader } from "../../utils/addReportHeader";
import { useUserState } from "../../store/user";
import { addReportSegments } from "../../utils/addReportSegments";
import { addReportKeywords } from "../../utils/addReportKeywords";
import { addPDFReportFonts } from "../../utils/addPDFReportFonts";
const { useScreenshot } = require("use-react-screenshot");

interface IProps {
  disabled: boolean
  onSetIsDisabled: (d: boolean) => void
}

//This component generates and saves PDF report file
const DownloadPdfComponent = React.memo(({ disabled, onSetIsDisabled }: IProps) => {
  const { t } = useTranslation();
  const { userInfo } = useUserState()
  //const data = useSelector(sentimentorpdfReportDataSelector) || sentimentorPdfData
  const data = useSelector(sentimentorpdfReportDataSelector)

  const [image, takeScreenshot] = useScreenshot();


  const downloadPdf = async () => {
    onSetIsDisabled(true);
    const pdf = new jsPDF("p", "mm", "a4");
    await addPDFReportFonts(pdf)
    //Page 1
    await addReportHeader(pdf, t);
    //Segments
    addReportSegments({ segments: data?.segments, is409: userInfo?.group.id === 409, pdf, isRtl: userInfo?.group.country?.id === 328 })
    const img1Element = document.getElementById("pdf-report-img1");
    const img1 = await takeScreenshot(img1Element);
    pdf.addImage(img1, "png", 8, 71, 194, 165);
    //./Page 1

    //Page 2
    pdf.addPage();
    await addReportHeader(pdf, t);
    const img2Element = document.getElementById("pdf-report-img2");
    const img2 = await takeScreenshot(img2Element);
    pdf.addImage(img2, "png", 8, 31, 194, 210);
    //Page 2




    //Page 3
    pdf.addPage();
    await addReportHeader(pdf, t);
    const img3Element = document.getElementById("pdf-report-img3");
    const img3 = await takeScreenshot(img3Element);
    pdf.addImage(img3, "png", 8, 31, 194, 200);
    //./Page 3



    //Page 4
    const img4Element = document.getElementById("pdf-report-img4");
    if(img4Element) {
      pdf.addPage();
      await addReportHeader(pdf, t);
      const img4 = await takeScreenshot(img4Element);
      pdf.addImage(img4, "png", 8, 31, 194, 200);
    }
    //./Page 4


    //Keywords (each list is a separate page)
    //addReportKeywords({ pdf })

    //Save the document
    const date = getFormatDateTime(new Date()).replace("_", ":");
    pdf.save(`Sentiment analysis report ${date}.pdf`);
    onSetIsDisabled(false);
  };

  return (
    <Button onClick={downloadPdf} disabled={disabled}>
      {t("ranking_pdf-export")}
    </Button>
  );
});

export default DownloadPdfComponent;
