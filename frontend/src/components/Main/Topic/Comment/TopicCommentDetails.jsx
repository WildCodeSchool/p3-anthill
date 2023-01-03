import { useParams } from "react-router-dom";
import TopicInfo from "./TopicInfo";
import IdeaCard from "./IdeaCard";
import useFetch from "../../../../services/useFetch";

import "./TopicCommentDetails.css";

function TopicCommentDetails() {
  const { id } = useParams();
  const { data: topic, loading } = useFetch(`/topics/${id}?detail`);

  return (
    <div className="topicCommentDeatils_main">
      {loading && <h2>LOADING ...</h2>}
      {topic && (
        <TopicInfo
          key={topic.id}
          title={topic.title}
          creatorName={topic.creator_name}
          description={topic.description}
          deadline={topic.deadline}
        />
      )}
      <div className="ideaContainer">
        <IdeaCard />
        <IdeaCard />
        <IdeaCard />
        <IdeaCard />
      </div>
    </div>
  );
}

export default TopicCommentDetails;
