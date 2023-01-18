import useFetch from "../../../../services/useFetch";
import TopicCard from "../../Components/TopicCard/TopicCard";
import ToggleModeButtons from "../../Components/ToggleModeButtons/ToggleModeButtons";

import "./index.css";

function TopicsList() {
  const { data: topics, loading } = useFetch({
    path: "/topics/card",
    method: "get",
  });

  return (
    <div>
      <ToggleModeButtons />
      <div className="topicsList">
        {loading && <div>LOADING...</div>}
        {topics &&
          topics.map((topic) => (
            <TopicCard
              key={topic.id}
              id={topic.id}
              title={topic.title}
              creatorName={topic.creator_name}
              description={topic.description}
              deadline={topic.deadline}
              nbIdea={topic.nb_idea}
              nbBubble={topic.nb_bubble}
              isCommentMode={topic.is_comment_mode}
            />
          ))}
      </div>
    </div>
  );
}

export default TopicsList;
