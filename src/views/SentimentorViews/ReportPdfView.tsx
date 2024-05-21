import React, { useState, useMemo, useRef } from "react";
import styled from "styled-components";
import { Modal } from "../../UI/Modal";
import {
  AgeGenderComponent,
  DownloadPdfComponent,
  ExportChartComponent,
  PDFPercentSwitcherComponent,
  PDFTopWordsComponent,
  PdfCloudComponent,
  PdfComparisonChartComponent,
  PdfReportCountriesComponent,
  PdfReportHeaderComponent,
  PdfReportStatsComponent,
  ReportKeywordsComponent,
  ReportsDoughnutComponent,
  StackedChartComponent,
} from "../../components/SentimentorComponents";
import { ISentimentorFilters, useSentimentorActions } from "../../store/sentimentor";
import { useSelector } from "react-redux";
import {
  sentimentorpdfReportDataSelector,
} from "../../store/sentimentor/selectors";
import { useTranslation } from "react-i18next";
import { useUserState } from "../../store/user";
import { ToolbarButton } from "../../UI/ToolbarButton";
import { ReportPdfIcon } from "../../UI/Svg";


const StyledDocument = styled.div`
  width: 810px;
  padding: 31px 25px 61px;
`;

const StyledA4 = styled.div`
  width: 100%;
  margin-bottom: 150px;
`;

const StyledKeywords = styled.p`
  margin-inline-start: 30px;
  margin-bottom: 50px;
  span {
    font-weight: 600;
  }
`;


const StyledTitles = styled.div`
  display: flex;
  border: 2px solid #000;
  border-radius: 50px;
`;


const TitlesCentered = styled(StyledTitles)`
  width: 60%;
  margin: 0 auto 30px;
`

const StyledTitle = styled.p`
  text-align: center;
  padding: 6px;
  margin: 0;
  font-weight: 600;
  width: 50%;
  margin: 0 auto;
  &:first-child {
    border-inline-end: 2px solid #000;
  }
  &:last-child {
    border: 0;
  }
`;

const StyledBox = styled.div`
  display: flex;
`;

const DoughnutContainer = styled.div`
  position: relative;
  width: 50%;
  height: 250px;
  &:first-child {
    border-inline-end: 2px solid #000;
  }
`;

const CenteredContainer = styled.div`
  position: relative;
  width: 70%;
  margin: 0 auto;


`


const ChartContainer = styled.div`
  width: 50%;
  height: 800px;
  box-sizing: border-box;
  padding: 25px 15px 15px;
  &:first-child {
    border-inline-end: 2px solid #000;
  }
`;

interface IProps {
  filters: ISentimentorFilters
}

const ReportPdfView = React.memo(({ filters }: IProps) => {
  const { t } = useTranslation();
  const { userInfo } = useUserState()
  //const data = useSelector(sentimentorpdfReportDataSelector) || sentimentorPdfData
  const data = useSelector(sentimentorpdfReportDataSelector);
  const { onGetPdfReportData, onSetPdfReportData } = useSentimentorActions();
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [viewBy, setViewBy] = useState<"#" | "%">("#")
  const categoryAnalysisRef = useRef<HTMLDivElement>(null)
  const comparisonAnalysisRef = useRef<HTMLDivElement>(null)
  const categoryPlatformRef = useRef<HTMLDivElement>(null)
  const platformCategoryRef = useRef<HTMLDivElement>(null)
  const genderChartRef = useRef<HTMLDivElement>(null)
  const countriesChartRef = useRef<HTMLDivElement>(null)




  const isGroup409 = useMemo(() => {
    return userInfo?.group.id === 409
  }, [userInfo?.group.id])



  const topWordsSorted = useMemo(() => {
    const firstPart: any = {}
    const secondPart: any = {}
    Object.keys(data?.top_words || {}).forEach((key, i) => {
      if (i < 3) firstPart[key] = data?.top_words[key]
      if (i > 2) secondPart[key] = data?.top_words[key]
    })
    return {
      firstPart,
      secondPart
    }
  }, [data?.top_words])


  const handleFormatDoughnutData = (data:{[p: string]: {count: number, perc: number}})=>{
    const sum = (Object.values(data) as {count: number, perc: number}[]).reduce((acc, value)=> value.count + acc, 0);
    const copy = {...data};
    for(const key in copy){
      if(copy[key].count * 100 / sum < 1)  delete copy[key]
    }
    return copy
  }
  return (
    <>
      <ToolbarButton opened={!!data} onClick={() => onGetPdfReportData(filters)}>
        <p>{t("ranking_pdf-popup")}</p>
        <ReportPdfIcon />
      </ToolbarButton>
      <Modal show={!!data} onClose={() => onSetPdfReportData(null)}>
        <>
          <StyledDocument>
            {/* Page 1 */}
            <StyledA4>
              <PdfReportHeaderComponent />
              <StyledKeywords>
                <span>{isGroup409 ? t("ranking_pdf-segments(409)") : t("ranking_pdf-segments")}</span>
                {data?.segments.join(", ")}
              </StyledKeywords>
              <div id="pdf-report-img1">
                <PdfReportStatsComponent />
                <PDFPercentSwitcherComponent selected={viewBy} onSelect={setViewBy} />
                <StyledTitles>
                  <StyledTitle>{t("ranking_pdf-category_platform")}</StyledTitle>
                  <StyledTitle>{t("ranking_pdf-platform_category")}</StyledTitle>
                </StyledTitles>
                <StyledBox>
                  <DoughnutContainer ref={categoryPlatformRef}>
                    <ExportChartComponent ref={categoryPlatformRef} fileName="CategoryPlatform" />
                    <StackedChartComponent data={data?.category_by_platform || {}} view_by={viewBy} />
                  </DoughnutContainer>
                  <DoughnutContainer ref={platformCategoryRef}>
                    <ExportChartComponent ref={platformCategoryRef} fileName="PlatformCategory" />
                    <StackedChartComponent data={data?.platform_by_category || {}} view_by={viewBy} />
                  </DoughnutContainer>
                </StyledBox>
                <StyledTitles>
                  <StyledTitle>{t("ranking_pdf-category_analysis")}</StyledTitle>
                  <StyledTitle>{t("ranking_pdf-comparison")}</StyledTitle>
                </StyledTitles>
                <StyledBox>
                  <DoughnutContainer ref={categoryAnalysisRef}>
                    <ExportChartComponent ref={categoryAnalysisRef} fileName="CategoryAnalysis" />
                    <ReportsDoughnutComponent
                      view_by={viewBy}
                      data={handleFormatDoughnutData(data?.category_analysis || {})}
                    />
                  </DoughnutContainer>
                  <DoughnutContainer ref={comparisonAnalysisRef}>
                    <ExportChartComponent ref={comparisonAnalysisRef} fileName="ComparisonAnalysis" />
                    <PdfComparisonChartComponent view_by={viewBy} data={data?.comparison || {}} />
                  </DoughnutContainer>

                </StyledBox>
              </div>
            </StyledA4>
            {/* Page 1 */}


            {/* Page 2 */}
            <StyledA4>
              <PdfReportHeaderComponent />
              <div id="pdf-report-img2">
                <PdfReportStatsComponent />
                <PDFPercentSwitcherComponent selected={viewBy} onSelect={setViewBy} />
                <TitlesCentered>
                  <StyledTitle>{t("ranking_pdf-age")}</StyledTitle>
                </TitlesCentered>
                <CenteredContainer ref={genderChartRef}>
                  <ExportChartComponent ref={genderChartRef} fileName="AgeGender" />
                  <AgeGenderComponent viewBy={viewBy} data={data?.age_gender_analysis || {}} />
                </CenteredContainer>
                <TitlesCentered style={{ marginTop: "50px" }}>
                  <StyledTitle>{t("ranking_pdf-countries")}</StyledTitle>
                </TitlesCentered>
                <CenteredContainer ref={countriesChartRef}>
                  <ExportChartComponent ref={countriesChartRef} fileName="CountriesAnalysis" />
                  <PdfReportCountriesComponent view_by={viewBy} data={data?.activity_for_country || {}} />
                </CenteredContainer>
              </div>
            </StyledA4>
            {/* Page 2 */}


            {/* Page 3 */}
            <StyledA4>
              <PdfReportHeaderComponent />
              <PDFPercentSwitcherComponent selected={viewBy} onSelect={setViewBy} />
              <div id="pdf-report-img3">
                <StyledTitles>
                  <StyledTitle>{t("ranking_pdf-top_words")}</StyledTitle>
                  <StyledTitle>{t("ranking_pdf-cloud")}</StyledTitle>
                </StyledTitles>
                <StyledBox>
                  <ChartContainer style={{ padding: "10px 15px" }}>
                    {Object.keys(topWordsSorted.firstPart).map(key => {
                      const list = topWordsSorted.firstPart[key]
                      return <PDFTopWordsComponent viewBy={viewBy} platform={key} words={list} />
                    })}
                  </ChartContainer>
                  <ChartContainer>
                    <PdfCloudComponent words={data?.cloud || []} />
                  </ChartContainer>
                </StyledBox>
              </div>
            </StyledA4>
            {/* Page 3 */}




            {/* Page 4 */}
            {Object.keys(topWordsSorted.secondPart).length > 0 && <StyledA4>
              <PdfReportHeaderComponent />
              <PDFPercentSwitcherComponent selected={viewBy} onSelect={setViewBy} />
              <div id="pdf-report-img4">
                <StyledTitles>
                  <StyledTitle>{t("ranking_pdf-top_words")}</StyledTitle>
                </StyledTitles>
                <ChartContainer style={{ width: "100%", padding: "10px 15px" }}>
                  {Object.keys(topWordsSorted.secondPart).map(key => {
                    const list = topWordsSorted.secondPart[key]
                    return <PDFTopWordsComponent viewBy = {viewBy} platform={key} words={list} />
                  })}
                </ChartContainer>
              </div>
            </StyledA4>
            }
            {/* Page 4 */}



            {/* data?.keywords && (
              <ReportKeywordsComponent
                disabled={isDisabled}
                onSetDisabled={setIsDisabled}
                keywords={data.keywords}
              />
            ) */}
          </StyledDocument>
          <DownloadPdfComponent
            disabled={isDisabled}
            onSetIsDisabled={setIsDisabled}
          />
        </>
      </Modal>
    </>
  );
});



export default ReportPdfView;
