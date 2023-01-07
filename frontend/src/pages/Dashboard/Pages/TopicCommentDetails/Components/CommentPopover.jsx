import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { usePopper } from "react-popper";
import CommentCard from "../../TopicIdeasDetails/Components/CommentCard";
import "./CommentPopover.css";
import useFetch from "../../../../../services/useFetch";

function CommentPopover({ ideaId }) {
  const [isOpen, setIsOpen] = useState(false);

  const boxRef = useRef();
  const tooltipRef = useRef();

  const { id } = useParams();

  const { data: comments, loading } = useFetch(
    `/topics/${id}/ideas/${ideaId}/comments`
  );

  const { styles } = usePopper(boxRef.current, tooltipRef.current, {
    placement: "bottom",
    modifiers: {
      name: "offset",
      options: {
        offset: [0, 10],
        altAxis: true,
      },
    },
  });

  function handleClick() {
    setIsOpen(!isOpen);
  }

  return (
    <div>
      <button ref={boxRef} type="button" onClick={handleClick}>
        Click
      </button>
      <div
        ref={tooltipRef}
        style={styles.popper}
        className={isOpen ? "tooltip-visible" : "tooltip-hidden"}
      >
        {loading || ""}
        {comments &&
          comments.map((elt) => <CommentCard key={elt.id} comment={elt} />)}
      </div>
    </div>
  );
}

export default CommentPopover;
