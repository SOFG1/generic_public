import React, {useMemo} from "react";
import styled from "styled-components";
import {ArcElement, Chart as ChartJS, Chart, ChartDataset, Legend, Tooltip} from "chart.js";
import {Doughnut} from "react-chartjs-2";
import {AnyObject, EmptyObject} from "chart.js/types/basic";
import formatDecimal from "../../utils/formatDecimal";

ChartJS.register(ArcElement, Tooltip, Legend);


const DoughnutStyled = styled(Doughnut)`

`;

interface IProps {
    data: {
        [key: string]: { perc: number, count?: number }
    },
    view_by: "#" | "%"
}




const ReportsDoughnutComponent = React.memo(({data, view_by}: IProps) => {
    const labels = useMemo(() => {
        return Object.keys(data).map(el => el.length ? el : "Unaffiliated")
    }, [data])

    const datasets: ChartDataset<"doughnut">[] = useMemo(() => {
        const sets: ChartDataset<"doughnut">[] = [{
            label: "# of Votes",
            data: Object.values(data).map(d => {
                if (view_by === "%") {
                    return (d?.perc || 0) * 100
                }
                return d?.count || 0
            }),
            borderWidth: 0,
            backgroundColor: [
                "rgb(255, 40, 87)",
                "rgb(29, 165, 255)",
                "rgb(255, 196, 48)",
                "rgb(41, 236, 236)",
                "rgb(126, 62, 255)",
                "rgb(255, 144, 32)",
            ],
        }]
        return sets
    }, [data, view_by])


    return (
        <DoughnutStyled
            data={{labels, datasets}}
            options={{
                aspectRatio: undefined,
                responsive: true,
                maintainAspectRatio: false,
                cutout: "75%",
                layout: {
                    padding: {
                        bottom: 2
                    }
                },
                plugins: {
                    tooltip: {
                        enabled: true,
                        callbacks: {
                            label: function (context) {
                                const label = context.label
                                const value = context.parsed
                                if (view_by === "%") {
                                    return `${label}: ${value.toFixed(5)}%`
                                }
                                return `${label}: ${value}`;
                            },
                        },
                    },
                },
            }}
            plugins={[{
                id: "1",
                afterDraw(chart: Chart, args: EmptyObject, options: AnyObject) {
                    const {ctx, chartArea: {width}} = chart;
                    const halfWidth = width / 2;

                    ctx.beginPath();
                    ctx.lineWidth = 0.68
                    ctx.font = "8px Arial";

                    chart.data.datasets.forEach((dataset, index) => {
                        const rightPoints = chart.getDatasetMeta(index).data.filter((datapoint, i) => {
                            const {x} = datapoint.tooltipPosition();
                            return x >= halfWidth
                        })
                        const leftPoints = chart.getDatasetMeta(index).data.filter((datapoint, i) => {
                            const {x} = datapoint.tooltipPosition();
                            return x < halfWidth
                        }).reverse();
                        const textIndent = 5;
                        const legendSpace = 130
                        const rightSpace =  (250 - legendSpace) / rightPoints.length;
                        rightPoints.forEach((datapoint, i) => {
                            const {x, y} = datapoint.tooltipPosition();
                            ctx.moveTo(x, y);
                            ctx.textAlign = "right"
                            const indent = 20;

                            if(rightPoints.length < 3){
                                ctx.lineTo(width - indent, y);
                                // @ts-ignore
                                ctx.fillText(chart.data.labels[i], width - indent, y - textIndent);
                                // @ts-ignore
                                ctx.fillText(formatDecimal(chart.data.datasets[0].data[i], 2), width - indent, y + textIndent);
                                return;
                            }
                            //@ts-ignore
                            ctx.fillText(chart.data.labels[i], width - indent, legendSpace + rightSpace * i + 1);
                            //@ts-ignore
                            ctx.fillText(formatDecimal(chart.data.datasets[0].data[i], 2), width - indent, legendSpace + rightSpace * i + 1 + 10);
                            const lineCoordsY =   ((legendSpace + rightSpace * i + 1) + (legendSpace + rightSpace * i + 1 + 10)) / 2;
                            ctx.moveTo(width - indent, lineCoordsY);
                            ctx.lineTo((width - indent) * 0.75, lineCoordsY);
                            ctx.lineTo(x, y);
                        })

                        const leftSpace =  (250 - legendSpace) / leftPoints.length;
                        leftPoints.forEach((datapoint, i) => {
                            const {x, y} = datapoint.tooltipPosition();
                            const elementIndex = chart.getDatasetMeta(index).data.findIndex(el => {
                                const {x: x2, y: y2} = el.tooltipPosition();
                                return x === x2 && y === y2;
                            })
                            ctx.textAlign = "left"
                            if(leftPoints.length > 2){
                                // @ts-ignore
                                ctx.fillText(chart.data.labels[elementIndex], 20, legendSpace + leftSpace * i + 1);
                                // @ts-ignore
                                ctx.fillText(formatDecimal(chart.data.datasets[0].data[elementIndex], 2), 20, legendSpace + leftSpace * i + 1 + 10);
                                const lineCoordsY =   ((legendSpace + leftSpace * i + 1) + (legendSpace + leftSpace * i + 1 + 10)) / 2;
                                ctx.moveTo(20, lineCoordsY);
                                ctx.lineTo(x * 0.75, lineCoordsY);
                                ctx.lineTo(x, y);
                                return;
                            }
                            // @ts-ignore
                            ctx.fillText(chart.data.labels[elementIndex], 20, y - textIndent);
                            // @ts-ignore
                            ctx.fillText(formatDecimal(chart.data.datasets[0].data[elementIndex], 2), 20, y + textIndent);
                            ctx.moveTo(20, y);
                            ctx.lineTo(x, y);
                        })
                    })
                    ctx.stroke();
                    ctx.closePath();
                }
            }]}
        />
    );
});

export default ReportsDoughnutComponent;
