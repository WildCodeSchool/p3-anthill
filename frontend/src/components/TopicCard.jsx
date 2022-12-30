import "./TopicCard.css";

function TopicCard({ topicCardTitle, topicCreatorName, topicDescription }) {
  return (
    <div className="topic__Card">
      <h1 className="topicCard__Title">{topicCardTitle}</h1>
      <h2 className="topic__CreatorName">{topicCreatorName}</h2>
      <p className="topic__Description">{topicDescription}</p>
      <p>Date</p>
      <p>Comments</p>
    </div>
  );
}

export default TopicCard;
