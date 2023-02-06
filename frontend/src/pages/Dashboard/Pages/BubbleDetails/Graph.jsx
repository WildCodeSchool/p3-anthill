import { useRef, useEffect } from "react";
import * as d3 from "d3";
import "./Graph.css";

function Graph({ width, height, links, nodes }) {
  const svgRef = useRef(null);
  useEffect(() => {
    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3.forceLink(links).id((d) => d.id)
      )
      .force("charge", d3.forceManyBody().strength(-20000))
      .force("center", d3.forceCenter(width / 2, height / 2));

    const dragstarted = (e) => {
      if (!e.active) simulation.alphaTarget(0.3).restart();
      e.subject.fx = e.subject.x;
      e.subject.fy = e.subject.y;
    };
    const dragged = (e) => {
      e.subject.fx = e.x;
      e.subject.fy = e.y;
    };
    const dragended = (e) => {
      if (!e.active) simulation.alphaTarget(0);
      e.subject.fx = null;
      e.subject.fy = null;
    };

    const dragBehavior = () =>
      d3
        .drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);

    const svg = d3
      .select(svgRef.current)
      .attr("viewBox", [0, 0, width, height]);

    const nodeWidth = 250;
    const nodeHeight = 100;

    const link = svg
      .append("g")
      .attr("stroke", "#ffeba7")
      .attr("stroke-width", 2.5)
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", (d) => Math.sqrt(d.value));

    const label = svg.append("g").selectAll(".label").data(links).join("g");
    label
      .append("circle")
      .attr("class", (d) => `ava_${d.name}`)
      .attr("r", 50)
      .attr("fill", "#ffeba7");
    label
      .append("image")
      .attr("id", (d) => d.name)
      .attr("x", -25)
      .attr("y", -5)
      .attr("width", 50)
      .attr("height", 50)
      .attr("xlink:href", (d) => d.photo)
      .attr("alt", "photo");

    label
      .append("text")
      .attr("y", -15)
      .attr("text-anchor", "middle")
      .style("font-weight", "bold")
      .style("font-size", "1rem")
      .text((d) => d.name);

    const node = svg
      .append("g")
      .attr("stroke", "#ffeba7")
      .attr("stroke-width", 1.5)
      .selectAll(".node")
      .data(nodes)
      .join("g")
      .call(dragBehavior());

    node
      .append("rect")
      .attr("id", (d) => d.id)
      .attr("rx", 10)
      .attr("width", nodeWidth)
      .attr("height", nodeHeight)
      .attr("fill", "#3b4554")
      .attr("opacity", 0.8);
    node
      .select("#a")
      .attr("width", nodeWidth)
      .attr("height", 200)
      .attr("stroke", "#38d6ae");

    node
      .append("text")
      .attr("x", 40)
      .attr("y", 180)
      .attr("text-anchor", "middle")
      .style("color", "#ffeba7")
      .style("font-weight", "bold")
      .style("font-size", "1rem")
      .text((d) => d.name);
    node
      .append("image")
      .attr("x", 185)
      .attr("y", 140)
      .attr("width", 50)
      .attr("height", 50)
      .attr("xlink:href", (d) => d.photo)
      .attr("alt", "photo");

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
    return () => simulation.stop();
  }, []);
  return <svg ref={svgRef} />;
}

export default Graph;
