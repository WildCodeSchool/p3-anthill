import { useRef, useEffect } from "react";
import * as d3 from "d3";

const useDrag = (simulation, dragBehavior) => {
  const dragRef = useRef(null);
  const node = useRef(null);
  useEffect(() => {
    node.current = d3.select(dragRef.current).data(simulation.nodes());
    node.current.call(dragBehavior);
  }, [simulation, dragBehavior]);

  return node;
};

export default useDrag;
