import { useParams } from "react-router-dom";
import useFetch from "../../../../services/useFetch";
import TopicCard from "../../Components/TopicCard/TopicCard";
import "./index.css";

function UserDetailsTopics() {
  const { userId } = useParams();
  const { data: topics, loading: loadingTopic } = useFetch({
    path: `/users/${userId}/topics`,
    method: "get",
  });
  return (
    <div className="userDetailsTopics__main">
      {loadingTopic && <h2>LOADING ...</h2>}
      {topics.map((topic) => (
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
  );
}

export default UserDetailsTopics;
