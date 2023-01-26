import { useCallback } from "react";
import * as d3 from "d3";
import Graph from "./Graph";
import "./BubbleDetails.css";

function BubbleDetails() {
  const data = {
    nodes: [
      {
        id: "a",
        text: "Quentin hehehehihih",
      },
      {
        id: "b",
        text: "joahnna jejeje",
      },
      {
        id: "c",
        text: "Audrey jojojojojoj",
      },
      {
        id: "d",
        text: "Cyril hkdhkhfd",
      },
      {
        id: "e",
        text: "Huy lolololol",
      },
      {
        id: "f",
        text: "Kevin alalaoalaoalao",
      },
    ],
    links: [
      { source: "a", target: "b", text: "foo" },
      { source: "a", target: "c", text: "bar" },
      { source: "a", target: "d", text: "foobar" },
      { source: "a", target: "e", text: "foo and bar" },
      { source: "a", target: "f", text: "barfoo" },
    ],
  };

  const width = 1000;
  const height = 1200;
  const links = data.links.map((d) => Object.create(d));
  const nodes = data.nodes.map((d) => Object.create(d));
  const simulation = d3
    .forceSimulation(nodes)
    .force(
      "link",
      d3.forceLink(links).id((d) => d.id)
    )
    .force("charge", d3.forceManyBody().strength(-20000))
    .force("center", d3.forceCenter(width / 2, height / 2));

  function dragstarted(e) {
    if (!e.active) simulation.alphaTarget(0.3).restart();
    e.subject.fx = e.subject.x;
    e.subject.fy = e.subject.y;
  }
  function dragged(e) {
    e.subject.fx = e.x;
    e.subject.fy = e.y;
  }
  function dragended(e) {
    if (!e.active) simulation.alphaTarget(0);
    e.subject.fx = null;
    e.subject.fy = null;
  }
  const dragBehavior = useCallback(() => {
    return d3
      .drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);
  }, []);

  return (
    <div className="bubbleTeas">
      <Graph
        data={data}
        width={width}
        height={height}
        dragBehavior={dragBehavior}
        simulation={simulation}
        links={links}
        nodes={nodes}
      />
    </div>
  );
}

export default BubbleDetails;
