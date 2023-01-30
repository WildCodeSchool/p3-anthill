import useFetchLazy from "../../../../services/useFetchLazy";
import "./DeleteTopicButton.css";

function DeleteTopicButton({ topicId, triggerGetTopics }) {
  const { trigger: triggerDeleteTopic } = useFetchLazy({
    path: `/topics/${topicId}`,
    method: "delete",
  });

  const handleClick = async () => {
    await triggerDeleteTopic();
    triggerGetTopics();
  };

  return (
    <div className="div-delete">
      <button type="button" className="button-delete" onClick={handleClick}>
        Delete
      </button>
    </div>
  );
}

export default DeleteTopicButton;
