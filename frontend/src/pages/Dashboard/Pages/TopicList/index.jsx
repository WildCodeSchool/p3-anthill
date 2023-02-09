import { useEffect, useContext } from "react";
import useFetchLazy from "../../../../services/useFetchLazy";
import TopicCard from "../../Components/TopicCard/TopicCard";
import SearchBar from "../../Components/SearchBar/SearchBar";
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
    path: "/topics?view=card",
    method: "get",
  });

  useEffect(() => {
    triggerGetTopics();
  }, []);

  return (
    <div className="topicsContainer">
      <div className="dashboard__header">
        <div className="dashboard__placeholder" />
        <h1 className="dashboard__title">All Topics</h1>
        <ToggleModeButtons />
      </div>

      <div className="divider divider__header" />

      <SearchBar />

      <div className="topicsList">
        {loading && <div>LOADING...</div>}
        <div className={!toggleMode ? "topic_grid__main" : "topic_list__main"}>
          {topics &&
            topics.map((topic) => (
              <TopicCard
                key={topic.id}
                id={topic.id}
                creatorId={topic.creator_id}
                title={topic.title}
                creatorPseudo={topic.pseudo}
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
