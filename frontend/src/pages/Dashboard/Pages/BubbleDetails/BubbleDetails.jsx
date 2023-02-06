import Graph from "./Graph";
import "./BubbleDetails.css";

function BubbleDetails() {
  const data = {
    nodes: [
      {
        id: "a",
        text: "Quentin hehehefhihih fsfg fdg f g",
        name: "Quentin",
        photo: "/ContactPhotos/Quentin.png",
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
      {
        source: "a",
        target: "b",
        name: "Audrey H",
        photo: "/ContactPhotos/Audrey.png",
      },
      {
        source: "a",
        target: "c",
        name: "Cyril",
        photo: "/ContactPhotos/Cyril.png",
      },
      {
        source: "a",
        target: "d",
        name: "Gwenael",
        photo: "/ContactPhotos/Gwenael.png",
      },
      {
        source: "a",
        target: "e",
        name: "Herschel",
        photo: "/ContactPhotos/Herschel.png",
      },
      {
        source: "a",
        target: "f",
        name: "Huy",
        photo: "/ContactPhotos/Huy.png",
      },
      {
        source: "a",
        target: "g",
        name: "Johanna",
        photo: "/ContactPhotos/Johanna.png",
      },
    ],
  };

  const width = 1200;

  const height = 1400;
  const links = data.links.map((d) => Object.create(d));
  const nodes = data.nodes.map((d) => Object.create(d));

  return (
    <div className="bubbleTeas">
      <Graph width={width} height={height} links={links} nodes={nodes} />
      <div className="bb-title">
        <h1>Bubbles View Mode</h1>
      </div>
    </div>
  );
}

export default BubbleDetails;
