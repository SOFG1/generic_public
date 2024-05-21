import * as d3 from "d3";
// import {event as currentEvent} from 'd3-selection';
import _, {size} from "lodash";
import { numberWithCommas } from "./numberWidthCommas";

const drawChart = ({
  element,
  colorsChart,
  fontSize,
  data,
  innerRadius = 55,
  outerRadius = 70,
    posInnerRadius,
    postOuterRadius,
  showTicks,
  showTooltip,
    showLabels,
    containerSize
}: {
  element: any;
  data: any;
  colorsChart: string[];
  innerRadius?: number;
  outerRadius?: number;
  fontSize?: number;
  showTicks: boolean
  showTooltip: boolean,
  showLabels?:boolean,
  posInnerRadius?:number,
  postOuterRadius?:number,
  containerSize?:number
}) => {
  const boxSize = containerSize || 200 ;
  d3.select(element).select("svg").remove(); // Remove old svg
  d3.select(element).select("div").attr("class", "tooltip").remove(); // Remove old tooltip
  // Create new svg
  const svg = d3
    .select(element)
    .append("svg")
    .attr("preserveAspectRatio", "xMidYMid meet")
    .attr("height", "100%")
    .attr("width", "100%")
    .attr("viewBox", `0 0 ${boxSize} ${boxSize}`)
    .append("g")
    .attr("transform", `translate(${boxSize / 2}, ${boxSize / 2})`);
  const tooltip = d3.select(element).append("div").attr("class", "tooltip");
  const header = tooltip.append("div").attr("class", "header");
  header.append("div").attr("class", "color");
  header.append("div").attr("class", "name");
  const footer = tooltip.append("div").attr("class", "footer");
  footer.append("div").attr("class", "value");
  const arcGenerator: any = d3
    .arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);
  const posGenerator: any = d3.arc().innerRadius(posInnerRadius || 85).outerRadius(postOuterRadius || 85);

  const methodSort = (a: any, b: any) => {
    const indexA = _.indexOf(data, a.data);
    const indexB = _.indexOf(data, b.data);
    return indexA - indexB;
  };
  const pieGenerator = d3
    .pie()
    .value((d: any) => {
      if (d.value < 0.1) return 0
      if (d.value < 5) return 4.99
      return d.value
    })
    .sort(methodSort);

  const arcs = svg.selectAll().data(pieGenerator(data)).enter();
  const pos = svg.selectAll().data(pieGenerator(data)).enter();

  const paths = arcs
    .append("path")
    .attr("d", arcGenerator)
    .attr("cursor", "pointer")
    .style("fill", (d: any, i: number) => colorsChart[i % data.length]);
  pos.append("path").attr("d", posGenerator).style("fill", "transparent");


  if(showTooltip) {
    paths.on("mousemove", function (event, d: any) {
      tooltip.select(".color").style("background", d.data.color);
      tooltip.select(".name").html(d.data.name);
      tooltip
        .select(".value")
        .html(`${d.data.value}% <span>${numberWithCommas(d.data.count)}</span>`);
      tooltip.style("left", event.layerX - 20 + "px");
      tooltip.style("top", event.layerY - 60 + "px");
      tooltip.style("display", "block");
    });
    paths.on("mouseout", function () {
      tooltip.style("display", "none");
    });
  }

  // Append text labels
  if(showTicks) {
    pos
    .append("text")
    .attr("text-anchor", "middle")
    .text((d: any) => `${d.data.value}%`) // label text
    .style("fill", (d: any) => d.data.color) // label color
    .style("font-weight", "700") // label size
    .attr("transform", (d: any) => {
      const [x, y] = posGenerator.centroid(d);
      return `translate(${x}, ${y})`;
    })
    .transition()
    .duration(700)
    .style("font-size", `${fontSize || 14}px`)
  }

  if(showLabels){
    pos
        .append("text")
        .attr("dy", "0.35em")
        .attr("text-anchor", "middle")
        .text((d: any) => {
          return `${d.data.name}`
        }) // label text
        .style("fill", (d: any) => d.data.color) // label color
        .style("font-weight", "700") // label size
        .attr("transform", function(d) {
          let pos = posGenerator.centroid(d);
          pos[1] += 7;
          return "translate(" + pos + ")";
        })
        .transition()
        .duration(700)
        .style("font-size", `${fontSize || 7}px`)
  }
};

export default drawChart;
