import { useRef, useEffect } from "react";
import * as d3 from "d3";

function Drag({ simulation, dragBehavior }) {
  const dragRef = useRef(null);

  useEffect(() => {
    dragBehavior(d3.select(dragRef.current));
    return () => {
      d3.drag().on("start", null).on("drag", null).on("end", null);
    };
  }, [simulation, dragBehavior]);

  return <g ref={dragRef} />;
}

export default Drag;
