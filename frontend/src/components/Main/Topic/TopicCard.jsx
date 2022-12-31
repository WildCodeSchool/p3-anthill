import "./TopicCard.css";
import { FaCommentAlt } from "react-icons/fa";

function TopicCard({ title, creatorName, description, deadline, nbIdea }) {
  return (
    <article className="topicCard">
      <h2 className="topicCard__Title">{title}</h2>
      <div className="topicCard__CreatorName">{creatorName}</div>
      <p className="topicCard__Description">{description}</p>
      <div className="topicCard__Deadline">{deadline}</div>
      <div className="topicCard__nbIdea">
        {nbIdea} <FaCommentAlt />
      </div>
    </article>
  );
}

export default TopicCard;
