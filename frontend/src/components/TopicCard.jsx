import "./TopicCard.css";

function TopicCard() {
  return (
    <article className="topicCard">
      <h3 className="topicCardTilte">topicCardTilte</h3>
      <div className="topicCreatorName">topicCreatorName</div>
      <p className="topicDescription">topicDescription</p>
      <div className="topicDeadline">topicDeadline</div>
      <div className="topicNbIdea">topicNbIdea</div>
    </article>
  );
}

export default TopicCard;
