import jsPDF from "jspdf";
import { IBMPlexSansHebrewReg } from "../assets/fonts/IBMPlexSansHebrew/IBMPlexSansHebrew-normal";
import { IBMPlexSansHebrewBold } from "../assets/fonts/IBMPlexSansHebrew/IBMPlexSansHebrew-bold";




export const addPDFReportFonts = async  (pdf: jsPDF) => {
        //jsPDF.API.events.push(["addFonts", AddIBMPlexSansHebrewReg]);
        //jsPDF.API.events.push(["addFonts", AddIBMPlexSansHebrewBold]);
        pdf.addFileToVFS("IBMPlexSansHebrewReg.ttf", IBMPlexSansHebrewReg)
        pdf.addFileToVFS("IBMPlexSansHebrewBold.ttf", IBMPlexSansHebrewBold)
        pdf.addFont("IBMPlexSansHebrewReg.ttf", "IBMPlexSansHebrew", "regular");
        pdf.addFont("IBMPlexSansHebrewBold.ttf", "IBMPlexSansHebrew", "Bold");
        pdf.setFont("IBMPlexSansHebrew", "regular");
}