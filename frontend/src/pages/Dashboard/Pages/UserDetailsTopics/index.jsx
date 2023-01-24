import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetchLazy from "../../../../services/useFetchLazy";
import TopicCard from "../../Components/TopicCard/TopicCard";

function UserDetailsTopics() {
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
    <div className="userDetailsTopics__main">
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
