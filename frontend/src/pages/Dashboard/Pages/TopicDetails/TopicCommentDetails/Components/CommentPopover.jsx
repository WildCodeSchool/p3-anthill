import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { FaCommentAlt } from "react-icons/fa";
import { usePopper } from "react-popper";
import CommentCard from "../../../TopicIdeasDetails/Components/CommentCard";
import "./CommentPopover.css";
import useFetch from "../../../../../../services/useFetch";

function CommentPopover({ ideaId }) {
  const [isOpen, setIsOpen] = useState(false);

  const boxRef = useRef();
  const tooltipRef = useRef();

  const { topicId } = useParams();

  const { data: comments } = useFetch({
    path: `/topics/${topicId}/ideas/${ideaId}/comments`,
    method: "get",
  });

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
      <button
        ref={boxRef}
        className="commentButton"
        type="button"
        onClick={handleClick}
      >
        <FaCommentAlt />
      </button>
      <div
        ref={tooltipRef}
        style={styles.popper}
        className={isOpen ? "tooltip-visible" : "tooltip-hidden"}
      >
        {comments &&
          comments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))}
      </div>
    </div>
  );
}

export default CommentPopover;
