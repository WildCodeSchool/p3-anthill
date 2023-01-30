import { useParams } from "react-router-dom";
import useFetchLazy from "../../../../../../services/useFetchLazy";

function DeleteIdeaButton({ ideaId, triggerGetIdeas }) {
  const { id: topicId } = useParams();

  const { trigger: triggerDeleteIdea } = useFetchLazy({
    path: `/topics/${topicId}/ideas/${ideaId}`,
    method: "delete",
  });

  const handleClick = async () => {
    await triggerDeleteIdea();
    triggerGetIdeas();
  };

  return (
    <div>
      <button
        type="button"
        className="button-delete"
        style={{ marginRight: "15px", marginBottom: "0" }}
        onClick={handleClick}
      >
        Delete
      </button>
    </div>
  );
}

export default DeleteIdeaButton;
