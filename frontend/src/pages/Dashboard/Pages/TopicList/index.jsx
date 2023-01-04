import useFetch from "../../../../services/useFetch";
import TopicCard from "../../Components/TopicCard";
import ToggleMode from "../../Components/ToggleMode";

function TopicsList() {
  const { data: topics, loading } = useFetch("/topics/card");

  return (
    <div>
      <ToggleMode />
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
  );
}

export default TopicsList;
