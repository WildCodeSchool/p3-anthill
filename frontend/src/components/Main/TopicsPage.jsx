import useFetch from "@services/useFetch";
import TopicCard from "./Topic/TopicCard";

function TopicsPage() {
  const { data, loading } = useFetch("/topics?card");

  return (
    <div>
      {loading && <div>LOADING...</div>}
      {data &&
        data.map((topic) => (
          <TopicCard
            key={topic.id}
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

export default TopicsPage;
