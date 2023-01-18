import useFetchLazy from "../../../../services/useFetchLazy";
import "./DeleteTopicButton.css";

function DeleteTopicButton({ topicId, triggerGetTopics }) {
  const { trigger: triggerDeleteTopic } = useFetchLazy({
    path: `/topics/${topicId}`,
    method: "delete",
  });

  const handleClick = async (e) => {
    e.preventDefault();
    await triggerDeleteTopic();
    triggerGetTopics();
  };

  return (
    <div>
      <button type="button" onClick={handleClick}>
        Delete
      </button>
    </div>
  );
}

export default DeleteTopicButton;
