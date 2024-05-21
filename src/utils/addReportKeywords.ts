import jsPDF from "jspdf";
import { addReportHeader } from "./addReportHeader";
import { t } from "i18next";


interface IParams {
    pdf: jsPDF
}


export const addReportKeywords = ({ pdf }: IParams) => {

    //Keywords (each list is a separate page)
    const lists = document.querySelectorAll(".ranking-pdf-keywords");
    var listsArray = Array.from(lists);
    listsArray.forEach((list) => {
        pdf.addPage();
        addReportHeader(pdf, t);
        pdf.setFontSize(13);
        const text = list.textContent;
        const multilineText = pdf.splitTextToSize(text as string, 190);
        pdf.text(multilineText, 10, 26, {
            baseline: "top",
            align: "left",
        });
    });
}