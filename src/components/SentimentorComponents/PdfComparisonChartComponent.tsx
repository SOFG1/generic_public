import React, { useMemo } from "react"
import styled from "styled-components";
import { ChartDataset, Chart as ChartJS, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import { pdfReportChartColors } from "../../config/pdfReportChartColors";
import { PDFComparisonType } from "../../store/sentimentor";
import { useTranslation } from "react-i18next";


ChartJS.register(Legend);

const ChartStyled = styled(Bar)`
  max-height: 95%;
  max-width: 100%;
`;

interface IProps {
    data: PDFComparisonType
    view_by: "%" | "#"
}

const PdfComparisonChartComponent = React.memo(({ data, view_by }: IProps) => {
    const { t } = useTranslation()

    const labels = useMemo(() => {
        return Object.keys(data)
    }, [data])

    const datasets: ChartDataset<"bar">[] = useMemo(() => {
        if (view_by === "%") {
            return [
                {
                    label: "Difference in percents",
                    backgroundColor: labels.map(l => (data[l].perc || 0) > 0 ? pdfReportChartColors[4] : pdfReportChartColors[0]),
                    maxBarThickness: 35,
                    data: labels.map(l => data[l].perc || 0),
                }
            ]
        }
        return [
            {
                label: t("ranking_pdf-comparison_before"),
                backgroundColor: pdfReportChartColors[1],
                maxBarThickness: 35,
                data: labels.map(l => data[l].previous_period || 0)
            },
            {
                label: t("ranking_pdf-comparison_after"),
                backgroundColor: pdfReportChartColors[2],
                maxBarThickness: 35,
                data: labels.map(l => data[l].current_period || 0)
            }
        ]
    }, [data, labels, t, view_by])



    return <ChartStyled
        data={{ labels, datasets }}
        options={{
            aspectRatio: 1,
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                x: {
                    grid: {
                        display: false
                    }
                },
                y: {
                    ticks: {
                        callback: function (val, index) {
                            if (view_by === "%") return `${val}%`
                            return val;
                        },
                    },
                }
            },
            plugins: {
                tooltip: {
                    enabled: true,
                    callbacks: {
                        label: function (context) {
                            const label = context.label
                            const value = context.parsed.y
                            if (view_by === "%") {
                                return `${label}: ${value.toFixed(2)}%`
                            }
                            return `${label}: ${value}`;
                        },
                    },
                },
            },
        }}
    />
})


export default PdfComparisonChartComponent