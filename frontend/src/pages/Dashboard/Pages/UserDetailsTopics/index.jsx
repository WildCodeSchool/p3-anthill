import { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import ToggleModeContext from "../../../../contexts/ToggleModeContext";
import useFetchLazy from "../../../../services/useFetchLazy";
import TopicCard from "../../Components/TopicCard/TopicCard";
import "./index.css";

function UserDetailsTopics() {
  const { toggleMode } = useContext(ToggleModeContext);

  const { userId } = useParams();
  const {
    data: topics,
    trigger: triggerGetTopics,
    loading: loadingTopic,
  } = useFetchLazy({
    path: `/users/${userId}/topics`,
    method: "get",
  });
  useEffect(() => {
    triggerGetTopics();
  }, []);
  return (
    <div
      className={
        toggleMode ? "userDetailsTopics__main" : "userDetailsTopics__main__list"
      }
    >
      {loadingTopic && <h2>LOADING ...</h2>}
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
  );
}

export default UserDetailsTopics;
