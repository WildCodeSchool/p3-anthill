import { useRef } from "react";
import * as d3 from "d3";

function Graph({ width, height, dragBehavior, simulation, links, nodes }) {
  const svgRef = useRef(null);

  const svg = d3.select(svgRef.current).attr("viewBox", [0, 0, width, height]);

  const nodeWidth = 200;
  const nodeHeight = 100;

  const link = svg
    .append("g")
    .attr("stroke", "#000")
    .attr("stroke-width", 1.5)
    .selectAll("line")
    .data(links)
    .join("line")
    .attr("stroke-width", (d) => Math.sqrt(d.value));

  const label = svg.append("g").selectAll(".label").data(links).join("g");

  label
    .append("rect")
    .attr("x", -50)
    .attr("y", -15)
    .attr("height", 20)
    .attr("width", 100)
    .attr("fill", "#fff");

  label
    .append("text")
    .attr("text-anchor", "middle")
    .text((d) => d.text);

  const node = svg
    .append("g")
    .attr("stroke", "#000")
    .attr("stroke-width", 1.5)
    .selectAll(".node")
    .data(nodes)
    .join("g")
    .call(dragBehavior);

  node
    .append("rect")
    .attr("rx", 50)
    .attr("width", nodeWidth)
    .attr("height", nodeHeight)
    .attr("fill", "#fff");

  node
    .append("foreignObject")
    .attr("x", "0")
    .attr("y", "0")
    .attr("width", nodeWidth)
    .attr("height", nodeHeight)
    .style("pointer-events", "none")
    .append("xhtml:p")
    .style("width", "100%")
    .style("height", "100%")
    .style("padding-left", "1em")
    .style("padding-right", "1em")
    .style("pointer-events", "none")
    .text((d) => d.text);

  simulation.on("tick", () => {
    link
      .attr("x1", (d) => d.source.x)
      .attr("y1", (d) => d.source.y)
      .attr("x2", (d) => d.target.x)
      .attr("y2", (d) => d.target.y);

    label.attr(
      "transform",
      (d) =>
        `translate(${(d.source.x + d.target.x) / 2},${
          (d.source.y + d.target.y) / 2
        })`
    );

    node.attr(
      "transform",
      (d) => `translate(${d.x - 0.5 * nodeWidth},${d.y - 0.5 * nodeHeight})`
    );
  });
  //   const dragRef = useDrag(simulation, dragBehavior);
  return <svg ref={svgRef}>{/* <g ref={dragRef} /> */}</svg>;
}

export default Graph;
