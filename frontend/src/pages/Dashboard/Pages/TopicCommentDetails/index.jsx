import { useParams } from "react-router-dom";
import { useEffect } from "react";
import TopicInfo from "./Components/TopicInfo";
import IdeaCard from "./Components/IdeaCard";
import IdeaCreationCard from "./Components/IdeaCreationCard";
import useFetch from "../../../../services/useFetch";
import useFetchLazy from "../../../../services/useFetchLazy";

import "./index.css";

function TopicCommentDetails() {
  const commentModeId = useParams().id;
  const { data: topic, loading: loadingTopic } = useFetch({
    path: `/topics/${commentModeId}`,
    method: "get",
  });
  const {
    trigger: triggerGetIdeas,
    data: ideas,
    loading: loadingIdeas,
  } = useFetchLazy({
    path: `/topics/${commentModeId}/ideas`,
    method: "get",
  });

  useEffect(() => {
    triggerGetIdeas();
  }, []);

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
      <div>
        <IdeaCreationCard
          commentModeId={commentModeId}
          triggerGetIdeas={triggerGetIdeas}
        />
      </div>
      <div className="ideaContainer">
        {ideas &&
          ideas.map((idea) => (
            <IdeaCard
              key={idea.id}
              id={idea.id}
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
