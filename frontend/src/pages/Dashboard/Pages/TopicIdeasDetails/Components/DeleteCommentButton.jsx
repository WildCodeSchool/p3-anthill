import "./DeleteCommentButton.css";
import { useParams } from "react-router-dom";
import useFetchLazy from "../../../../../services/useFetchLazy";

function DeleteCommentButton({ comment, triggerGetComments }) {
  const { id: topicId, ideaId } = useParams();

  const { trigger: triggerDeleteComment } = useFetchLazy({
    path: `/topics/${topicId}/ideas/${ideaId}/comments/${comment.id}`,
    method: "delete",
  });

  const handleClick = async () => {
    await triggerDeleteComment();
    triggerGetComments();
  };

  return (
    <div>
      <button type="button" className="button-delete" onClick={handleClick}>
        Delete
      </button>
    </div>
  );
}

export default DeleteCommentButton;
