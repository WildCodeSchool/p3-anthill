import { useParams } from "react-router-dom";
import TopicInfo from "./TopicInfo";

import "./TopicCommentDetails.css";
import useFetch from "../../../../services/useFetch";

function TopicCommentDetails() {
  const { id } = useParams();
  const { data: topic, loading } = useFetch(`/topics/${id}`);

  return (
    <div className="topicCommentDeatils_main">
      {loading && <h2>LOADING ...</h2>}
      {topic && (
        <TopicInfo
          key={topic.id}
          title={topic.title}
          creatorName={topic.creator_id}
          description={topic.description}
          deadline={topic.deadline}
        />
      )}
    </div>
  );
}

export default TopicCommentDetails;
