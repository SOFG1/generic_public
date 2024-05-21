import { getFormatDate, getFormatTime } from ".";
import headerLogo from "../assets/images/logo-black.png";



export const addReportHeader = async (pdf: any, t: any) => {
    const d = new Date();
    const date = getFormatDate(d).replaceAll(".", " / ");
    const time = getFormatTime(d).replace(".", ":");


    await pdf.setFont("IBMPlexSansHebrew", "regular");
    //Header of the first page
    await pdf.rect(8, 8, 194, 10);
    await pdf.addImage({
      imageData: headerLogo,
      x: 11,
      y: 7,
      width: 31,
      height: 12,
    });
    await pdf.line(47, 8, 47, 18);
    await pdf.setFontSize(14);
    await pdf.text(t("ranking_pdf-title"), 50, 13, { baseline: "middle" });
    await pdf.text(date, 125, 13, {
      baseline: "middle",
      align: "center",
    });
    await pdf.text(`${t("ranking_pdf-etm")}${time}`, 200, 13, {
      baseline: "middle",
      align: "right",
    });
}