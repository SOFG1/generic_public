import { t } from "i18next";
import jsPDF from "jspdf";


interface IParams {
    segments?: string[]
    is409: boolean
    pdf: jsPDF
    isRtl: boolean
}


const reverseString = (str: string): string => {
    return str.split("").reverse().join("")
}

//210

export const addReportSegments = ({ segments, is409, pdf, isRtl }: IParams) => {
    const segmentsTitle = is409 ? t("ranking_pdf-segments(409)") : t("ranking_pdf-segments")
    const segmentsList = segments ? [...segments].reverse() : []
    const segmentsString = segmentsList.join(", ")




    if (!isRtl) {
        pdf.setFont("IBMPlexSansHebrew", "Bold");
        pdf.text(segmentsTitle, 60, 26, {
            baseline: "top",
            align: "right",
        });

        const multilineText = pdf.splitTextToSize(segmentsString, 140);
        pdf.setFont("IBMPlexSansHebrew", "regular");
        pdf.text(multilineText, 61, 26, {
            baseline: "top",
            align: "left",
            maxWidth: 140
        });
    }

    if (isRtl) {
        pdf.setFont("IBMPlexSansHebrew", "Bold");
        pdf.text(reverseString(segmentsTitle), 150, 26, {
            baseline: "top",
            align: "left",
        });


        const multilineText = pdf.splitTextToSize(reverseString(segmentsString), 140);
        pdf.setFont("IBMPlexSansHebrew", "regular");
        pdf.text(multilineText, 149, 26, {
            baseline: "top",
            align: "right",
            maxWidth: 140
        });
    }



}