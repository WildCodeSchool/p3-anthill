import { useEffect, useContext } from "react";
import useFetchLazy from "../../../../services/useFetchLazy";
import TopicCard from "../../Components/TopicCard/TopicCard";
import ToggleModeButtons from "../../Components/ToggleModeButtons/ToggleModeButtons";
import ToggleModeContext from "../../../../contexts/ToggleModeContext";

import "./index.css";

function TopicsList() {
  const { toggleMode } = useContext(ToggleModeContext);

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
        <div className={!toggleMode ? "topic_list__main" : "topic_grid__main"}>
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
                triggerGetTopics={triggerGetTopics}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default TopicsList;
