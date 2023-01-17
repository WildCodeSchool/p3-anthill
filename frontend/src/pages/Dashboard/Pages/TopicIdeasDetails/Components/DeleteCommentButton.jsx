import "./DeleteCommentButton.css";
// import { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetchLazy from "../../../../../services/useFetchLazy";

function DeleteCommentButton({ comment, triggerGetComment }) {
  const { id: topicId, ideaId } = useParams();

  const { trigger: triggerDeleteComment, isSuccess } = useFetchLazy({
    path: `/topics/${topicId}/ideas/${ideaId}/comments/${comment.id}`,
    method: "delete",
  });

  const handleClick = async (e) => {
    e.preventDefault();
    await triggerDeleteComment();
    triggerGetComment();
  };

  return (
    <div>
      <button type="button" onClick={handleClick}>
        Delete
      </button>
      {isSuccess && <p>Comment Deleted !</p>}
    </div>
  );
}

export default DeleteCommentButton;
