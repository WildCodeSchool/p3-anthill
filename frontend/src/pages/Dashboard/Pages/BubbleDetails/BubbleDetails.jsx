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
      {
        id: "g",
        text: "Kevin alalaoalaoalao",
      },
    ],
    links: [
      { source: "a", target: "b", text: "foo" },
      { source: "a", target: "c", text: "bar" },
      { source: "a", target: "d", text: "foobar" },
      { source: "a", target: "e", text: "foo and bar" },
      { source: "a", target: "f", text: "barfoo" },
      { source: "a", target: "g", text: "barfoo" },
    ],
  };

  const width = 1200;

  const height = 1400;
  const links = data.links.map((d) => Object.create(d));
  const nodes = data.nodes.map((d) => Object.create(d));

  return (
    <div className="bubbleTeas">
      <Graph width={width} height={height} links={links} nodes={nodes} />
    </div>
  );
}

export default BubbleDetails;
