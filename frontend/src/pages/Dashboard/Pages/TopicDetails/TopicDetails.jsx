import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../../../services/useFetch";
import useFetchLazy from "../../../../services/useFetchLazy";
import TopicCommentDetails from "./TopicCommentDetails";

function TopicDetails() {
  const { topicId } = useParams();

  const { data: topic, loading: loadingTopic } = useFetch({
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
    triggerGetIdeas();
  }, []);

  if (topic.is_comment_mode) {
    return (
      <TopicCommentDetails
        topic={topic}
        loadingTopic={loadingTopic}
        ideas={ideas}
        loadingIdeas={loadingIdeas}
        triggerGetIdeas={triggerGetIdeas}
      />
    );
  }
  return <div>TopicBubbleDetails</div>;
}

export default TopicDetails;
