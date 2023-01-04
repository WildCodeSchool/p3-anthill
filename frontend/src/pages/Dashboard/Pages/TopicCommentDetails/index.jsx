import { useParams } from "react-router-dom";
import TopicInfo from "./Components/TopicInfo";
import IdeaCard from "./Components/IdeaCard";
import useFetch from "../../../../services/useFetch";

import "./index.css";

function TopicCommentDetails() {
  const { id } = useParams();
  const { data: topic, loading: loadingTopic } = useFetch(
    `/topics/${id}/details`
  );
  const { data: ideas, loading: loadingIdeas } = useFetch(
    `/topics/${id}/ideas`
  );

  return (
    <div className="topicCommentDeatils_main">
      {(loadingTopic || loadingIdeas) && <h2>LOADING ...</h2>}
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
        {ideas &&
          ideas.map((idea) => (
            <IdeaCard
              key={idea.id}
              title={idea.idea_title}
              creatorName={idea.idea_creator_name}
              description={idea.idea_description}
              nbUpVote={idea.nb_up_vote}
              nbComment={idea.nb_comment}
            />
          ))}
      </div>
    </div>
  );
}

export default TopicCommentDetails;
