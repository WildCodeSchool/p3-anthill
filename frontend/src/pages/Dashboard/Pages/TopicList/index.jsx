import useFetch from "../../../../services/useFetch";
import TopicCard from "../../Components/TopicCard";
import ToggleModeButtons from "../../Components/ToggleModeButtons";

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
            />
          ))}
      </div>
    </div>
  );
}

export default TopicsList;
