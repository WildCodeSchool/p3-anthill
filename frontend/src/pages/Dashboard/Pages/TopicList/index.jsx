import { useEffect } from "react";
import useFetchLazy from "../../../../services/useFetchLazy";
import TopicCard from "../../Components/TopicCard/TopicCard";
import ToggleModeButtons from "../../Components/ToggleModeButtons/ToggleModeButtons";

import "./index.css";

function TopicsList() {
  const {
    data: topics,
    loading,
    trigger: triggerGetTopics,
  } = useFetchLazy({
    path: "/topics/card",
    method: "get",
  });

  useEffect(() => {
    triggerGetTopics();
  }, []);

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
              creatorName={topic.fullname}
              description={topic.description}
              deadline={topic.deadline}
              nbIdea={topic.nb_idea}
              triggerGetTopics={triggerGetTopics}
            />
          ))}
      </div>
    </div>
  );
}

export default TopicsList;
