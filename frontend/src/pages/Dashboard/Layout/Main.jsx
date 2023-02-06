import { useEffect, useContext } from "react";
import useFetchLazy from "../../../services/useFetchLazy";
import TopicCard from "../Components/TopicCard/TopicCard";
import ToggleModeButtons from "../Components/ToggleModeButtons/ToggleModeButtons";
import ToggleModeContext from "../../../contexts/ToggleModeContext";

import "./Main.css";

function Main() {
  const { toggleMode } = useContext(ToggleModeContext);

  const {
    data: topicTop,
    loading,
    trigger: triggerGetTopics,
  } = useFetchLazy({
    path: "/topics/card/top",
    method: "get",
  });

  useEffect(() => {
    triggerGetTopics();
  }, []);

  return (
    <div className="main">
      <ToggleModeButtons />
      <h3 className="title-top">Top 3 of the moment</h3>
      {loading && <div>LOADING...</div>}
      <div className={!toggleMode ? "topic_grid__main" : "topic_list__main"}>
        {topicTop &&
          topicTop
            .slice(0, 3)
            .map((topic) => (
              <TopicCard
                key={topic.id}
                id={topic.id}
                creatorId={topic.creator_id}
                title={topic.title}
                creatorName={topic.fullname}
                description={topic.description}
                deadline={topic.deadline}
                nbIdea={topic.nb_idea}
              />
            ))}
      </div>
    </div>
  );
}

export default Main;
