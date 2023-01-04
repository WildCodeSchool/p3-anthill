import useFetch from "../../../../services/useFetch";
import TopicCard from "../../Components/TopicCard";

function TopicsList() {
  const { data: topics, loading } = useFetch("/topics/card");

  return (
    <div>
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
