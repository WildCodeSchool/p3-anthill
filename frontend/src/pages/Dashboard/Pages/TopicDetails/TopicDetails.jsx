import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetchLazy from "../../../../services/useFetchLazy";
import TopicCommentDetails from "./TopicCommentDetails";

function TopicDetails() {
  const { topicId } = useParams();
  const {
    trigger: triggerGetTopic,
    data: topic,
    loading: loadingTopic,
  } = useFetchLazy({
    path: `/topics/${topicId}`,
    method: "get",
  });
  const {
    trigger: triggerGetIdeas,
    data: ideas,
    loading: loadingIdeas,
  } = useFetchLazy({
    path: `/topics/${topicId}/ideas`,
    method: "get",
  });

  useEffect(() => {
    triggerGetTopic();
    triggerGetIdeas();
  }, []);
  if (topic?.is_comment_mode) {
    return (
      <TopicCommentDetails
        topic={topic}
        loadingTopic={loadingTopic}
        ideas={ideas}
        loadingIdeas={loadingIdeas}
        triggerGetIdeas={triggerGetIdeas}
        triggerGetTopic={triggerGetTopic}
      />
    );
  }
  return <div>TopicBubbleDetails</div>;
}

export default TopicDetails;
