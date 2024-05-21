import React, { useMemo } from "react"
import styled from "styled-components";
import { ChartDataset, Chart as ChartJS, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import { pdfReportChartColors } from "../../config/pdfReportChartColors";


ChartJS.register(Legend);


const ChartStyled = styled(Bar)`
  max-height: 95%;
  max-width: 100%;
`;


interface IProps {
    data: {
        [key: string]: {
            [key: string]: {
                count: number,
                perc: number
            }
        }
    }
    view_by: "%" | "#"
}

const StackedChartComponent = React.memo(({ data, view_by }: IProps) => {



    const labels: string[] = useMemo(() => {
        const labels:Set<string> = new Set();

        const keys = Object.keys(data);
        for(let key of keys){
            const values = data[key];
            const valueKeys = Object.keys(values);
            valueKeys.forEach(key => labels.add(key));
        }
        return Array.from(labels);
    }, [data])


    const datasets: ChartDataset<"bar">[] = useMemo(() => {
        return Object.keys(data).map((k, i) => {
            return {
                label: k,
                backgroundColor: pdfReportChartColors[i],
                maxBarThickness: 50,
                data: labels.map(l => {
                    if (!data[k][l]) return 0
                    if (view_by === "%") return (data[k][l]?.perc || 0) * 100
                    return data[k][l]?.count || 0
                })
            } as ChartDataset<"bar">
        })
    }, [data, labels, view_by])


    return <ChartStyled
        data={{ labels, datasets }}
        options={{
            aspectRatio: 1,
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                x: {
                    stacked: true,
                    grid: {
                        display: false
                    },
                },
                y: {
                    stacked: true,
                    ticks: {
                        callback: function (val, index) {
                            if(view_by === "%") return `${val}%`
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
                                return `${label}: ${value.toFixed(5)}%`
                            }
                            return `${label}: ${value}`;
                        },
                    },
                },
            },
        }}
    />
})



export default StackedChartComponent
